import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const waveRef = useRef<SVGSVGElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const subtitle = subtitleRef.current;
    const cta = ctaRef.current;
    const wave = waveRef.current;
    const content = contentRef.current;

    if (!section || !headline || !subtitle || !cta || !wave || !content) return;

    const ctx = gsap.context(() => {
      // ── 1. Word-by-word headline reveal ──────────────────────────────
      const words = headline.innerText.split(' ');
      headline.innerHTML = words
        .map((word) => `<span class="inline-block overflow-hidden"><span class="word inline-block">${word}</span></span>`)
        .join(' ');

      const wordElements = headline.querySelectorAll('.word');
      gsap.fromTo(
        wordElements,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out', delay: 0.5 }
      );

      // ── 2. Subtitle + CTA entrance ───────────────────────────────────
      gsap.fromTo(subtitle, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 1.2 });
      gsap.fromTo(cta, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)', delay: 1.5 });

      // ── 3. Wave parallax scrub ───────────────────────────────────────
      gsap.to(wave, {
        y: -50,
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // ── 4. Smart scroll-direction hide/show for hero content ─────────
      // Uses yPercent (composite-only, GPU-accelerated, no layout repaint)
      const showAnim = gsap.from(content, {
        yPercent: -8,
        opacity: 0,
        paused: true,
        duration: 0.4,
        ease: 'power2.out',
      }).progress(1); // start fully visible

      ScrollTrigger.create({
        start: 'top top',
        end: 'max',
        onUpdate: (self) => {
          // Fade/slide content out when scrolling down past hero, restore on scroll-up
          if (self.direction === 1) {
            showAnim.reverse();
          } else {
            showAnim.play();
          }
        },
      });

      // ── 5. Background image parallax ─────────────────────────────────
      const bgImg = section.querySelector<HTMLImageElement>('.hero-bg-img');
      if (bgImg) {
        gsap.to(bgImg, {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-bg.jpg"
          alt="Biotech Laboratory"
          className="hero-bg-img w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/40" />
        {/* Bottom fade for wave transition */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* Decorative Wave SVG */}
      <svg
        ref={waveRef}
        className="absolute bottom-0 left-0 right-0 w-full h-[350px] z-10"
        viewBox="0 0 1440 350"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="waveHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D4E79E" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#5DBB8A" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#2E8FA3" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="waveMain" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5DBB8A" />
            <stop offset="40%" stopColor="#2E8FA3" />
            <stop offset="100%" stopColor="#1E2F44" />
          </linearGradient>
          <linearGradient id="waveDeep" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2E8FA3" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#1E2F44" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <path d="M0,350 L0,220 C300,320 600,150 900,280 C1100,360 1300,200 1440,250 L1440,350 Z" fill="url(#waveDeep)" fillOpacity="0.4" />
        <path d="M0,350 L0,260 C360,180 720,380 1080,260 C1260,200 1380,240 1440,280 L1440,350 Z" fill="url(#waveMain)" fillOpacity="0.7" />
        <path d="M0,350 L0,280 C400,250 800,400 1440,220 L1440,350 Z" fill="url(#waveHighlight)" />
        <rect x="0" y="348" width="1440" height="2" fill="white" />
      </svg>

      {/* Content — wrapped in ref for scroll-direction animation */}
      <div ref={contentRef} className="relative z-20 w-full section-padding pt-32 pb-48">
        <div className="max-w-4xl">
          <h1
            ref={headlineRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.1] mb-6"
          >
            Driving Excellence in Cell &amp; Gene Therapy Consulting
          </h1>

          <p
            ref={subtitleRef}
            className="text-lg sm:text-xl text-white/80 max-w-2xl mb-10 leading-relaxed"
          >
            Expert solutions for advancing biotech and CGT initiatives. We partner with
            leading organizations to accelerate innovation and achieve regulatory success.
          </p>

          <button
            ref={ctaRef}
            onClick={scrollToContact}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-brand-green text-white font-semibold rounded-xl transition-all duration-300 hover:bg-brand-green-600 hover:shadow-xl hover:shadow-brand-green/30 hover:-translate-y-1 active:scale-95"
          >
            Get in Touch
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Floating decorative blobs */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-brand-teal/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-brand-green/10 rounded-full blur-3xl animate-pulse animation-delay-500" />
    </section>
  );
};

export default Hero;
