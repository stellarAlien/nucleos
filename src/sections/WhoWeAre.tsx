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
            className="relative py-20 lg:py-32 bg-white overflow-hidden"
        >
            <div className="container mx-auto px-6 lg:px-16">
                <div className="max-w-4xl mx-auto text-center" ref={textRef}>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-teal-50 border border-teal-100 rounded-full mb-8 shadow-sm">
                        <Logo className="h-6 w-auto" />
                        <span className="text-sm font-semibold text-teal-700 tracking-wide uppercase">
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
