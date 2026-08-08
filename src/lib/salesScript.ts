// ============================================================
// CORA, d2cora's AI Sales Script Engine
// 15 Years of Sales Experience Baked In
// Handles: Discovery → Presenting → Objections → Booking → Lead Capture
// ============================================================

export type ScriptResponse = {
    message: string;
    actions: {
        showCalendly?: boolean;
        captureLead?: boolean;
        serviceCard?: string | null;
        quickReplies?: string[] | null;
    };
};

// ─── RESPONSE POOLS (randomize to feel human) ────────────────────────────────

const GREETINGS = [
    "Hey there! 👋 I'm Cora, d2cora's growth strategist. Quick question: are you looking to grow your brand, or just browsing to see what's possible? Either way, I'm here to help.",
    "Hey! Welcome to d2cora 🚀 I've helped dozens of D2C brands scale their revenue. What's the #1 challenge your business is facing right now?",
    "Hi! Great timing, I'm Cora, and I specialize in helping brands like yours stop burning ad spend and start actually growing. What brings you here today?",
];

const DISCOVERY_QUESTIONS = [
    "Tell me a bit about your brand, what are you selling and who are you selling it to? That'll help me point you to exactly what you need.",
    "Before I jump into our services, let me ask: what does your current marketing look like? Running ads? Just organic? I want to make sure I give you the right advice.",
    "What's the biggest thing holding your brand back right now, is it traffic, conversions, or just getting the word out? Let's start there.",
];

const BOOK_CALL_TRANSITIONS = [
    "You know what, I think a 15-minute strategy call would be way more valuable than me typing back and forth. You can book one right here 👇",
    "This is exactly the kind of situation where a quick call makes all the difference. I can have our team walk you through a custom plan, grab a slot here:",
    "Honestly, based on what you've shared, there's a real opportunity here. Let our team show you the numbers on a free strategy call:",
];

const CLOSING_URGENCY = [
    "Most brands that delay end up spending 3x more later to catch up. The good news? We can start with a free audit, no commitment.",
    "The brands winning right now started 6 months ago. But second best is starting today. What's stopping you?",
    "We only take on a limited number of clients each month to ensure quality. Our current slots are filling up, let's lock in a call before they're gone.",
];

const TRUST_SIGNALS = [
    "We've helped D2C brands go from ₹50K/month in revenue to ₹5L+/month, not by spending more, but by spending smarter.",
    "Our clients typically see a 2-3x improvement in ROAS within the first 90 days. That's not a promise, that's our track record.",
    "We don't take on brands we can't grow. If we say yes to working with you, it means we see the opportunity, and we back that with results.",
];

const OBJECTION_PRICE = [
    "Totally get it, pricing is always the first question 💡 Here's the honest answer: our pricing is 100% custom because every brand is different. A 15-minute call is the fastest way to get real numbers tailored to YOUR goals. No fluff, no pressure, just clarity. Book a slot below 👇",
    "Great question, and I'll be straight with you, we don't do one-size-fits-all packages because they don't work. The best thing I can do is get you on a quick call so we can understand your business and give you an exact number. Takes 15 minutes. Book a free slot here 👇",
    "I hear you on pricing, it matters. What I can tell you is that we've worked with brands at every budget level, and we only take on clients where we know we can deliver ROI. The only way to know what's right for you is a 15-min conversation. Let's get that booked 👇",
];

const OBJECTION_TIME = [
    "Completely get it, you're busy running a business. That's actually exactly why brands bring us in. We handle the marketing so you can focus on the product. What does your calendar look like this week?",
    "I hear you. But ask yourself, how much time are you spending on marketing that isn't working? We take that off your plate entirely. Even 15 minutes with our team could save you months of guesswork.",
    "No pressure at all! What I'd suggest is this, I'll send you our case studies so you can review on your own time. And if it makes sense, you can book a call whenever you're ready. Sound fair?",
];

const OBJECTION_TRUST = [
    "That's a fair concern, the digital marketing space is full of agencies that overpromise and underdeliver. We get it. That's why we offer a free audit before any commitment, so you can see our thinking before spending a rupee.",
    "Honestly? Be skeptical. Every good agency should have to earn your trust. Here's what I suggest: let us do a free 15-minute audit of your current marketing. No pitch, just honest feedback. Then you decide.",
    "I respect that. Here's what I can tell you, we've been building brands from scratch and scaling them profitably. Our clients don't leave because the results speak for themselves. Want me to walk you through one of our case studies?",
];

// ─── SERVICE DEEP-DIVE SCRIPTS ────────────────────────────────────────────────

const SERVICE_SCRIPTS: Record<string, { pitch: string; upsell: string; quickReplies: string[] }> = {
    "performance-marketing": {
        pitch: "Performance Marketing is where we shine 🎯 We run Meta, Google & TikTok ads that are engineered for profit, not just clicks. Most brands come to us burning money on ads with negative ROAS. Within 90 days, we flip that. We optimize every rupee for actual revenue growth. Have you run paid ads before, or are you starting fresh?",
        upsell: "Since you're interested in ads, I should mention, ads work 2-3x better when your landing page is optimized too. Our CRO & Website team works alongside the ads team to make sure traffic actually converts. Want me to tell you more about how they work together?",
        quickReplies: ["Yes, I've run ads before", "Starting fresh", "What's your typical ROAS?", "Book a Free Audit"],
    },
    "content-marketing": {
        pitch: "Content Marketing is about building an audience that actually buys 💡 We create content strategies, copy, videos, and brand stories that don't just get views, they build emotional connection and drive sales. The brands winning long-term are the ones with great content. Is your brand publishing content right now?",
        upsell: "Great content works even better when it's amplified through social media. We often pair Content Marketing with our Social Media strategy for brands that want to build a community AND drive sales. Want to hear how that combination works?",
        quickReplies: ["We have some content", "Starting from scratch", "Tell me about pricing", "Book a Call"],
    },
    "social-media": {
        pitch: "Social Media Marketing is about more than posting, it's about owning the conversation in your niche 📱 We handle strategy, community management, influencer partnerships, and creative campaigns. We turn your brand's social presence into a revenue channel. Which platform are you most active on right now?",
        upsell: "Here's what most brands miss: social media drives awareness, but performance ads convert it. Brands that combine both see dramatically better results. Want me to explain how our Social + Ads combo works?",
        quickReplies: ["Instagram", "Facebook", "Both", "None yet, starting fresh", "Book a Call"],
    },
    "website-development": {
        pitch: "Your website is your #1 salesperson, it's working 24/7. We build websites that aren't just beautiful, they're conversion machines ⚡ Fast, mobile-perfect, and built to turn visitors into buyers. Bad websites cost brands lakhs in lost revenue every month. What does your current website look like?",
        upsell: "A great website + SEO is an unstoppable combination. Once we build your site the right way, we optimize it to rank on Google, so you get consistent free traffic that converts. Want to hear about our SEO service?",
        quickReplies: ["Show me examples", "I have a website but it's slow", "Building from scratch", "What's the cost?", "Book a Call"],
    },
    "seo": {
        pitch: "SEO is the gift that keeps giving 📈 We build a digital footprint that puts you at the top of Google when your ideal customer is searching. Unlike ads, SEO keeps working even when you're not spending. We handle technical SEO, content, and link building, the full stack. Are you currently ranking for any keywords?",
        upsell: "SEO takes 3-6 months to kick in, so smart brands pair it with Performance Marketing to get immediate traffic while the organic strategy builds. Want to talk about a combined approach?",
        quickReplies: ["We rank for nothing", "We have some rankings", "How long does it take?", "Book a Free SEO Audit"],
    },
};

// ─── KEYWORD MATCHING ENGINE ──────────────────────────────────────────────────

type KeywordMap = {
    patterns: RegExp[];
    handler: (input: string, state: ConversationState) => ScriptResponse;
};

export type ConversationState = {
    stage: "greeting" | "discovery" | "presenting" | "objection" | "closing" | "booking" | "lead_capture";
    serviceInterest: string | null;
    objectionCount: number;
    messageCount: number;
    hasAskedForCall: boolean;
    userName: string | null;
};

const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// ─── MAIN RESPONSE ENGINE ─────────────────────────────────────────────────────

