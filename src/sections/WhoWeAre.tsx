'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Logo } from '../components/Logo';

gsap.registerPlugin(ScrollTrigger);

const WhoWeAre = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!textRef.current) return;

        gsap.fromTo(
            textRef.current,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                },
            }
        );
    }, []);

    return (
        <section
            ref={sectionRef}
            id="home"
            className="relative py-20 lg:py-32 bg-[#F5FAF7] overflow-hidden"
        >
            {/* ─── Background SVG Shape ────────── */}
            <div className="absolute top-0 right-0 w-full h-[800px] z-0 pointer-events-none opacity-60">
                <svg
                    viewBox="0 0 1000 800"
                    preserveAspectRatio="none"
                    className="w-full h-full object-cover transform -translate-y-20 scale-125"
                >
                    <defs>
                        <linearGradient id="whoWaveGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#4caf50" stopOpacity="0.0" />
                            <stop offset="50%" stopColor="#4caf50" stopOpacity="0.05" />
                            <stop offset="80%" stopColor="#0891b2" stopOpacity="0.10" />
                            <stop offset="100%" stopColor="#1a2e5a" stopOpacity="0.25" />
                        </linearGradient>
                    </defs>
                    <path
                        fill="url(#whoWaveGradient)"
                        d="M 0,800 C 120,785 280,780 440,710 C 620,630 780,520 900,280 C 960,150 985,60 1000,0 L 1000,800 Z"
                    />
                    <path
                        d="M 350,800 C 550,760 850,650 1000,350 L 1000,800 Z"
                        fill="#0891b2"
                        fillOpacity="0.06"
                    />
                </svg>
            </div>

            <div className="container mx-auto px-6 lg:px-16 relative z-10">
                <div className="max-w-4xl mx-auto text-center" ref={textRef}>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-100 rounded-full mb-8 shadow-sm">
                        <Logo className="h-6 w-auto" />
                        <span className="text-xs font-bold text-navy tracking-widest uppercase">
                            Who We Are
                        </span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-display font-bold text-navy mb-8 leading-tight">
                        A biotechnology convergence platform based in <span className="text-brand-teal">Masdar City, Abu Dhabi.</span>
                    </h2>

                    <p className="text-lg md:text-xl text-slate-600 leading-relaxed text-left md:text-center italic">
                        We connect global life sciences expertise with regional ambition across the UAE and the wider GCC
                        — fostering strategic collaboration between industry, academia, startups, and investors.
                        Operating at the intersection of biotechnology, AI, and ecosystem development, we aim to
                        accelerate innovation, strengthen cross-border partnerships, and contribute to building a resilient,
                        knowledge-driven biotech landscape in the region.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default WhoWeAre;
