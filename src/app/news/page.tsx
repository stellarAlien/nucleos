import { client } from "@/sanity/lib/client";
import Navbar from "@/sections/Navbar";
import Footer from "@/sections/Footer";
import Link from "next/link";

// --- TYPES FOR ESLINT ---
interface ProjectListingItem {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  summary: string;
  category: 'technical' | 'partnership' | 'event' | 'news';
}

export default async function NewsPage() {
  const projects: ProjectListingItem[] = await client.fetch(
    `*[_type == "project"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      summary,
      category
    }`
  );

  return (
    <div className="bg-gradient-to-br from-[#0F1E2E] via-[#0D2D3A] to-[#0A3040] min-h-screen relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-teal-900/30 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-teal-900/20 rounded-full blur-3xl opacity-50 pointer-events-none" />

      {/* ─── Background SVG Shape ────────── */}
      <div className="absolute top-0 right-0 w-full h-[800px] z-0 pointer-events-none opacity-80 -scale-x-100 mix-blend-screen">
        <svg
          viewBox="0 0 1000 800"
          preserveAspectRatio="none"
          className="w-full h-full object-cover transform scale-125"
        >
          <defs>
            <linearGradient id="newsWaveGradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4caf50" stopOpacity="0.0" />
              <stop offset="30%" stopColor="#1f6930" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#0D2D3A" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0A3040" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <path
            fill="url(#newsWaveGradient)"
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
      <main className="relative z-10 pt-32 pb-24 top-0">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center justify-center mb-16 relative">
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white text-center mb-6">Latest Insights</h1>
            <p className="max-w-2xl text-center text-white/60 text-lg">
              Explore our latest updates, industry trends, and deep dives into biotechnology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {/* FIXED LINE 41: Typed project as ProjectListingItem */}
            {projects.map((project: ProjectListingItem) => (
              <Link 
                key={project._id} 
                href={`/news/${project.slug.current}`}
                className="group block p-8 rounded-[2rem] bg-white/5 backdrop-blur-md border border-white/10 shadow-sm hover:shadow-[0_0_30px_rgba(20,184,166,0.15)] hover:-translate-y-1 hover:border-teal-500/50 hover:bg-white/10 transition-all duration-300 relative overflow-hidden"
              >
                <div className="text-xs font-bold text-teal-300 uppercase tracking-widest mb-6 inline-block bg-teal-50/10 border border-teal-400/20 px-4 py-1.5 rounded-full relative z-10">
                  {project.category}
                </div>
                <h2 className="text-2xl font-display font-bold text-white mb-4 group-hover:text-teal-400 transition-colors line-clamp-2 relative z-10">
                  {project.title}
                </h2>
                <div className="w-12 h-1 bg-teal-400/20 mb-4 group-hover:w-24 group-hover:bg-gradient-to-r group-hover:from-teal-400 group-hover:to-emerald-400 transition-all duration-300 relative z-10"></div>
                <p className="text-white/60 line-clamp-3 text-sm leading-relaxed relative z-10">
                  {project.summary}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <div className="relative z-20">
        <Footer />
      </div>
    </div>
  );
}