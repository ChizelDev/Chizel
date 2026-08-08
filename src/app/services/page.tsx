"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { serviceCategories } from "@/lib/constants/services";

const cardStyles = [
    {
        bg: "bg-[#3366FF]",
        images: [
            "/assets/services/hand_holding_money-removebg-preview.png",
            "/assets/services/Ideas-removebg-preview.png",
        ],
    },
    {
        bg: "bg-[#FF5722]",
        images: [
            "/assets/services/content_marketing_camera-removebg-preview.png",
            "/assets/services/lights_camrea_action-removebg-preview.png",
        ],
    },
    {
        bg: "bg-[#1a1a2e]",
        images: [
            "/assets/services/mic_social_media__1_-removebg-preview.png",
            "/assets/services/speaker_social_marketing-removebg-preview.png",
        ],
    },
];

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-white pb-20">

            {/* Header Section */}
            <section className="max-w-350 mx-auto px-6 pb-12 pt-40 md:px-12 lg:px-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                     <h1 className="mb-8 text-5xl font-black leading-[0.9] tracking-tighter text-black md:text-7xl lg:text-[90px]">
                        We Don't Sell <span className="text-[#3366FF]">Services</span><br />
                        We Build <span className="text-[#3366FF]">Growth Engines</span>
                    </h1>
                    <p className="mb-16 text-xl font-medium text-gray-600 md:text-2xl">
                        Strategy. Technology. Marketing. Working as one system.
                    </p>
                </motion.div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:gap-12">
                    {serviceCategories.map((service, idx) => {
                        const style = cardStyles[idx] ?? cardStyles[0];
                        return (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 0.6, delay: idx * 0.15 }}
                                className="group flex flex-col"
                            >
                                {/* Card */}
                                <Link
                                    href={`/services/${service.category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                                    className={`relative block w-full ${service.templateImage ? 'aspect-video' : 'aspect-4/3'} overflow-hidden rounded-3xl ${style.bg} cursor-pointer`}
                                >
                                    {/* Template Poster Image */}
                                    {service.templateImage ? (
                                        <Image
                                            src={service.templateImage}
                                            alt={service.category}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <>
                                            {/* Floating service images fallback */}
                                            {style.images.map((src, i) => (
                                                <div
                                                    key={i}
                                                    className="pointer-events-none absolute inset-0"
                                                    style={{
                                                        right: i === 0 ? 0 : 'auto',
                                                        left: i === 1 ? '10%' : 'auto',
                                                    }}
                                                >
                                                    <Image
                                                        src={src}
                                                        alt=""
                                                        fill
                                                        className="object-contain opacity-30 transition-transform duration-700 group-hover:scale-105"
                                                        aria-hidden="true"
                                                    />
                                                </div>
                                            ))}

                                            {/* Text overlay fallback */}
                                            <div className="relative z-10 flex h-full items-end p-8 md:p-10">
                                                <p className="text-2xl font-black leading-tight text-white drop-shadow-lg md:text-3xl">
                                                    {service.quote
                                                        ? service.quote.split(/(\*.*?\*)/g).map((part, i) =>
                                                            part.startsWith('*') && part.endsWith('*')
                                                                ? <span key={i} className="text-yellow-300">{part.slice(1, -1)}</span>
                                                                : <span key={i}>{part}</span>
                                                        )
                                                        : service.category
                                                    }
                                                </p>
                                            </div>
                                        </>
                                    )}

                                    {/* Hover scale overlay */}
                                    <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                                </Link>

                                {/* Below card details */}
                                <div className="mt-6">
                                    <h3 className="mb-4 text-xl font-bold text-gray-900">{service.category}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {service.items.map((item, itemIdx) => (
                                            <span
                                                key={itemIdx}
                                                className="rounded-lg bg-gray-100 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-700"
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-24 md:py-32 bg-[#001A33]">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mx-auto max-w-4xl px-6 text-center"
                >
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-400 mb-6">Ready to Get Started?</p>
                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.05] mb-6">
                        Pick a service. <span className="text-[#3366FF]">Let&apos;s build.</span>
                    </h2>
                    <p className="text-white/60 text-xl mb-12 max-w-2xl mx-auto">
                        Not sure where to start? Book a free strategy call and we&apos;ll map the right growth plan for your brand.
                    </p>
                    <Link
                        href="/contact"
                        className="group inline-flex items-center gap-3 rounded-full bg-[#3366FF] px-10 py-5 text-base font-bold text-white transition-all duration-300 hover:bg-blue-500 hover:scale-105 active:scale-95 shadow-xl shadow-blue-900/30"
                    >
                        Book a Free Strategy Call
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:translate-x-1">
                            <path d="M3 9H15M15 9L9 3M15 9L9 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </Link>
                </motion.div>
            </section>
        </main>
    );
}
