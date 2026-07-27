import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Founder Brand Audit | Your Personal brand is burning you out.",
  description: "Because it was built for a creator, not a founder.",
};

export default function FounderBrandAuditPage() {
  return (
    <main className="min-h-screen bg-[#1F331F] font-sans text-[#F7F9F5] selection:bg-[#F7F9F5] selection:text-[#1F331F]">
      {/* Hero Section */}
      <section className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 py-20 text-center">
        <h1 className="mb-8 font-serif text-4xl font-medium leading-tight tracking-tight md:text-6xl lg:text-7xl">
          Your Personal brand is<br />burning you out.
        </h1>
        <h2 className="mb-12 font-serif text-2xl tracking-tight text-[#D8E2D1] md:text-4xl lg:text-5xl">
          Because it was built for a creator,<br />not a <span className="italic">founder</span>.
        </h2>
        
        <div className="mx-auto max-w-2xl space-y-6 text-lg font-light text-[#B5C5B0] md:text-xl">
          <p>Creators are rewarded for constant visibility.</p>
          <p>Founders are rewarded for leverage, trust, and systems.</p>
          <p className="font-medium text-[#F7F9F5]">
            If your brand depends on you showing up every day, you haven't built a brand. You've built a second job.
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-[#1A2A1A] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-10 font-serif text-3xl md:text-5xl">Why founder brands burn so fast</h2>
          <div className="space-y-6 text-lg font-light leading-relaxed text-[#D8E2D1] md:text-xl">
            <p>
              Most founders copy creator behavior without realizing it. They post more, think more, and perform more. But the business doesn't grow proportionally.
            </p>
            <p className="pt-4">That creates a dangerous loop:</p>
            <ul className="list-disc space-y-3 pl-6 marker:text-[#8AA882]">
              <li>More content leads to more pressure.</li>
              <li>More pressure leads to less clarity.</li>
              <li>Less clarity leads to weaker positioning.</li>
              <li>Weaker positioning leads to even more content.</li>
            </ul>
            <p className="pt-4 font-medium text-[#F7F9F5]">
              So instead of building trust, the founder starts feeding the algorithm.
            </p>
          </div>
        </div>
      </section>

      {/* Psychological Pain Section */}
      <section className="mx-auto max-w-3xl px-6 py-24 md:py-32">
        <h2 className="mb-10 font-serif text-3xl md:text-5xl">The hidden cost of creator-style branding</h2>
        <div className="space-y-8 text-lg font-light leading-relaxed text-[#D8E2D1] md:text-xl">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-[#2B452B] bg-[#1A2A1A] p-8">
              <p className="mb-4 font-serif text-2xl text-[#F7F9F5]">A creator brand asks:</p>
              <p className="italic">"How do I stay relevant today?"</p>
              <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-[#8AA882]">Creates Anxiety</p>
            </div>
            <div className="rounded-2xl border border-[#3E5C3E] bg-[#2B452B] p-8">
              <p className="mb-4 font-serif text-2xl text-[#F7F9F5]">A founder brand asks:</p>
              <p className="italic">"How do I become undeniable over time?"</p>
              <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-[#A8D09E]">Creates Authority</p>
            </div>
          </div>
          
          <div className="pt-8">
            <p className="mb-6 font-medium text-[#F7F9F5]">If your brand makes you feel:</p>
            <ul className="list-disc space-y-3 pl-6 marker:text-[#8AA882]">
              <li>Always behind,</li>
              <li>Always visible,</li>
              <li>Always responsible for attention,</li>
            </ul>
            <p className="pt-6 font-serif text-2xl text-[#F7F9F5]">
              then your brand is extracting energy instead of compounding it.
            </p>
          </div>
        </div>
      </section>

      {/* Reframe Section */}
      <section className="bg-[#1A2A1A] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-10 font-serif text-3xl md:text-5xl">The goal is not more content</h2>
          <div className="space-y-6 text-lg font-light leading-relaxed text-[#D8E2D1] md:text-xl">
            <p>The goal is a brand that:</p>
            <ul className="list-disc space-y-4 pl-6 marker:text-[#8AA882]">
              <li>Builds trust while you sleep,</li>
              <li>Attracts the right clients without chasing everyone,</li>
              <li>Makes your thinking easier to repeat,</li>
              <li>Supports the business instead of consuming the founder.</li>
            </ul>
            <p className="pt-8 font-serif text-2xl leading-snug text-[#F7F9F5] md:text-3xl">
              Your personal brand should be a distribution system for your ideas, not a performance you have to maintain every day.
            </p>
          </div>
        </div>
      </section>

      {/* Authority Section */}
      <section className="mx-auto max-w-3xl px-6 py-24 md:py-32">
        <h2 className="mb-10 font-serif text-3xl md:text-5xl">What founder brands do differently</h2>
        <div className="space-y-6 text-lg font-light leading-relaxed text-[#D8E2D1] md:text-xl">
          <p>Founder brands don't try to win attention every day.</p>
          <p>They win by being clear, consistent, and strategically memorable.</p>
          <p className="pt-4">They:</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="shrink-0 text-[#8AA882]">✦</span>
              Talk about the same core problem again and again,
            </li>
            <li className="flex gap-4">
              <span className="shrink-0 text-[#8AA882]">✦</span>
              Share real lessons, not random opinions,
            </li>
            <li className="flex gap-4">
              <span className="shrink-0 text-[#8AA882]">✦</span>
              Build a point of view that separates them from the market,
            </li>
            <li className="flex gap-4">
              <span className="shrink-0 text-[#8AA882]">✦</span>
              Use content as leverage, not validation.
            </li>
          </ul>
          <p className="pt-8 font-medium text-[#F7F9F5]">
            That's why strong founder brands feel calm. They aren't trying to prove something every morning.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section id="audit" className="bg-[#2B452B] px-6 py-24 text-center md:py-32">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-8 font-serif text-3xl text-[#F7F9F5] md:text-5xl">Take the Founder Brand Audit</h2>
          <p className="mb-12 text-xl font-light text-[#D8E2D1] md:text-2xl">
            In 5 minutes, you'll see whether your brand is built like a creator's brand or a founder's brand, and what to fix first.
          </p>
          <a 
            href="mailto:hellod2cora@gmail.com"
            className="inline-block rounded-full bg-[#F7F9F5] px-10 py-5 text-xl font-bold text-[#1F331F] shadow-xl transition-all duration-300 hover:scale-105 hover:bg-white"
          >
            Email us for the Audit 
          </a>
          <p className="mt-6 text-lg text-[#D8E2D1]">
            Send your details to <a href="mailto:hellod2cora@gmail.com" className="font-semibold text-[#A8D09E] hover:underline">hellod2cora@gmail.com</a>
          </p>
          <p className="mt-8 text-sm font-medium uppercase tracking-wide text-[#A8D09E] md:text-base">
            No fluff. No generic advice. Just a clear diagnosis of what's making your brand feel heavy.
          </p>
        </div>
      </section>

    </main>
  );
}
