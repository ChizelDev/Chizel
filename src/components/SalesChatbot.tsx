"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, ChevronDown, Calendar, Zap, ArrowRight, RotateCcw, Star } from "lucide-react";
import { InlineWidget } from "react-calendly";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { getInitialGreeting, ConversationState } from "@/lib/salesScript";

// ─── Types ────────────────────────────────────────────────────────────────────

type MessageAction = {
    showCalendly?: boolean;
    captureLead?: boolean;
    serviceCard?: string | null;
    quickReplies?: string[] | null;
};

type Message = {
    id: string;
    role: "user" | "assistant";
    content: string;
    actions?: MessageAction;
};

const SERVICE_ICONS: Record<string, string> = {
    "Performance Marketing": "🎯",
    "Content Marketing": "✍️",
    "Social Media Marketing": "📱",
    "Website Development": "⚡",
    "Search Engine Optimization": "📈",
    "WhatsApp & Custom Automation": "🤖",
};

// ─── Cora Avatar ──────────────────────────────────────────────────────────────
function CoraAvatar({ size = 40, ring = false }: { size?: number; ring?: boolean }) {
    return (
        <div className="relative flex flex-col items-center justify-center" style={{ width: size, height: size }}>
            <div
                className={`relative h-full w-full flex-shrink-0 overflow-hidden rounded-full bg-gray-100 ${ring ? "ring-2 ring-[#1524ca]/30 ring-offset-1" : ""}`}
            >
                <Image
                    src="/cora-avatar-blue.png"
                    alt="Cora"
                    fill
                    className="object-cover object-center"
                    sizes={`${size}px`}
                />
            </div>
            {/* Online dot */}
            <span
                className="absolute border-2 border-white bg-green-500 rounded-full shadow-sm z-10"
                style={{
                    width: Math.max(8, size * 0.22),
                    height: Math.max(8, size * 0.22),
                    bottom: size >= 60 ? 6 : 0,
                    right: 0,
                }}
            />
            {/* Name tag */}
            {size >= 60 && (
                <div className="absolute -bottom-3 z-20 flex items-center justify-center rounded-md border border-gray-100 bg-white px-3 py-[2px] shadow-sm">
                    <span className="text-[13px] font-bold tracking-wide text-[#1524ca]">Cora</span>
                </div>
            )}
        </div>
    );
}

