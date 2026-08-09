"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export function VisionSection() {
    const containerRef = useRef<HTMLElement>(null);
    
    // We track the scroll progress over this specific section
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Parallax effect for the background image (moves slightly slower than scrolling)
    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
    
    // Fade effect for text to appear as it gets to the center of the screen
    const opacity = useTransform(scrollYProgress, [0.1, 0.4, 0.7, 1], [0, 1, 1, 0]);
    
    // Instead of scaling, slide it up gently so it "appears" beautifully without popping
    const textY = useTransform(scrollYProgress, [0.1, 0.4, 0.7, 1], [40, 0, 0, -40]);

    return (
        <section 
            ref={containerRef} 
            className="w-full py-16 md:py-24 px-4 md:px-8 lg:px-12 bg-[#FDFBF7] flex items-center justify-center overflow-hidden"
        >
            {/* The rounded mask container */}
            <div className="w-full max-w-[1600px] h-[60vh] md:h-[70vh] lg:h-[80vh] min-h-[500px] rounded-[2rem] md:rounded-[3rem] overflow-hidden relative shadow-2xl flex items-center justify-center group">
                
                {/* Parallax Background Image */}
                <motion.div 
                    className="absolute top-0 left-0 w-full h-[120%]"
                    style={{ y, willChange: "transform" }}
                >
                    <Image
                        src="/assets/colorful-vibrant-indian-landscape.jpg"
                        alt="Visionary vibrant landscape"
                        fill
                        className="object-cover object-center pointer-events-none transition-transform duration-1000 ease-out group-hover:scale-105"
                        priority
                        sizes="(max-w-768px) 100vw, (max-w-1200px) 90vw, 1600px"
                    />
                    {/* Darker overlay so the gradient text stands out vividly */}
                    <div className="absolute inset-0 bg-black/60 transition-opacity duration-700 group-hover:bg-black/70" />
                </motion.div>

                {/* Animated Typography over the image */}
                <motion.div 
                    className="relative z-10 w-full max-w-7xl px-4 md:px-12 text-center flex flex-col items-center justify-center gap-6"
                    style={{ opacity, y: textY, willChange: "opacity, transform" }}
                >
                    {/* Single block animation instead of per-word — avoids 15+ simultaneous filter ops */}
                    <motion.h2
                        className="text-4xl md:text-6xl lg:text-[5.5rem] font-serif font-light tracking-tight leading-tight lg:leading-[1.1] text-balance text-white"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                    >
                        Discover{" "}
                        <span className="italic font-light opacity-90">timeless ideas</span>{" "}
                        that inspire authentic brands and transform execution into market leading dominance.
                    </motion.h2>
                </motion.div>

            </div>
        </section>
    );
}
