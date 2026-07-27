"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  TrendingUp,
  Globe,
  Search,
  Bot,
  LayoutTemplate,
  FileText,
  Target,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const stats = [
  { value: "155", label: "WhatsApp Conversations", sub: "₹10.30 – ₹13.31 per conversation" },
  { value: "47", label: "Qualified Leads", sub: "₹39.79 – ₹40.20 cost per lead" },
  { value: "26.9K", label: "People Reached", sub: "Unique reach in 14 days" },
  { value: "45.2K", label: "Total Impressions", sub: "Average CPM ₹50.62" },
  { value: "₹2.3K+", label: "Total Ad Spend", sub: "Maximum efficiency, minimum waste" },
  { value: "Page 1", label: "Google Ranking", sub: "Targeted local search terms" },
];

const challenges = [
  "91 campaigns had been killed early. Average run time of just 1 to 2 days",
  "Zero qualified leads and zero office walk-ins from any previous digital effort",
  "No strategy, no structure, and no consistency in ad execution",
  "Website was not optimised for search. Zero SEO foundation",
  "Completely absent from AI search tools like ChatGPT and Google AI Overviews",
  "No technical files: missing llms.txt, robots.txt, and sitemap.xml",
];

const whatWeDid = [
  {
    icon: Target,
    title: "Performance Marketing Overhaul",
    desc: "We rebuilt the entire Meta Ads account from scratch. Structured campaigns by objective: lead generation, messaging conversations (WhatsApp), and reach. Removed all vanity metrics and focused budgets only on campaigns that tied directly to business outcomes.",
  },
  {
    icon: LayoutTemplate,
    title: "Full Website Redesign",
    desc: "The existing website had no hierarchy, no CTAs, and no trust signals. We redesigned the complete layout with conversion in mind: clear service pages, local trust elements, prominent contact options, and fast load times.",
  },
  {
    icon: Search,
    title: "Technical SEO Foundation",
    desc: "Built the complete SEO infrastructure from ground up. Keyword research for high-intent travel and visa queries. On-page optimisation across all service pages. Internal linking structure and schema markup added. Google Search Console and Analytics properly configured.",
  },
  {
    icon: Bot,
    title: "AI Search Visibility (LLM Optimisation)",
    desc: "To appear in AI-powered search tools like ChatGPT, Perplexity, and Google AI Overviews, we implemented an llms.txt file that structures business information for AI crawlers. Combined with structured data markup, Vini Grow Holidays is now discoverable in AI search responses.",
  },
  {
    icon: Globe,
    title: "Technical Files: robots.txt & sitemap.xml",
    desc: "Created a comprehensive robots.txt to guide search crawlers efficiently, and a dynamic sitemap.xml to ensure all pages are indexed correctly and quickly. These foundational files are often overlooked but critical for long-term SEO and AI visibility.",
  },
  {
    icon: FileText,
    title: "SEO Blog Content Strategy",
    desc: "Wrote and published targeted blog articles around high-intent travel and visa queries: topics like 'how to apply for a tourist visa from India', 'best international travel packages from [city]', and similar long-tail terms. Multiple blogs are now ranking on Page 1.",
  },
];

const blogTopics = [
  "How to Apply for a Schengen Visa from India: Step by Step Guide",
  "Best International Tour Packages from Jaipur Under ₹1 Lakh",
  "Dubai Visit Visa: Complete Requirements and Processing Time",
  "Thailand Visa on Arrival for Indian Passport Holders 2025",
  "How to Get a UK Tourist Visa: Documents and Process Explained",
];