// ─── Typing indicator ─────────────────────────────────────────────────────────
function TypingIndicator() {
    return (
        <div className="flex items-end gap-2 self-start">
            <CoraAvatar size={28} />
            <div className="rounded-2xl rounded-bl-sm bg-gray-100 px-4 py-3 border border-gray-200">
                <div className="flex gap-1.5">
                    {[0, 150, 300].map((delay) => (
                        <div
                            key={delay}
                            className="h-2 w-2 animate-bounce rounded-full bg-[#1524ca]/50"
                            style={{ animationDelay: `${delay}ms` }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function SalesChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const [hasAutoOpened, setHasAutoOpened] = useState(false);
    const [leadFormState, setLeadFormState] = useState<"idle" | "capturing" | "submitted">("idle");
    const [leadData, setLeadData] = useState({ name: "", email: "", phone: "" });
    const [showTooltip, setShowTooltip] = useState(false);
    const [convState, setConvState] = useState<ConversationState>({
        stage: "greeting",
        serviceInterest: null,
        objectionCount: 0,
        messageCount: 0,
        hasAskedForCall: false,
        userName: null,
    });

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const pathname = usePathname();

    // ── Session persistence ───────────────────────────────────────────────────
    useEffect(() => {
        const saved = sessionStorage.getItem("cora_chat_history");
        const savedState = sessionStorage.getItem("cora_conv_state");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (parsed.length > 0) {
                    setMessages(parsed);
                    setHasAutoOpened(true);
                }
            } catch { /* ignore */ }
        }
        if (savedState) {
            try { setConvState(JSON.parse(savedState)); } catch { /* ignore */ }
        }
    }, []);

    useEffect(() => {
        if (messages.length > 0) sessionStorage.setItem("cora_chat_history", JSON.stringify(messages));
    }, [messages]);

    useEffect(() => {
        sessionStorage.setItem("cora_conv_state", JSON.stringify(convState));
    }, [convState]);

    // ── Auto-open after 5s ────────────────────────────────────────────────────
    useEffect(() => {
        if (hasAutoOpened || messages.length > 0) return;

        const tooltipTimer = setTimeout(() => setShowTooltip(true), 3000);
        const openTimer = setTimeout(() => {
            setShowTooltip(false);
            setIsOpen(true);
            setHasAutoOpened(true);

            const greeting = getInitialGreeting(pathname);
            setMessages([{
                id: Date.now().toString(),
                role: "assistant",
                content: greeting.message,
                actions: greeting.actions,
            }]);
            setUnreadCount(1);
        }, 5000);

        return () => { clearTimeout(tooltipTimer); clearTimeout(openTimer); };
    }, [hasAutoOpened, messages.length, pathname]);

    // ── Scroll & focus ────────────────────────────────────────────────────────
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        if (isOpen) setUnreadCount(0);
    }, [messages, isTyping, isOpen]);

    useEffect(() => {
        if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
    }, [isOpen]);

    // ── Send message ──────────────────────────────────────────────────────────
    const handleSend = useCallback(async (text: string) => {
        if (!text.trim() || isTyping) return;

        const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        const newState: ConversationState = { ...convState, messageCount: convState.messageCount + 1 };
        setConvState(newState);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
                    currentPage: pathname,
                    conversationState: newState,
                }),
            });

            const data = await res.json();
            const assistantMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: data.message,
                actions: data.actions,
            };

            setMessages((prev) => [...prev, assistantMsg]);
            if (data.actions?.serviceCard) setConvState((s) => ({ ...s, serviceInterest: data.actions.serviceCard }));
            if (data.actions?.showCalendly) setConvState((s) => ({ ...s, hasAskedForCall: true }));
            if (data.actions?.captureLead && leadFormState === "idle") setLeadFormState("capturing");
            if (!isOpen) setUnreadCount((n) => n + 1);
        } catch {
            setMessages((prev) => [...prev, {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: "Oops! Something went wrong. Reach us at hellod2cora@gmail.com 📧",
                actions: { quickReplies: ["Book a Call", "Try Again"] },
            }]);
        } finally {
            setIsTyping(false);
        }
    }, [messages, convState, isOpen, isTyping, leadFormState, pathname]);

    // ── Lead submission ───────────────────────────────────────────────────────
    const handleLeadSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const userMsg: Message = {
            id: Date.now().toString(),
            role: "user",
            content: `Name: ${leadData.name} | Email: ${leadData.email}${leadData.phone ? ` | Phone: ${leadData.phone}` : ""}`,
        };
        setMessages((prev) => [...prev, userMsg]);
        setLeadFormState("submitted");
        setIsTyping(true);

        try {
            await fetch("/api/chat/lead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...leadData,
                    conversationSummary: messages.map((m) => `${m.role.toUpperCase()}: ${m.content}`).join("\n\n"),
                    currentPage: pathname,
                }),
            });
            setMessages((prev) => [...prev, {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: `Perfect, ${leadData.name}! 🎉 Your details are with the team. Expect a reply within 24 hours. Want to skip the wait and book a call now?`,
                actions: { quickReplies: ["Book a Call Now", "I'll wait for your email"] },
            }]);
        } catch { /* silent */ }
        finally { setIsTyping(false); }
    };

    const resetChat = () => {
        setMessages([]);
        setConvState({ stage: "greeting", serviceInterest: null, objectionCount: 0, messageCount: 0, hasAskedForCall: false, userName: null });
        setLeadFormState("idle");
        setLeadData({ name: "", email: "", phone: "" });
        sessionStorage.removeItem("cora_chat_history");
        sessionStorage.removeItem("cora_conv_state");
    };

    // ─── Render ───────────────────────────────────────────────────────────────
    return (
        <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[9999] flex flex-col items-end gap-3">

            {/* ── Chat Window ──────────────────────────────────────────────── */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.93 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.93 }}
                        transition={{ type: "spring", stiffness: 420, damping: 32 }}
                        className="mb-2 flex h-[620px] max-h-[calc(100dvh-100px)] w-[390px] max-w-[calc(100vw-32px)] flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-[0_24px_80px_rgba(0,0,60,0.18)]"
                    >
                        {/* ── Header ─────────────────────────────────────────── */}
                        <div className="relative flex items-center justify-between overflow-hidden bg-gradient-to-r from-[#1524ca] to-[#0d1899] px-5 py-4">
                            {/* Decorative circles */}
                            <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10" />
                            <div className="pointer-events-none absolute -bottom-8 left-20 h-20 w-20 rounded-full bg-white/5" />

                            <div className="relative flex items-center gap-3">
                                <CoraAvatar size={46} ring />
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-sm font-bold text-white tracking-wide">Cora</h3>
                                        <span className="flex items-center gap-1 rounded-full bg-green-400/20 px-2 py-0.5 text-[10px] font-semibold text-green-300">
                                            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                                            Online
                                        </span>
                                    </div>
                                    <p className="text-[11px] text-blue-200">Growth Expert · d2cora</p>
                                </div>
                            </div>

                            <div className="relative flex items-center gap-1">
                                <button
                                    onClick={resetChat}
                                    title="Clear chat"
                                    className="rounded-full p-2 text-white/50 transition hover:bg-white/15 hover:text-white"
                                >
                                    <RotateCcw className="h-3.5 w-3.5" />
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="rounded-full p-2 text-white/50 transition hover:bg-white/15 hover:text-white"
                                >
                                    <ChevronDown className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {/* ── Messages ───────────────────────────────────────── */}
                        <div className="flex-1 overflow-y-auto bg-gray-50/70 px-4 py-4 [scrollbar-width:thin] [scrollbar-color:rgba(0,0,0,0.1)_transparent]">
                            <div className="flex flex-col gap-4">

                                {/* Cora intro strip */}
                                {messages.length === 0 && (
                                    <div className="mb-2 flex flex-col items-center gap-2 rounded-2xl bg-white border border-gray-100 px-4 py-5 text-center shadow-sm">
                                        <CoraAvatar size={64} ring />
                                        <p className="text-sm font-bold text-gray-800">Hi, I'm Cora 👋</p>
                                        <p className="text-xs text-gray-500 leading-relaxed">Growth Expert at d2cora.<br />Ask me anything about growing your brand!</p>
                                    </div>
                                )}

                                {messages.map((msg, idx) => (
                                    <motion.div
                                        key={msg.id}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.22, delay: idx === messages.length - 1 ? 0.04 : 0 }}
                                        className={`flex flex-col ${msg.role === "user" ? "items-end self-end" : "items-start self-start"} max-w-[88%]`}
                                    >
                                        {msg.role === "assistant" && (
                                            <div className="mb-1.5 flex items-center gap-1.5">
                                                <CoraAvatar size={22} />
                                                <span className="text-[10px] font-semibold text-gray-400">Cora</span>
                                            </div>
                                        )}

                                        {/* Bubble */}
                                        <div
                                            className={`rounded-2xl px-4 py-3 text-[13px] leading-relaxed shadow-sm ${
                                                msg.role === "user"
                                                    ? "rounded-br-sm bg-gradient-to-br from-[#1524ca] to-[#0d1899] text-white"
                                                    : "rounded-bl-sm border border-gray-100 bg-white text-gray-800"
                                            }`}
                                            style={{ whiteSpace: "pre-line" }}
                                        >
                                            {msg.content}
                                        </div>

                                        {/* Actions */}
                                        {msg.role === "assistant" && msg.actions && (
                                            <div className="mt-2.5 flex w-full flex-col gap-2.5">

                                                {/* Service card */}
                                                {msg.actions.serviceCard && (
                                                    <motion.div
                                                        initial={{ opacity: 0, scale: 0.96 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: 0.15 }}
                                                        className="flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50 p-3 shadow-sm"
                                                    >
                                                        <span className="text-2xl">{SERVICE_ICONS[msg.actions.serviceCard] ?? "🚀"}</span>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-xs font-bold text-[#1524ca]">{msg.actions.serviceCard}</p>
                                                            <p className="text-[11px] text-gray-400">d2cora Service</p>
                                                        </div>
                                                        <button
                                                            onClick={() => handleSend(`Tell me more about ${msg.actions?.serviceCard}`)}
                                                            className="flex items-center gap-1 rounded-lg bg-[#1524ca] px-3 py-1.5 text-[11px] font-semibold text-white transition hover:bg-[#0d1899]"
                                                        >
                                                            Learn More <ArrowRight className="h-3 w-3" />
                                                        </button>
                                                    </motion.div>
                                                )}

                                                {/* Calendly */}
                                                {msg.actions.showCalendly && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 8 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.18 }}
                                                        className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg"
                                                        style={{ height: 380 }}
                                                    >
                                                        <div className="flex items-center gap-2 bg-gradient-to-r from-[#1524ca] to-[#0d1899] px-4 py-2.5">
                                                            <Calendar className="h-4 w-4 text-white" />
                                                            <span className="text-xs font-semibold text-white">Book a Free Strategy Call</span>
                                                        </div>
                                                        <InlineWidget
                                                            url="https://calendly.com/d2cora22"
                                                            styles={{ height: "340px", width: "100%" }}
                                                        />
                                                    </motion.div>
                                                )}

                                                {/* Quick replies */}
                                                {msg.actions.quickReplies && (
                                                    <motion.div
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ delay: 0.1 }}
                                                        className="flex flex-wrap gap-1.5"
                                                    >
                                                        {msg.actions.quickReplies.map((reply, i) => (
                                                            <button
                                                                key={i}
                                                                onClick={() => handleSend(reply)}
                                                                className="rounded-full border border-[#1524ca]/25 bg-white px-3.5 py-1.5 text-[12px] font-medium text-[#1524ca] shadow-sm transition hover:border-[#1524ca]/60 hover:bg-blue-50 active:scale-95"
                                                            >
                                                                {reply}
                                                            </button>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </div>
                                        )}
                                    </motion.div>
                                ))}

                                {/* Lead capture form */}
                                {leadFormState === "capturing" && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="self-start w-[88%] rounded-2xl border border-blue-100 bg-blue-50 p-4 shadow-sm"
                                    >
                                        <div className="mb-3 flex items-center gap-2">
                                            <Star className="h-4 w-4 text-[#1524ca]" />
                                            <p className="text-sm font-semibold text-gray-800">Drop your details</p>
                                        </div>
                                        <form onSubmit={handleLeadSubmit} className="flex flex-col gap-2.5">
                                            {[
                                                { key: "name", type: "text", placeholder: "Your Name *", required: true },
                                                { key: "email", type: "email", placeholder: "Email Address *", required: true },
                                                { key: "phone", type: "tel", placeholder: "WhatsApp / Phone (optional)", required: false },
                                            ].map(({ key, type, placeholder, required }) => (
                                                <input
                                                    key={key}
                                                    type={type}
                                                    required={required}
                                                    placeholder={placeholder}
                                                    value={leadData[key as keyof typeof leadData]}
                                                    onChange={(e) => setLeadData({ ...leadData, [key]: e.target.value })}
                                                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-[13px] text-gray-800 placeholder-gray-400 transition focus:border-[#1524ca] focus:outline-none focus:ring-2 focus:ring-[#1524ca]/10"
                                                />
                                            ))}
                                            <button
                                                type="submit"
                                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1524ca] to-[#0d1899] py-2.5 text-[13px] font-bold text-white shadow-md transition hover:shadow-lg active:scale-98"
                                            >
                                                <Zap className="h-4 w-4" /> Send My Details
                                            </button>
                                        </form>
                                    </motion.div>
                                )}

                                {isTyping && <TypingIndicator />}
                                <div ref={messagesEndRef} />
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="h-px w-full bg-gray-100" />

                        {/* ── Input ──────────────────────────────────────────── */}
                        <div className="bg-white px-4 py-3.5">
                            <form
                                onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
                                className="flex items-center gap-2"
                            >
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Message Cora..."
                                    className="flex-1 rounded-2xl border border-gray-200 bg-gray-50 py-3 pl-4 pr-4 text-[13px] text-gray-800 placeholder-gray-400 transition focus:border-[#1524ca] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1524ca]/10"
                                />
                                <motion.button
                                    type="submit"
                                    disabled={!input.trim() || isTyping}
                                    whileTap={{ scale: 0.9 }}
                                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#1524ca] to-[#0d1899] text-white shadow-md transition hover:shadow-lg disabled:opacity-40"
                                >
                                    <Send className="h-4 w-4" />
                                </motion.button>
                            </form>
                            <p className="mt-2 text-center text-[10px] text-gray-400">
                                Cora · d2cora Growth Expert
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Tooltip bubble ─────────────────────────────────────────────── */}
            <AnimatePresence>
                {showTooltip && !isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.85, y: 8 }}
                        className="mb-1 max-w-[220px] rounded-2xl rounded-br-sm border border-gray-200 bg-white px-4 py-3 shadow-xl"
                    >
                        <p className="text-[13px] font-semibold text-gray-800">
                            👋 Hi! Need help growing your brand?
                        </p>
                        <p className="mt-0.5 text-[11px] text-[#1524ca] font-medium">Chat with Cora →</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Floating Button ─────────────────────────────────────────────── */}
            <motion.button
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.93 }}
                onClick={() => { setShowTooltip(false); setIsOpen((v) => !v); }}
                aria-label="Chat with Cora"
                className={`relative flex h-[68px] w-[68px] items-center justify-center rounded-full shadow-2xl transition-all duration-300 ${
                    isOpen
                        ? "bg-[#1524ca] text-white ring-4 ring-[#1524ca]/20"
                        : "chatbot-pulse ring-4 ring-[#1524ca]/20"
                }`}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                        >
                            <X className="h-7 w-7 text-white" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="open"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="h-full w-full"
                        >
                            <CoraAvatar size={68} />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Unread badge */}
                {!isOpen && unreadCount > 0 && (
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-red-500 text-[10px] font-bold text-white shadow-lg"
                    >
                        {unreadCount}
                    </motion.span>
                )}
            </motion.button>
        </div>
    );
}
