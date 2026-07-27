"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export function TrustSignal() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 80%", "start 20%"]
    });

    const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <section
            ref={containerRef}
            className="relative z-10 w-full min-h-screen overflow-hidden border-b border-black/5 py-16 md:py-24"
            style={{ backgroundColor: "#FDFBF7" }}
        >
            {/* Mint green overlay — GPU composited, zero repaint cost */}
            <motion.div
                className="pointer-events-none absolute inset-0 z-0"
                style={{ backgroundColor: "#86c6a6", opacity: overlayOpacity, willChange: "opacity" }}
            />
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
                        <h2 className="font-heading text-3xl font-bold leading-snug tracking-tight text-neutral-900 md:text-4xl lg:text-5xl">
                            Trusted by founders and business owners who value ROI over hype.
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="border-l-2 border-orange-500 pl-6"
                    >
                        <p className="text-lg font-light leading-relaxed text-neutral-600 md:text-xl">
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
                        <span className="inline-block h-[3px] w-6 rounded-full bg-orange-500" />
                        <p className="text-sm font-black uppercase tracking-[0.18em] text-neutral-800">
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
        </section>
    );
}
