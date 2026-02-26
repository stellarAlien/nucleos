'use client';

import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';
import { Network, Building2, Users2, Rocket, Landmark, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function EcosystemPage() {
    const categories = [
        {
            title: "Partners",
            description: "Leading academic and strategic institutions in Masdar City.",
            href: "/ecosystem/partners",
            icon: Users2,
            status: "Explore"
        },
        {
            title: "Startups",
            description: "The next generation of high-growth Life Sciences ventures.",
            href: "/ecosystem/startups",
            icon: Rocket,
            status: "Coming Soon"
        },
        {
            title: "Companies",
            description: "Global technology and biotech leaders integrated in the cluster.",
            href: "/ecosystem/companies",
            icon: Building2,
            status: "Coming Soon"
        },
        {
            title: "Investors",
            description: "Strategic capital and VC networks driving scientific success.",
            href: "/ecosystem/investors",
            icon: Landmark,
            status: "Coming Soon"
        }
    ];

    return (
        <div className="relative min-h-screen bg-white">
            <Navbar />
            <main className="pt-32 lg:pt-40">
                <section className="pb-20">
                    <div className="container mx-auto px-6 lg:px-16">
                        <div className="max-w-4xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-green/10 text-brand-green rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                                <Network className="w-4 h-4" />
                                Connectivity
                            </div>
                            <h1 className="text-5xl md:text-7xl font-display font-bold text-navy mb-10 leading-tight">
                                Our <span className="text-brand-green">Ecosystem</span>
                            </h1>
                            <p className="text-2xl text-slate-600 leading-relaxed font-light">
                                Bridging global life sciences expertise with regional ambition, Nucleos Biotech sits at the center of
                                knowledge exchange and strategic development in Abu Dhabi.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="py-20 bg-slate-50">
                    <div className="container mx-auto px-6 lg:px-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {categories.map((cat, idx) => {
                                const Icon = cat.icon;
                                const isComingSoon = cat.status === "Coming Soon";

                                return (
                                    <Link
                                        key={idx}
                                        href={cat.href}
                                        className={`group p-12 rounded-[3rem] border border-slate-100 flex flex-col items-start transition-all ${isComingSoon
                                            ? 'bg-slate-50/50 cursor-not-allowed grayscale-[0.5]'
                                            : 'bg-white hover:shadow-2xl hover:shadow-navy/5 hover:-translate-y-1'
                                            }`}
                                        onClick={(e) => isComingSoon && e.preventDefault()}
                                    >
                                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-colors ${isComingSoon ? 'bg-slate-200 text-slate-400' : 'bg-brand-teal/10 text-brand-teal group-hover:bg-brand-teal group-hover:text-white'
                                            }`}>
                                            <Icon className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-3xl font-display font-bold text-navy mb-4">{cat.title}</h3>
                                        <p className="text-lg text-slate-500 leading-relaxed mb-auto">
                                            {cat.description}
                                        </p>

                                        <div className="mt-10 flex items-center gap-2">
                                            <span className={`text-sm font-bold uppercase tracking-widest ${isComingSoon ? 'text-slate-400' : 'text-brand-teal'
                                                }`}>
                                                {cat.status}
                                            </span>
                                            {!isComingSoon && <ArrowUpRight className="w-4 h-4 text-brand-teal" />}
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
