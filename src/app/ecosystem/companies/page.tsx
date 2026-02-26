import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';
import { Building2, Clock } from 'lucide-react';

export default function EcosystemCompaniesPage() {
    return (
        <div className="relative min-h-screen bg-white">
            <Navbar />
            <main className="pt-32 lg:pt-40 flex flex-col items-center justify-center py-20">
                <div className="w-24 h-24 bg-brand-teal/10 rounded-3xl flex items-center justify-center mb-10 text-brand-teal">
                    <Building2 className="w-12 h-12" />
                </div>
                <h1 className="text-5xl font-display font-bold text-navy mb-6">Companies</h1>
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-500 rounded-lg font-bold uppercase tracking-widest text-sm mb-10">
                    <Clock className="w-4 h-4" />
                    Coming Soon
                </div>
                <p className="text-xl text-slate-500 max-w-xl text-center px-6">
                    Highlighting the global technology and life sciences leaders integrated within our convergence cluster.
                </p>
            </main>
            <Footer />
        </div>
    );
}
