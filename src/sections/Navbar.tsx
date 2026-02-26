import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Logo } from '../components/Logo';

interface SubItem {
  label: string;
  href: string;
  description?: string;
}

interface NavLink {
  label: string;
  href: string;
  children?: SubItem[];
}

const navLinks: NavLink[] = [
  { label: 'Home', href: '#home' },
  {
    label: 'Partners',
    href: '#partners',
    children: [
      { label: 'Strategic Partners', href: '#partners', description: 'Our global strategic alliances' },
      { label: 'Research Partners', href: '#partners', description: 'Academic & research collaborations' },
      { label: 'Industry Partners', href: '#partners', description: 'Biotech & pharma partnerships' },
    ],
  },
  {
    label: 'Events',
    href: '#services',
    children: [
      { label: 'Upcoming Events', href: '#services', description: 'Conferences & symposiums ahead' },
      { label: 'Past Events', href: '#services', description: 'Archive of our summits' },
      { label: 'Submit an Event', href: '#contact', description: 'Propose a new event' },
    ],
  },
  {
    label: 'Training',
    href: '#services',
    children: [
      { label: 'Strategic Training', href: '#services', description: 'Cell & gene therapy fundamentals' },
      { label: 'Regulatory Workshops', href: '#services', description: 'Compliance & regulatory guidance' },
      { label: 'Certification Courses', href: '#services', description: 'Accredited professional programs' },
    ],
  },
  {
    label: 'Consulting',
    href: '#services',
    children: [
      { label: 'Strategic Consultancy', href: '#services', description: 'End-to-end CGT consultancy' },
      { label: 'Process Development', href: '#services', description: 'Manufacturing & scale-up' },
      { label: 'Market Access', href: '#services', description: 'Commercialization strategies' },
    ],
  },
  {
    label: 'News',
    href: '#insights',
    children: [
      { label: 'Latest News', href: '#insights', description: 'Current biotech & CGT updates' },
      { label: 'Press Releases', href: '#insights', description: 'Official Nucleos announcements' },
      { label: 'Publications', href: '#insights', description: 'Research & white papers' },
    ],
  },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    gsap.fromTo(
      nav,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    );

    const navItems = nav.querySelectorAll('.nav-item');
    gsap.fromTo(
      navItems,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out', delay: 0.5 }
    );
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const handleMouseEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg py-3"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollToSection('#home'); }}
            className="flex items-center gap-2 nav-item flex-shrink-0"
          >
            <Logo
              className="h-8 w-auto lg:h-10 transition-all duration-300"
              textColor="#1B3668"
              subTextColor="#9BA4B4"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative nav-item"
                  onMouseEnter={() => handleMouseEnter(link.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 text-navy/70 hover:text-navy hover:bg-slate-50 ${openDropdown === link.label ? 'text-navy bg-slate-50' : ''
                      }`}
                  >
                    {link.label}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${openDropdown === link.label ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-2xl shadow-xl shadow-navy/10 border border-slate-100 overflow-hidden transition-all duration-200 origin-top ${openDropdown === link.label
                      ? 'opacity-100 scale-100 pointer-events-auto'
                      : 'opacity-0 scale-95 pointer-events-none'
                      }`}
                  >
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-white border-l border-t border-slate-100" />
                    <div className="relative p-2">
                      {link.children.map((child) => (
                        <button
                          key={child.label}
                          onClick={() => scrollToSection(child.href)}
                          className="w-full text-left px-4 py-3 rounded-xl hover:bg-teal-50 group transition-colors duration-200"
                        >
                          <span className="block text-sm font-semibold text-navy group-hover:text-brand-teal transition-colors">
                            {child.label}
                          </span>
                          {child.description && (
                            <span className="block text-xs text-slate-400 mt-0.5 leading-snug">
                              {child.description}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                  className="nav-item px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 text-navy/70 hover:text-navy hover:bg-slate-50"
                >
                  {link.label}
                </a>
              )
            )}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block nav-item flex-shrink-0">
            <a
              href="mailto:info@nucleos-biotech.com"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 no-underline bg-brand-teal text-white hover:bg-teal-600 hover:shadow-lg hover:shadow-teal-500/20"
            >
              Get in Touch
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg transition-colors duration-300 text-navy"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${isMobileMenuOpen ? 'max-h-[80vh] opacity-100 mt-4' : 'max-h-0 opacity-0'
            }`}
        >
          <div className="bg-white rounded-2xl shadow-2xl overflow-y-auto max-h-[70vh] border border-slate-100">
            {navLinks.map((link) => (
              <div key={link.label} className="border-b border-slate-100 last:border-0">
                <button
                  onClick={() => {
                    if (link.children) {
                      setOpenMobileDropdown(openMobileDropdown === link.label ? null : link.label);
                    } else {
                      scrollToSection(link.href);
                    }
                  }}
                  className="w-full flex items-center justify-between px-6 py-4 text-navy font-semibold hover:bg-teal-50 transition-colors"
                >
                  <span>{link.label}</span>
                  {link.children && (
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${openMobileDropdown === link.label ? 'rotate-180' : ''
                        }`}
                    />
                  )}
                </button>

                {link.children && (
                  <div
                    className={`overflow-hidden transition-all duration-300 ${openMobileDropdown === link.label ? 'max-h-96' : 'max-h-0'
                      }`}
                  >
                    <div className="bg-white px-4 pb-3 pt-1">
                      {link.children.map((child) => (
                        <button
                          key={child.label}
                          onClick={() => scrollToSection(child.href)}
                          className="w-full text-left px-4 py-3 rounded-xl hover:bg-white group transition-colors"
                        >
                          <span className="block text-sm font-semibold text-navy/80 group-hover:text-brand-teal transition-colors">
                            {child.label}
                          </span>
                          {child.description && (
                            <span className="block text-xs text-slate-400 mt-0.5">{child.description}</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;