export function getStaticResponse(input: string, state: ConversationState): ScriptResponse {
    const lower = input.toLowerCase().trim();

    // ── Initial greeting ──────────────────────────────────────────────────────
    if (state.messageCount === 0 || /^(hi|hello|hey|sup|yo|hiya|good\s*(morning|afternoon|evening))/.test(lower)) {
        return {
            message: pick(GREETINGS),
            actions: {
                quickReplies: ["I want to grow my brand", "I need more leads", "Running ads but not profitable", "Just exploring"],
            },
        };
    }

    // ── Explicit name extraction ──────────────────────────────────────────────
    const nameMatch = lower.match(/(?:i(?:'m| am)|my name is|call me)\s+([a-z]+)/i);
    if (nameMatch) {
        const name = nameMatch[1].charAt(0).toUpperCase() + nameMatch[1].slice(1);
        return {
            message: `Great to meet you, ${name}! 🤝 So tell me, what's the main thing you're looking to improve with your marketing right now? More traffic, better conversions, or building a brand presence?`,
            actions: {
                quickReplies: ["More traffic & leads", "Better conversions from existing traffic", "Build brand awareness", "All of the above!"],
            },
        };
    }

    // ── BOOKING INTENT ────────────────────────────────────────────────────────
    if (/book|schedul|call|meet|appointment|calendly|talk to (someone|team|you)|free (call|consultation|session|audit)|strategy call/.test(lower)) {
        return {
            message: pick(BOOK_CALL_TRANSITIONS),
            actions: {
                showCalendly: true,
                quickReplies: ["I've booked a call!", "I have more questions first"],
            },
        };
    }

    // ── PRICING / BUDGET OBJECTIONS ───────────────────────────────────────────
    if (/price|cost|how much|expensive|budget|afford|charge|rate|package|fee|rupee|lakh|₹/.test(lower)) {
        return {
            message: pick(OBJECTION_PRICE),
            actions: {
                showCalendly: true,
                quickReplies: ["I've booked a call! 🎉", "I have more questions first"],
            },
        };
    }

    // ── TIME / BUSY OBJECTIONS ────────────────────────────────────────────────
    if (/not now|later|busy|no time|think about|get back|maybe later|not ready|next month|soon/.test(lower)) {
        return {
            message: pick(OBJECTION_TIME),
            actions: {
                quickReplies: ["Okay, book a quick 15-min call", "Send me case studies", "I'll come back later"],
            },
        };
    }

    // ── TRUST / SKEPTICISM OBJECTIONS ────────────────────────────────────────
    if (/trust|proof|results|guarantee|sure|really|work|scam|tried before|didn't work|waste|fake/.test(lower)) {
        return {
            message: pick(OBJECTION_TRUST),
            actions: {
                quickReplies: ["Show me case studies", "Do a free audit", "How are you different?"],
            },
        };
    }

    // ── PERFORMANCE MARKETING ─────────────────────────────────────────────────
    if (/ads|paid|ppc|roas|meta|facebook|google ads|tiktok|instagram ads|performance|spend|campaign/.test(lower)) {
        const script = SERVICE_SCRIPTS["performance-marketing"];
        return {
            message: script.pitch,
            actions: {
                serviceCard: "Performance Marketing",
                quickReplies: script.quickReplies,
            },
        };
    }

    // ── CONTENT MARKETING ─────────────────────────────────────────────────────
    if (/content|blog|video|copy|copywriting|storytell|brand story|ugc|creative/.test(lower)) {
        const script = SERVICE_SCRIPTS["content-marketing"];
        return {
            message: script.pitch,
            actions: {
                serviceCard: "Content Marketing",
                quickReplies: script.quickReplies,
            },
        };
    }

    // ── SOCIAL MEDIA ──────────────────────────────────────────────────────────
    if (/social|instagram|facebook|twitter|linkedin|reels|influencer|community|engagement|followers|tiktok|youtube/.test(lower)) {
        const script = SERVICE_SCRIPTS["social-media"];
        return {
            message: script.pitch,
            actions: {
                serviceCard: "Social Media Marketing",
                quickReplies: script.quickReplies,
            },
        };
    }

    // ── WEBSITE / DEVELOPMENT ─────────────────────────────────────────────────
    if (/website|web|landing page|shopify|ecommerce|e-commerce|cro|conversion|ui|ux|design|development|speed|slow/.test(lower)) {
        const script = SERVICE_SCRIPTS["website-development"];
        return {
            message: script.pitch,
            actions: {
                serviceCard: "Website Development",
                quickReplies: script.quickReplies,
            },
        };
    }

    // ── SEO ───────────────────────────────────────────────────────────────────
    if (/seo|search engine|organic|rank|keyword|google search|traffic|backlink|local seo/.test(lower)) {
        const script = SERVICE_SCRIPTS["seo"];
        return {
            message: script.pitch,
            actions: {
                serviceCard: "Search Engine Optimization",
                quickReplies: script.quickReplies,
            },
        };
    }

    // ── SERVICES OVERVIEW ─────────────────────────────────────────────────────
    if (/service|offer|do you|what (can|do)|help with|solution|package/.test(lower)) {
        return {
            message: "We offer 6 core growth services for D2C and service brands 🚀 Which one jumps out at you most?",
            actions: {
                quickReplies: ["Performance Marketing (Ads)", "Content Marketing", "Social Media", "Website Development", "SEO", "WhatsApp & Custom Automation"],
            },
        };
    }

    // ── CASE STUDIES / RESULTS ────────────────────────────────────────────────
    if (/case stud|example|portfolio|work|client|result|success|testimonial|review/.test(lower)) {
        return {
            message: `Love that you asked 🙌 Our case studies are on the website, check them out at d2cora.com/case-studies. One of my favorites: we took a D2C travel brand from ₹0 to consistent 5L+/month revenue in under a year using a mix of performance ads and content. Want me to walk you through how we'd do something similar for you?`,
            actions: {
                quickReplies: ["Yes, walk me through it", "Book a Free Strategy Call", "I want to see more examples"],
            },
        };
    }

    // ── ECOMMERCE / D2C SPECIFIC ──────────────────────────────────────────────
    if (/d2c|direct.to.consumer|ecommerce|e-commerce|shopify|amazon|product|brand|d2c brand/.test(lower)) {
        return {
            message: "D2C is literally our specialty 🎯 We understand the full funnel, from cold traffic to repeat customers. The brands we work with aren't just running ads; they're building growth machines. What stage is your D2C brand at right now, just launched, growing, or trying to scale profitably?",
            actions: {
                quickReplies: ["Just launched", "Growing but stuck", "Scaling but not profitable", "Ready to 10x"],
            },
        };
    }

    // ── GROWTH / SCALE INTENT ─────────────────────────────────────────────────
    if (/grow|scale|revenue|sales|profit|10x|double|triple|increase|boost|more customers|more leads/.test(lower)) {
        return {
            message: `That's exactly what we do, and we're good at it 💪 ${pick(TRUST_SIGNALS)}\n\nWhat's your current monthly revenue or traffic? Even a rough number helps me tell you what's possible.`,
            actions: {
                quickReplies: ["Under ₹1L/month", "₹1L–₹5L/month", "₹5L–₹20L/month", "₹20L+/month"],
            },
        };
    }

    // ── REVENUE TIER HANDLING ─────────────────────────────────────────────────
    if (/under.*1l|₹0|just started|no revenue|₹50k|beginner|new brand/.test(lower)) {
        return {
            message: "Exciting stage! 🌱 Early-stage brands are our favourite because the growth potential is massive. We've launched brands from zero and gotten them to ₹2-5L/month within 6 months using the right mix of content and performance ads. The key is building the right foundation. Want to see what that looks like for your brand?",
            actions: {
                quickReplies: ["Yes, show me the plan", "Book a Free Call", "What's the minimum budget?"],
            },
        };
    }

    if (/1l.*5l|₹1l|₹2l|₹3l|1 lakh|growing/.test(lower)) {
        return {
            message: "You're in the sweet spot 📈 At this stage, the biggest lever is almost always your ad efficiency + conversion rate. Most brands at ₹1-5L/month are leaving 40-60% of their potential revenue on the table. A proper performance marketing audit + CRO can 2-3x your numbers without increasing spend. Want to see how?",
            actions: {
                quickReplies: ["Yes, do an audit!", "Tell me more about CRO", "Book a Strategy Call"],
            },
        };
    }

    if (/5l.*20l|₹5l|₹10l|₹15l|scaling/.test(lower)) {
        return {
            message: "Now we're talking! 🚀 At ₹5-20L/month, the game is about profitable scaling, not just growth. This means tighter attribution, aggressive A/B testing, and multi-channel diversification. Brands at your stage need a full-stack team. That's exactly what we bring. Let's get on a call and I'll show you exactly where your next ₹10L is coming from.",
            actions: {
                showCalendly: true,
                quickReplies: ["Book a Call Now", "Tell me more first"],
            },
        };
    }

    // ── POSITIVE SIGNALS / INTEREST ───────────────────────────────────────────
    if (/interested|sounds good|tell me more|yes|yeah|sure|absolutely|let's go|i want|i'd like|let me know|go ahead/.test(lower)) {
        if (state.serviceInterest) {
            const serviceKey = state.serviceInterest.toLowerCase().replace(/ /g, "-");
            const script = SERVICE_SCRIPTS[serviceKey];
            if (script) {
                return {
                    message: script.upsell,
                    actions: {
                        quickReplies: ["Yes, tell me about that too", "Let's book a call", "What would this cost?"],
                    },
                };
            }
        }
        return {
            message: `Great! Here's the honest truth: the best next step is a free 15-minute strategy call. We'll audit your current marketing, show you exactly what's holding you back, and give you a custom growth plan, even if you don't work with us. ${pick(CLOSING_URGENCY)}`,
            actions: {
                showCalendly: true,
                quickReplies: ["Book the Call", "I have a few more questions"],
            },
        };
    }

    // ── CONTACT / EMAIL / LEAVE DETAILS ──────────────────────────────────────
    if (/contact|email|reach|whatsapp|phone|number|get in touch|send details|reach out/.test(lower)) {
        return {
            message: "Of course! You can reach us at 📧 hellod2cora@gmail.com or call/WhatsApp us at 📱 +91 9548316900. Or, even better, drop your details right here and I'll make sure the team reaches out to you within 24 hours 👇",
            actions: {
                captureLead: true,
                quickReplies: ["Book a call instead", "I'll email directly"],
            },
        };
    }

    // ── "NOT INTERESTED" / DECLINING ─────────────────────────────────────────
    if (/no thanks|not interested|go away|stop|don't want|no need|bye|goodbye|cya/.test(lower)) {
        return {
            message: "Totally respect that! 🙏 If you ever want to explore what's possible for your brand, I'm always here. Before you go, mind if I ask what's holding you back? Your feedback genuinely helps us improve.",
            actions: {
                quickReplies: ["Not the right time", "Already have an agency", "Too expensive", "Just browsing"],
            },
        };
    }

    // ── HOW IT WORKS / PROCESS ────────────────────────────────────────────────
    if (/how (does it|do you|does this)|process|work with|onboard|start|begin|next step/.test(lower)) {
        return {
            message: `Here's how we work 🛠️\n\n1️⃣ **Free Strategy Call**, We audit your brand and identify gaps\n2️⃣ **Custom Growth Plan**, We build a tailored strategy, not a template\n3️⃣ **Execution**, Our team handles everything end-to-end\n4️⃣ **Weekly Reports**, Full transparency on results\n\nMost clients see measurable results within 30-60 days. Want to kick things off?`,
            actions: {
                quickReplies: ["Book a Free Strategy Call", "How long is the commitment?", "What's the pricing?"],
            },
        };
    }

    // ── LOCATION / WHO YOU ARE ────────────────────────────────────────────────
    if (/where|location|based|india|remote|roorkee|city|country|offshore/.test(lower)) {
        return {
            message: "We're a fully remote team working with brands worldwide 🌍 Our roots are in India, and we've worked with D2C brands from India, the US, UK, and Southeast Asia. Distance is never a barrier, we operate completely async and over video calls. Where are you based?",
            actions: {
                quickReplies: ["India", "US/UK", "Southeast Asia", "Other"],
            },
        };
    }

    // ── DEFAULT FALLBACK, Discovery Push ────────────────────────────────────
    const fallbacks: ScriptResponse[] = [
        {
            message: pick(DISCOVERY_QUESTIONS),
            actions: {
                quickReplies: ["Performance Marketing", "Content & Social", "Website & SEO", "I need everything", "Book a Call"],
            },
        },
        {
            message: `Hmm, I want to make sure I give you the most useful answer 🤔 Can you tell me a bit more about your brand and what you're looking to achieve? That way I can point you in the right direction.`,
            actions: {
                quickReplies: ["I want to grow revenue", "I need more leads", "My ads aren't working", "Book a Strategy Call"],
            },
        },
        {
            message: `That's a good one! Let me be real with you, the best way I can help is to understand your specific situation. ${pick(DISCOVERY_QUESTIONS)}`,
            actions: {
                quickReplies: ["Tell me about your services", "Book a Free Call", "I have a specific question"],
            },
        },
    ];

    return pick(fallbacks);
}

// ─── INITIAL GREETING (for auto-open) ────────────────────────────────────────
export function getInitialGreeting(pathname: string): ScriptResponse {
    let message = pick(GREETINGS);

    if (pathname.includes("services")) {
        message = "Hey! 👋 I see you're checking out our services. I'm Cora, let me help you figure out which one will have the biggest impact on your brand. What's your biggest marketing challenge right now?";
    } else if (pathname.includes("contact")) {
        message = "Hey! You're already on the contact page, you're clearly serious about growing 💪 I'm Cora. Instead of waiting for a form reply, want me to book you a call with our team right now? Takes 30 seconds.";
    } else if (pathname.includes("case-studies")) {
        message = "Great choice checking out our case studies! 👀 I'm Cora. Once you've had a look, I can tell you exactly which results are most relevant to your brand. What industry are you in?";
    } else if (pathname.includes("blog")) {
        message = "Love that you're doing your research! 📚 I'm Cora from d2cora. Once you're done reading, I can give you a personalised breakdown of what strategy would work best for YOUR brand. What are you looking to achieve?";
    }

    return {
        message,
        actions: {
            quickReplies: ["I want to grow my brand", "I need more leads", "Running ads but not profitable", "Just exploring"],
        },
    };
}
