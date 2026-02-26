'use client';

import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from '@/sections/Navbar';
import Hero from '@/sections/Hero';
import WhoWeAre from '@/sections/WhoWeAre';
import WhyTrust from '@/sections/WhyTrust';
import OurEcosystem from '@/sections/OurEcosystem';
import News from '@/sections/News';
import Services from '@/sections/Services';
import StartCollaboration from '@/sections/StartCollaboration';
import Newsletter from '@/sections/Newsletter';
import Footer from '@/sections/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function ClientApp() {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Initialize Lenis smooth scroll
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        lenisRef.current = lenis;

        // Connect Lenis to GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        // Cleanup
        return () => {
            lenis.destroy();
            gsap.ticker.remove((time) => {
                lenis.raf(time * 1000);
            });
        };
    }, []);

    return (
        <div className="relative">
            <Navbar />
            <main>
                <Hero />
                <WhoWeAre />
                <WhyTrust />
                <OurEcosystem />
                <News />
                <Services />
                <StartCollaboration />
                <Newsletter />
            </main>
            <Footer />
        </div>
    );
}
