import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';
import { Newspaper, Bell, ArrowRight } from 'lucide-react';

export default function NewsPage() {
    const newsItems = [
        {
            title: "Nucleos Biotech Establishes Presence in Masdar City",
            date: "February 2026",
            category: "Milestone",
            description: "We are excited to announce our formal establishment in Abu Dhabi's premier innovation cluster.",
        },
        {
            title: "Strategic Partnerships in the GCC Life Sciences Sector",
            date: "January 2026",
            category: "Strategy",
            description: "Forging new paths for biotechnology convergence across UAE and European markets.",
        }
    ];

    return (
        <div className="relative min-h-screen bg-white">
            <Navbar />
            <main className="pt-32 lg:pt-40 pb-20">
                <div className="container mx-auto px-6 lg:px-16">
                    <header className="max-w-3xl mb-20">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-teal/10 text-brand-teal rounded-full text-sm font-bold uppercase tracking-wider mb-6">
                            <Bell className="w-4 h-4" />
                            Nucleos Updates
                        </div>
                        <h1 className="text-5xl md:text-7xl font-display font-bold text-navy mb-8 leading-tight">
                            Biotech <span className="text-brand-teal">Insights</span> & News
                        </h1>
                        <p className="text-xl text-slate-600 leading-relaxed">
                            Stay updated with the latest developments at the intersection of biotechnology, AI, and ecosystem growth in the GCC.
                        </p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                        {newsItems.map((item, index) => (
                            <div key={index} className="group p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 transition-all hover:bg-white hover:shadow-xl hover:shadow-navy/5">
                                <div className="flex justify-between items-start mb-6">
                                    <span className="text-sm font-bold text-brand-teal uppercase tracking-widest">{item.category}</span>
                                    <span className="text-sm text-slate-400 font-medium">{item.date}</span>
                                </div>
                                <h3 className="text-2xl font-display font-bold text-navy mb-4 group-hover:text-brand-teal transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-slate-600 leading-relaxed mb-8">
                                    {item.description}
                                </p>
                                <div className="flex items-center gap-2 text-navy font-bold text-sm tracking-wide group-hover:gap-3 transition-all">
                                    Read Full Update
                                    <ArrowRight className="w-4 h-4 text-brand-teal" />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-12 bg-navy rounded-[3rem] text-center text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-teal/10 rounded-full blur-3xl -mr-32 -mt-32" />
                        <div className="relative z-10">
                            <Newspaper className="w-16 h-16 text-brand-teal mx-auto mb-6" />
                            <h2 className="text-3xl font-display font-bold mb-4">Subscribe for More Updates</h2>
                            <p className="text-slate-400 mb-10 max-w-xl mx-auto">
                                Get monthly summaries of regional biotech growth, regulatory updates, and ecosystem opportunities.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-teal transition-all"
                                />
                                <button className="px-8 py-4 bg-brand-teal text-white rounded-2xl font-bold hover:bg-teal-600 transition-all">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
