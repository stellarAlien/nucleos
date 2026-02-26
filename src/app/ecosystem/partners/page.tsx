import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';
import { Users2, MapPin, Building, GraduationCap, ArrowRight } from 'lucide-react';

export default function PartnersPage() {
    const mapUrl = "https://www.google.com/maps/place/Masdar+City+-+Abu+Dhabi+-+United+Arab+Emirates/@24.4038334,54.6313554,12z/data=!4m6!3m5!1s0x3e5e48a369f3f1f1:0x2c78fcb77107ce5b!8m2!3d24.4266734!4d54.614979!16s%2Fm%2F03cmx1s!5m1!1e1?entry=ttu&g_ep=EgoyMDI2MDIyMy4wIKXMDSoASAFQAw%3D%3D";

    return (
        <div className="relative min-h-screen bg-white">
            <Navbar />
            <main className="pt-32 lg:pt-40">
                <section className="pb-20">
                    <div className="container mx-auto px-6 lg:px-16">
                        <div className="max-w-4xl mx-auto text-center">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-teal/10 text-brand-teal rounded-full text-xs font-bold uppercase tracking-widest mb-8">
                                <Users2 className="w-4 h-4" />
                                Collaborative Growth
                            </div>
                            <h1 className="text-4xl md:text-6xl font-display font-bold text-navy mb-6">
                                Part of the <span className="text-brand-teal">Masdar City</span> Innovation Ecosystem
                            </h1>
                            <div className="h-1.5 w-24 bg-brand-green mx-auto mb-10 rounded-full" />
                        </div>
                    </div>
                </section>

                <section className="py-20 bg-slate-50 border-y border-slate-100">
                    <div className="container mx-auto px-6 lg:px-16">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="space-y-8">
                                <p className="text-2xl text-slate-700 leading-relaxed font-medium italic">
                                    "Nucleos Biotech is proudly based in Masdar City, Abu Dhabi, one of the region’s most dynamic and future-focused innovation clusters."
                                </p>
                                <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                                    <p>
                                        As part of the Masdar City ecosystem, we operate at the intersection of biotechnology, AI,
                                        sustainability, and advanced research — surrounded by leading academic institutions,
                                        global technology companies, and high-growth startups.
                                    </p>
                                    <p>
                                        This strategic location strengthens our ability to connect regional ambition with international
                                        expertise, contributing to the advancement of biotechnology across the UAE and the wider GCC.
                                    </p>
                                </div>

                                <div className="pt-8 flex flex-wrap gap-4">
                                    <div className="flex items-center gap-3 px-6 py-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                                        <GraduationCap className="w-6 h-6 text-brand-green" />
                                        <span className="font-bold text-navy">Academic Centers</span>
                                    </div>
                                    <div className="flex items-center gap-3 px-6 py-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                                        <Building className="w-6 h-6 text-brand-teal" />
                                        <span className="font-bold text-navy">Tech Giants</span>
                                    </div>
                                </div>
                            </div>

                            <div className="relative group">
                                <div className="absolute inset-0 bg-brand-teal/5 rounded-[4rem] -rotate-3 transition-transform group-hover:rotate-0" />
                                <div className="relative bg-white p-4 rounded-[4rem] shadow-2xl border border-slate-100 overflow-hidden aspect-video flex flex-col">
                                    {/* Map Preview Placeholder - using a styled card */}
                                    <div className="flex-1 bg-slate-100 rounded-[3rem] flex flex-col items-center justify-center p-8 text-center space-y-6">
                                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                                            <MapPin className="w-10 h-10 text-red-500 animate-bounce" />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-display font-bold text-navy">Masdar City, Abu Dhabi</h4>
                                            <p className="text-slate-500 text-sm mt-1">Visit the Innovation Campus</p>
                                        </div>
                                        <a
                                            href={mapUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-8 py-4 bg-navy text-white rounded-2xl font-bold hover:bg-brand-teal transition-all shadow-xl"
                                        >
                                            View on Google Maps
                                            <ArrowRight className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
