import { client } from "@/sanity/lib/client";
import { PortableText } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url';
import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';
import { ArrowLeft, Calendar, Clock, Link as LinkIcon } from 'lucide-react';
import Link from "next/link";
import { notFound } from "next/navigation";
import { Zap, Handshake, Bell, Newspaper, LucideIcon } from 'lucide-react';

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
// --- IMAGE BUILDER SETUP ---
const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  // auto('format') ensures WebP delivery for better cloud performance
  return builder.image(source).auto('format').fit('max');
}

// --- PORTABLE TEXT CUSTOMIZATION ---
const ptComponents = {
  block: {
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-display font-bold text-navy mt-12 mb-6 border-l-4 border-brand-teal pl-6">
        {children}
      </h2>
    ),
    normal: ({ children }: any) => (
      <p className="text-lg text-slate-600 leading-relaxed mb-8 font-sans italic-none">
        {children}
      </p>
    ),
  },
  types: {
    image: ({ value }: any) => (
      <div className="my-12 overflow-hidden rounded-[2.5rem] border border-slate-100 shadow-card">
        <img 
          src={urlFor(value).width(1200).url()} 
          alt={value.alt || 'Nucleos Research Asset'} 
          className="w-full object-cover"
        />
      </div>
    ),
  },
};

export default async function ProjectArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Fetch the project and its category from Sanity
  const project = await client.fetch(
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

  // Get the theme based on category, fallback to technical
  const theme = (project?.category && CATEGORY_THEMES[project.category]) 
              ? CATEGORY_THEMES[project.category] 
              : CATEGORY_THEMES.technical;
  const CategoryIcon = theme.icon;

  return (
    <div className="bg-white min-h-screen selection:bg-brand-teal/10">
      <Navbar />
      
      <main className="pt-32 lg:pt-48 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
          
          <Link href="/news" className="inline-flex items-center gap-2 text-slate-400 hover:text-navy transition-all mb-16 group font-display font-bold text-xs uppercase tracking-[0.2em]">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Insights
          </Link>

          <header className="mb-20">
            {/* DYNAMIC CATEGORY BADGE */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${theme.bgColor} ${theme.textColor} ${theme.borderColor} text-xs font-bold uppercase tracking-widest mb-8`}>
                <CategoryIcon className="w-4 h-4" />
                {theme.label}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold text-navy leading-[1.05] mb-12 tracking-tight">
              {project.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-slate-400 text-sm font-bold border-t border-slate-100 pt-8">
                <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-brand-teal" /> {new Date(project.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-brand-teal" /> 5 Min Read</span>
            </div>
          </header>

          <div className="prose-container">
            <PortableText value={project.body} components={ptComponents} />
          </div>

          {/* DYNAMIC FOOTER SECTION */}
          {project.references?.length > 0 && (
            <section className={`mt-24 p-12 rounded-[3rem] border ${theme.borderColor} ${theme.bgColor}`}>
              <h3 className={`text-2xl font-display font-bold mb-8 flex items-center gap-3 ${theme.textColor}`}>
                <LinkIcon className="w-6 h-6" />
                Citations & Sources
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.references.map((ref: any, i: number) => (
                  <a key={i} href={ref.url} target="_blank" className="flex items-center justify-between p-5 rounded-2xl bg-white border border-slate-100 hover:border-brand-teal transition-all group">
                    <span className="font-bold text-navy">{ref.label}</span>
                    <ArrowLeft className="w-4 h-4 rotate-180 text-brand-teal" />
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}