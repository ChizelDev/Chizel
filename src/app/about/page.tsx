"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Target, Users, Lightbulb, Award, CheckCircle2, Rocket, Briefcase, Zap, ShieldCheck } from "lucide-react";

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white pb-20">
            {/* Header Section */}
            <section className="max-w-350 mx-auto px-6 pb-12 pt-40 text-center md:px-12 lg:px-20">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    className="mx-auto max-w-5xl"
                >
                    <h1 className="mb-8 text-5xl font-black leading-[0.9] tracking-tighter text-black md:text-7xl lg:text-[80px]">
                        We Build Digital Systems for <span className="text-[#3366FF]">Real Growth</span>
                    </h1>
                    <div className="text-balance mx-auto max-w-4xl space-y-6 text-xl font-medium leading-relaxed text-gray-600 md:text-2xl">
                        <p>
                            <span className="font-bold text-black">d2cora</span> was founded on a simple belief: most businesses don't fail online because of lack of effort. They fail because their digital growth is fragmented, slow, and poorly executed.
                        </p>
                        <div className="my-8 rounded-r-3xl border-l-4 border-[#3366FF] bg-blue-50/50 px-4 py-6 text-left italic text-gray-700 md:px-10">
                            <p className="mb-2">Websites are built without strategy.</p>
                            <p className="mb-2">Marketing runs without conversion thinking.</p>
                            <p>Technology scales without clarity.</p>
                        </div>
                        <p className="text-2xl font-bold text-black">
                            d2cora exists to bring focus, ownership, and execution into digital growth.
                        </p>
                    </div>
                </motion.div>
            </section>

            {/* Meet the Founders */}
            <section className="py-24 md:py-32 bg-[#f8f9fa]">
                <div className="max-w-350 mx-auto px-6 md:px-12 lg:px-20">

                    {/* Section Header */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="mb-20"
                    >
                        <span className="mb-5 inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#3366FF]">
                            The Minds Behind d2cora
                        </span>
                        <h2 className="mt-4 max-w-3xl text-4xl font-black leading-[1.05] tracking-tighter text-black md:text-6xl">
                            Leadership built on vision and craft.
                        </h2>
                        <p className="mt-5 max-w-xl text-lg font-medium text-gray-500">
                            d2cora was not born in a boardroom. It was built from a shared frustration with how fragmented and ineffective digital growth had become for real businesses.
                        </p>
                    </motion.div>

                    {/* Founder Cards */}
                    <div className="grid gap-8 lg:grid-cols-2">

                        {/* Rahul Bora */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-100 transition-shadow hover:shadow-md md:p-10"
                        >
                            {/* Top row: photo + name */}
                            <div className="flex items-start gap-6">
                                <div className="relative shrink-0">
                                    <div className="h-20 w-20 overflow-hidden rounded-2xl shadow-md ring-2 ring-gray-100">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src="/assets/rahul-bora.jpg"
                                            alt="Rahul Bora, Founder of d2cora"
                                            className="h-full w-full object-cover object-top grayscale transition-all duration-500 group-hover:grayscale-0"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-black tracking-tight text-black">Rahul Bora</h3>
                                    <p className="mt-1 text-xs font-bold uppercase tracking-widest text-[#3366FF]">Founder &amp; CEO</p>
                                    <span className="mt-2 inline-block rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-500">
                                        Strategy · Systems · Growth
                                    </span>
                                </div>
                            </div>

                            {/* Bio */}
                            <p className="mt-6 text-base font-medium leading-relaxed text-gray-600">
                                Rahul started d2cora after seeing too many businesses spend money on digital without any real strategy or results. With a deep obsession for systems thinking and execution, he set out to build an agency that treats growth like an engineering problem: methodical, measurable, and unstoppable.
                            </p>

                            {/* Quote */}
                            <div className="mt-6 border-l-2 border-[#3366FF] pl-5">
                                <p className="text-base italic leading-relaxed text-gray-700">
                                    Most businesses don&apos;t fail online because they lack ideas. They fail because no one owns the full picture. d2cora was built to own that picture for every client we work with.
                                </p>
                                <p className="mt-2 text-xs font-bold uppercase tracking-wider text-gray-400">Rahul Bora, Founder</p>
                            </div>
                        </motion.div>

                        {/* Anishka Choudhary */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
                            className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-100 transition-shadow hover:shadow-md md:p-10"
                        >
                            {/* Top row: photo + name */}
                            <div className="flex items-start gap-6">
                                <div className="relative shrink-0">
                                    <div className="h-20 w-20 overflow-hidden rounded-2xl shadow-md ring-2 ring-gray-100">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src="/assets/anishka-choudhary.png"
                                            alt="Anishka Choudhary, Co-Founder of d2cora"
                                            className="h-full w-full object-cover object-top transition-all duration-500"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-black tracking-tight text-black">Anishka Choudhary</h3>
                                    <p className="mt-1 text-xs font-bold uppercase tracking-widest text-[#FF5722]">Co-Founder &amp; Creative Director</p>
                                    <span className="mt-2 inline-block rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-500">
                                        Design · Brand · Experience
                                    </span>
                                </div>
                            </div>

                            {/* Bio */}
                            <p className="mt-6 text-base font-medium leading-relaxed text-gray-600">
                                Anishka brings the creative intelligence to d2cora that transforms strategy into experiences people remember. Her conviction is that great design is not decoration. It is the engine of trust. She ensures every brand d2cora builds feels as premium as it performs.
                            </p>

                            {/* Quote */}
                            <div className="mt-6 border-l-2 border-[#FF5722] pl-5">
                                <p className="text-base italic leading-relaxed text-gray-700">
                                    People make decisions with their eyes before they think with their minds. If your brand does not inspire confidence at first glance, you have already lost. We build brands that win before a word is read.
                                </p>
                                <p className="mt-2 text-xs font-bold uppercase tracking-wider text-gray-400">Anishka Choudhary, Co-Founder</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Origin Story */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                        className="mt-12 grid items-stretch gap-0 overflow-hidden rounded-3xl bg-[#1a1a2e] lg:grid-cols-[1fr_auto]"
                    >
                        <div className="flex flex-col justify-center px-10 py-12 md:px-14">
                            <span className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#3366FF]">How It Started</span>
                            <h3 className="mb-5 text-2xl font-black leading-tight tracking-tight text-white md:text-3xl">
                                Two builders. One mission. Zero compromises.
                            </h3>
                            <p className="max-w-lg text-base font-medium leading-relaxed text-gray-400">
                                Rahul and Anishka didn&apos;t set out to run an agency. They wanted to build a machine that could consistently turn business goals into digital reality, combining systems thinking with creative mastery.
                            </p>
                        </div>
                        <div className="flex items-center justify-center bg-[#3366FF] px-10 py-12 md:min-w-[340px] md:px-14">
                            <div>
                                <p className="text-xl font-black leading-snug tracking-tight text-white md:text-2xl">
                                    Build it right.<br />Make it grow.<br />Never stop improving.
                                </p>
                                <div className="mt-8 flex items-center gap-3">
                                    <div className="flex -space-x-2">
                                        <div className="h-9 w-9 overflow-hidden rounded-full ring-2 ring-[#3366FF]">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src="/assets/rahul-bora.jpg" alt="Rahul Bora" className="h-full w-full object-cover object-top" />
                                        </div>
                                        <div className="h-9 w-9 overflow-hidden rounded-full ring-2 ring-[#3366FF]">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src="/assets/anishka-choudhary.png" alt="Anishka Choudhary" className="h-full w-full object-cover object-top" />
                                        </div>
                                    </div>
                                    <span className="text-sm font-semibold text-white/80">Rahul &amp; Anishka</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </section>

            {/* From Idea to Scale */}
            <section className="max-w-350 mx-auto px-6 py-16 md:px-12 lg:px-20">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeUp}
                    className="grid items-center gap-16 lg:grid-cols-2"
                >
                    <div>
                        <h2 className="mb-8 text-4xl font-black leading-[1.1] tracking-tighter text-black md:text-6xl">
                            From Idea to Scale.<br /><span className="text-[#FF5722]">Under One Roof.</span>
                        </h2>
                        <div className="space-y-6 text-lg font-medium text-gray-600 md:text-xl">
                            <p>We are a digital growth agency specializing in website development, app development, and performance marketing.</p>
                            <p className="font-bold text-black">But more importantly, we build complete digital systems, not isolated services.</p>
                            <p>From strategy and UX to development, SEO, paid marketing, and ongoing maintenance, everything we do is designed around one goal: helping businesses grow faster, smarter, and more predictably.</p>
                        </div>
                    </div>

                    {/* Benefits Card Info-graphic */}
                    <div className="relative overflow-hidden rounded-[40px] bg-[#1a1a2e] p-8 text-white shadow-2xl md:p-12">
                        <div className="absolute right-0 top-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-blue-500 opacity-20 blur-[50px] md:blur-[100px]"></div>
                        <h3 className="mb-8 text-2xl font-bold">This integrated approach allows our clients to:</h3>
                        <div className="relative z-10 space-y-6">
                            {[
                                "Launch faster without hiring a full internal team",
                                "Reduce operational complexity",
                                "Focus on growth instead of managing vendors"
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.2, duration: 0.5 }}
                                    className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/10 p-5 backdrop-blur-sm"
                                >
                                    <CheckCircle2 className="h-8 w-8 shrink-0 text-[#3366FF]" />
                                    <span className="text-lg font-medium">{item}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Who We Work With */}
            <section className="mt-12 bg-gray-50 py-24">
                <div className="max-w-350 mx-auto px-6 md:px-12 lg:px-20">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="mb-16 text-center"
                    >
                        <h2 className="mb-6 text-4xl font-black tracking-tighter text-black md:text-6xl">Who We Work With</h2>
                        <p className="text-xl font-medium text-gray-600">We partner with ambitious teams to drive real results.</p>
                    </motion.div>

                    <div className="grid gap-8 md:grid-cols-3">
                        {[
                            {
                                icon: Target,
                                title: "Local service businesses",
                                desc: "that want consistent leads and visibility",
                                bg: "bg-[#3366FF]",
                                textClass: "text-blue-100"
                            },
                            {
                                icon: Rocket,
                                title: "Startup founders & SaaS builders",
                                desc: "who need to launch fast and scale efficiently",
                                bg: "bg-[#FF5722]",
                                textClass: "text-orange-100"
                            },
                            {
                                icon: Briefcase,
                                title: "D2C & e-commerce brands",
                                desc: "looking to improve conversions and customer acquisition",
                                bg: "bg-[#1a1a2e]",
                                textClass: "text-gray-300"
                            }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: idx * 0.15 }}
                                className={`${item.bg} rounded-4xl group relative overflow-hidden p-8 text-white shadow-xl transition-transform duration-300 hover:-translate-y-2 md:p-10`}
                            >
                                <div className="absolute -right-6 -top-6 transform opacity-10 transition-transform duration-500 group-hover:scale-110">
                                    <item.icon className="h-48 w-48" />
                                </div>
                                <div className="relative z-10 flex h-full flex-col">
                                    <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
                                        <item.icon className="h-8 w-8 text-white" />
                                    </div>
                                    <h3 className="mb-4 text-2xl font-black leading-tight">{item.title}</h3>
                                    <p className={`text-lg font-medium leading-relaxed ${item.textClass}`}>{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="mx-auto mt-16 max-w-3xl rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-sm"
                    >
                        <p className="inline-block border-l-4 border-black pl-6 text-left text-2xl font-bold text-black">
                            No matter the business model, the problem is usually the same: <br className="hidden md:block" />
                            <span className="text-[#FF5722]">growth without structure doesn't scale.</span>
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Our Approach (Infographic Timeline) */}
            <section className="max-w-350 mx-auto px-6 py-24 md:px-12 lg:px-20">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="mb-16 text-center"
                >
                    <h2 className="mb-6 text-4xl font-black tracking-tighter text-black md:text-6xl">Our Approach</h2>
                    <p className="mb-2 text-2xl font-bold text-black">We believe clarity beats complexity.</p>
                    <p className="text-xl font-medium text-gray-500">Every project starts with:</p>
                </motion.div>

                <div className="mx-auto max-w-5xl">
                    <div className="space-y-6">
                        {[
                            { step: "1", title: "Strategy first", desc: "understanding business goals, users, and growth levers", icon: Lightbulb },
                            { step: "2", title: "Design with intent", desc: "clean, modern, conversion-focused experiences", icon: Target },
                            { step: "3", title: "Scalable development", desc: "fast, secure, future-ready technology", icon: Zap },
                            { step: "4", title: "Growth execution", desc: "SEO, performance marketing, and optimization", icon: Rocket },
                            { step: "5", title: "Ongoing ownership", desc: "maintenance, iteration, and improvement", icon: ShieldCheck }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="group flex flex-col items-center gap-6 rounded-3xl border border-gray-100 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md md:flex-row md:items-start md:p-8 md:text-left"
                            >
                                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gray-50 text-2xl font-black text-gray-900 transition-colors duration-300 group-hover:bg-[#3366FF] group-hover:text-white">
                                    {item.step}
                                </div>
                                <div className="flex-1">
                                    <h4 className="mb-2 flex flex-col items-center gap-3 text-2xl font-bold text-black md:flex-row">
                                        {item.title}
                                    </h4>
                                    <p className="text-lg font-medium text-gray-600">{item.desc}</p>
                                </div>
                                <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#3366FF] md:flex">
                                    <item.icon className="h-7 w-7" />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-16 rounded-3xl border border-gray-200 bg-[#f8f9fa] p-8 text-center"
                    >
                        <p className="mb-2 text-2xl font-black text-black">We don't just launch and leave.</p>
                        <p className="text-xl font-medium text-gray-600">We stay, optimize, and grow with our clients.</p>
                    </motion.div>
                </div>
            </section>

            {/* Why d2cora & Vision */}
            <section className="bg-black py-24 text-white">
                <div className="max-w-350 mx-auto px-6 md:px-12 lg:px-20">
                    <div className="grid gap-16 md:grid-cols-2 lg:gap-24">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                        >
                            <h2 className="mb-10 text-4xl font-black tracking-tighter text-white md:text-5xl">Why d2cora</h2>
                            <div className="space-y-4 text-white">
                                {[
                                    "End-to-end digital execution under one roof",
                                    "Business-first thinking, not just technical delivery",
                                    "Speed without sacrificing quality",
                                    "Clear communication and measurable outcomes"
                                ].map((point, idx) => (
                                    <div key={idx} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">
                                        <Award className="mt-0.5 h-6 w-6 shrink-0 text-[#3366FF]" />
                                        <span className="text-lg font-medium">{point}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 border-t border-white/10 pt-8">
                                <p className="text-xl font-bold text-[#FF5722]">
                                    We act like partners, not vendors. Long-term growth requires accountability.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                            transition={{ delay: 0.2 }}
                            className="relative overflow-hidden rounded-[40px] border border-white/5 bg-[#1a1a2e] p-10 md:p-12"
                        >
                            <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-[#3366FF]/20 blur-2xl md:blur-[80px]"></div>
                            <Users className="mb-8 h-12 w-12 text-[#3366FF]" />
                            <h2 className="mb-8 text-4xl font-black tracking-tighter text-white md:text-5xl">Our Vision</h2>
                            <div className="relative z-10 space-y-6 text-lg font-medium text-gray-300">
                                <p className="leading-relaxed">
                                    Our vision is to become a globally trusted digital growth partner for businesses that value speed, clarity, and results.
                                </p>
                                <p className="leading-relaxed">
                                    We're building d2cora as a scalable, systems-driven company, focused on long-term value, not short-term projects.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>


            {/* CTA Section */}
            <section className="py-24 md:py-32">
                <div className="mx-auto max-w-4xl px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="mb-6 block rounded-full bg-blue-50 px-4 py-2 text-sm font-bold uppercase tracking-widest text-blue-600">Our Belief</span>
                        <h2 className="mb-8 text-3xl font-bold leading-tight text-black md:text-5xl">
                            Growth is not about doing more.<br />
                            <span className="text-[#3366FF]">It's about doing the right things, consistently.</span>
                        </h2>
                        <h3 className="mb-12 text-6xl font-black uppercase leading-[0.9] tracking-tighter text-black md:text-8xl">
                            Build smart.<br />Grow fast.
                        </h3>

                        <Link
                            href="/contact"
                            className="group inline-flex items-center gap-3 rounded-full bg-black px-10 py-5 text-lg font-bold text-white shadow-2xl shadow-black/20 transition-all duration-300 hover:scale-[1.03] hover:bg-[#3366FF] active:scale-[0.98]"
                        >
                            Start Your Project
                            <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}