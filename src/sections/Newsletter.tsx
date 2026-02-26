'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Mail, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Newsletter = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const container = containerRef.current;
        if (!section || !container) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                container.children,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative py-20 lg:py-32 bg-white overflow-hidden"
        >
            {/* Soft decorative blur */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-teal/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div
                    ref={containerRef}
                    className="max-w-5xl mx-auto bg-navy rounded-[3rem] p-10 lg:p-20 relative overflow-hidden shadow-2xl shadow-navy/20"
                >
                    {/* Background Texture/Pattern */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <svg width="100%" height="100%" className="text-white">
                                <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                    <circle cx="2" cy="2" r="1" fill="currentColor" />
                                </pattern>
                                <rect width="100%" height="100%" fill="url(#dots)" />
                            </svg>
                        </div>
                    </div>

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-brand-teal rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-white/5">
                                <Sparkles className="w-4 h-4" />
                                Exclusive Insights
                            </div>
                            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
                                Stay at the <span className="text-brand-teal text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-green">Cutting Edge</span>
                            </h2>
                            <p className="text-lg text-slate-400 leading-relaxed mb-0">
                                Stay at the cutting edge of Biotechnology with curated insights on CGT, AI × bio
                                innovation, advances in biomanufacturing, key policy updates, emerging career opportunities,
                                and exclusive content available only to members.
                            </p>
                        </div>

                        <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10 backdrop-blur-sm">
                            <div className="flex flex-col gap-4">
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                    <input
                                        type="email"
                                        placeholder="Enter your email address"
                                        className="w-full bg-navy/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-teal transition-all"
                                    />
                                </div>
                                <button className="group w-full py-4 bg-brand-teal hover:bg-teal-600 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 active:scale-[0.98] shadow-lg shadow-teal-500/20">
                                    Subscribe Now
                                    <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                </button>
                                <p className="text-xs text-slate-500 text-center mt-2">
                                    Join our network of 2,000+ biotech professionals.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
