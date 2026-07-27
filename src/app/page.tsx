import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

// Hardcoded FAQ items for JSON-LD structured data
const faqItems = [
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

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

import { Hero } from "@/components/sections/Hero";

// Lazy load components
const Services = dynamic(() => import("@/components/sections/Services").then(mod => ({ default: mod.Services })));
const Industries = dynamic(() => import("@/components/sections/Industries").then(mod => ({ default: mod.Industries })));
const VisionSection = dynamic(() => import("@/components/sections/VisionSection").then(mod => ({ default: mod.VisionSection })));
const GraphicPortfolio = dynamic(() => import("@/components/sections/GraphicPortfolio").then(mod => ({ default: mod.GraphicPortfolio })));

import { TrustSignal } from "@/components/sections/TrustSignal";
import { FAQ } from "@/components/sections/FAQ";

export default function Home() {
  return (
    <main className="w-full">
      {/* FAQ JSON-LD structured data for Google rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <h1 className="sr-only">d2cora: Leading Digital Marketing Agency for D2C Brands & Ecommerce Growth</h1>
      <Hero />
      <TrustSignal />
      <Industries />
      <VisionSection />
      <GraphicPortfolio />
      <Services />

      {/* SEO Copy Section */}
      <section className="flex w-full flex-col lg:flex-row bg-[#fffbeb] text-blue-950 min-h-screen lg:min-h-[80vh]">
        
        {/* Text Section (Left Half) */}
        <div className="flex w-full lg:w-1/2 flex-col justify-center px-8 py-20 md:px-16 lg:px-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1524ca] leading-[1.1] tracking-tight mb-8">
            Your Partner in <br />
            <span className="text-[#0701a5]">
              D2C Ecommerce Growth
            </span>
          </h2>
          
          <div className="flex flex-col gap-6">
            <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-700">
              Scaling a direct-to-consumer brand requires more than just basic advertising. It demands a holistic, data-driven approach to performance marketing, conversion rate optimization, and customer retention. 
            </p>
            <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-700">
              We combine creative excellence with rigorous analytics to ensure every campaign is optimized for maximum ROI, turning your traffic into loyal customers and your spend into measurable profit.
            </p>
          </div>
          
          <div className="pt-10">
             <a href="/contact" className="inline-flex items-center gap-2 rounded-full bg-[#1524ca] px-8 py-4 text-sm font-bold text-white transition-all hover:bg-[#0701a5] active:scale-95">
               Start Growing Today
             </a>
          </div>
        </div>
        
        {/* Full Image Section (Right Half) */}
        <div className="relative hidden w-full md:block lg:w-1/2 md:min-h-[500px] lg:min-h-full">
           <Image 
             src="/assets/founder.jpg" 
             alt="Your Partner in D2C Ecommerce Growth" 
             fill
             className="object-cover object-center"
             sizes="(max-width: 1024px) 100vw, 50vw"
           />
        </div>
        
      </section>

      <FAQ />
    </main>
  );
}
