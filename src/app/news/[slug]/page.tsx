import { client } from "@/sanity/lib/client";
import { PortableText, PortableTextComponents } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url';
import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';
import { ArrowLeft, Calendar, Clock, Link as LinkIcon, Zap, Handshake, Bell, Newspaper, LucideIcon } from 'lucide-react';
import Link from "next/link";
import { notFound } from "next/navigation";

// --- TYPES FOR ESLINT COMPLIANCE ---
interface SanityImage {
  _type: 'image';
  asset: { 
    _ref: string; 
    _type: 'reference' 
  };
  alt?: string;
}

interface ProjectReference {
  label: string;
  url: string;
}

interface ProjectData {
  title: string;
  body: any; // PortableText internal structure is complex; 'any' is often permitted here.
  publishedAt: string;
  summary: string;
  category: 'technical' | 'partnership' | 'event' | 'news';
  references?: ProjectReference[];
}

// --- IMAGE BUILDER SETUP ---
const builder = imageUrlBuilder(client);

/**
 * FIXED: Explicitly typed 'source' as SanityImage to resolve line 24 ESLint error.
 */
function urlFor(source: SanityImage) {
  return builder.image(source).auto('format').fit('max');
}

const CATEGORY_THEMES: Record<string, { 
  icon: LucideIcon; 
  label: string; 
  textColor: string; 
  bgColor: string; 
  borderColor: string;
}> = {
  technical: { 
    icon: Zap, 
    label: 'Technical Briefing', 
    textColor: 'text-brand-teal', 
    bgColor: 'bg-brand-teal/10',
    borderColor: 'border-brand-teal/20'
  },
  partnership: { 
    icon: Handshake, 
    label: 'New Partnership', 
    textColor: 'text-brand-green', 
    bgColor: 'bg-brand-green/10',
    borderColor: 'border-brand-green/20'
  },
  event: { 
    icon: Bell, 
    label: 'Event Announcement', 
    textColor: 'text-amber-600', 
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200'
  },
  news: { 
    icon: Newspaper, 
    label: 'Industry News', 
    textColor: 'text-navy-400', 
    bgColor: 'bg-navy-50',
    borderColor: 'border-navy-100'
  }
};

// --- PORTABLE TEXT CUSTOMIZATION ---
const ptComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl font-display font-bold text-white mt-12 mb-6 border-l-4 border-teal-500 pl-6">
        {children}
      </h2>
    ),
    normal: ({ children }) => (
      <p className="text-lg text-white/70 leading-relaxed mb-8 font-sans">
        {children}
      </p>
    ),
  },
  types: {
    image: ({ value }: { value: SanityImage }) => (
      <div className="my-12 overflow-hidden rounded-[2.5rem] border border-white/10 shadow-2xl relative">
        <img 
          src={urlFor(value).width(1200).url()} 
          alt={value.alt || 'Nucleos Research Asset'} 
          className="w-full object-cover"
        />
        {value.alt && (
          <div className="px-6 py-4 bg-white/5 backdrop-blur-md border-t border-white/10 text-center">
            <p className="text-sm font-bold text-teal-400 uppercase tracking-widest">{value.alt}</p>
          </div>
        )}
      </div>
    ),
  },
};

export default async function ProjectArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const project: ProjectData = await client.fetch(
    `*[_type == "project" && slug.current == $slug][0]{
      title,
      body,
      publishedAt,
      summary,
      category,
      references
    }`, 
    { slug }
  );

  if (!project) notFound();

  const theme = (project.category && CATEGORY_THEMES[project.category]) 
                ? CATEGORY_THEMES[project.category] 
                : CATEGORY_THEMES.technical;
  const CategoryIcon = theme.icon;

  return (
    <div className="bg-gradient-to-br from-[#0F1E2E] via-[#0D2D3A] to-[#0A3040] min-h-screen relative overflow-hidden selection:bg-teal-500/20">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 -translate-y-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-teal-900/30 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 right-0 translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-teal-900/20 rounded-full blur-3xl opacity-50 pointer-events-none" />

      {/* ─── Background SVG Shape ────────── */}
      <div className="absolute top-0 right-0 w-full h-[800px] z-0 pointer-events-none opacity-80 mix-blend-screen">
        <svg
          viewBox="0 0 1000 800"
          preserveAspectRatio="none"
          className="w-full h-full object-cover transform scale-125"
        >
          <defs>
            <linearGradient id="newsDetailWaveGradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4caf50" stopOpacity="0.0" />
              <stop offset="30%" stopColor="#1f6930" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#0D2D3A" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0A3040" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <path
            fill="url(#newsDetailWaveGradient)"
            d="M 0,800 C 120,785 280,780 440,710 C 620,630 780,520 900,280 C 960,150 985,60 1000,0 L 1000,800 Z"
          />
          <path
            d="M 350,800 C 550,760 850,650 1000,350 L 1000,800 Z"
            fill="#4caf50"
            fillOpacity="0.1"
          />
        </svg>
      </div>

      <Navbar />
      
      <main className="relative z-10 pt-32 lg:pt-48 pb-24 top-0">
        <div className="container mx-auto px-6 max-w-4xl">
          <Link href="/news" className="inline-flex items-center gap-2 text-white/60 hover:text-teal-400 transition-all mb-16 group font-display font-bold text-xs uppercase tracking-[0.2em] bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Insights
          </Link>

          <header className="mb-20 text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border bg-teal-50/10 border-teal-400/20 text-teal-300 text-xs font-bold uppercase tracking-widest mb-8 shadow-sm">
                <CategoryIcon className="w-4 h-4" />
                {theme.label}
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.1] mb-12 tracking-tight max-w-3xl">
              {project.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center gap-8 text-white/70 text-sm font-bold border-t border-white/10 pt-8 w-full max-w-xl">
                <span className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
                  <Calendar className="w-4 h-4 text-teal-400" /> 
                  {new Date(project.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
                <span className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
                  <Clock className="w-4 h-4 text-teal-400" /> 
                  5 Min Read
                </span>
            </div>
          </header>

          <div className="prose-container bg-white/5 backdrop-blur-xl p-8 md:p-12 rounded-[3rem] border border-white/10 shadow-2xl relative z-20">
            <PortableText value={project.body} components={ptComponents} />
          </div>

          {project.references && project.references.length > 0 && (
            <section className={`mt-24 p-12 rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-md relative z-20`}>
              <h3 className={`text-2xl font-display font-bold mb-8 flex items-center gap-3 text-white`}>
                <LinkIcon className="w-6 h-6 text-teal-400" />
                Citations & Sources
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.references?.map((ref: ProjectReference, i: number) => (
                  <a key={i} href={ref.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-teal-500/50 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(20,184,166,0.15)] transition-all duration-300 group">
                    <span className="font-bold text-white group-hover:text-teal-400 transition-colors">{ref.label}</span>
                    <ArrowLeft className="w-4 h-4 rotate-180 text-teal-400 group-hover:translate-x-1 transition-transform" />
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <div className="relative z-30">
        <Footer />
      </div>
    </div>
  );
}