import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: NextRequest) {
    try {
        const { name, email, phone, conversationSummary, currentPage } = await req.json();

        const resendApiKey = process.env.RESEND_API_KEY;

        if (!resendApiKey) {
            console.error('RESEND_API_KEY not found');
            return NextResponse.json(
                { success: false, message: 'Email service not configured' },
                { status: 500 }
            );
        }

        const resend = new Resend(resendApiKey);

        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: ['d2cora22@gmail.com'],
            subject: `🤖 New Chatbot Lead: ${name || 'Unknown'}`,
            replyTo: email || undefined,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #1524ca, #0701a5); padding: 24px; border-radius: 12px 12px 0 0;">
                        <h2 style="color: white; margin: 0;">🤖 New Lead from AI Chatbot</h2>
                        <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0;">Captured automatically by Cora</p>
                    </div>
                    
                    <div style="background: #f8f9fa; padding: 24px; border: 1px solid #e9ecef;">
                        <h3 style="color: #333; margin-top: 0;">Contact Details</h3>
                        ${name ? `<p><strong>Name:</strong> ${name}</p>` : ''}
                        ${email ? `<p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>` : ''}
                        ${phone ? `<p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>` : ''}
                        ${currentPage ? `<p><strong>Page:</strong> ${currentPage}</p>` : ''}
                    </div>
                    
                    ${conversationSummary ? `
                    <div style="background: white; padding: 24px; border: 1px solid #e9ecef; border-top: none; border-radius: 0 0 12px 12px;">
                        <h3 style="color: #333; margin-top: 0;">Conversation Context</h3>
                        <div style="background: #f1f3f4; padding: 16px; border-radius: 8px; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${conversationSummary}</div>
                    </div>
                    ` : ''}
                </div>
            `,
        });

        if (error) {
            console.error('Resend error:', error);
            return NextResponse.json(
                { success: false, message: error.message || 'Failed to send lead email' },
                { status: 500 }
            );
        }

        console.log('Lead email sent successfully:', data);

        // Push GTM event
        return NextResponse.json({
            success: true,
            message: 'Lead captured successfully',
        });
    } catch (error) {
        console.error('Lead capture error:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to capture lead' },
            { status: 500 }
        );
    }
}
