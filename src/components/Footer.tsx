"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Linkedin, Instagram } from "lucide-react";
import { usePathname } from "next/navigation";

export function Footer() {
    const pathname = usePathname();
    if (pathname?.startsWith('/studio')) return null;

    const currentYear = new Date().getFullYear();

    const services = [
        { name: "PERFORMANCE MARKETING", href: "/services/performance-marketing" },
        { name: "CONTENT MARKETING", href: "/services/content-marketing" },
        { name: "SOCIAL MEDIA MARKETING", href: "/services/social-media-marketing" },
        { name: "WEBSITE DEVELOPMENT", href: "/services/website-development" },
        { name: "SEARCH ENGINE OPTIMIZATION", href: "/services/search-engine-optimization" },
        { name: "WHATSAPP & CUSTOM AUTOMATION", href: "/services/whatsapp-custom-automation" },
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

                {/* Footer CTA Block */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-24 overflow-hidden rounded-3xl bg-[#001A33] p-10 md:p-16"
                >
                    <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-400 mb-3">Let&apos;s Work Together</p>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1]">
                                Ready to scale <span className="text-[#3366FF]">your brand?</span>
                            </h2>
                            <p className="mt-4 text-white/60 text-base max-w-md">
                                Book a free 30-min strategy session. No commitment, just clarity.
                            </p>
                        </div>
                        <Link
                            href="/contact"
                            className="group shrink-0 inline-flex items-center justify-center gap-3 border-2 px-8 py-4 font-mono text-sm font-bold uppercase tracking-[0.15em] transition-all duration-300 bg-transparent border-white text-white hover:bg-white hover:text-[#001A33] w-full sm:w-auto"
                        >
                            Book A Call
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:translate-x-1">
                                <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"/>
                            </svg>
                        </Link>
                    </div>
                </motion.div>

                <div className="mb-24 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
                    
                    {/* Brand & Social Column */}
                    <div className="flex flex-col items-start gap-8 lg:col-span-4">
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
                        
                        {/* Social Links */}
                        <div className="flex gap-4">
                            <a
                                href="https://in.linkedin.com/company/d2cora1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-100 bg-blue-50/50 text-[#001A33] transition-all duration-300 hover:bg-[#001A33] hover:text-white"
                            >
                                <Linkedin size={16} />
                            </a>
                            <a
                                href="https://www.instagram.com/d2cora.media/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-100 bg-blue-50/50 text-[#001A33] transition-all duration-300 hover:bg-[#001A33] hover:text-white"
                            >
                                <Instagram size={16} />
                            </a>
                            <a
                                href="https://x.com/Rahul___Bora"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-100 bg-blue-50/50 text-[#001A33] transition-all duration-300 hover:bg-[#001A33] hover:text-white"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                </svg>
                            </a>
                            <a
                                href="https://www.reddit.com/user/No-Lawfulness-7573/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-100 bg-blue-50/50 text-[#001A33] transition-all duration-300 hover:bg-[#001A33] hover:text-white"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-2.465 3.928a.426.426 0 0 0-.427.428c0 .245.753.939 2.152.939 1.392 0 2.122-.682 2.151-.91a.426.426 0 0 0-.427-.428c-.242 0-.832.486-1.724.486-.88 0-1.472-.47-1.725-.515z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                    
                    {/* Services Column */}
                    <div className="lg:col-span-3">
                        <h4 className="mb-6 text-sm font-bold uppercase tracking-[0.15em] text-[#001A33]">Services</h4>
                        <ul className="space-y-3">
                            {services.map((item) => (
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
                    <div className="lg:col-span-2">
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

                    {/* Address Column */}
                    <div className="flex flex-col items-start lg:col-span-3">
                        <h4 className="mb-6 text-sm font-bold uppercase tracking-[0.15em] text-[#001A33]">Contact & Info</h4>
                        <div className="space-y-4 text-sm font-medium text-[#001A33]/80">
                            <p>Head Office: Khatima, US Nagar, Uttarakhand</p>
                            <p>Registered Office: C/O US Nagar, Uttarakhand 262308, India</p>
                            <p>Udyam Registration No: UDYAM-UK-12-0100941</p>
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
