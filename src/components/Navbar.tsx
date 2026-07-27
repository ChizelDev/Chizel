"use client";

import Image from "next/image";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

import React, { useCallback, useMemo } from 'react';
import { usePathname } from 'next/navigation';

export const Navbar = React.memo(function Navbar() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isDarkBackground, setIsDarkBackground] = useState(false);

    if (pathname?.startsWith('/studio')) return null;

    useEffect(() => {
        const detectBackgroundBrightness = () => {
            setScrolled(window.scrollY > 50);

            // Get the element at the navbar position (center of viewport, top area)
            const navbarHeight = 100; // Approximate navbar area
            const centerX = window.innerWidth / 2;
            const checkY = navbarHeight; // Check just below the navbar

            // Get the element at that position
            const element = document.elementFromPoint(centerX, checkY);

            if (element) {
                // Get computed background color
                let currentElement: Element | null = element;
                let backgroundColor = 'transparent';

                // Traverse up the DOM tree to find a non-transparent background
                while (currentElement && currentElement !== document.body) {
                    const style = window.getComputedStyle(currentElement);
                    const bgColor = style.backgroundColor;

                    if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
                        backgroundColor = bgColor;
                        break;
                    }
                    currentElement = currentElement.parentElement;
                }

                // Parse RGB values and calculate brightness
                const rgbMatch = backgroundColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
                if (rgbMatch) {
                    const r = parseInt(rgbMatch[1]);
                    const g = parseInt(rgbMatch[2]);
                    const b = parseInt(rgbMatch[3]);

                    // Calculate perceived brightness (YIQ formula)
                    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

                    // If brightness is above 128 (out of 255), it's a light background
                    setIsDarkBackground(brightness < 128);
                } else {
                    // Default to dark if we can't determine
                    setIsDarkBackground(true);
                }
            }
        };

        window.addEventListener("scroll", detectBackgroundBrightness);
        // Add a small delay on mount to ensure DOM is ready
        const timer = setTimeout(detectBackgroundBrightness, 100);

        return () => {
            window.removeEventListener("scroll", detectBackgroundBrightness);
            clearTimeout(timer);
        };
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [mobileMenuOpen]);

    const navLinks = useMemo(() => [
        { href: "/", label: "Home" },
        { href: "/about", label: "About Us" },
        { href: "/services", label: "Services" },
        { href: "/case-studies", label: "Our Work" },
        { href: "/blog", label: "Blog" },
        { href: "/contact", label: "Contact us" },
    ], []);

    const handleLinkClick = useCallback(() => {
        setMobileMenuOpen(false);
    }, []);

    return (
        <>
            {/* Mobile Navbar - Simple flat design */}
            <div className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 md:hidden ${scrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'}`}>
                <div className="flex h-16 items-center justify-between px-4">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="z-50 flex items-center transition-opacity hover:opacity-90"
                        onClick={handleLinkClick}
                    >
                        <Image
                            src="/assets/d2cora full.svg"
                            alt="d2cora"
                            width={110}
                            height={110}
                            className="cursor-pointer"
                            priority
                        />
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="z-50 text-white/70 transition-colors hover:text-white"
                        aria-label="Menu"
                        aria-expanded={mobileMenuOpen}
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {mobileMenuOpen ? (
                                <path d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Desktop Navbar - Seamless Full Width */}
            <div className="fixed left-0 right-0 top-0 z-50 hidden w-full md:block">
                <motion.nav
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    className={`relative w-full overflow-hidden px-4 transition-all duration-500 lg:px-8 ${!scrolled
                        ? "bg-transparent"
                        : isDarkBackground
                            ? "bg-black/60 backdrop-blur-2xl"
                            : "bg-white/60 backdrop-blur-2xl"
                        }`}
                    style={
                        scrolled
                            ? {
                                backdropFilter: "blur(20px) saturate(180%)",
                                WebkitBackdropFilter: "blur(20px) saturate(180%)",
                            }
                            : {}
                    }
                >
                    {/* Grain texture overlay */}
                    <div
                        className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${scrolled ? "opacity-10" : "opacity-0"
                            }`}
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                            backgroundSize: '100px 100px',
                            mixBlendMode: 'overlay',
                        }}
                    />
                    <div className="mx-auto relative z-10 flex h-16 max-w-7xl items-center lg:h-20">

                        {/* Left — d2cora Logo */}
                        <div className="flex-1 flex items-center">
                            <Link href="/">
                                <Image
                                    src="/assets/d2cora full.svg"
                                    alt="d2cora"
                                    width={130}
                                    height={130}
                                    className="rounded-full cursor-pointer hover:opacity-90 transition-opacity"
                                    priority
                                />
                            </Link>
                        </div>

                        {/* Centre — Navigation links */}
                        <div className="hidden md:flex items-center space-x-4 lg:space-x-10">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`text-xs font-normal transition-colors duration-300 md:text-sm ${isDarkBackground
                                        ? "text-white/80 hover:text-white"
                                        : "text-black/80 hover:text-black"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        {/* Right — WhatsApp + CTA */}
                        <div className="flex-1 hidden items-center justify-end gap-3 md:flex lg:gap-4">
                            {/* WhatsApp Icon */}
                            <a
                                href="https://wa.me/919548316900"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-green-500 text-white transition-all duration-300 hover:bg-green-600 md:h-10 md:w-10"
                                aria-label="WhatsApp"
                            >
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                            </a>
                            {/* CTA Button */}
                            <Link
                                href="/contact"
                                className={`flex items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-normal backdrop-blur-sm transition-all duration-300 md:px-4 md:py-2.5 md:text-sm lg:gap-2 lg:px-5 ${isDarkBackground
                                    ? "border-white/30 bg-white/10 text-white hover:bg-white hover:text-black"
                                    : "border-black/30 bg-black/10 text-black hover:bg-black hover:text-white"
                                    }`}
                            >
                                <span>Get Started</span>
                                <svg className="hidden h-4 w-4 lg:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </motion.nav>
            </div>

            {/* Mobile Menu Sidebar */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
                            onClick={() => setMobileMenuOpen(false)}
                        />

                        {/* Sidebar Panel */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="w-70 fixed bottom-0 right-0 top-0 z-50 border-l border-white/10 bg-black/95 backdrop-blur-xl md:hidden"
                        >
                            <div className="flex h-full flex-col px-6 pt-24 relative">
                                {/* Close Menu Button */}
                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="absolute right-6 top-6 text-white/70 p-2 transition-colors hover:text-white"
                                    aria-label="Close menu"
                                >
                                    <svg
                                        className="h-6 w-6"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>

                                {/* Navigation Links */}
                                <nav className="flex flex-col gap-2">
                                    {navLinks.map((link, index) => (
                                        <motion.div
                                            key={link.href}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <Link
                                                href={link.href}
                                                onClick={handleLinkClick}
                                                className="block rounded-lg px-4 py-3 font-normal text-white/80 transition-all duration-300 hover:bg-white/5 hover:text-white"
                                            >
                                                {link.label}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </nav>

                                {/* WhatsApp & CTA Buttons */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="mt-8 flex flex-col gap-3"
                                >
                                    <a
                                        href="https://wa.me/919548316900"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex w-full items-center justify-center gap-2 rounded-full bg-green-500 px-6 py-3 text-center text-sm font-normal text-white transition-all duration-300 hover:bg-green-600"
                                    >
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                        </svg>
                                        WhatsApp Us
                                    </a>
                                    <Link
                                        href="/contact"
                                        onClick={handleLinkClick}
                                        className="flex w-full items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 text-center text-sm font-normal text-white transition-all duration-300 hover:bg-white hover:text-black"
                                    >
                                        <span>Get Started</span>
                                        <span className="text-xs opacity-70">• its free</span>
                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
});
