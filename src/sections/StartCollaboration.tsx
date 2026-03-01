'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const StartCollaboration = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const content = contentRef.current;

        if (!section || !content) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                content.children,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
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
            id="start-collaboration"
            className="relative py-24 lg:py-32 bg-gradient-to-br from-[#0F1E2E] via-[#0D2D3A] to-[#0A3040] overflow-hidden"
        >
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-teal-900/30 rounded-full blur-3xl opacity-50" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-teal-900/20 rounded-full blur-3xl opacity-50" />

            <div className="container mx-auto px-6 relative z-10">
                <div
                    ref={contentRef}
                    className="max-w-4xl mx-auto text-center"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50/10 text-teal-300 rounded-full mb-8 font-semibold text-sm tracking-wide uppercase border border-teal-400/20">
                        <Mail className="w-4 h-4" />
                        Get in Touch
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-8 leading-tight">
                        Start <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Collaboration</span>
                    </h2>

                    <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Ready to accelerate your biotech innovation? Let's discuss how we can partner to achieve your strategic objectives and drive excellence together.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <a
                            href="https://www.linkedin.com/company/nucleosbiotech/"
                            className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold rounded-2xl hover:shadow-2xl hover:shadow-teal-500/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                        >
                            <span className="relative z-10">Contact Us</span>
                            <ArrowUpRight className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </a>

                        <div className="text-white/50 font-medium">
                            Or email us at:{' '}
                            <a
                                href="mailto:info@nucleos-biotech.com"
                                className="text-teal-400 hover:text-teal-300 transition-colors underline underline-offset-4 decoration-teal-600"
                            >
                                info@nucleos-biotech.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StartCollaboration;