'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const strengths = [
    "Deep understanding of advanced biologics and translational science",
    "Cross-border business development and strategic partnerships",
    "Experience within mature biotech ecosystems",
    "Regional insight aligned with GCC growth ambitions"
];

const WhyTrust = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!contentRef.current) return;

        gsap.fromTo(
            contentRef.current.children,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                },
            }
        );
    }, []);

    return (
        <section
            ref={sectionRef}
            id="why-trust"
            className="relative py-20 lg:py-32 bg-slate-50 overflow-hidden"
        >
            <div className="container mx-auto px-6 lg:px-16">
                <div className="max-w-5xl mx-auto" ref={contentRef}>
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-navy mb-8 leading-tight">
                        Credibility is built through experience, structure, and global perspective.
                    </h2>

                    <p className="text-xl text-slate-700 mb-12 leading-relaxed">
                        Nucleos Biotech is founded on more than <span className="font-bold text-brand-teal">25 years of combined international experience</span> across biotechnology and life sciences, spanning the United States, Europe, and the Middle East.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        {strengths.map((strength, index) => (
                            <div key={index} className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                                <CheckCircle2 className="w-6 h-6 text-brand-green flex-shrink-0 mt-1" />
                                <span className="text-lg text-slate-800 font-medium">{strength}</span>
                            </div>
                        ))}
                    </div>

                    <p className="text-lg text-slate-600 leading-relaxed border-l-4 border-brand-teal pl-6 py-2 italic font-medium">
                        "We combine scientific depth with strategic execution — bridging established global expertise with emerging regional opportunities."
                    </p>
                </div>
            </div>
        </section>
    );
};

export default WhyTrust;
