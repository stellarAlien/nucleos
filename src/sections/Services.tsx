import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, GraduationCap, Microscope, ArrowUpRight } from 'lucide-react';

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
    color: 'from-brand-teal to-navy',
  },
  {
    id: 2,
    title: 'Training',
    description:
      'Comprehensive training programs designed to equip your team with the knowledge and skills needed to excel in biotech innovation, regulatory compliance, and advanced therapeutic development.',
    image: '/images/service-training.jpg',
    icon: GraduationCap,
    features: ['Regulatory Training', 'Technical Workshops', 'Leadership Programs', 'Certification Courses'],
    color: 'from-brand-green to-brand-teal',
  },
  {
    id: 3,
    title: 'Cell & Gene Therapy (CGT)',
    description:
      'End-to-end consultancy in biotech innovation, from early-stage research to commercialization. We provide strategic guidance for CGT development, manufacturing, and market entry.',
    image: '/images/service-cgt.jpg',
    icon: Microscope,
    features: ['Strategic Consulting', 'Regulatory Affairs', 'Process Development', 'Market Access'],
    color: 'from-navy to-brand-teal',
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const cards = cardsRef.current;

    if (!section || !title || !cards) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        title.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards stagger animation
      const cardElements = cards.querySelectorAll('.service-card');
      gsap.fromTo(
        cardElements,
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cards,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-24 lg:py-32 bg-white overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-slate-50 to-transparent" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-teal/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-brand-green/5 rounded-full blur-3xl" />

      <div className="relative z-10 section-padding">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16 lg:mb-20">
          <span className="inline-block px-4 py-2 bg-brand-teal/10 text-brand-teal text-sm font-semibold rounded-full mb-4">
            What We Offer
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-navy mb-4">
            Our Services
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Strategic Support for Biotech Success. We deliver comprehensive solutions 
            tailored to accelerate your CGT initiatives.
          </p>
        </div>

        {/* Service Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                className="service-card group relative bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-3"
              >
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-60`} />
                  
                  {/* Icon badge */}
                  <div className="absolute top-4 left-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                    <IconComponent className="w-6 h-6 text-navy" />
                  </div>

                  {/* Arrow indicator */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                    <ArrowUpRight className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 lg:p-8">
                  <h3 className="text-xl lg:text-2xl font-display font-bold text-navy mb-3 group-hover:text-brand-teal transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Features list */}
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-medium rounded-lg"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Learn more link */}
                  <div className="mt-6 pt-6 border-t border-slate-100">
                    <button className="group/btn inline-flex items-center gap-2 text-brand-teal font-semibold text-sm hover:text-navy transition-colors duration-300">
                      Learn More
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </button>
                  </div>
                </div>

                {/* Hover glow effect */}
                <div className={`absolute -inset-px bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500 pointer-events-none`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
