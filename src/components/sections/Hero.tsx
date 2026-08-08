"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useState, useEffect } from "react";
import { PopupModal } from "react-calendly";

const DARK = "#1524ca";
const LIGHT = "#afccfb";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as const },
});

// ----------- Desktop-only floating image element -----------
interface DrawnProps {
  src: string;
  className: string;
  delay: number;
  rotationOffset: number;
}

function DrawnElement({ src, className, delay, rotationOffset }: DrawnProps) {
  return (
    <motion.div
      className={`absolute drop-shadow-xl ${className}`}
      style={{ rotate: rotationOffset, willChange: "transform" }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1, y: [0, -14, 0] }}
      transition={{
        opacity: { duration: 0.6, delay },
        scale: { duration: 0.8, delay, type: "spring" },
        y: { duration: 6 + (delay % 2) * 3, repeat: Infinity, ease: "easeInOut", delay: delay * 0.5 },
      }}
    >
      <img
        src={src}
        alt=""
        className="h-full w-full object-contain"
        style={{ opacity: 0.85 }}
        loading="eager"
      />
    </motion.div>
  );
}

// ----------- Desktop star field (hidden on mobile) -----------
function StarryBackground() {
  const [stars, setStars] = useState<
    Array<{ cx: string; cy: string; r: number; fill: string; duration: number }>
  >([]);

  useEffect(() => {
    // Only rendered on desktop (parent is hidden on mobile)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStars(
      Array.from({ length: 60 }).map(() => ({
        cx: `${Math.random() * 100}%`,
        cy: `${Math.random() * 100}%`,
        r: Math.random() * 1.5 + 0.5,
        fill: Math.random() > 0.8 ? "#fca311" : "#ffffff",
        duration: Math.random() * 3 + 2,
      }))
    );
  }, []);

  return (
    <>
      {/* No mix-blend-mode on inner elements — blending happens on parent only */}
      <div className="absolute inset-0 bg-[#02000a] opacity-90" />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-blue-900/40 via-transparent to-transparent" />
      <svg className="pointer-events-none absolute inset-0 h-full w-full">
        {stars.map((star, i) => (
          <circle
            key={i}
            cx={star.cx}
            cy={star.cy}
            r={star.r}
            fill={star.fill}
            style={{
              animation: `starPulse ${star.duration}s infinite ease-in-out`,
              animationDelay: `${i % 5}s`,
            }}
          />
        ))}
      </svg>
    </>
  );
}

// ----------- Desktop-only parallax floating sketches -----------
function FloatingSketchesDesktop() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 40, damping: 20 };
  const smoothX = useTransform(useSpring(mouseX, springConfig), (v) => -v);
  const smoothY = useTransform(useSpring(mouseY, springConfig), (v) => -v);

  useEffect(() => {
    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        mouseX.set((e.clientX / window.innerWidth - 0.5) * 50);
        mouseY.set((e.clientY / window.innerHeight - 0.5) * 50);
      });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [mouseX, mouseY]);

  return (
    // mix-blend-mode: screen only on desktop where GPU can handle it
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 0.5 }}
      className="pointer-events-none absolute bottom-0 right-0 top-0 hidden overflow-hidden mix-blend-screen lg:block lg:w-[65%]"
      style={{
        maskImage: "linear-gradient(to right, transparent 0%, black 20%, black 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 20%, black 100%)",
        willChange: "opacity",
      }}
    >
      <StarryBackground />
      <motion.div
        className="absolute inset-0 h-full w-full"
        style={{ x: smoothX, y: smoothY, willChange: "transform" }}
      >
        <DrawnElement src="/assets/services/content_marketing_camera-removebg-preview.png" className="w-[clamp(12rem,16vw,18.75rem)] h-[clamp(12rem,16vw,18.75rem)] bottom-[10%] left-[5%]" delay={1.2} rotationOffset={-12} />
        <DrawnElement src="/assets/services/mic_social_media__1_-removebg-preview.png" className="w-[clamp(10rem,13vw,16.25rem)] h-[clamp(10rem,13vw,16.25rem)] left-[20%] top-[10%]" delay={1.8} rotationOffset={15} />
        <DrawnElement src="/assets/services/Untitled_design-removebg-preview.png" className="w-[clamp(18rem,28vw,37.5rem)] h-[clamp(18rem,28vw,37.5rem)] right-[5%] top-[15%]" delay={2.5} rotationOffset={-5} />
        <DrawnElement src="/assets/services/speaker_social_marketing-removebg-preview.png" className="w-[clamp(11rem,14vw,17.5rem)] h-[clamp(11rem,14vw,17.5rem)] bottom-[5%] right-[20%]" delay={3.0} rotationOffset={8} />
      </motion.div>
      <div className="bg-linear-to-t pointer-events-none absolute inset-0 z-30 from-black/80 via-transparent to-transparent" />
    </motion.div>
  );
}

