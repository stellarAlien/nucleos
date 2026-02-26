import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';
import { Logo } from '@/components/Logo';
import { Target, Eye, Users } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="relative min-h-screen bg-white">
            <Navbar />
            <main className="pt-24 lg:pt-32">
                {/* Company Description / Who We Are */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-6 lg:px-16">
                        <div className="max-w-4xl mx-auto">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-teal-50 border border-teal-100 rounded-full mb-8 shadow-sm">
                                <Logo className="h-6 w-auto" />
                                <span className="text-sm font-semibold text-teal-700 tracking-wide uppercase">
                                    Who We Are
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-display font-bold text-navy mb-10 leading-tight">
                                A biotechnology convergence platform based in <span className="text-brand-teal">Masdar City, Abu Dhabi.</span>
                            </h1>
                            <p className="text-xl text-slate-600 leading-relaxed italic">
                                Nucleos Biotech is a biotechnology convergence platform based in Masdar City, Abu Dhabi.
                                We connect global life sciences expertise with regional ambition across the UAE and the wider GCC
                                — fostering strategic collaboration between industry, academia, startups, and investors.
                                Operating at the intersection of biotechnology, AI, and ecosystem development, we aim to
                                accelerate innovation, strengthen cross-border partnerships, and contribute to building a resilient,
                                knowledge-driven biotech landscape in the region.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Mission & Vision */}
                <section className="py-20 bg-slate-50">
                    <div className="container mx-auto px-6 lg:px-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="p-10 bg-white rounded-3xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                                <div className="w-14 h-14 bg-brand-green/10 rounded-2xl flex items-center justify-center mb-6">
                                    <Target className="w-8 h-8 text-brand-green" />
                                </div>
                                <h3 className="text-3xl font-display font-bold text-navy mb-6">Mission</h3>
                                <p className="text-lg text-slate-600 leading-relaxed">
                                    Elevating biotech expertise and building a cross-border innovation ecosystem across continents,
                                    connecting global innovation with regional growth.
                                </p>
                            </div>
                            <div className="p-10 bg-white rounded-3xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                                <div className="w-14 h-14 bg-brand-teal/10 rounded-2xl flex items-center justify-center mb-6">
                                    <Eye className="w-8 h-8 text-brand-teal" />
                                </div>
                                <h3 className="text-3xl font-display font-bold text-navy mb-6">Vision</h3>
                                <p className="text-lg text-slate-600 leading-relaxed">
                                    To become the leading biotech convergence platform in UAE and the Middle East,
                                    accelerating scientific advancement and strategic collaboration.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Team */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-6 lg:px-16">
                        <div className="max-w-5xl mx-auto">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-12 h-12 bg-navy/5 rounded-xl flex items-center justify-center">
                                    <Users className="w-6 h-6 text-navy" />
                                </div>
                                <h2 className="text-4xl font-display font-bold text-navy">Our Team</h2>
                            </div>

                            <div className="prose prose-lg prose-slate max-w-none text-slate-600 leading-relaxed">
                                <p className="text-xl font-medium text-slate-800 mb-6">
                                    With more than 25 years of combined experience in biotechnology and life sciences,
                                    our team brings global expertise across the United States, Europe, and the Middle East.
                                </p>
                                <p className="mb-6">
                                    Our background spans advanced biologics, cell & gene therapy, biomanufacturing, strategic consulting,
                                    ecosystem development, and cross-border innovation. We combine scientific depth with strategic execution
                                    — bridging international expertise with regional growth ambitions in the GCC.
                                </p>
                                <p>
                                    At Nucleos Biotech, we believe that sustainable innovation is built through collaboration,
                                    knowledge transfer, and long-term partnerships.
                                </p>
                            </div>

                            {/* Future extensibility: photo/bio cards could be added here */}
                            <div className="mt-16 p-8 border-2 border-dashed border-slate-100 rounded-3xl text-center hidden">
                                <p className="text-slate-400">Team profiles coming soon</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
