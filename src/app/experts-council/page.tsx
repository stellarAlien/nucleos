import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';
import { Users, Sparkles } from 'lucide-react';

export default function ExpertsCouncilPage() {
    return (
        <div className="relative min-h-screen bg-white">
            <Navbar />
            <main className="pt-24 lg:pt-32">
                <section className="py-20 lg:py-32 bg-white">
                    <div className="container mx-auto px-6 lg:px-16 mt-12">
                        <div className="max-w-4xl mx-auto text-center">
                            <div className="w-24 h-24 bg-teal-50 rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-sm border border-teal-100">
                                <Users className="w-12 h-12 text-brand-teal" />
                            </div>

                            <h1 className="text-5xl md:text-7xl font-display font-bold text-navy mb-8">
                                Experts <span className="text-brand-teal">Council</span>
                            </h1>

                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-green/10 text-brand-green font-bold rounded-lg mb-10 uppercase tracking-widest text-sm">
                                <Sparkles className="w-4 h-4" />
                                Coming Soon
                            </div>

                            <div className="bg-slate-50 p-10 md:p-16 rounded-[3rem] border border-slate-100 shadow-sm text-left">
                                <p className="text-xl md:text-2xl text-slate-700 leading-relaxed mb-8">
                                    We are currently assembling our international Experts Council — a curated group of scientific leaders,
                                    industry executives, and strategic advisors from the US, Europe, and the GCC.
                                </p>
                                <p className="text-lg text-slate-600 leading-relaxed">
                                    Stay tuned for updates as we formalize this advisory board to further strengthen our global
                                    perspective and regional impact. This increases our credibility significantly by uniting
                                    world-class expertise with regional ambition.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
