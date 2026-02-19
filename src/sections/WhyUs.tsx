import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, TrendingUp, Users, Target } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    id: 1,
    title: 'Expert CGT Knowledge',
    description:
      'Our team comprises seasoned professionals with deep expertise in cell and gene therapy, bringing decades of combined experience from leading biotech organizations and regulatory bodies.',
    icon: TrendingUp,
  },
  {
    id: 2,
    title: 'Customized Approach',
    description:
      'We understand that every organization is unique. Our solutions are tailored to your specific needs, challenges, and goals, ensuring maximum impact and sustainable growth.',
    icon: Target,
  },
  {
    id: 3,
    title: 'Proven Results',
    description:
      'Our track record speaks for itself. We have successfully guided numerous biotech companies through complex regulatory pathways, accelerating their path to market.',
    icon: Users,
  },
];

const WhyUs = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const wavesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const waves = wavesRef.current;

    if (!section || !content || !waves) return;

    const ctx = gsap.context(() => {
      // Header animation
      const header = content.querySelector('.section-header');
      if (header) {
        gsap.fromTo(
          header.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: header,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Benefit items stagger animation (left-to-right)
      const benefitItems = content.querySelectorAll('.benefit-item');
      gsap.fromTo(
        benefitItems,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: benefitItems[0],
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Wave parallax
      const waveElements = waves.querySelectorAll('.wave-layer');
      waveElements.forEach((wave, index) => {
        gsap.to(wave, {
          y: -30 * (index + 1),
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 lg:py-32 overflow-hidden bg-slate-50"
    >
      {/* Decorative Wave Background */}
      <div ref={wavesRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Wave Layer 1 - Back */}
        <svg
          className="wave-layer absolute -top-20 left-0 w-[150%] h-auto opacity-30"
          viewBox="0 0 1440 400"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M0,100 C240,200 480,0 720,100 C960,200 1200,0 1440,100 L1440,400 L0,400 Z"
            fill="url(#whyWaveGradient1)"
          />
          <defs>
            <linearGradient id="whyWaveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0891b2" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#4caf50" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#1a2e5a" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>

        {/* Wave Layer 2 - Middle */}
        <svg
          className="wave-layer absolute top-20 -right-20 w-[130%] h-auto opacity-40"
          viewBox="0 0 1440 350"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M0,150 C360,50 720,250 1080,150 C1260,100 1350,200 1440,150 L1440,350 L0,350 Z"
            fill="url(#whyWaveGradient2)"
          />
          <defs>
            <linearGradient id="whyWaveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1a2e5a" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#0891b2" stopOpacity="0.25" />
            </linearGradient>
          </defs>
        </svg>

        {/* Wave Layer 3 - Front */}
        <svg
          className="wave-layer absolute -bottom-10 left-0 w-full h-auto opacity-50"
          viewBox="0 0 1440 300"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M0,200 C480,100 960,300 1440,200 L1440,300 L0,300 Z"
            fill="url(#whyWaveGradient3)"
          />
          <defs>
            <linearGradient id="whyWaveGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4caf50" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#0891b2" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div ref={contentRef} className="relative z-10 section-padding">
        {/* Section Header */}
        <div className="section-header text-center mb-16 lg:mb-20">
          <span className="inline-block px-4 py-2 bg-brand-green/10 text-brand-green text-sm font-semibold rounded-full mb-4">
            Why Choose Us
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-navy mb-4">
            Advancing Biotech and CGT Success
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            We provide tailored solutions to drive your biotech and CGT initiatives forward, 
            combining deep industry expertise with innovative strategies.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit) => {
            const IconComponent = benefit.icon;
            return (
              <div
                key={benefit.id}
                className="benefit-item group relative bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-500"
              >
                {/* Icon */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-brand-teal/20 to-brand-green/20 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <IconComponent className="w-8 h-8 text-brand-teal" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-display font-bold text-navy mb-3 group-hover:text-brand-teal transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {benefit.description}
                </p>

                {/* Decorative line */}
                <div className="absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r from-brand-teal to-brand-green rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            );
          })}
        </div>

        {/* Stats Row */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {[
            { value: '150+', label: 'Projects Delivered' },
            { value: '50+', label: 'Expert Consultants' },
            { value: '25+', label: 'Countries Served' },
            { value: '98%', label: 'Client Satisfaction' },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm"
            >
              <div className="text-3xl lg:text-4xl font-display font-bold text-gradient mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-slate-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
