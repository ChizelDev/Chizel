"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "How will digital marketing help grow my business?",
    answer: "Digital marketing increases your brand's visibility and reach by targeting the right audience through tailored channels. By implementing data-driven strategies across search engines, social media, and paid ads, we help you generate high-quality leads and drive sustainable sales growth."
  },
  {
    question: "How long does it take to see results?",
    answer: "The timeline varies by strategy. Paid advertising (PPC) can deliver immediate traffic and leads within days. Organic growth, such as SEO and content marketing, typically requires 3 to 6 months to build momentum and deliver long-lasting, compounding results."
  },
  {
    question: "What makes your agency different from other digital marketing agencies?",
    answer: "We move beyond just 'running ads.' Our strategy-first approach involves a deep analysis of your market and competitors to make data-driven decisions. We focus on measurable ROI and sustainable long-term growth, ensuring every dollar spent contributes to your bottom line."
  },
  {
    question: "How do you measure the success of a campaign?",
    answer: "We define success through clear, measurable KPIs tailored to your goals. This includes tracking lead generation, conversion rates, organic traffic growth, and overall Return on Investment (ROI). We provide transparent reports so you always know exactly how your campaigns are performing."
  },
  {
    question: "How much do your services cost?",
    answer: "Our pricing is flexible and customized to your specific needs, goals, and budget. We don't believe in one-size-fits-all packages. Instead, we propose a strategy that maximizes value for your investment, ensuring you get the best possible outcome for your business."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative overflow-hidden bg-black py-24">
      <div className="container relative z-10 mx-auto px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-3xl"
        >
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-6xl">
            Frequently Asked <span className="text-white/40">Questions</span>
          </h2>
          <p className="text-lg text-white/60">
            Everything you need to know about our process and how we help businesses scale through digital excellence.
          </p>
        </motion.div>

        <div className="max-w-4xl">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-4"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className={`w-full rounded-2xl border p-6 text-left transition-all duration-300 md:p-8 ${
                  openIndex === index
                    ? "border-white/20 bg-white/5"
                    : "border-white/10 bg-transparent hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xl font-medium text-white/90 md:text-2xl">
                    {faq.question}
                  </span>
                  <div className={`shrink-0 transition-transform duration-300 ${openIndex === index ? "rotate-180 text-white" : "text-white/40"}`}>
                    {openIndex === index ? <Minus size={24} /> : <Plus size={24} />}
                  </div>
                </div>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 text-lg leading-relaxed text-white/60">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner at bottom of FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-20"
        >
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-10 md:p-16 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/40 mb-4">Still have questions?</p>
            <h3 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
              Let&apos;s talk about your growth goals.
            </h3>
            <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
              Get a free 30-minute strategy session. No pitch, just clarity on what will move the needle for your business.
            </p>
            <a
              href="/contact"
              className="group inline-flex items-center justify-center gap-3 border-2 px-8 py-4 font-mono text-sm font-bold uppercase tracking-[0.15em] transition-all duration-300 bg-transparent border-white text-white hover:bg-white hover:text-[#02000a] w-full max-w-sm md:w-auto md:max-w-none mx-auto"
            >
              Book A Call
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:translate-x-1">
                <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"/>
              </svg>
            </a>
          </div>
        </motion.div>

      </div>

      {/* Background Decorative Elements */}
      <div className="pointer-events-none absolute -right-1/4 top-1/4 hidden h-96 w-96 rounded-full bg-white/5 blur-[100px] md:block" />
      <div className="pointer-events-none absolute -left-1/4 bottom-0 hidden h-96 w-96 rounded-full bg-white/5 blur-[100px] md:block" />
    </section>
  );
}
