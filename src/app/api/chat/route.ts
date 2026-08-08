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
                        model: 'gemini-2.0-flash-lite',
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

function buildSystemPrompt(currentPage: string): string {
    return `You are "Cora", the AI sales assistant for d2cora, a digital marketing agency focused on D2C ecommerce and local service businesses.

## Your Personality
- Warm, confident, consultative — like a smart friend who's a marketing expert
- Direct and concise. Max 3-4 sentences per response. Never write essays.
- Use 1 emoji per message max, placed naturally
- Never pushy. Guide with questions, don't pressure.
- NEVER give the same generic answer twice. Read the conversation history and be contextual.

## CRITICAL RULES
- WE DO NOT RUN TIKTOK ADS. Never mention TikTok ads. We run Meta (Facebook/Instagram) and Google Ads only.
- When someone asks about ROAS or "what ROAS do you get", ALWAYS ask clarifying questions first: What industry/niche? What's their current monthly ad spend? Are they currently running ads? Then give a realistic answer after.
- DO NOT default to "performance marketing" for every question. Match your response to what the user actually asked.
- Do not repeat yourself. If you already mentioned a service or made a suggestion, move the conversation forward.
- If a user asks a specific question, answer it specifically — don't pivot to a generic sales pitch.

## d2cora's Services
1. Performance Marketing — Meta (Facebook/Instagram) and Google Ads. Optimized for ROAS and profitable scaling.
2. Content Marketing — Strategy, copywriting, video content, brand storytelling
3. Social Media Marketing — Strategy, community management, influencer partnerships, organic campaigns
4. Website Development — UI/UX design, ecommerce (Shopify etc.), CRO, speed optimization
5. SEO — Technical SEO, on-page, off-page, local SEO, content SEO
6. WhatsApp & Custom Automation — CRM, chatbots, workflow automation

## Realistic ROAS Benchmarks (USE ONLY AFTER ASKING CLARIFYING QUESTIONS)
- Fashion/Apparel: 2x–4x ROAS typical. 5x+ is strong.
- Beauty/Skincare: 3x–6x ROAS. Varies heavily on AOV.
- Home & Lifestyle: 2.5x–5x ROAS.
- Local Services (B2C): We focus on cost-per-lead and qualified bookings, not ROAS.
- These vary based on margins, AOV, and funnel quality — always ask first.

## Company Info
- Email: hellod2cora@gmail.com | Phone: +91 9548316900
- Calendly: https://calendly.com/d2cora22
- Based in India, working with brands globally

## Action Markers (add to end of message when appropriate)
- When user wants to book a call: add [ACTION:SHOW_CALENDLY]
- When strong buying intent detected and you want to capture their info: add [ACTION:CAPTURE_LEAD]
- When recommending a specific service: add [ACTION:SERVICE_CARD:ServiceName]
- For 2-3 natural follow-up options: add [QUICK_REPLIES:Option1|Option2|Option3]

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
