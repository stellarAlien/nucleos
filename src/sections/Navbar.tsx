import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Menu, X, Dna } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Insights', href: '#insights' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    // Initial animation - fade in + slide down
    gsap.fromTo(
      nav,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    );

    // Animate nav items stagger
    const navItems = nav.querySelectorAll('.nav-item');
    gsap.fromTo(
      navItems,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out', delay: 0.5 }
    );

    // Scroll handler for background change
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="w-full section-padding">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#home');
            }}
            className="flex items-center gap-2 nav-item"
          >
            <div className="relative">
              <Dna className={`w-8 h-8 transition-colors duration-300 ${
                isScrolled ? 'text-brand-teal' : 'text-white'
              }`} />
            </div>
            <div className="flex flex-col">
              <span className={`font-display font-bold text-lg leading-tight transition-colors duration-300 ${
                isScrolled ? 'text-navy' : 'text-white'
              }`}>
                NUCLEOS
              </span>
              <span className={`text-[10px] tracking-[0.2em] leading-tight transition-colors duration-300 ${
                isScrolled ? 'text-brand-teal' : 'text-white/80'
              }`}>
                BIOTECH
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className={`nav-item text-sm font-medium transition-all duration-300 hover:opacity-100 relative group ${
                  isScrolled
                    ? 'text-navy/70 hover:text-navy'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                  isScrolled ? 'bg-brand-teal' : 'bg-white'
                }`} />
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block nav-item">
            <button
              onClick={() => scrollToSection('#contact')}
              className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 ${
                isScrolled
                  ? 'bg-navy text-white hover:bg-navy-600 hover:shadow-lg hover:shadow-navy/20'
                  : 'bg-white/10 backdrop-blur-sm text-white border border-white/30 hover:bg-white/20'
              }`}
            >
              Contact Us
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors duration-300 ${
              isScrolled ? 'text-navy' : 'text-white'
            }`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            isMobileMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-xl">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="block py-3 text-navy/80 hover:text-navy font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => scrollToSection('#contact')}
              className="w-full mt-4 px-6 py-3 bg-navy text-white rounded-lg font-semibold hover:bg-navy-600 transition-colors"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
