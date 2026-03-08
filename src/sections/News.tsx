'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Newspaper, ArrowRight, Calendar } from 'lucide-react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

interface NewsProps {
    posts: {
        _id: string;
        title: string;
        slug: string;
        publishedAt: string;
        summary: string;
    }[];
}

const News = ({ posts }: NewsProps) => {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!cardsRef.current) return;

        const cards = cardsRef.current.children;

        // Professional Staggered Entrance
        gsap.fromTo(
            cards,
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
            id="news"
            className="relative py-24 lg:py-32 bg-gradient-to-br from-[#0F1E2E] via-[#0D2D3A] to-[#0A3040] overflow-hidden"
        >
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-teal-900/30 rounded-full blur-3xl opacity-50 pointer-events-none" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-teal-900/20 rounded-full blur-3xl opacity-50 pointer-events-none" />

            {/* ─── Background SVG Shape ────────── */}
            <div className="absolute top-0 left-0 w-full h-[800px] z-0 pointer-events-none opacity-80 scale-x-[-1] mix-blend-screen">
                <svg
                    viewBox="0 0 1000 800"
                    preserveAspectRatio="none"
                    className="w-full h-full object-cover transform -translate-y-20 scale-125"
                >
                    <defs>
                        <linearGradient id="homeNewsWaveGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#4caf50" stopOpacity="0.0" />
                            <stop offset="30%" stopColor="#1f6930" stopOpacity="0.2" />
                            <stop offset="50%" stopColor="#0D2D3A" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#0A3040" stopOpacity="0.8" />
                        </linearGradient>
                    </defs>
                    <path
                        fill="url(#homeNewsWaveGradient)"
                        d="M 0,800 C 120,785 280,780 440,710 C 620,630 780,520 900,280 C 960,150 985,60 1000,0 L 1000,800 Z"
                    />
                    <path
                        d="M 350,800 C 550,760 850,650 1000,350 L 1000,800 Z"
                        fill="#4caf50"
                        fillOpacity="0.1"
                    />
                </svg>
            </div>

            <div className="container mx-auto px-6 lg:px-16 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50/10 text-teal-300 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-teal-400/20">
                            <Newspaper className="w-4 h-4" />
                            Research & Updates
                        </div>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight">
                            Latest Biotech <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Insights</span>
                        </h2>
                    </div>
                    
                    <Link 
                        href="/news" 
                        className="group flex items-center gap-2 text-white/80 font-bold hover:text-teal-400 transition-colors"
                    >
                        View All News
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8" ref={cardsRef}>
                    {posts.slice(0, 3).map((post) => (
                        <Link 
                            key={post._id} 
                            href={`/news/${post.slug}`}
                            className="group bg-white/5 backdrop-blur-md p-8 rounded-[2rem] border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-teal-500/50 hover:shadow-[0_0_30px_rgba(20,184,166,0.15)] flex flex-col h-full relative overflow-hidden"
                        >
                            <div className="flex items-center gap-2 text-teal-300 text-xs font-bold mb-6">
                                <Calendar className="w-3.5 h-3.5" />
                                {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                            </div>
                            
                            <h3 className="text-xl font-display font-bold text-white mb-4 group-hover:text-teal-400 transition-colors line-clamp-2 relative z-10">
                                {post.title}
                            </h3>
                            
                            <p className="text-white/60 text-sm leading-relaxed mb-8 line-clamp-3 flex-grow relative z-10">
                                {post.summary}
                            </p>
                            
                            <div className="flex items-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-widest group-hover:gap-3 transition-all mt-auto relative z-10">
                                Read Insight
                                <ArrowRight className="w-4 h-4" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default News;