"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

import { serviceCategories } from "@/lib/constants/services";
import { ServiceCategory } from "./services/ServiceCategory";

export function Services() {
    const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

    return (
        <section
            id="services"
            className="relative overflow-hidden bg-[#f4f0e6] pb-20 pt-0"
        >
            {/* Top separator line */}
            <div
                className="bg-black/15 absolute left-0 right-0 top-0 h-0.5"
            />

            {/* Animated marquee text at top */}
            <div className="relative mb-20 overflow-hidden whitespace-nowrap">
                <motion.div
                    className="inline-block"
                    animate={{ x: [0, -1000] }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    <span className="text-[120px] font-light tracking-tight md:text-[200px]">
                        <span className="font-bold text-[#1a1a1a] opacity-100">©</span>
                        <span className="text-[#1a1a1a] opacity-10"> services </span>
                        <span className="font-bold text-[#1a1a1a] opacity-100">©</span>
                        <span className="text-[#1a1a1a] opacity-10"> services </span>
                        <span className="font-bold text-[#1a1a1a] opacity-100">©</span>
                        <span className="text-[#1a1a1a] opacity-10"> services</span>
                    </span>
                </motion.div>

                {/* Bottom line for marquee section */}
                <div
                    className="bg-black/15 absolute bottom-0 left-0 right-0 h-0.5"
                />
            </div>

            <div className="relative z-10 px-6 md:px-16">
                {/* Services Categories */}
                <div className="space-y-0">
                    {serviceCategories.map((category, categoryIndex) => (
                        <ServiceCategory
                            key={category.id}
                            category={category}
                            categoryIndex={categoryIndex}
                            hoveredCategory={hoveredCategory}
                            setHoveredCategory={setHoveredCategory}
                        />
                    ))}
                </div>

                {/* View All Services Button */}
                <div className="mt-16 flex justify-center">
                    <Link
                        href="/services"
                        className="group inline-flex items-center gap-3 border-2 border-black px-8 py-4 font-mono text-sm font-bold uppercase tracking-[0.15em] text-black transition-all duration-300 bg-transparent hover:bg-black hover:text-[#f4f0e6]"
                    >
                        View All Services
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="transition-transform duration-300 group-hover:translate-x-1"
                        >
                            <path
                                d="M3 8H13M13 8L8 3M13 8L8 13"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="square"
                                strokeLinejoin="miter"
                            />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
