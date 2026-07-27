"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import { usePathname } from "next/navigation";

export function Footer() {
    const pathname = usePathname();
    if (pathname?.startsWith('/studio')) return null;

    const currentYear = new Date().getFullYear();

    const products = [
        { name: "PERFORMANCE MARKETING", href: "/services/performance-marketing" },
        { name: "SOCIAL MEDIA MARKETING", href: "/services/social-media-marketing" },
        { name: "CONTENT MARKETING", href: "/services/content-marketing" },
    ];

    const quickLinks = [
        { name: "HOME", href: "/" },
        { name: "ABOUT US", href: "/about" },
        { name: "SERVICES", href: "/services" },
        { name: "OUR WORK", href: "/#projects" },
        { name: "BLOG", href: "/blog" },
        { name: "CONTACT US", href: "/contact" },
    ];



    return (
        <footer className="relative w-full overflow-hidden border-t border-gray-100 bg-white px-6 pb-12 pt-24 md:px-12 lg:px-20">
            <div className="max-w-350 mx-auto">
                <div className="mb-24 flex flex-col justify-between gap-12 lg:flex-row lg:gap-8">

                    {/* Brand Column */}
                    <div className="shrink-0">
                        <Link href="/" className="group flex items-center gap-2">
                            <div className="relative h-24 w-24 md:h-28 md:w-28 xl:h-32 xl:w-32">
                                <Image
                                    src="/assets/d2cora.svg"
                                    alt="d2cora logo"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </Link>
                    </div>

                    {/* Links & Social Container */}
                    <div className="flex flex-col gap-12 pt-4 md:flex-row lg:gap-16 xl:gap-24">

                        {/* Products Column */}
                        <div>
                            <h4 className="mb-6 text-sm font-bold uppercase tracking-[0.15em] text-[#001A33]">Products</h4>
                            <ul className="space-y-3">
                                {products.map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            className="text-sm font-semibold tracking-wide text-[#001A33] transition-colors hover:text-[#3366FF]"
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Quick Links Column */}
                        <div>
                            <h4 className="mb-6 text-sm font-bold uppercase tracking-[0.15em] text-[#001A33]">Quick Links</h4>
                            <ul className="space-y-3">
                                {quickLinks.map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            className="text-sm font-semibold tracking-wide text-[#001A33] transition-colors hover:text-[#3366FF]"
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Address & Social Column */}
                        <div className="flex max-w-sm flex-col items-start">
                            <h4 className="mb-6 text-sm font-bold uppercase tracking-[0.15em] text-[#001A33]">Contact & Info</h4>
                            <div className="mb-6 space-y-4 text-sm font-medium text-[#001A33]/80">
                                <p>Head Office: Khatima, US Nagar, Uttarakhand</p>
                                <p>Registered Office: C/O US Nagar, Uttarakhand 262308, India</p>
                                <p>Udyam Registration No: UDYAM-UK-12-0072212</p>
                            </div>

                            <p className="mb-6 text-sm font-bold uppercase tracking-widest text-[#001A33]">
                                IF IT'S D2C, IT'S D2CORA
                            </p>
                            <div className="flex gap-4">
                                <a
                                    href="https://in.linkedin.com/company/d2cora1"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-9 w-9 items-center justify-center rounded-full border border-blue-100 bg-blue-50/50 text-[#001A33] transition-all duration-300 hover:bg-[#001A33] hover:text-white"
                                >
                                    <Linkedin size={15} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Massive Brand Name */}
                <div className="pointer-events-none relative flex select-none justify-center overflow-hidden py-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="text-center text-[15vw] font-bold leading-[0.8] tracking-tighter text-[#000d1a] opacity-[0.06] lg:text-[18vw]"
                    >
                        D2CORA
                    </motion.h2>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-gray-100 pt-8 md:flex-row">
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-black">
                        © {currentYear} D2CORA. All rights reserved.
                    </p>
                    <div className="flex gap-8">
                        <Link href="/privacy-policy" className="text-sm font-bold uppercase tracking-[0.2em] text-black transition-colors hover:text-[#3366FF]">Privacy Policy</Link>
                        <Link href="/terms-and-conditions" className="text-sm font-bold uppercase tracking-[0.2em] text-black transition-colors hover:text-[#3366FF]">Terms & Conditions</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
