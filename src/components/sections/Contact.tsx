"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NewsletterSignup } from "@/components/ui/NewsletterSignup";

import React from 'react';

export const Contact = React.memo(function Contact() {
    return (
        <section id="contact" className="relative overflow-hidden bg-black px-4 py-24">
            <div className="mx-auto max-w-md space-y-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="font-heading mb-4 text-3xl font-bold uppercase tracking-tighter">Ready to build?</h2>
                    <p className="mb-8 font-light text-gray-400">Let&apos;s turn your idea into a reality.</p>

                    <div className="space-y-4">


                        <Button size="lg" className="w-full rounded-none border border-white transition-all hover:bg-white hover:text-black" asChild>
                            <a href="mailto:hellod2cora@gmail.com">
                                <Mail className="mr-2 h-4 w-4" /> hellod2cora@gmail.com
                            </a>
                        </Button>

                        <p className="pt-2 text-xs uppercase tracking-widest text-gray-500">Typically responds within 24 hours.</p>
                    </div>

                    <div className="mt-12 flex justify-center gap-6 text-sm uppercase tracking-widest text-gray-400">
                        <a href="https://in.linkedin.com/company/d2cora1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border-b border-transparent transition-colors hover:border-white hover:text-white">
                            <Linkedin className="h-4 w-4" />
                            LinkedIn
                        </a>
                        <a href="https://github.com/Rahul-Singh-Bora" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border-b border-transparent transition-colors hover:border-white hover:text-white">
                            <Github className="h-4 w-4" />
                            GitHub
                        </a>
                    </div>
                </motion.div>
            </div>

            <div className="mt-32 pt-20 border-t border-white/10 mx-auto max-w-2xl px-4">
                <NewsletterSignup />
            </div>

            <footer className="mt-24 text-center">
                <div className="mb-4 flex flex-wrap justify-center gap-4 text-xs uppercase tracking-wider text-gray-500">
                    <Link href="/privacy-policy" className="hover:text-white transition-colors">
                        Privacy Policy
                    </Link>
                    <span className="text-gray-700">|</span>
                    <Link href="/terms-and-conditions" className="hover:text-white transition-colors">
                        Terms & Conditions
                    </Link>
                </div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-600">
                    © {new Date().getFullYear()} d2cora. All rights reserved.
                </p>
            </footer>
        </section>
    );
});
