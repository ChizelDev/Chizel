"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function TrustSignal() {
    return (
        <section
            className="relative z-10 w-full min-h-screen overflow-hidden border-b border-black/5 bg-[#86c6a6] py-16 md:py-24"
        >
            {/* Subtle Grain Overlay — desktop only */}
            <div
                className="pointer-events-none absolute inset-0 hidden opacity-[0.3] lg:block"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    mixBlendMode: "overlay",
                }}
            />

            <div className="max-w-350 relative z-10 mx-auto flex flex-col items-center justify-between gap-12 px-4 md:px-12 lg:flex-row lg:gap-16 lg:px-20">

                {/* Text Section */}
                <div className="flex w-full shrink-0 flex-col justify-start space-y-6 pt-4 lg:w-[40%] lg:space-y-8 lg:pt-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="font-heading text-3xl font-bold leading-snug tracking-tight text-black md:text-4xl lg:text-5xl">
                            Trusted by founders and business owners who value ROI over hype.
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="border-l-4 border-black pl-6"
                    >
                        <p className="text-lg font-medium leading-relaxed text-black/80 md:text-xl">
                            From local service businesses to scaling SaaS platforms, we partner with teams that demand predictable growth and clear execution.
                        </p>
                    </motion.div>
                </div>

                {/* Meta Ads Results Screenshot */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="w-full lg:w-[55%]"
                >
                    {/* 14 Days label — bold, high contrast */}
                    <div className="mb-4 flex items-center gap-3">
                        <span className="inline-block h-[4px] w-6 bg-black" />
                        <p className="text-sm font-black uppercase tracking-[0.18em] text-black">
                            14 Days Results
                        </p>
                    </div>
                    <div className="overflow-hidden rounded-3xl shadow-2xl">
                        <Image
                            src="/assets/meta-ads-results.png"
                            alt="Real Meta Ads campaign results achieved within 14 days"
                            width={1024}
                            height={700}
                            className="h-auto w-full"
                            priority
                        />
                    </div>

                </motion.div>

            </div>

            {/* CTA after results proof — mirrors marketingrizzz "Book A Free Consultation" after testimonials */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative z-10 mt-16 flex justify-center"
            >
                <a
                    href="/contact"
                    className="group inline-flex items-center gap-3 rounded-full bg-black px-8 py-4 text-sm font-bold text-white shadow-lg shadow-black/10 transition-all duration-300 hover:bg-neutral-800 hover:scale-105 active:scale-95"
                >
                    Book A Free Consultation
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:translate-x-1">
                        <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </a>
            </motion.div>

        </section>
    );
}
