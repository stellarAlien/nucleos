'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const OurEcosystem = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!contentRef.current) return;

        gsap.fromTo(
            contentRef.current,
            { opacity: 0, x: -30 },
            {
                opacity: 1,
                x: 0,
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
            id="ecosystem"
            className="relative py-20 lg:py-32 bg-white overflow-hidden"
        >
            <div className="container mx-auto px-6 lg:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div ref={contentRef}>
                        <div className="inline-block px-4 py-2 bg-slate-100 rounded-lg text-slate-600 font-semibold text-sm mb-6">
                            Part of the Masdar City Innovation Ecosystem
                        </div>

                        <h2 className="text-3xl md:text-5xl font-display font-bold text-navy mb-8 leading-tight">
                            At the heart of future-focused <span className="text-brand-green">innovation.</span>
                        </h2>

                        <p className="text-lg text-slate-600 leading-relaxed mb-8">
                            Nucleos Biotech is proudly based in Masdar City, Abu Dhabi — one of the Middle East's most dynamic and future-focused innovation clusters. Operating within this ecosystem places us at the intersection of biotechnology, AI, sustainability, and advanced research — surrounded by leading academic institutions, global technology companies, and high-growth startups.
                        </p>

                        <p className="text-lg text-slate-600 leading-relaxed mb-10">
                            This strategic positioning strengthens our ability to connect regional ambition with international expertise and reinforces our commitment to advancing biotechnology across the UAE and the wider GCC.
                        </p>

                        <a
                            href="https://masdarcity.ae/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-brand-teal font-bold hover:text-teal-700 transition-colors group"
                        >
                            Learn more about Masdar City
                            <ExternalLink className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </a>
                    </div>

                    <div className="relative">
                        {/* Main visual container — now with more natural aspect ratio */}
                        <div className="aspect-[4/3] md:aspect-[5/4] bg-slate-50 rounded-3xl overflow-hidden shadow-2xl relative">
                            {/* Background image – full, clear, no filters */}
                            <img
                                src="/images/masdar-city6640a593-357e-4048-b99b-f1d8c8066af1.jpg"
                                alt="Masdar City sustainable urban landscape"
                                className="absolute inset-0 w-full h-full object-cover"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                }}
                            />

                            {/* Optional overlay logo – centered, semi-transparent if you want it subtle */}
                            <div className="absolute inset-0 flex items-center justify-center p-8 md:p-12 bg-black/10 backdrop-blur-[2px] transition-opacity duration-300 hover:opacity-0">
                                <img
                                    src="/images/masdar-logo-placeholder.svg" // ← replace with your actual path if different
                                    // Alternative: use Wikimedia one → "/images/masdar-city-logo.svg"
                                    alt="Masdar City Logo"
                                    className="w-3/5 md:w-2/3 h-auto max-h-[60%] object-contain drop-shadow-lg"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                            </div>

                            {/* Decorative blurred orbs – kept but toned down */}
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-green/10 rounded-full blur-3xl" />
                            <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-teal/10 rounded-full blur-3xl" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurEcosystem;