import type { Metadata } from 'next';
import { client } from '@/sanity/lib/client';
import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';
import Link from 'next/link';
import { Calendar, Clock, MapPin, User } from 'lucide-react';

// ─── SEO ──────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Training Programs | Nucleos Biotech',
  description:
    'Explore Nucleos Biotech\'s hands-on biotechnology training programs. Learn cutting-edge skills from world-class instructors in Masdar City and beyond.',
  openGraph: {
    title: 'Training Programs | Nucleos Biotech',
    description:
      'Hands-on biotech training delivered by expert instructors. From CRISPR to QC/QA, upskill with Nucleos Biotech.',
    url: 'https://nucleos-biotech.com/training',
    siteName: 'Nucleos Biotech',
    type: 'website',
  },
};

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface TrainingListingItem {
  _id: string;
  title: string;
  slug: { current: string };
  dateFrom: string;
  dateTo: string;
  location: string;
  instructor?: { name: string; title?: string };
  specialties?: string[];
  applications?: string[];
  summary: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const statusStyles: Record<string, { label: string; bg: string; border: string; text: string }> = {
  upcoming:  { label: 'Upcoming',  bg: 'rgba(46,143,163,0.15)',  border: 'rgba(46,143,163,0.35)',  text: '#2E8FA3' },
  ongoing:   { label: 'Ongoing',   bg: 'rgba(93,187,138,0.15)',  border: 'rgba(93,187,138,0.35)',  text: '#5DBB8A' },
  completed: { label: 'Completed', bg: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.12)', text: 'rgba(244,246,245,0.4)' },
  cancelled: { label: 'Cancelled', bg: 'rgba(239,68,68,0.1)',    border: 'rgba(239,68,68,0.25)',   text: '#f87171' },
};

function formatDateRange(from: string, to: string) {
  const f = new Date(from);
  const t = new Date(to);
  const sameDay =
    f.toLocaleDateString('en-AE') === t.toLocaleDateString('en-AE');
  const dateStr = f.toLocaleDateString('en-AE', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
  const endStr  = sameDay
    ? ''
    : ` – ${t.toLocaleDateString('en-AE', { day: 'numeric', month: 'short', year: 'numeric' })}`;
  const timeStr = `${f.toLocaleTimeString('en-AE', { hour: '2-digit', minute: '2-digit' })} – ${t.toLocaleTimeString('en-AE', { hour: '2-digit', minute: '2-digit' })}`;
  return { dateStr: dateStr + endStr, timeStr };
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default async function TrainingPage() {
  const trainings: TrainingListingItem[] = await client.fetch(
    `*[_type == "training"] | order(dateFrom asc) {
      _id, title, slug, dateFrom, dateTo, location,
      instructor { name, title },
      specialties, applications, summary, status
    }`
  );

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Nucleos Biotech Training Programs',
    url: 'https://nucleos-biotech.com/training',
    itemListElement: trainings.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'EducationEvent',
        name: t.title,
        url: `https://nucleos-biotech.com/training/${t.slug.current}`,
        startDate: t.dateFrom,
        endDate: t.dateTo,
        location: {
          '@type': 'Place',
          name: t.location,
        },
        description: t.summary,
        organizer: {
          '@type': 'Organization',
          name: 'Nucleos Biotech',
        },
      },
    })),
  };

  return (
    <div className="bg-gradient-to-br from-[#0D1E2C] via-[#0A2A38] to-[#061A28] min-h-screen relative overflow-hidden">
      <style>{`
        .training-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(16px);
          box-shadow: 0 4px 24px rgba(0,0,0,0.25);
          transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
        }
        .training-card:hover {
          border-color: rgba(46,143,163,0.35);
          box-shadow: 0 8px 40px rgba(46,143,163,0.18), 0 4px 24px rgba(0,0,0,0.3);
          transform: translateY(-6px);
        }
      `}</style>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Decorative blobs */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-15%] right-[-10%] w-[700px] h-[700px] rounded-full"
          style={{ background: '#2E8FA3', opacity: 0.12, filter: 'blur(100px)' }} />
        <div className="absolute bottom-[-10%] left-[-8%] w-[600px] h-[600px] rounded-full"
          style={{ background: '#5DBB8A', opacity: 0.10, filter: 'blur(110px)' }} />
        <div className="absolute top-[40%] left-[20%] w-[400px] h-[300px] rounded-full"
          style={{ background: '#2E8FA3', opacity: 0.07, filter: 'blur(80px)' }} />
      </div>

      {/* SVG wave accent */}
      <div className="absolute top-0 right-0 w-full h-[700px] z-0 pointer-events-none opacity-50">
        <svg viewBox="0 0 1000 700" preserveAspectRatio="none" className="w-full h-full">
          <defs>
            <linearGradient id="trainingWaveGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#5DBB8A" stopOpacity="0.0" />
              <stop offset="30%"  stopColor="#2E8FA3" stopOpacity="0.18" />
              <stop offset="70%"  stopColor="#0D2D3A" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#061A28" stopOpacity="0.7" />
            </linearGradient>
          </defs>
          <path fill="url(#trainingWaveGrad)"
            d="M0,700 C120,680 280,670 440,600 C620,520 780,410 900,210 C960,110 985,45 1000,0 L1000,700 Z" />
        </svg>
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage: 'linear-gradient(#2E8FA3 1px, transparent 1px), linear-gradient(90deg, #2E8FA3 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }} />

      <Navbar />

      <main className="relative z-10 pt-36 pb-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">

          {/* ── Hero header ──────────────────────────────────────── */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
              style={{
                background: 'rgba(46,143,163,0.12)',
                border: '1px solid rgba(46,143,163,0.25)',
                color: '#2E8FA3',
              }}>
              <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: '#5DBB8A' }} />
              Expert-Led Programs
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight">
              Training{' '}
              <span style={{
                backgroundImage: 'linear-gradient(135deg, #5DBB8A 0%, #2E8FA3 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Programs
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-white/55 text-lg leading-relaxed">
              Advance your biotech expertise with hands-on training delivered by world-class instructors in Masdar City and online.
            </p>
          </div>

          {/* ── Grid ────────────────────────────────────────────── */}
          {trainings.length === 0 ? (
            <div className="text-center py-32">
              <p className="text-white/30 text-lg">No training programs are scheduled yet. Check back soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {trainings.map((training) => {
                const { dateStr, timeStr } = formatDateRange(training.dateFrom, training.dateTo);
                const st = statusStyles[training.status] ?? statusStyles.upcoming;
                return (
                  <Link
                    key={training._id}
                    href={`/training/${training.slug.current}`}
                    className="training-card group block rounded-[2rem] overflow-hidden relative"
                  >
                    {/* Top accent bar */}
                    <div className="absolute top-0 left-0 right-0 h-px"
                      style={{ background: 'linear-gradient(90deg, transparent, rgba(46,143,163,0.5), transparent)' }} />

                    <div className="p-8 flex flex-col h-full">
                      {/* Status badge */}
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                          style={{ background: st.bg, border: `1px solid ${st.border}`, color: st.text }}>
                          {st.label}
                        </span>
                        <span className="text-white/20 group-hover:text-teal-400/60 transition-colors duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-xl font-display font-bold text-white mb-4 leading-snug
                        group-hover:text-teal-300 transition-colors duration-300 line-clamp-2">
                        {training.title}
                      </h2>

                      {/* Divider */}
                      <div className="w-10 h-0.5 mb-5 transition-all duration-300 group-hover:w-20"
                        style={{ background: 'linear-gradient(90deg, #5DBB8A, #2E8FA3)' }} />

                      {/* Summary */}
                      <p className="text-white/50 text-sm leading-relaxed line-clamp-3 mb-7 flex-1">
                        {training.summary}
                      </p>

                      {/* Meta grid */}
                      <div className="grid grid-cols-1 gap-2.5 text-xs">
                        {/* Date */}
                        <div className="flex items-start gap-2.5">
                          <Calendar className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: '#2E8FA3' }} />
                          <span className="text-white/55">{dateStr}</span>
                        </div>
                        {/* Time */}
                        <div className="flex items-start gap-2.5">
                          <Clock className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: '#5DBB8A' }} />
                          <span className="text-white/55">{timeStr}</span>
                        </div>
                        {/* Location */}
                        <div className="flex items-start gap-2.5">
                          <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: '#2E8FA3' }} />
                          <span className="text-white/55">{training.location}</span>
                        </div>
                        {/* Instructor */}
                        {training.instructor?.name && (
                          <div className="flex items-start gap-2.5">
                            <User className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: '#5DBB8A' }} />
                            <span className="text-white/55">
                              {training.instructor.name}
                              {training.instructor.title && (
                                <span className="text-white/30"> · {training.instructor.title}</span>
                              )}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Tags */}
                      {(training.applications?.length || training.specialties?.length) ? (
                        <div className="flex flex-wrap gap-1.5 mt-6 pt-5"
                          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                          {training.specialties?.slice(0, 2).map((tag) => (
                            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full"
                              style={{
                                background: 'rgba(93,187,138,0.1)',
                                border: '1px solid rgba(93,187,138,0.2)',
                                color: '#5DBB8A',
                              }}>
                              {tag}
                            </span>
                          ))}
                          {training.applications?.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full"
                              style={{
                                background: 'rgba(46,143,163,0.1)',
                                border: '1px solid rgba(46,143,163,0.2)',
                                color: '#2E8FA3',
                              }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <div className="relative z-20">
        <Footer />
      </div>
    </div>
  );
}
