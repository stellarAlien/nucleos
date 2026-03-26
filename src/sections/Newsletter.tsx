'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Mail, Sparkles, CheckCircle, AlertCircle, Loader2, User } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ─── Types ────────────────────────────────────────────────────────────────────
type FormState = 'idle' | 'loading' | 'success' | 'error';

interface ApiResponse {
  success?: boolean;
  error?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────
const Newsletter = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Form state
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [consentGiven, setConsentGiven] = useState(false);

  // ── GSAP scroll animation (Unchanged) ──────────────────────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        container.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // ── Form submission (Updated for Resend) ────────────────────────────────────
  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!consentGiven) {
      setErrorMessage('Please accept the privacy policy to continue.');
      setFormState('error');
      return;
    }

    setFormState('loading');
    setErrorMessage('');

    try {
      // Updated endpoint to /api/newsletter
      const res = await fetch('/api/resend/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.toLowerCase().trim(),
          firstName: firstName.trim(),
        }),
      });

      const data: ApiResponse = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      setFormState('success');
      setEmail('');
      setFirstName('');
      setConsentGiven(false);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setErrorMessage(message);
      setFormState('error');
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-white overflow-hidden"
    >
      {/* Soft decorative blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-teal/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div
          ref={containerRef}
          className="max-w-5xl mx-auto bg-navy rounded-[3rem] p-10 lg:p-20 relative overflow-hidden shadow-2xl shadow-navy/20"
        >
          {/* Background dot pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg width="100%" height="100%" className="text-white">
              <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="currentColor" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#dots)" />
            </svg>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* ── Left: Copy ───────────────────────────────────────────────── */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-brand-teal rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-white/5">
                <Sparkles className="w-4 h-4" />
                Exclusive Insights
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
                Stay at the{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-green">
                  Cutting Edge
                </span>
              </h2>
              <p className="text-lg text-slate-400 leading-relaxed">
                Stay at the cutting edge of Biotechnology with curated insights on CGT, AI × bio
                innovation, advances in biomanufacturing, key policy updates, emerging career
                opportunities, and exclusive content available only to members.
              </p>
            </div>

            {/* ── Right: Form / States ─────────────────────────────────────── */}
            <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10 backdrop-blur-sm">

              {/* SUCCESS STATE */}
              {formState === 'success' ? (
                <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-brand-teal/20 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-brand-teal" />
                  </div>
                  <h3 className="text-white font-bold text-xl">You're in!</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Welcome to Nucleos. Check your inbox — your first insight is on its way.
                  </p>
                  <button
                    onClick={() => setFormState('idle')}
                    className="text-xs text-slate-500 hover:text-slate-300 transition-colors mt-2 underline underline-offset-2"
                  >
                    Subscribe another email
                  </button>
                </div>
              ) : (
                /* FORM STATE */
                <form onSubmit={handleSubscribe} noValidate aria-label="Newsletter signup" className="flex flex-col gap-4">

                  {/* First Name */}
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First name (optional)"
                      maxLength={100}
                      disabled={formState === 'loading'}
                      className="w-full bg-navy/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-teal transition-all disabled:opacity-50"
                    />
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      maxLength={254}
                      disabled={formState === 'loading'}
                      className="w-full bg-navy/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-teal transition-all disabled:opacity-50"
                    />
                  </div>

                  {/* GDPR Consent */}
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex-shrink-0 mt-0.5">
                      <input
                        type="checkbox"
                        checked={consentGiven}
                        onChange={(e) => {
                          setConsentGiven(e.target.checked);
                          if (formState === 'error') setFormState('idle');
                        }}
                        disabled={formState === 'loading'}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded border transition-all flex items-center justify-center ${
                        consentGiven
                          ? 'bg-brand-teal border-brand-teal'
                          : 'bg-navy/50 border-white/20'
                      }`}>
                        {consentGiven && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="text-xs text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                      I agree to receive communications from Nucleos and accept the{' '}
                      <a
                        href="/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-teal hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Privacy Policy
                      </a>
                      . You can unsubscribe at any time.
                    </span>
                  </label>

                  {/* Error message */}
                  {formState === 'error' && (
                    <div
                      role="alert"
                      aria-live="assertive"
                      className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                    >
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      {errorMessage}
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={formState === 'loading'}
                    aria-busy={formState === 'loading'}
                    className="group w-full py-4 bg-brand-teal hover:bg-teal-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 active:scale-[0.98] shadow-lg shadow-teal-500/20"
                  >
                    {formState === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Saving…
                      </>
                    ) : (
                      <>
                        Subscribe Now
                        <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </>
                    )}
                  </button>

                  <p className="text-xs text-slate-500 text-center">
                    Join our network of 2,000+ biotech professionals.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;