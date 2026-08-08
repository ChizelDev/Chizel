"use client";

import { motion, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { blockClusters } from "@/lib/constants/industries";
import { IndustryCluster } from "./industries/IndustryCluster";

export type BlockType = {
    x: number;
    y: number;
    z: number;
    clusterId: number;
    vx: number;
    vy: number;
    depth: number;
    isFirstInCluster: boolean;
    visualCenterX: number;
    visualCenterY: number;
    clusterData: typeof blockClusters[0];
    explosionMultiplier: number;
};

function MobileIndustries() {
    return (
        <div className="w-full lg:hidden relative z-10 mt-8 mb-12 px-4 max-w-lg mx-auto">
            <div className="grid grid-cols-2 gap-4">
                {blockClusters.map((cluster, i) => {
                    const isWide = i === 0 || i === 3 || i === 6; 
                    let color = "#1524ca";
                    if (i === 2 || i === 4) color = "#ff6b00"; // Orange
                    else if (i === 5) color = "#16a34a"; // Green
                    const Icon = cluster.icon;
                    
                    return (
                        <motion.div
                            key={cluster.id}
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: "-5%" }}
                            transition={{ 
                                duration: 0.4, 
                                delay: i * 0.1,
                                ease: "easeOut"
                            }}
                            className={`bg-white border-2 p-5 flex flex-col gap-4 relative overflow-hidden ${isWide ? 'col-span-2' : 'col-span-1'}`}
                            style={{ borderColor: color }}
                        >
                            {/* Technical blueprint grid background */}
                            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`, backgroundSize: '10px 10px' }} />
                            
                            <div className="absolute -right-6 -bottom-6 opacity-[0.04] pointer-events-none" style={{ color }}>
                                <Icon size={isWide ? 120 : 90} strokeWidth={1} />
                            </div>
                            
                            <div className="flex items-center gap-3 relative z-10">
                                <div className="bg-white p-2.5 shrink-0 border-2 flex items-center justify-center" style={{ borderColor: color, boxShadow: `2px 2px 0px ${color}`, color }}>
                                    <Icon size={18} strokeWidth={2.5} />
                                </div>
                                <h3 className={`font-mono font-bold uppercase tracking-wide ${isWide ? 'text-[15px]' : 'text-[12px]'} leading-tight`} style={{ color }}>
                                    {cluster.name}
                                </h3>
                            </div>
                            
                            {/* Structural sub-niches */}
                            {cluster.subNiches && isWide && (
                                <div className="flex flex-wrap gap-2 mt-2 relative z-10">
                                    {cluster.subNiches.map(niche => (
                                        <span key={niche} className="text-[9px] bg-white px-2 py-1 border font-mono uppercase tracking-[0.1em]" style={{ color, borderColor: color, boxShadow: `1px 1px 0px ${color}` }}>
                                            {niche}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}

export function Industries() {
    const [isExpanded, setIsExpanded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, {
        margin: "-30% 0px -30% 0px", // Trigger when the element is well within the viewport
    });

    // Auto-trigger expanded state based on scroll
    useEffect(() => {
        setIsExpanded(isInView);
    }, [isInView]);

    const s = 65; // Scale of the cubes
    const dx = s * Math.sqrt(3) / 2;
    const dy = s / 2;

    // Core center of the 3x3x3 grid is at (1,1,1), which elegantly maps to (0,0) via getCenter.
    const getCenter = (x: number, y: number, z: number) => ({
        cx: (x - y) * dx,
        cy: (x + y) * dy - z * s
    });

    const allBlocks = blockClusters.flatMap(cluster => {
        let avgX = 0, avgY = 0, avgZ = 0;
        cluster.blocks.forEach(b => { avgX += b[0]; avgY += b[1]; avgZ += b[2]; });
        avgX /= cluster.blocks.length;
        avgY /= cluster.blocks.length;
        avgZ /= cluster.blocks.length;

        const center2D = getCenter(avgX, avgY, avgZ);

        // Dynamically compute vector exactly toward the label so lines NEVER cross horizontally
        const dxCoord = cluster.labelPos.x - center2D.cx;
        const dyCoord = cluster.labelPos.y - center2D.cy;
        const len = Math.sqrt(dxCoord * dxCoord + dyCoord * dyCoord) || 1;

        const vx = dxCoord / len;
        const vy = dyCoord / len;

        // Perfectly space pieces towards their specific anchor texts
        const explosionMultiplier = 2.6;
        const visualCenterX = center2D.cx + vx * s * explosionMultiplier;
        const visualCenterY = center2D.cy + vy * s * explosionMultiplier;

        return cluster.blocks.map((b, i) => ({
            x: b[0], y: b[1], z: b[2],
            clusterId: cluster.id,
            vx, vy,
            depth: b[0] + b[1] + b[2],
            isFirstInCluster: i === 0,
            visualCenterX, visualCenterY,
            clusterData: cluster,
            explosionMultiplier
        }));
    });

    // Face culling
    const hasCubeInSameCluster = (x: number, y: number, z: number, clusterId: number) =>
        allBlocks.some(b => b.x === x && b.y === y && b.z === z && b.clusterId === clusterId);

    const hasCube = (x: number, y: number, z: number) =>
        allBlocks.some(b => b.x === x && b.y === y && b.z === z);

    const checkCull = (x: number, y: number, z: number, clusterId: number) =>
        isExpanded ? hasCubeInSameCluster(x, y, z, clusterId) : hasCube(x, y, z);

    // Render pass
    const sortedBlocks = [...allBlocks].sort((a, b) => a.depth - b.depth);
    const insertSphereIndex = sortedBlocks.findIndex(b => b.depth >= 3);

    const beforeSphere = sortedBlocks.slice(0, insertSphereIndex);
    const afterSphere = sortedBlocks.slice(insertSphereIndex);

    const renderBlock = (block: BlockType) => (
        <IndustryCluster
            key={block.x + "-" + block.y + "-" + block.z}
            block={block}
            isHovered={isExpanded} // Passing isExpanded down as isHovered
            checkCull={checkCull}
            getCenter={getCenter}
            s={s}
            dx={dx}
            dy={dy}
        />
    );

    return (
        <section
            id="industries"
            className="py-12 relative flex flex-col items-center justify-center overflow-hidden min-h-screen"
            style={{ backgroundColor: "#F7F6F3" }}
        >
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16 relative z-10 px-4"
            >
                <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight mb-6 text-[#222]">
                    Deep Expertise Across the Board.
                </h2>
                <p className="text-xl font-light max-w-2xl mx-auto text-[#666] leading-relaxed">
                    We adapt our proven growth systems to fit the unique challenges of your industry.
                </p>
            </motion.div>

            <motion.div
                ref={containerRef}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="hidden lg:flex relative z-0 w-full max-w-6xl justify-center items-center cursor-pointer"
                onMouseEnter={() => setIsExpanded(true)}
                onMouseLeave={() => setIsExpanded(false)}
                onClick={() => setIsExpanded(!isExpanded)}
                // We move the entire group a bit upward (-40px) as requested
                style={{ transform: "translateY(-40px)" }}
            >
                <svg
                    width="100%"
                    height="100%"
                    viewBox="-550 -450 1100 900"
                    className="overflow-visible"
                    style={{ filter: "drop-shadow(0px 20px 40px rgba(0,0,0,0.02))" }}
                >
                    <defs>
                        <radialGradient id="orange-glow" cx="30%" cy="30%" r="70%">
                            <stop offset="0%" stopColor="#FFA751" />
                            <stop offset="100%" stopColor="#E06D14" />
                        </radialGradient>
                    </defs>

                    <g transform="translate(0, 50)">
                        {beforeSphere.map(renderBlock)}

                        <motion.circle
                            cx="0" cy="0"
                            r={s * 0.9}
                            fill="url(#orange-glow)"
                            initial={false}
                            animate={{
                                scale: isExpanded ? 1 : 0.8,
                                opacity: isExpanded ? 1 : 0
                            }}
                            transition={{ type: "spring", stiffness: 100, damping: 15 }}
                        />

                        {afterSphere.map(renderBlock)}

                        {/* Rendering Lines and Labels *AFTER* blocks so they overlay neatly on top! */}
                        {allBlocks.filter(b => b.isFirstInCluster).map((block) => {
                            const { clusterData, visualCenterX, visualCenterY } = block;
                            const { labelPos, name, icon: Icon } = clusterData;

                            const isLeft = labelPos.x < 0;
                            const extensionLength = 30;
                            const endX = labelPos.x + (isLeft ? -extensionLength : extensionLength);

                            return (
                                <motion.g
                                    key={`label-${clusterData.id}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: isExpanded ? 1 : 0 }}
                                    transition={{ duration: 0.3, delay: isExpanded ? 0.2 : 0 }}
                                    className="pointer-events-none"
                                >
                                    <line
                                        x1={visualCenterX}
                                        y1={visualCenterY}
                                        x2={labelPos.x}
                                        y2={labelPos.y}
                                        stroke="#B8B2A8"
                                        strokeWidth="1.5"
                                        strokeDasharray="4 4"
                                    />
                                    <line
                                        x1={labelPos.x}
                                        y1={labelPos.y}
                                        x2={endX}
                                        y2={labelPos.y}
                                        stroke="#B8B2A8"
                                        strokeWidth="1.5"
                                        strokeDasharray="4 4"
                                    />

                                    <foreignObject
                                        x={isLeft ? endX - 210 : endX + 10}
                                        y={clusterData.subNiches ? labelPos.y - 14 : labelPos.y - 14}
                                        width="200"
                                        height={clusterData.subNiches ? "150" : "30"}
                                        className="overflow-visible"
                                    >
                                        <div className={`flex flex-col w-full h-full ${isLeft ? 'items-end' : 'items-start'}`}>
                                            <div className={`flex items-center gap-2 ${isLeft ? 'justify-end' : 'justify-start'}`}>
                                                {isLeft ? (
                                                    <>
                                                        <span className="text-[14px] font-bold tracking-wide whitespace-nowrap text-[#222]">{name}</span>
                                                        <Icon size={16} strokeWidth={2} className="text-[#e2501a]" />
                                                    </>
                                                ) : (
                                                    <>
                                                        <Icon size={16} strokeWidth={2} className="text-[#e2501a]" />
                                                        <span className="text-[14px] font-bold tracking-wide whitespace-nowrap text-[#222]">{name}</span>
                                                    </>
                                                )}
                                            </div>
                                            
                                            {clusterData.subNiches && (
                                                <ul className={`mt-2 flex flex-col gap-1 text-[11px] text-[#666] font-medium tracking-wide ${isLeft ? 'items-end text-right' : 'items-start text-left'}`}>
                                                    {clusterData.subNiches.map((niche, nIdx) => (
                                                        <li key={nIdx} className="opacity-80 flex items-center gap-1.5">
                                                            {!isLeft && <span className="w-1 h-1 rounded-full bg-[#ccc]" />}
                                                            {niche}
                                                            {isLeft && <span className="w-1 h-1 rounded-full bg-[#ccc]" />}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </foreignObject>
                                </motion.g>
                            );
                        })}
                    </g>
                </svg>
            </motion.div>

            {/* Mobile View */}
            <MobileIndustries />
        </section>
    );
}
