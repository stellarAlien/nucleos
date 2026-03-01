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
            className="relative py-20 lg:py-32 bg-[#0F1E2E] overflow-hidden"
        >
            <div className="container mx-auto px-6 lg:px-16">
                <div className="max-w-5xl mx-auto" ref={contentRef}>
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-white/90 mb-8 leading-tight">
                        Credibility is built through experience, structure, and global perspective.
                    </h2>

                    <p className="text-xl text-white/70 mb-12 leading-relaxed">
                        Nucleos Biotech is founded on more than <span className="font-bold text-[#3ecf8e]">25 years of combined international experience</span> across biotechnology and life sciences, spanning the United States, Europe, and the Middle East.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        {strengths.map((strength, index) => (
                            <div key={index} className="flex items-start gap-4 p-6 bg-white/5 rounded-2xl shadow-sm border border-white/10 hover:bg-white/10 transition-colors">
                                <CheckCircle2 className="w-6 h-6 text-[#3ecf8e] flex-shrink-0 mt-1" />
                                <span className="text-lg text-white font-medium">{strength}</span>
                            </div>
                        ))}
                    </div>

                    <p className="text-lg text-white/70 leading-relaxed border-l-4 border-[#3ecf8e] pl-6 py-2 italic font-medium">
                        "We combine scientific depth with strategic execution — bridging established global expertise with emerging regional opportunities."
                    </p>
                </div>
            </div>
        </section>
    );
};

export default WhyTrust;
