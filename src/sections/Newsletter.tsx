'use client';

import { 
  useEffect, 
  useRef, 
  useState, 
  useCallback,
  useId,
  memo 
} from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Mail, 
  Sparkles, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  User,
  ArrowRight,
  Dna,
  Building2,
  Briefcase
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ─── Types ────────────────────────────────────────────────────────────────────
type FormState = 'idle' | 'loading' | 'success' | 'error';

interface ApiResponse {
  success?: boolean;
  error?: string;
  message?: string;
}

interface FormData {
  email: string;
  firstName: string;
  company: string;
  jobTitle: string;
  consentGiven: boolean;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const API_ENDPOINT = '/api/resend/newsletter';
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ─── Custom Hooks ─────────────────────────────────────────────────────────────
// FIX: Accept null in the RefObject type to match useRef<HTMLElement>(null)
const useScrollAnimation = (sectionRef: React.RefObject<HTMLElement | null>) => {
  useEffect(() => {
    // FIX: Use optional chaining to safely access current
    const section = sectionRef?.current;
    if (!section) return;

    const animateElements = section.querySelectorAll('.gsap-animate');
    if (animateElements.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        animateElements,
        { 
          y: 40, 
          opacity: 0, 
          filter: 'blur(8px)',
          scale: 0.98 
        },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          scale: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [sectionRef]);
};

const useNewsletterForm = () => {
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState<FormData>({
    email: '',
    firstName: '',
    company: '',
    jobTitle: '',
    consentGiven: false,
  });

  const validateForm = useCallback((): boolean => {
    if (!formData.consentGiven) {
      setErrorMessage('Please accept the privacy policy to continue.');
      return false;
    }
    if (!formData.email.trim()) {
      setErrorMessage('Please enter your email address.');
      return false;
    }
    if (!EMAIL_REGEX.test(formData.email)) {
      setErrorMessage('Please enter a valid email address.');
      return false;
    }
    return true;
  }, [formData]);

  const handleSubmit = useCallback(async () => {
    if (!validateForm()) {
      setFormState('error');
      return;
    }

    setFormState('loading');
    setErrorMessage('');

    try {
      const res = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email.toLowerCase().trim(),
          firstName: formData.firstName.trim(),
          company: formData.company.trim(),
          jobTitle: formData.jobTitle.trim(),
        }),
      });

      const data: ApiResponse = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      setFormState('success');
      setFormData({ 
        email: '', 
        firstName: '', 
        company: '', 
        jobTitle: '', 
        consentGiven: false 
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setErrorMessage(message);
      setFormState('error');
    }
  }, [formData, validateForm]);

  const resetForm = useCallback(() => {
    setFormState('idle');
    setErrorMessage('');
  }, []);

  const updateField = useCallback(<K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formState === 'error') setFormState('idle');
  }, [formState]);

  return {
    formState,
    errorMessage,
    formData,
    handleSubmit,
    resetForm,
    updateField,
  };
};

// ─── Sub-components ───────────────────────────────────────────────────────────
const Badge = memo(() => (
  <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-teal/10 backdrop-blur-md border border-brand-teal/20 rounded-full text-xs font-bold uppercase tracking-widest text-brand-teal mb-6 shadow-[0_0_15px_rgba(20,184,166,0.2)]">
    <Sparkles className="w-4 h-4" />
    Exclusive Insights
  </div>
));
Badge.displayName = 'Badge';

const SuccessState = memo(({ onReset }: { onReset: () => void }) => (
  <div className="flex flex-col items-center justify-center gap-6 py-12 text-center animate-in fade-in zoom-in duration-700">
    <div className="relative group">
      <div className="absolute inset-0 bg-brand-teal/30 blur-3xl rounded-full transition-all duration-700 group-hover:bg-brand-teal/40 group-hover:blur-[40px]" />
      <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-brand-teal to-teal-700 flex items-center justify-center shadow-2xl shadow-brand-teal/40 ring-1 ring-white/20">
        <CheckCircle className="w-12 h-12 text-white" strokeWidth={2} />
      </div>
    </div>
    <div className="space-y-3 relative z-10">
      <h3 className="text-white font-display font-bold text-3xl">You're in.</h3>
      <p className="text-slate-300 text-sm leading-relaxed max-w-xs mx-auto">
        Welcome to the network. Check your inbox — your first insight is on its way.
      </p>
    </div>
    <button
      onClick={onReset}
      className="text-sm text-brand-teal/70 hover:text-brand-teal transition-colors mt-4 underline underline-offset-4 decoration-brand-teal/30 hover:decoration-brand-teal"
    >
      Subscribe another email
    </button>
  </div>
));
SuccessState.displayName = 'SuccessState';

interface FormFieldsProps {
  formData: FormData;
  formState: FormState;
  errorMessage: string;
  onUpdate: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
  onSubmit: () => void;
}

