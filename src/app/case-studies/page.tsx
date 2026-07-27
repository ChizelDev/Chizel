"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

const caseStudies = [
  {
    slug: "vini-grow-holidays",
    client: "Vini Grow Holidays",
    category: "Travel & Visa Assistance",
    services: ["Performance Marketing", "SEO", "Website Redesign", "AI Search Visibility"],
    headline: "155 WhatsApp leads. 47 qualified leads. Page 1 rankings. In 14 days.",
    description:
      "A local travel and visa assistance agency with zero digital presence, 91 failed campaigns, and no qualified leads. Completely transformed with structured ads, technical SEO, and AI-era search optimization.",
    stats: [
      { value: "155", label: "WhatsApp Conversations" },
      { value: "47", label: "Qualified Leads" },
      { value: "26.9K", label: "People Reached" },
      { value: "₹40", label: "Avg. Cost Per Lead" },
    ],
    logo: "/assets/case-studies/vini-grow/logo.jpg",
    accentColor: "#1d4ed8",
    website: "https://vinigrowholidays.com",
    timeframe: "14 Days",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Hero */}
      <section className="max-w-350 mx-auto px-6 pb-16 pt-36 md:px-12 lg:px-20">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-4xl">
          <span className="mb-5 inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#3366FF]">
            Proof of Work
          </span>
          <h1 className="mt-3 text-5xl font-black leading-[1] tracking-tighter text-black md:text-7xl lg:text-[80px]">
            Case Studies
          </h1>
          <p className="mt-6 max-w-2xl text-xl font-medium text-gray-500">
            We let results do the talking. Every engagement is built around measurable outcomes, not promises.
          </p>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-100" />

      {/* Case Study Cards */}
      <section className="max-w-350 mx-auto px-6 py-20 md:px-12 lg:px-20">
        <div className="grid gap-8 lg:grid-cols-1 xl:max-w-5xl">
          {caseStudies.map((cs, i) => (
            <motion.div
              key={cs.slug}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl">
                  {/* Top accent bar */}
                  <div className="h-1 w-full" style={{ backgroundColor: cs.accentColor }} />

                  <div className="p-8 md:p-12">
                    <div className="flex flex-col gap-10 lg:flex-row lg:items-start">

                      {/* Left: client info */}
                      <div className="flex-1">
                        <div className="mb-6 flex items-center gap-4">
                          <div className="h-14 w-14 overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={cs.logo}
                              alt={`${cs.client} logo`}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">{cs.category}</p>
                            <h2 className="text-xl font-black tracking-tight text-black">{cs.client}</h2>
                          </div>
                        </div>

                        <p className="mb-6 text-2xl font-black leading-tight tracking-tight text-black md:text-3xl">
                          {cs.headline}
                        </p>

                        <p className="mb-8 text-base font-medium leading-relaxed text-gray-500">
                          {cs.description}
                        </p>

                        {/* Service tags */}
                        <div className="mb-8 flex flex-wrap gap-2">
                          {cs.services.map((s) => (
                            <span
                              key={s}
                              className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-600"
                            >
                              {s}
                            </span>
                          ))}
                        </div>

                        <div className="flex flex-wrap items-center gap-4">
                          <Link
                            href={`/case-studies/${cs.slug}`}
                            className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-bold text-white transition-all duration-300 group-hover:bg-[#3366FF]"
                          >
                            Read Case Study
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Link>
                          <a
                            href={cs.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-400 underline-offset-4 transition-colors hover:text-black hover:underline"
                          >
                            {cs.website.replace("https://", "")}
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        </div>
                      </div>

                      {/* Right: stats grid */}
                      <div className="shrink-0 lg:w-72">
                        <div className="mb-4 flex items-center justify-between">
                          <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Key Results</p>
                          <span
                            className="rounded-full px-3 py-1 text-xs font-black uppercase tracking-wider text-white"
                            style={{ backgroundColor: cs.accentColor }}
                          >
                            {cs.timeframe}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {cs.stats.map((stat) => (
                            <div
                              key={stat.label}
                              className="rounded-2xl border border-gray-100 bg-gray-50 p-4"
                            >
                              <p className="text-2xl font-black tracking-tight text-black">{stat.value}</p>
                              <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-gray-400">{stat.label}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </motion.div>
          ))}

          {/* Coming soon placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="relative overflow-hidden rounded-3xl border border-dashed border-gray-200 bg-gray-50/50 p-12 text-center">
              <p className="text-sm font-bold uppercase tracking-widest text-gray-300">More Coming Soon</p>
              <p className="mt-3 text-lg font-semibold text-gray-400">
                We are actively working with new clients. Next case study dropping soon.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-100 bg-[#f8f9fa] py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#3366FF]">Want Results Like These?</p>
          <h2 className="mb-6 text-3xl font-black tracking-tighter text-black md:text-5xl">
            Let&apos;s build your success story.
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 rounded-full bg-black px-8 py-4 text-base font-bold text-white transition-all duration-300 hover:bg-[#3366FF]"
          >
            Start Your Project
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
