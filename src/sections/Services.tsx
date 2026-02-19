import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, GraduationCap, Microscope, ArrowUpRight, Dna, Atom } from 'lucide-react';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 1,
    title: 'Events Organization',
    description:
      'We orchestrate premier scientific conferences, symposiums, and networking events that connect industry leaders, foster collaboration, and showcase cutting-edge research in biotechnology and CGT.',
    image: '/images/service-events.jpg',
    icon: Calendar,
    features: ['Scientific Conferences', 'Industry Summits', 'Networking Events', 'Workshop Coordination'],
    color: 'from-emerald-400 to-cyan-600',
  },
  {
    id: 2,
    title: 'Training',
    description:
      'Comprehensive training programs designed to equip your team with the knowledge and skills needed to excel in biotech innovation, regulatory compliance, and advanced therapeutic development.',
    image: '/images/service-training.jpg',
    icon: GraduationCap,
    features: ['Regulatory Training', 'Technical Workshops', 'Leadership Programs', 'Certification Courses'],
    color: 'from-teal-400 to-emerald-600',
  },
  {
    id: 3,
    title: 'Cell & Gene Therapy',
    description:
      'End-to-end consultancy in biotech innovation, from early-stage research to commercialization. We provide strategic guidance for CGT development, manufacturing, and market entry.',
    image: '/images/service-cgt.jpg',
    icon: Microscope,
    features: ['Strategic Consulting', 'Regulatory Affairs', 'Process Development', 'Market Access'],
    color: 'from-cyan-400 to-blue-600',
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const horizontal = horizontalRef.current;

    if (!section || !container || !horizontal) return;

    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenisRef.current?.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    const scrollWidth = horizontal.scrollWidth - window.innerWidth;

    const horizontalScroll = gsap.to(horizontal, {
      x: -scrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${scrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (progressRef.current) {
            gsap.to(progressRef.current, {
              scaleX: self.progress,
              duration: 0.1,
              ease: 'none',
            });
          }
        },
      },
    });

    const cards = horizontal.querySelectorAll('.service-card');
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        {
          y: 80,
          opacity: 0,
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            containerAnimation: horizontalScroll,
            start: 'left 85%',
            end: 'left 50%',
            scrub: 1,
          },
        }
      );
    });

    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    return () => {
      lenisRef.current?.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="services" className="relative bg-slate-50 overflow-hidden">
      {/* Background DNA Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dna-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M50 0 Q80 25 50 50 T50 100" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-teal-600" />
              <path d="M50 0 Q20 25 50 50 T50 100" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-emerald-600" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dna-pattern)" />
        </svg>
      </div>

      {/* Section Header */}
      <div className="relative z-10 py-20 lg:py-28 section-padding">
        <div ref={titleRef} className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-teal-100 rounded-full mb-6 shadow-sm">
            <Dna className="w-4 h-4 text-teal-600" />
            <span className="text-sm font-semibold text-teal-700 tracking-wide uppercase">
              What We Offer
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-slate-900 mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-500">Services</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Strategic solutions engineered for biotech excellence. Scroll horizontally to explore our specialized capabilities.
          </p>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div ref={containerRef} className="relative h-screen overflow-hidden">
        {/* Progress Bar */}
        <div className="absolute top-6 left-8 right-8 z-50 h-0.5 bg-slate-200 rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 text-slate-400 text-sm font-medium bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200">
          <Atom className="w-4 h-4 animate-spin-slow" />
          <span>Scroll to explore</span>
        </div>

        {/* Horizontal Track */}
        <div
          ref={horizontalRef}
          className="flex items-center h-full pl-[5vw] pr-[25vw] gap-6 lg:gap-8"
          style={{ width: 'max-content' }}
        >
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                className="service-card group relative w-[85vw] md:w-[50vw] lg:w-[35vw] h-[75vh] flex-shrink-0"
              >
                {/* Card Container */}
                <div className="relative h-full bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-teal-100/50 group-hover:border-teal-100">

                  {/* Image Layer */}
                  <div className="absolute inset-0">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-75"
                    />
                    {/* Gradient Overlay - Darker on hover for text clarity */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-70 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-60`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-slate-800/30 transition-all duration-500 group-hover:from-slate-950 group-hover:via-slate-950/80" />

                    {/* Cellular Pattern Overlay */}
                    <div className="absolute inset-0 opacity-10 mix-blend-overlay">
                      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <circle cx="20" cy="20" r="15" fill="white" className="animate-pulse" />
                        <circle cx="80" cy="80" r="20" fill="white" className="animate-pulse" style={{ animationDelay: '1s' }} />
                        <circle cx="80" cy="20" r="10" fill="white" />
                      </svg>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-end p-8 lg:p-10 text-white">
                    {/* Index Number */}
                    <div className="absolute top-6 right-6 flex items-start gap-1 opacity-50 group-hover:opacity-30 transition-opacity duration-500">
                      <span className="text-6xl font-display font-bold">0</span>
                      <span className="text-6xl font-display font-bold text-white/60">{index + 1}</span>
                    </div>

                    {/* Floating Icon */}
                    <div className="relative mb-6">
                      <div className="w-14 h-14 bg-white/15 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 transition-all duration-500 group-hover:scale-110 group-hover:bg-white/25 shadow-lg">
                        <IconComponent className="w-7 h-7 text-white" />
                      </div>
                      <div className="absolute inset-0 rounded-2xl border border-white/20 scale-150 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700" />
                    </div>

                    <h3 className="text-2xl lg:text-3xl font-display font-bold mb-4 leading-tight drop-shadow-lg group-hover:text-white transition-colors duration-300">
                      {service.title}
                    </h3>

                    <p className="text-white/80 text-sm lg:text-base leading-relaxed mb-6 line-clamp-3 group-hover:text-white group-hover:drop-shadow-md transition-all duration-500">
                      {service.description}
                    </p>

                    {/* Feature Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 bg-white/10 backdrop-blur-sm text-white text-xs font-medium rounded-lg border border-white/20 group-hover:bg-white/20 group-hover:border-white/40 transition-all duration-300"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <button className="inline-flex items-center gap-3 text-white font-semibold text-sm group/btn">
                      <span className="relative">
                        Learn More
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover/btn:w-full transition-all duration-300" />
                      </span>
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-teal-600 transition-all duration-300 shadow-lg">
                        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </div>
                    </button>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-tr ${service.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none rounded-[2rem]`} />

                  {/* Corner Accents */}
                  <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-white/20 to-transparent rounded-tl-[2rem] pointer-events-none" />
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-white/10 to-transparent rounded-br-[2rem] pointer-events-none" />
                </div>
              </div>
            );
          })}

          {/* End Card */}
          <div className="flex-shrink-0 w-[40vw] h-[75vh] flex items-center justify-center px-8">
            <div className="text-center max-w-md">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Dna className="w-10 h-10 text-teal-600" />
              </div>
              <h3 className="text-3xl font-display font-bold text-slate-900 mb-4">
                Ready to innovate?
              </h3>
              <p className="text-slate-600 mb-8">
                Let's discuss how we can accelerate your biotech initiatives together.
              </p>
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-teal-500/25 transition-all duration-300 hover:scale-105">
                Start Collaboration
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="h-20 bg-white" />
    </section>
  );
};

export default Services;