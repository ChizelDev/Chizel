import { NextRequest, NextResponse } from 'next/server';
import { getStaticResponse, ConversationState } from '@/lib/salesScript';

export async function POST(req: NextRequest) {
    try {
        const { messages, currentPage, conversationState } = await req.json();

        const apiKey = process.env.GEMINI_API_KEY || process.env.DEEPSEEK_API_KEY;

        // ── AI MODE: when an API key is configured ──────────────────────────
        if (apiKey) {
            try {
                // Determine which AI provider to use
                const isGemini = !!process.env.GEMINI_API_KEY;

                if (isGemini) {
                    // Google Gemini Flash (free tier)
                    const { GoogleGenerativeAI } = await import('@google/generative-ai');
                    const genAI = new GoogleGenerativeAI(apiKey);
                    const model = genAI.getGenerativeModel({
                        model: 'gemini-1.5-flash',
                        systemInstruction: buildSystemPrompt(currentPage),
                    });

                    const history = messages.slice(0, -1).map((m: { role: string; content: string }) => ({
                        role: m.role === 'assistant' ? 'model' : 'user',
                        parts: [{ text: m.content }],
                    }));

                    const chat = model.startChat({ history });
                    const lastMessage = messages[messages.length - 1];
                    const result = await chat.sendMessage(lastMessage.content);
                    const responseText = result.response.text();

                    return NextResponse.json(parseAIResponse(responseText));

                } else {
                    // DeepSeek (OpenAI-compatible)
                    const OpenAI = (await import('openai')).default;
                    const client = new OpenAI({
                        baseURL: 'https://api.deepseek.com',
                        apiKey,
                    });

                    const completion = await client.chat.completions.create({
                        model: 'deepseek-chat',
                        messages: [
                            { role: 'system', content: buildSystemPrompt(currentPage) },
                            ...messages.map((m: { role: string; content: string }) => ({
                                role: m.role as 'user' | 'assistant',
                                content: m.content,
                            })),
                        ],
                        temperature: 0.7,
                        max_tokens: 500,
                    });

                    const responseText = completion.choices[0]?.message?.content || '';
                    return NextResponse.json(parseAIResponse(responseText));
                }
            } catch (aiError) {
                console.warn('AI API failed, falling back to static script:', aiError);
                // Fall through to static script on AI failure
            }
        }

        // ── STATIC MODE: no API key or AI failed ────────────────────────────
        const state: ConversationState = conversationState || {
            stage: 'greeting',
            serviceInterest: null,
            objectionCount: 0,
            messageCount: messages.length - 1,
            hasAskedForCall: false,
            userName: null,
        };

        const lastUserMessage = messages[messages.length - 1]?.content || '';
        const response = getStaticResponse(lastUserMessage, state);

        return NextResponse.json({
            message: response.message,
            actions: response.actions,
            mode: 'static',
        });

    } catch (error) {
        console.error('Chat API error:', error);
        return NextResponse.json(
            {
                message: "Oops, something went wrong on my end! Please try again or reach us directly at hellod2cora@gmail.com 📧",
                actions: { quickReplies: ["Book a Call Instead", "Try Again"] },
            },
            { status: 200 } // return 200 so the frontend doesn't break
        );
    }
}

// ─── System prompt for AI mode ──────────────────────────────────────────────
function buildSystemPrompt(currentPage: string): string {
    return `You are "Cora", the AI sales assistant for d2cora, a leading digital marketing agency for D2C brands.

## Your Personality
- Warm, confident, consultative, like a smart friend who's a marketing expert
- Direct and concise. Max 3-4 sentences per response
- Use 1 emoji per message max
- Never pushy. Guide, don't pressure.

## d2cora's Services
1. Performance Marketing, Meta, Google, TikTok ads. Optimized for ROAS.
2. Content Marketing, Strategy, copywriting, video, brand storytelling
3. Social Media Marketing, Strategy, community, influencer, campaigns
4. Website Development, UI/UX, ecommerce, CRO, speed optimization
5. SEO, Technical, on-page, off-page, local SEO

## Company Info
- Email: hellod2cora@gmail.com | Phone: +91 9548316900
- Calendly: https://calendly.com/d2cora22

## Action Markers (add to end of message)
- When user wants to book: add [ACTION:SHOW_CALENDLY]
- When you've detected buying intent and want lead info: add [ACTION:CAPTURE_LEAD]
- When recommending a service: add [ACTION:SERVICE_CARD:ServiceName]
- For suggested replies: add [QUICK_REPLIES:Option1|Option2|Option3]

## Current Page Context
User is viewing: ${currentPage || 'homepage'}`;
}

// ─── Parse action markers from AI responses ──────────────────────────────────
function parseAIResponse(text: string) {
    const actions: {
        showCalendly: boolean;
        captureLead: boolean;
        serviceCard: string | null;
        quickReplies: string[] | null;
    } = {
        showCalendly: false,
        captureLead: false,
        serviceCard: null,
        quickReplies: null,
    };

    if (text.includes('[ACTION:SHOW_CALENDLY]')) actions.showCalendly = true;
    if (text.includes('[ACTION:CAPTURE_LEAD]')) actions.captureLead = true;

    const serviceMatch = text.match(/\[ACTION:SERVICE_CARD:(.+?)\]/);
    if (serviceMatch) actions.serviceCard = serviceMatch[1];

    const repliesMatch = text.match(/\[QUICK_REPLIES:(.+?)\]/);
    if (repliesMatch) actions.quickReplies = repliesMatch[1].split('|').map((r: string) => r.trim());

    const clean = text
        .replace(/\[ACTION:SHOW_CALENDLY\]/g, '')
        .replace(/\[ACTION:CAPTURE_LEAD\]/g, '')
        .replace(/\[ACTION:SERVICE_CARD:.+?\]/g, '')
        .replace(/\[QUICK_REPLIES:.+?\]/g, '')
        .trim();

    return { message: clean, actions };
}
