import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';
import { Rocket, Clock } from 'lucide-react';

export default function EcosystemStartupsPage() {
    return (
        <div className="relative min-h-screen bg-white">
            <Navbar />
            <main className="pt-32 lg:pt-40 flex flex-col items-center justify-center py-20">
                <div className="w-24 h-24 bg-brand-green/10 rounded-3xl flex items-center justify-center mb-10 text-brand-green">
                    <Rocket className="w-12 h-12" />
                </div>
                <h1 className="text-5xl font-display font-bold text-navy mb-6">Startups</h1>
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-500 rounded-lg font-bold uppercase tracking-widest text-sm mb-10">
                    <Clock className="w-4 h-4" />
                    Coming Soon
                </div>
                <p className="text-xl text-slate-500 max-w-xl text-center px-6">
                    We are mapping the most innovative biotech and life sciences startups currently scaling in the Masdar City ecosystem.
                </p>
            </main>
            <Footer />
        </div>
    );
}