const FormFields = memo(({ 
  formData, 
  formState, 
  errorMessage, 
  onUpdate, 
  onSubmit 
}: FormFieldsProps) => {
  const emailId = useId();
  const nameId = useId();
  const companyId = useId();
  const jobId = useId();
  const consentId = useId();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      noValidate 
      className="flex flex-col gap-5 relative z-10"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="relative group gsap-animate">
          <div className="absolute inset-0 bg-brand-teal/5 rounded-2xl blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors duration-300 group-focus-within:text-brand-teal z-10">
            <User className="w-5 h-5" />
          </div>
          <input
            id={nameId}
            type="text"
            value={formData.firstName}
            onChange={(e) => onUpdate('firstName', e.target.value)}
            placeholder="First name"
            maxLength={100}
            disabled={formState === 'loading'}
            className="relative w-full bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-brand-teal/50 focus:border-brand-teal/50 transition-all duration-300 hover:border-white/20 text-sm shadow-inner shadow-black/20"
          />
        </div>

        <div className="relative group gsap-animate">
          <div className="absolute inset-0 bg-brand-teal/5 rounded-2xl blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors duration-300 group-focus-within:text-brand-teal z-10">
            <Briefcase className="w-5 h-5" />
          </div>
          <input
            id={jobId}
            type="text"
            value={formData.jobTitle}
            onChange={(e) => onUpdate('jobTitle', e.target.value)}
            placeholder="Job title"
            maxLength={100}
            disabled={formState === 'loading'}
            className="relative w-full bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-brand-teal/50 focus:border-brand-teal/50 transition-all duration-300 hover:border-white/20 text-sm shadow-inner shadow-black/20"
          />
        </div>
      </div>

      <div className="relative group gsap-animate">
        <div className="absolute inset-0 bg-brand-teal/5 rounded-2xl blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors duration-300 group-focus-within:text-brand-teal z-10">
          <Building2 className="w-5 h-5" />
        </div>
        <input
          id={companyId}
          type="text"
          value={formData.company}
          onChange={(e) => onUpdate('company', e.target.value)}
          placeholder="Company (optional)"
          maxLength={100}
          disabled={formState === 'loading'}
          className="relative w-full bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-brand-teal/50 focus:border-brand-teal/50 transition-all duration-300 hover:border-white/20 text-sm shadow-inner shadow-black/20"
        />
      </div>

      <div className="relative group gsap-animate">
        <div className="absolute inset-0 bg-brand-teal/5 rounded-2xl blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors duration-300 group-focus-within:text-brand-teal z-10">
          <Mail className="w-5 h-5" />
        </div>
        <input
          id={emailId}
          type="email"
          value={formData.email}
          onChange={(e) => onUpdate('email', e.target.value)}
          placeholder="Enter your email address"
          required
          maxLength={254}
          disabled={formState === 'loading'}
          className="relative w-full bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-brand-teal/50 focus:border-brand-teal/50 transition-all duration-300 hover:border-white/20 text-sm shadow-inner shadow-black/20"
        />
      </div>

      <label 
        htmlFor={consentId}
        className="flex items-start gap-3 cursor-pointer group/select mt-2 gsap-animate"
      >
        <div className="relative flex-shrink-0 mt-0.5">
          <input
            id={consentId}
            type="checkbox"
            checked={formData.consentGiven}
            onChange={(e) => onUpdate('consentGiven', e.target.checked)}
            disabled={formState === 'loading'}
            className="sr-only"
          />
          <div className={`
            w-5 h-5 rounded-lg border transition-all duration-300 flex items-center justify-center
            ${formData.consentGiven
              ? 'bg-brand-teal border-brand-teal shadow-[0_0_10px_rgba(20,184,166,0.3)]'
              : 'bg-slate-900/60 border-white/20 group-hover/select:border-white/40'
            }
          `}>
            {formData.consentGiven && (
              <svg className="w-3.5 h-3.5 text-slate-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
        </div>
        <span className="text-xs text-slate-400 leading-relaxed group-hover/select:text-slate-300 transition-colors">
          I agree to receive communications and accept the{' '}
          <a
            href="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-teal hover:text-brand-teal/80 underline underline-offset-2 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            Privacy Policy
          </a>
          . You can unsubscribe at any time.
        </span>
      </label>

      {formState === 'error' && (
        <div
          role="alert"
          className="flex items-start gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm animate-in slide-in-from-top-2 duration-300 gsap-animate"
        >
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={formState === 'loading'}
        className="gsap-animate group/btn w-full py-4 mt-2 bg-gradient-to-r from-brand-teal to-teal-600 hover:from-teal-400 hover:to-brand-teal disabled:opacity-60 disabled:cursor-not-allowed text-slate-950 font-bold rounded-2xl transition-all duration-500 flex items-center justify-center gap-2 active:scale-[0.98] shadow-[0_0_20px_rgba(20,184,166,0.2)] hover:shadow-[0_0_30px_rgba(20,184,166,0.4)] relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)] -translate-x-[150%] group-hover/btn:animate-[shimmer_1.5s_infinite]" />
        {formState === 'loading' ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Securing Data…</span>
          </>
        ) : (
          <>
            <span>Subscribe Now</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </>
        )}
      </button>
    </form>
  );
});
FormFields.displayName = 'FormFields';

// ─── Background Components ────────────────────────────────────────────────────
const AuroraBackground = memo(() => (
  <>
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-[50%] -left-[20%] w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.08),transparent_50%)] rounded-full blur-[100px] animate-[pulse_10s_infinite]" />
    </div>
    <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[60%] bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.06),transparent_60%)] rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
    <div className="absolute bottom-[-20%] left-[-10%] w-[70%] h-[70%] bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.04),transparent_60%)] rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
  </>
));
AuroraBackground.displayName = 'AuroraBackground';

