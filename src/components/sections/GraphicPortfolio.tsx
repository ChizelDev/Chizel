"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { 
  motion, 
  useScroll, 
  useVelocity, 
  useSpring, 
  useTransform, 
  useAnimationFrame, 
  useMotionValue 
} from "framer-motion";
import { Playfair_Display } from "next/font/google";

const funkyFont = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
});

const POSTERS = [
  "1.jpeg", "2.png", "3.png", "4.jpeg", "5.png",
  "6.png", "7.png", "8.png", "9.png", "10.png",
  "11.png", "12.png", "13.png", "14.png", "15.png",
  "16.png", "17.png", "_.jpeg", "image.png"
];

const getRowItems = (startIndex: number, count: number) => {
  const items = [];
  for (let i = 0; i < count; i++) {
    items.push(POSTERS[(startIndex + i) % POSTERS.length]);
  }
  return items;
};

function MarqueeRow({ items, baseVelocity }: { items: string[], baseVelocity: number }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });

  useAnimationFrame((t, delta) => {
    let moveBy = baseVelocity * (delta / 1000);
    moveBy += moveBy * Math.abs(velocityFactor.get());
    let newX = baseX.get() + moveBy;
    newX = newX % 50;
    if (newX > 0) newX -= 50;
    if (newX < -50) newX += 50;
    baseX.set(newX);
  });

  const doubleItems = [...items, ...items];
  const x = useTransform(baseX, (v) => `${v}%`);

  return (
    <div style={{ overflow: "hidden", contain: "layout style" }}>
      <motion.div
        className="flex gap-4 md:gap-6 w-max pl-4 md:pl-8"
        style={{ x, willChange: "transform" }}
      >
        {doubleItems.map((fileName, idx) => (
          <div
            key={idx}
            className="relative w-[140px] md:w-[200px] lg:w-[260px] h-[190px] md:h-[280px] lg:h-[360px] flex-shrink-0 rounded-xl overflow-hidden group shadow-xl"
          >
            <Image
              src={`/assets/Posters/${fileName}`}
              alt={`Portfolio Poster ${idx}`}
              fill
              className="object-cover object-center grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 300px, 500px"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function GraphicPortfolio() {
  const rowConfigs = [
    { items: getRowItems(0, 7), speed: -1.7 },
    { items: getRowItems(7, 7), speed: -1.2 },
    { items: getRowItems(14, 7), speed: -1.5 },
  ];

  return (
    <section className="w-full bg-[#111111] overflow-hidden flex flex-col relative">
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#111111] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#111111] to-transparent z-10 pointer-events-none" />

      {/* Graphic Portfolio heading + marquee */}
      <div className="py-20 flex flex-col gap-8 md:gap-12">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 relative z-20 mb-4 md:mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className={`${funkyFont.className} text-center w-full text-5xl md:text-7xl lg:text-[7rem] text-[#FDFBF7] tracking-tighter leading-none italic font-black`}
          >
            Our Graphic <span className="text-orange-500">Portfolio</span>
          </motion.h2>
        </div>

        <div className="flex flex-col gap-4 md:gap-6">
          {rowConfigs.map((config, index) => (
            <MarqueeRow key={index} items={config.items} baseVelocity={config.speed} />
          ))}
        </div>
      </div>

      {/* Case Study spotlight */}
      <div className="relative z-20 w-full max-w-[1400px] mx-auto px-6 pb-20 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-[#3366FF]">
            Client Case Study
          </p>
          <Link href="/case-studies/vini-grow-holidays" className="group block">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/8">
              <div className="h-px w-full bg-gradient-to-r from-[#3366FF] to-[#FF5722]" />
              <div className="flex flex-col gap-8 p-8 md:flex-row md:items-center md:p-12">

                {/* Logo + name */}
                <div className="flex items-center gap-5 shrink-0">
                  <div className="h-16 w-16 overflow-hidden rounded-2xl border border-white/10">
                    <Image
                      src="/assets/case-studies/vini-grow/logo.jpg"
                      alt="Vini Grow Holidays"
                      width={64}
                      height={64}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Travel &amp; Visa Agency</p>
                    <h3 className="text-xl font-black tracking-tight text-white">Vini Grow Holidays</h3>
                  </div>
                </div>

                {/* Headline */}
                <div className="flex-1">
                  <p className="text-lg font-bold leading-snug text-white md:text-xl">
                    47 qualified leads. 155 WhatsApp conversations. Page 1 Google rankings.{" "}
                    <span className="text-[#3366FF]">In 14 days.</span>
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["Performance Marketing", "SEO", "Website Redesign", "AI Search"].map((tag) => (
                      <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-gray-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex shrink-0 gap-6">
                  {[
                    { v: "47", l: "Leads" },
                    { v: "₹40", l: "CPL" },
                    { v: "26.9K", l: "Reached" },
                  ].map((s) => (
                    <div key={s.l} className="text-center">
                      <p className="text-2xl font-black text-white">{s.v}</p>
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-500">{s.l}</p>
                    </div>
                  ))}
                </div>

                {/* Arrow */}
                <div className="shrink-0 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all duration-300 group-hover:border-[#3366FF] group-hover:bg-[#3366FF]">
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </div>
          </Link>

          <div className="mt-6 text-center">
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition-colors hover:text-white"
            >
              View all case studies
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