export default function ViniGrowCaseStudy() {
  return (
    <main className="min-h-screen bg-white">

      {/* Back nav */}
      <div className="max-w-350 mx-auto px-6 pt-28 md:px-12 lg:px-20">
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 transition-colors hover:text-black"
        >
          <ArrowLeft className="h-4 w-4" />
          All Case Studies
        </Link>
      </div>

      {/* Hero */}
      <section className="max-w-350 mx-auto px-6 py-14 md:px-12 lg:px-20">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          {/* Client meta row */}
          <div className="mb-8 flex flex-wrap items-center gap-4">
            <div className="h-16 w-16 overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
              <Image
                src="/assets/case-studies/vini-grow/logo.jpg"
                alt="Vini Grow Holidays logo"
                width={64}
                height={64}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Travel & Visa Assistance Agency</p>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black tracking-tight text-black">Vini Grow Holidays</h1>
                <a
                  href="https://vinigrowholidays.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-500 transition-colors hover:border-[#1d4ed8] hover:text-[#1d4ed8]"
                >
                  vinigrowholidays.com
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
            <div className="ml-auto flex flex-wrap gap-2">
              {["Performance Marketing", "SEO", "Website Redesign", "AI Search"].map((s) => (
                <span key={s} className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-500">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <h2 className="mb-6 text-4xl font-black leading-[1.05] tracking-tighter text-black md:text-6xl lg:text-[64px]">
            From 91 failed campaigns<br className="hidden md:block" /> and zero leads, to{" "}
            <span className="text-[#1d4ed8]">Page 1 rankings</span> and{" "}
            <span className="text-[#1d4ed8]">47 qualified leads</span>{" "}
            in 14 days.
          </h2>
          <p className="max-w-3xl text-xl font-medium leading-relaxed text-gray-500">
            A complete digital transformation for a travel and visa assistance agency that had tried digital marketing before and failed. We rebuilt everything from the ground up: ads, website, SEO, and AI search visibility.
          </p>
        </motion.div>
      </section>

      {/* Stats strip */}
      <section className="bg-[#1a1a2e] py-16">
        <div className="max-w-350 mx-auto px-6 md:px-12 lg:px-20">
          <p className="mb-10 text-xs font-bold uppercase tracking-[0.2em] text-[#3366FF]">Results, First 14 Days</p>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="rounded-2xl border border-white/5 bg-white/5 p-5"
              >
                <p className="text-3xl font-black tracking-tight text-white">{s.value}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wide text-gray-400">{s.label}</p>
                <p className="mt-2 text-xs font-medium leading-snug text-gray-500">{s.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="max-w-350 mx-auto px-6 py-20 md:px-12 lg:px-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="grid gap-16 lg:grid-cols-2"
        >
          <div>
            <span className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.2em] text-gray-400">The Situation</span>
            <h2 className="mb-6 text-3xl font-black leading-tight tracking-tighter text-black md:text-4xl">
              A business with potential, held back by poor execution.
            </h2>
            <p className="mb-8 text-lg font-medium leading-relaxed text-gray-500">
              Vini Grow Holidays had been trying digital marketing independently. The result was 91 campaigns that were paused or killed within 1 to 2 days. No leads. No walk-ins. No online presence. No SEO. When they came to d2cora, the problem was clear: it was never a budget problem. It was a strategy and structure problem.
            </p>
            <div className="space-y-3">
              {challenges.map((c) => (
                <div key={c} className="flex items-start gap-3">
                  <div className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-red-50 flex items-center justify-center">
                    <span className="text-xs text-red-500 font-black">✕</span>
                  </div>
                  <p className="text-base font-medium text-gray-600">{c}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Before/After image */}
          <div>
            <span className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Before vs After</span>
            <div className="overflow-hidden rounded-3xl border border-gray-100 shadow-lg">
              <Image
                src="/assets/case-studies/vini-grow/before-after.png"
                alt="Vini Grow Holidays — Before and After d2cora: 14 Days Real Results"
                width={1200}
                height={800}
                className="h-auto w-full"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* What We Did */}
      <section className="bg-[#f8f9fa] py-20">
        <div className="max-w-350 mx-auto px-6 md:px-12 lg:px-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-14"
          >
            <span className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#3366FF]">Our Approach</span>
            <h2 className="text-3xl font-black leading-tight tracking-tighter text-black md:text-5xl">
              Six systems. Built in parallel. Launched in 14 days.
            </h2>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {whatWeDid.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-100"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#3366FF]/8 text-[#3366FF]">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-lg font-black tracking-tight text-black">{item.title}</h3>
                <p className="text-sm font-medium leading-relaxed text-gray-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Infographic */}
      <section className="max-w-350 mx-auto px-6 py-20 md:px-12 lg:px-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <span className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#3366FF]">Performance Results</span>
          <h2 className="mb-10 text-3xl font-black leading-tight tracking-tighter text-black md:text-4xl">
            14 Days. Real business numbers.
          </h2>
          <div className="overflow-hidden rounded-3xl border border-gray-100 shadow-lg">
            <Image
              src="/assets/case-studies/vini-grow/results-infographic.jpg"
              alt="Vini Grow Holidays 14 Days Results — d2cora Performance Marketing"
              width={1200}
              height={800}
              className="h-auto w-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Live Meta Dashboard Proof */}
      <section className="bg-[#f8f9fa] py-20">
        <div className="max-w-350 mx-auto px-6 md:px-12 lg:px-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <span className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Proof</span>
            <h2 className="mb-3 text-3xl font-black leading-tight tracking-tighter text-black md:text-4xl">
              Live Meta Ads Manager. Not a mock-up.
            </h2>
            <p className="mb-10 max-w-2xl text-lg font-medium text-gray-500">
              This is a direct screenshot from the Vini Grow Holidays Meta Ads account. Every number is real, verified, and auditable.
            </p>
            <div className="overflow-hidden rounded-3xl border border-gray-200 shadow-2xl">
              <Image
                src="/assets/case-studies/vini-grow/meta-dashboard.png"
                alt="Vini Grow Holidays live Meta Ads Manager dashboard — d2cora campaign results"
                width={1400}
                height={900}
                className="h-auto w-full"
              />
            </div>
            <div className="mt-4 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <p className="text-sm font-semibold text-gray-400">
                Screenshot taken from live account: adsmanager.facebook.com, Vini Grow Holidays (4385...)
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SEO & Blog Rankings */}
      <section className="max-w-350 mx-auto px-6 py-20 md:px-12 lg:px-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="grid gap-16 lg:grid-cols-2"
        >
          <div>
            <span className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#3366FF]">SEO & Content</span>
            <h2 className="mb-6 text-3xl font-black leading-tight tracking-tighter text-black md:text-4xl">
              Page 1 Google rankings, from a domain with no prior SEO.
            </h2>
            <p className="mb-8 text-lg font-medium leading-relaxed text-gray-500">
              We built a complete SEO foundation and published targeted blog content. Within weeks, multiple articles began ranking on Page 1 for high-intent travel and visa queries. These are not vanity rankings. They bring in people who are actively searching for travel and visa services.
            </p>
            <div className="space-y-3">
              {blogTopics.map((topic) => (
                <div key={topic} className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3">
                  <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-[#3366FF]" />
                  <p className="text-sm font-semibold text-gray-700">{topic}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <span className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.2em] text-gray-400">AI Search Visibility</span>
            <h2 className="mb-6 text-3xl font-black leading-tight tracking-tighter text-black md:text-4xl">
              Appearing in ChatGPT, Perplexity, and Google AI.
            </h2>
            <p className="mb-6 text-lg font-medium leading-relaxed text-gray-500">
              AI-powered search is the next frontier. We made Vini Grow Holidays discoverable in AI tools by implementing a structured <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm font-mono text-[#3366FF]">llms.txt</code> file, proper schema markup, and a clean information architecture that AI crawlers can understand and cite.
            </p>
            <div className="space-y-4">
              {[
                { label: "llms.txt", desc: "Structured business information for AI crawlers (ChatGPT, Perplexity, Claude)" },
                { label: "robots.txt", desc: "Precise crawler directives to guide search engine bots efficiently" },
                { label: "sitemap.xml", desc: "Dynamic sitemap ensuring all pages are discovered and indexed fast" },
                { label: "Schema Markup", desc: "Structured data for rich snippets in both Google and AI search results" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                  <code className="shrink-0 rounded-lg bg-[#1a1a2e] px-3 py-1.5 text-xs font-mono font-bold text-[#3366FF]">{item.label}</code>
                  <p className="text-sm font-medium leading-relaxed text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Key Takeaway */}
      <section className="bg-[#1a1a2e] py-20">
        <div className="max-w-350 mx-auto px-6 md:px-12 lg:px-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="grid gap-12 lg:grid-cols-[1fr_auto]"
          >
            <div>
              <span className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#3366FF]">The Lesson</span>
              <h2 className="mb-6 text-3xl font-black leading-tight tracking-tighter text-white md:text-5xl">
                It was never a budget problem. It was always a strategy problem.
              </h2>
              <p className="max-w-2xl text-lg font-medium leading-relaxed text-gray-400">
                Vini Grow Holidays had spent money before. The campaigns failed because there was no structure, no targeting strategy, no conversion path, and no measurement. When we fixed those fundamentals and ran ads alongside a proper SEO and content strategy, results followed within days, not months.
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-center justify-center gap-4 text-center lg:min-w-[220px]">
              {[
                { n: "14", l: "Days" },
                { n: "47", l: "Leads" },
                { n: "₹40", l: "CPL" },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 w-full">
                  <p className="text-4xl font-black text-white">{s.n}</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-500">{s.l}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Visit website + CTA */}
      <section className="py-20">
        <div className="max-w-350 mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Visit the Client</p>
              <a
                href="https://vinigrowholidays.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-2xl font-black text-black transition-colors hover:text-[#1d4ed8]"
              >
                vinigrowholidays.com
                <ExternalLink className="h-6 w-6" />
              </a>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-6 py-3 text-sm font-bold text-black transition-all hover:border-black"
              >
                <ArrowLeft className="h-4 w-4" />
                All Case Studies
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-bold text-white transition-all hover:bg-[#3366FF]"
              >
                Start Your Project
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