const MeshGradient = memo(() => (
  <div className="absolute inset-0 opacity-20 pointer-events-none">
    <svg width="100%" height="100%" className="absolute inset-0">
      <defs>
        <radialGradient id="mesh1" cx="0%" cy="0%" r="100%">
          <stop offset="0%" stopColor="rgba(20, 184, 166, 0.15)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="mesh2" cx="100%" cy="100%" r="100%">
          <stop offset="0%" stopColor="rgba(59, 130, 246, 0.1)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="100%" height="100%" fill="url(#mesh1)" />
      <rect x="0" y="0" width="100%" height="100%" fill="url(#mesh2)" />
    </svg>
  </div>
));
MeshGradient.displayName = 'MeshGradient';

const FloatingShapes = memo(() => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-[15%] right-[15%] w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] bg-[radial-gradient(circle,rgba(20,184,166,0.05)_0%,transparent_70%)] rounded-full blur-[60px] animate-[pulse_12s_infinite_alternate]" />
    <div className="absolute bottom-[10%] left-[10%] w-[25vw] h-[25vw] max-w-[300px] max-h-[300px] bg-[radial-gradient(circle,rgba(16,185,129,0.03)_0%,transparent_70%)] rounded-full blur-[50px] animate-[pulse_15s_infinite_alternate-reverse]" />
  </div>
));
FloatingShapes.displayName = 'FloatingShapes';

// ─── Main Component ─────────────────────────────────────────────────────────────
const Newsletter = () => {
  // FIX: Explicitly type the ref to accept null
  const sectionRef = useRef<HTMLElement>(null);

  const {
    formState,
    errorMessage,
    formData,
    handleSubmit,
    resetForm,
    updateField,
  } = useNewsletterForm();

  useScrollAnimation(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#020617] overflow-hidden font-sans"
    >
      <AuroraBackground />
      <MeshGradient />
      <FloatingShapes />

      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-[1080px] mx-auto relative">
          <div className="relative bg-[#040B16]/80 backdrop-blur-3xl rounded-[2.5rem] lg:rounded-[3rem] p-8 sm:p-12 lg:p-16 border border-white/[0.08] shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-hidden">
            <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-brand-teal/40 to-transparent opacity-50" />
            <div className="absolute bottom-0 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-brand-teal/20 to-transparent opacity-30" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-5 space-y-6 lg:pr-8">
                <div className="gsap-animate">
                  <Badge />
                </div>
                <h2 className="gsap-animate text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-display font-bold text-white leading-[1.1] tracking-tight">
                  Stay at the{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal via-teal-200 to-white drop-shadow-[0_0_25px_rgba(20,184,166,0.3)] inline-block pb-2">
                    Cutting Edge
                  </span>
                </h2>
                <p className="gsap-animate text-lg text-slate-300/90 leading-relaxed max-w-lg font-light">
                  Join the intelligence network. Get curated insights on CGT, AI × bio innovation, 
                  biomanufacturing advances, and exclusive opportunities available only to members.
                </p>
                
                <div className="gsap-animate flex items-center gap-6 pt-6 mt-4 border-t border-white/5">
                  <div className="flex items-center gap-2.5 text-slate-300 text-sm font-medium">
                    <div className="w-8 h-8 rounded-full bg-brand-teal/10 flex items-center justify-center border border-brand-teal/20">
                      <Dna className="w-4 h-4 text-brand-teal" />
                    </div>
                    <span>Biotech Focused</span>
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                  <div className="text-slate-400 text-sm">
                    High-Signal, Low-Noise
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="bg-[#020617]/60 backdrop-blur-xl p-8 sm:p-10 rounded-[2rem] border border-white/[0.05] shadow-[inset_0_0_40px_rgba(0,0,0,0.5)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brand-teal/5 rounded-full blur-[80px] pointer-events-none" />

                  {formState === 'success' ? (
                    <SuccessState onReset={resetForm} />
                  ) : (
                    <FormFields
                      formData={formData}
                      formState={formState}
                      errorMessage={errorMessage}
                      onUpdate={updateField}
                      onSubmit={handleSubmit}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;