// ----------- Mobile-only lightweight background -----------
// Pure CSS gradients + simple fade-in images. Zero blend modes, zero JS scroll/animations.
function MobileBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden lg:hidden">
      {/* Simple static radial glow — no blend modes */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 40%, rgba(21,36,202,0.25) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}

// ----------------------------------------

export function Hero() {
  const { scrollY } = useScroll();
  const [isCentered, setIsCentered] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);

  // Only read isMobile once on mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobile(window.innerWidth < 1024);
    setRootElement(document.body);
  }, []);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setScrolled(latest > 40);
    });
  }, [scrollY]);

  // Parallax: only meaningful on desktop. On mobile scrollY listener adds main-thread cost.
  // We still create it but only apply it on desktop (avoids conditional hook)
  const yDesktop = useTransform(scrollY, [0, 1000], [0, -400], { clamp: false });

  useEffect(() => {
    const timer = setTimeout(() => setIsCentered(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.section
      className="h-svh min-h-[600px] sticky top-0 z-0 flex w-full items-center justify-start overflow-hidden"
      style={{
        // On mobile: no JS-driven y transform. The sticky CSS handles the effect.
        y: isMobile ? 0 : yDesktop,
        willChange: "transform",
        background: "linear-gradient(180deg, #1565c0 0%, #1e88e5 28%, #42a5f5 60%, #81d4fa 85%, #b3e5fc 100%)",
      }}
    >
      {/* Grain — desktop only (mix-blend-mode is expensive on mobile) */}
      <div
        className="pointer-events-none absolute inset-0 z-0 hidden lg:block"
        style={{
          opacity: 0.28,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E\")",
          backgroundSize: "220px 220px",
          mixBlendMode: "overlay",
        }}
      />

      {/* Horizon glow */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-0 h-1/3"
        style={{ background: "linear-gradient(to top, rgba(255,255,255,0.15) 0%, transparent 100%)" }}
      />

      {/* Desktop: full animated sketches with blend modes */}
      <FloatingSketchesDesktop />

      {/* Mobile: lightweight static images, zero blend modes */}
      <MobileBackground />

      {/* Typography Container */}
      <motion.div
        layout
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        className={`relative z-10 flex w-full items-center px-6 md:px-14 lg:px-20 ${isCentered ? "justify-center" : "justify-start"
          }`}
      >
        <motion.div
          layout
          className={`flex w-full flex-col ${isCentered ? "items-center text-center" : "items-center text-center md:items-start md:text-left"
            }`}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div className="flex w-full flex-col gap-4" {...fadeUp(0.2)}>
            <h1 className="flex flex-col uppercase text-center md:text-left w-full">
              <span
                className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-light tracking-widest leading-[1.2]"
                style={{ color: DARK }}
              >
                SCALING BRANDS
              </span>
              <span
                className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-light tracking-widest leading-[1.2]"
                style={{ color: DARK }}
              >
                WITH PROVEN
              </span>
              <span
                className="font-heading text-6xl sm:text-8xl md:text-9xl lg:text-[9rem] font-black tracking-tighter leading-[0.9] mt-4 md:mt-6 text-[#1524ca] bg-none md:text-transparent md:bg-clip-text md:bg-gradient-to-r md:from-[#1524ca] md:to-[#3b82f6]"
                style={{ textShadow: "0 4px 32px rgba(21,36,202,0.15)" }}
              >
                MARKETING<br />SYSTEMS.
              </span>
            </h1>
          </motion.div>

          {/* CTA below headline */}
          <motion.div
            className="mt-8 relative z-50 pointer-events-auto flex flex-col items-center md:items-start text-center md:text-left gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-mono text-xs md:text-sm tracking-[0.2em] uppercase leading-relaxed max-w-2xl" style={{ color: DARK, opacity: 0.7 }}>
              We partner with ambitious D2C and service-based businesses to drive predictable revenue through data-driven performance marketing and flawless execution.
            </p>
            <button
              onClick={() => setIsCalendlyOpen(true)}
              data-scrolled={scrolled}
              className="group relative inline-flex items-center gap-3 border-2 px-8 py-4 font-mono text-sm font-bold uppercase tracking-[0.15em] transition-all duration-300 bg-transparent border-[#1524ca] text-[#1524ca] hover:!bg-white hover:!border-white hover:!text-[#1524ca] data-[scrolled=true]:max-md:!bg-white data-[scrolled=true]:max-md:!border-white data-[scrolled=true]:max-md:!text-[#1524ca]"
            >
              Book A Call
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:translate-x-1">
                <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"/>
              </svg>
            </button>
            
            {isCalendlyOpen && rootElement && (
              <PopupModal
                url="https://calendly.com/d2cora22"
                onModalClose={() => setIsCalendlyOpen(false)}
                open={isCalendlyOpen}
                rootElement={rootElement}
              />
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
