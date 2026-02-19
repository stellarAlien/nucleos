import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    id: 1,
    title: 'Expert CGT Knowledge',
    description:
      'Guiding your concepts through the complexity of cell & gene therapy foundations with decades of combined regulatory expertise.',
  },
  {
    id: 2,
    title: 'Customized Approach',
    description:
      "Expertly tailored solutions at every stage — because every organization's challenges and goals are uniquely their own.",
  },
  {
    id: 3,
    title: 'Proven Results',
    description:
      'Partner with our biotech team for appropriate growth strategies backed by a track record of regulatory and commercial success.',
  },
];

const WhyUs = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const waveSvgRef = useRef<SVGSVGElement>(null);
  const wavePathRef = useRef<SVGPathElement>(null);
  const waveAccentRef = useRef<SVGPathElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const featureCards = section.querySelectorAll('.feature-card');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });

      tl.to(waveSvgRef.current, { opacity: 1, duration: 1.4, ease: 'power2.out' })
        .to(wavePathRef.current, { strokeDashoffset: 0, duration: 2, ease: 'power2.out' }, '-=0.8')
        .fromTo(wavePathRef.current, { fillOpacity: 1 }, { fillOpacity: 1, duration: 1 }, '-=1')
        .to(waveAccentRef.current, { fillOpacity: 0.18, duration: 1.5 }, '-=1.5')
        .to(titleRef.current, { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out' }, '-=1.8')
        .to(descRef.current, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=1.4')
        .to(featureCards, { opacity: 1, y: 0, stagger: 0.1, duration: 0.8 }, '-=1.2');

      // Parallax scrub for the background shape
      gsap.to(waveSvgRef.current, {
        yPercent: -5,
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center bg-white overflow-hidden py-20"
    >
      {/* ─── Background SVG Shape (Kept original colors & paths) ────────── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg
          ref={waveSvgRef}
          viewBox="0 0 1000 800"
          preserveAspectRatio="none"
          className="absolute bottom-0 right-0 w-full h-full opacity-0"
          style={{ transformOrigin: 'bottom right' }}
        >
          <defs>
            <linearGradient id="whyWaveGradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F4F6F5" stopOpacity="0" />
              <stop offset="15%" stopColor="#F4F6F5" stopOpacity="0.15" />
              <stop offset="35%" stopColor="#5DBB8A" stopOpacity="0.45" />
              <stop offset="65%" stopColor="#2E8FA3" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#1E2F44" stopOpacity="0.82" />
            </linearGradient>
          </defs>

          <path
            ref={wavePathRef}
            fill="url(#whyWaveGradient)"
            fillOpacity={0}
            stroke="rgba(46,143,163,0.12)"
            strokeWidth="1.5"
            style={{ strokeDasharray: 2500, strokeDashoffset: 2500 }}
            d="M 0,800 C 120,785 280,780 440,710 C 620,630 780,520 900,280 C 960,150 985,60 1000,0 L 1000,800 Z"
          />

          <path
            ref={waveAccentRef}
            d="M 350,800 C 550,760 850,650 1000,350 L 1000,800 Z"
            fill="#2E8FA3"
            fillOpacity="0"
          />
        </svg>
      </div>

      {/* ─── Content ──────────────────────────────────────────────────── */}
      <div className="container relative z-10 mx-auto px-6 lg:px-16">
        <div className="max-w-4xl">
          <header className="mb-16">
            <h2
              ref={titleRef}
              className="text-4xl md:text-6xl font-display font-bold text-[#1E2F44] mb-6 opacity-0 translate-y-10"
            >
              Advancing Biotech and CGT Success
            </h2>
            <p
              ref={descRef}
              className="text-slate-500 text-lg md:text-xl max-w-2xl opacity-0 translate-y-8"
            >
              We provide tailored solutions to drive your biotech and CGT initiatives forward, 
              leveraging a track record of regulatory and commercial success.
            </p>
          </header>

          <div className="space-y-12">
            {benefits.map((benefit) => (
              <div key={benefit.id} className="feature-card opacity-0 translate-y-8 max-w-2xl">
                <div className="flex items-start gap-6 group">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 rounded-full border-2 border-[#5DBB8A] flex items-center justify-center group-hover:bg-[#5DBB8A] transition-colors duration-300">
                      <svg
                        className="w-4 h-4 text-[#5DBB8A] group-hover:text-white transition-colors duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={4}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-[#1E2F44] text-2xl mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-slate-500 text-base leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;