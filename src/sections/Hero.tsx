import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const waveRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const subtitle = subtitleRef.current;
    const cta = ctaRef.current;
    const wave = waveRef.current;

    if (!section || !headline || !subtitle || !cta || !wave) return;

    const ctx = gsap.context(() => {
      // Split headline into words
      const words = headline.innerText.split(' ');
      headline.innerHTML = words
        .map((word) => `<span class="inline-block overflow-hidden"><span class="word inline-block">${word}</span></span>`)
        .join(' ');

      const wordElements = headline.querySelectorAll('.word');

      // Word-by-word stagger animation
      gsap.fromTo(
        wordElements,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          delay: 0.5,
        }
      );

      // Subtitle fade in
      gsap.fromTo(
        subtitle,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 1.2 }
      );

      // CTA button scale up
      gsap.fromTo(
        cta,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)', delay: 1.5 }
      );

      // Wave parallax on scroll
      gsap.to(wave, {
        y: -50,
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/40" />
        {/* Bottom fade for wave transition */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* Decorative Wave SVG */}
      <svg
        ref={waveRef}
        className="absolute bottom-0 left-0 right-0 w-full h-auto z-10"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          fill="url(#waveGradient1)"
          fillOpacity="0.3"
        />
        <path
          d="M0,256L48,261.3C96,267,192,277,288,266.7C384,256,480,224,576,213.3C672,203,768,213,864,234.7C960,256,1056,288,1152,282.7C1248,277,1344,235,1392,213.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          fill="url(#waveGradient2)"
          fillOpacity="0.5"
        />
        <defs>
          <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1a2e5a" />
            <stop offset="100%" stopColor="#0891b2" />
          </linearGradient>
          <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0891b2" />
            <stop offset="100%" stopColor="#4caf50" />
          </linearGradient>
        </defs>
      </svg>

      {/* Content */}
      <div className="relative z-20 w-full section-padding pt-32 pb-48">
        <div className="max-w-4xl">
          <h1
            ref={headlineRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.1] mb-6"
          >
            Driving Excellence in Cell & Gene Therapy Consulting
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

      {/* Floating decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-brand-teal/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-brand-green/10 rounded-full blur-3xl animate-pulse animation-delay-500" />
    </section>
  );
};

export default Hero;
