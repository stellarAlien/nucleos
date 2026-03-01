'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Newspaper } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const News = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!contentRef.current) return;

        gsap.fromTo(
            contentRef.current,
            { opacity: 0, scale: 0.95 },
            {
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 85%',
                },
            }
        );
    }, []);

    return (
        <section
            ref={sectionRef}
            id="news"
            className="relative py-20 lg:py-32 bg-[#E6F4F1] overflow-hidden"
        >
            <div className="container mx-auto px-6 lg:px-16" ref={contentRef}>
                <div className="max-w-4xl mx-auto text-center">
                    <div className="w-20 h-20 bg-[#D0EDE8] rounded-2xl shadow-sm border border-teal-100 flex items-center justify-center mx-auto mb-8">
                        <Newspaper className="w-10 h-10 text-brand-teal" />
                    </div>

                    <h2 className="text-3xl md:text-5xl font-display font-bold text-navy mb-6">
                        Latest Insights & <span className="text-brand-teal">News</span>
                    </h2>

                    <p className="text-xl text-slate-600 mb-12">
                        Stay tuned — we are currently preparing specialized insights and industry news from the core of the biotech ecosystem.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white p-8 rounded-3xl border border-teal-100 shadow-md relative overflow-hidden group">
                                <div className="h-4 bg-teal-50 rounded w-1/4 mb-6" />
                                <div className="h-8 bg-teal-50 rounded w-full mb-4" />
                                <div className="h-8 bg-teal-50 rounded w-3/4 mb-8" />
                                <div className="flex gap-2">
                                    <div className="h-4 bg-teal-50 rounded w-1/3" />
                                    <div className="h-4 bg-teal-50 rounded w-1/4" />
                                </div>

                                <div className="absolute inset-0 bg-white/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="bg-navy text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg">
                                        COMING SOON
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default News;