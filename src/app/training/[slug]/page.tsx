import type { Metadata } from 'next';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, MapPin, User, Tag, ArrowLeft, ChevronRight } from 'lucide-react';
import { PortableText, PortableTextComponents } from '@portabletext/react';

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface SanityImage {
  _type: 'image';
  asset: { _ref: string; _type: 'reference' };
  alt?: string;
}

interface TrainingData {
  title: string;
  slug: { current: string };
  dateFrom: string;
  dateTo: string;
  location: string;
  instructor?: {
    name: string;
    title?: string;
    bio?: string;
    photo?: SanityImage;
  };
  specialties?: string[];
  applications?: string[];
  summary?: string;
  body?: any[];
  coverImage?: SanityImage;
  capacity?: number;
  registrationUrl?: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}

// ─── WHATSAPP HELPER ──────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = '971501984551';
function makeWhatsAppUrl(title: string, dateFrom: string, location: string) {
  const date = new Date(dateFrom).toLocaleDateString('en-AE', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
  const msg = `Hi Nucleos Biotech team 👋

I'm interested in registering for the following training program:

📚 *${title}*
📅 ${date}
📍 ${location}

Please share more details about registration and availability. Thank you!`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const statusStyles: Record<string, { label: string; bg: string; border: string; text: string }> = {
  upcoming:  { label: 'Upcoming',  bg: 'rgba(46,143,163,0.15)',  border: 'rgba(46,143,163,0.35)',  text: '#2E8FA3' },
  ongoing:   { label: 'Ongoing',   bg: 'rgba(93,187,138,0.15)',  border: 'rgba(93,187,138,0.35)',  text: '#5DBB8A' },
  completed: { label: 'Completed'
    , bg: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.12)', text: 'rgba(244,246,245,0.4)' },
  cancelled: { label: 'Cancelled', bg: 'rgba(239,68,68,0.1)',    border: 'rgba(239,68,68,0.25)',   text: '#f87171' },
};

function formatDate(dt: string) {
  return new Date(dt).toLocaleDateString('en-AE', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
}
function formatTime(dt: string) {
  return new Date(dt).toLocaleTimeString('en-AE', { hour: '2-digit', minute: '2-digit' });
}

// ─── PORTABLE TEXT COMPONENTS ─────────────────────────────────────────────────
const ptComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-5 text-white/65 leading-relaxed text-base">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-display font-bold text-white mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-display font-semibold text-white/90 mt-8 mb-3">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 pl-6 my-6 italic text-white/50"
        style={{ borderColor: '#2E8FA3' }}>
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const url = urlFor(value).width(1000).auto('format').fit('max').url();
      return (
        <figure className="my-10">
          <img src={url} alt={value.alt ?? ''} className="w-full rounded-2xl object-cover" />
          {value.alt && (
            <figcaption className="text-center text-xs text-white/30 mt-3">{value.alt}</figcaption>
          )}
        </figure>
      );
    },
  },
};

// ─── generateMetadata ─────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const training: Pick<TrainingData, 'title' | 'summary' | 'coverImage'> | null =
    await client.fetch(
      `*[_type == "training" && slug.current == $slug][0]{ title, summary, coverImage }`,
      { slug }
    );

  if (!training) return {};

  return {
    title: `${training.title} | Nucleos Biotech Training`,
    description: training.summary ?? 'Explore this expert-led biotech training program by Nucleos Biotech.',
    openGraph: {
      title: `${training.title} | Nucleos Biotech Training`,
      description: training.summary,
      url: `https://nucleos-biotech.com/training/${slug}`,
      siteName: 'Nucleos Biotech',
      images: training.coverImage
        ? [{ url: urlFor(training.coverImage).width(1200).height(630).url() }]
        : [{ url: '/images/hero-bg.jpg' }],
      type: 'website',
    },
  };
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default async function TrainingDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const training: TrainingData = await client.fetch(
    `*[_type == "training" && slug.current == $slug][0]{
      title, slug, dateFrom, dateTo, location,
      instructor { name, title, bio, photo },
      specialties, applications, summary, body,
      coverImage, capacity, registrationUrl, status
    }`,
    { slug }
  );

  if (!training) notFound();

  const st        = statusStyles[training.status] ?? statusStyles.upcoming;
  const coverUrl  = training.coverImage
    ? urlFor(training.coverImage).width(1600).height(800).auto('format').url()
    : null;
  const photoUrl  = training.instructor?.photo
    ? urlFor(training.instructor.photo).width(200).height(200).auto('format').url()
    : null;
  const whatsappUrl = makeWhatsAppUrl(training.title, training.dateFrom, training.location);

  // JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationEvent',
    name: training.title,
    description: training.summary,
    startDate: training.dateFrom,
    endDate: training.dateTo,
    location: {
      '@type': 'Place',
      name: training.location,
    },
    organizer: {
      '@type': 'Organization',
      name: 'Nucleos Biotech',
      url: 'https://nucleos-biotech.com',
    },
    ...(training.instructor?.name && {
      performer: {
        '@type': 'Person',
        name: training.instructor.name,
        jobTitle: training.instructor.title,
      },
    }),
    ...(training.registrationUrl && {
      url: training.registrationUrl,
    }),
  };

  return (
    <div className="bg-[#08161F] min-h-screen relative overflow-hidden selection:bg-teal-500/25">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <style>{`
        .back-link {
          color: rgba(244,246,245,0.4);
          transition: color 0.2s ease;
        }
        .back-link:hover {
          color: #2E8FA3;
        }
        .sidebar-back {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          color: rgba(244,246,245,0.4);
          transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
        }
        .sidebar-back:hover {
          background: rgba(46,143,163,0.08);
          border-color: rgba(46,143,163,0.2);
          color: rgba(244,246,245,0.75);
        }
      `}</style>

      {/* Decorative blobs */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full"
          style={{ background: '#2E8FA3', opacity: 0.10, filter: 'blur(120px)' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full"
          style={{ background: '#5DBB8A', opacity: 0.08, filter: 'blur(100px)' }} />
      </div>

      {/* SVG accent */}
      <div className="absolute top-0 right-0 w-full h-[900px] z-0 pointer-events-none opacity-40">
        <svg viewBox="0 0 1000 900" preserveAspectRatio="none" className="w-full h-full">
          <defs>
            <linearGradient id="tdWave" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#5DBB8A" stopOpacity="0.0" />
              <stop offset="40%"  stopColor="#2E8FA3" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#0A3040" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <path fill="url(#tdWave)"
            d="M0,900 C120,880 280,870 440,790 C620,700 780,570 900,310 C960,165 985,65 1000,0 L1000,900Z" />
        </svg>
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none z-0"
        style={{
          backgroundImage: 'linear-gradient(#2E8FA3 1px, transparent 1px), linear-gradient(90deg, #2E8FA3 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }} />

      <Navbar />

      <main className="relative z-10 pt-36 pb-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 max-w-6xl">

          {/* ── Back link ── */}
          <Link href="/training"
            className="back-link inline-flex items-center gap-2 text-sm mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            All Training Programs
          </Link>

          {/* ── Cover image ── */}
          {coverUrl && (
            <div className="w-full h-[300px] sm:h-[420px] rounded-[2rem] overflow-hidden mb-12 relative">
              <img src={coverUrl} alt={training.coverImage?.alt ?? training.title}
                className="w-full h-full object-cover" />
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(8,22,31,0.8) 0%, transparent 60%)' }} />
            </div>
          )}

          {/* ── Two-column layout ──────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* ── MAIN CONTENT col ── */}
            <div className="lg:col-span-2">
              {/* Status + title */}
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                  style={{ background: st.bg, border: `1px solid ${st.border}`, color: st.text }}>
                  {st.label}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
                {training.title}
              </h1>

              {training.summary && (
                <p className="text-white/55 text-lg leading-relaxed mb-10 pb-10"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  {training.summary}
                </p>
              )}

              {/* Body */}
              {training.body && (
                <div className="prose-training">
                  <PortableText value={training.body} components={ptComponents} />
                </div>
              )}

              {/* ── Specialties & Applications ── */}
              {(training.specialties?.length || training.applications?.length) ? (
                <div className="mt-12 pt-10 space-y-6"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  {training.specialties?.length ? (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Tag className="w-4 h-4" style={{ color: '#5DBB8A' }} />
                        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#5DBB8A' }}>
                          Specialties Required
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {training.specialties.map((tag) => (
                          <span key={tag} className="text-sm px-3 py-1 rounded-full"
                            style={{
                              background: 'rgba(93,187,138,0.1)',
                              border: '1px solid rgba(93,187,138,0.25)',
                              color: '#5DBB8A',
                            }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {training.applications?.length ? (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Tag className="w-4 h-4" style={{ color: '#2E8FA3' }} />
                        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#2E8FA3' }}>
                          Applications
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {training.applications.map((tag) => (
                          <span key={tag} className="text-sm px-3 py-1 rounded-full"
                            style={{
                              background: 'rgba(46,143,163,0.1)',
                              border: '1px solid rgba(46,143,163,0.25)',
                              color: '#2E8FA3',
                            }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>

            {/* ── SIDEBAR ── */}
            <aside className="lg:col-span-1 space-y-6">

              {/* ── Info card ── */}
              <div className="rounded-2xl p-6 relative overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(16px)',
                }}>
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(46,143,163,0.6), transparent)' }} />

                <h2 className="text-xs font-black uppercase tracking-widest mb-6"
                  style={{ color: '#5DBB8A' }}>
                  Training Details
                </h2>

                <ul className="space-y-4">
                  {/* Date */}
                  <li className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(46,143,163,0.12)', border: '1px solid rgba(46,143,163,0.2)' }}>
                      <Calendar className="w-3.5 h-3.5" style={{ color: '#2E8FA3' }} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-white/30 mb-0.5">Date</p>
                      <p className="text-sm text-white/75">{formatDate(training.dateFrom)}</p>
                      {formatDate(training.dateFrom) !== formatDate(training.dateTo) && (
                        <p className="text-xs text-white/40">to {formatDate(training.dateTo)}</p>
                      )}
                    </div>
                  </li>
                  {/* Time */}
                  <li className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(93,187,138,0.12)', border: '1px solid rgba(93,187,138,0.2)' }}>
                      <Clock className="w-3.5 h-3.5" style={{ color: '#5DBB8A' }} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-white/30 mb-0.5">Time</p>
                      <p className="text-sm text-white/75">
                        {formatTime(training.dateFrom)} – {formatTime(training.dateTo)}
                      </p>
                    </div>
                  </li>
                  {/* Location */}
                  <li className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(46,143,163,0.12)', border: '1px solid rgba(46,143,163,0.2)' }}>
                      <MapPin className="w-3.5 h-3.5" style={{ color: '#2E8FA3' }} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-white/30 mb-0.5">Location</p>
                      <p className="text-sm text-white/75">{training.location}</p>
                    </div>
                  </li>
                  {/* Capacity */}
                  {training.capacity && (
                    <li className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(93,187,138,0.12)', border: '1px solid rgba(93,187,138,0.2)' }}>
                        <User className="w-3.5 h-3.5" style={{ color: '#5DBB8A' }} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-white/30 mb-0.5">Capacity</p>
                        <p className="text-sm text-white/75">{training.capacity} participants</p>
                      </div>
                    </li>
                  )}
                </ul>

                {/* CTA — WhatsApp registration */}
                {training.status !== 'completed' && training.status !== 'cancelled' ? (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2.5 px-5 py-3.5 mt-8 rounded-xl font-bold text-sm text-white relative overflow-hidden group"
                    style={{
                      background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                      boxShadow: '0 8px 32px rgba(37,211,102,0.28), 0 2px 8px rgba(0,0,0,0.3)',
                    }}
                  >
                    <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%)' }} />
                    {/* WhatsApp SVG icon */}
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 relative z-10 flex-shrink-0">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <span className="relative z-10">Register via WhatsApp</span>
                  </a>
                ) : (
                  <div className="w-full flex items-center justify-center gap-2 px-5 py-3.5 mt-8 rounded-xl font-bold text-sm"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: 'rgba(244,246,245,0.3)',
                    }}>
                    {training.status === 'completed' ? 'Training Completed' : 'Registration Unavailable'}
                  </div>
                )}
              </div>

              {/* ── Instructor card ── */}
              {training.instructor?.name && (
                <div className="rounded-2xl p-6 relative overflow-hidden"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    backdropFilter: 'blur(16px)',
                  }}>
                  <div className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(93,187,138,0.5), transparent)' }} />

                  <h2 className="text-xs font-black uppercase tracking-widest mb-5"
                    style={{ color: '#2E8FA3' }}>
                    Instructor
                  </h2>

                  <div className="flex items-center gap-4 mb-4">
                    {photoUrl ? (
                      <img src={photoUrl} alt={training.instructor.name}
                        className="w-14 h-14 rounded-2xl object-cover flex-shrink-0"
                        style={{ border: '2px solid rgba(93,187,138,0.25)' }} />
                    ) : (
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 text-xl font-bold"
                        style={{
                          background: 'linear-gradient(135deg, rgba(93,187,138,0.2) 0%, rgba(46,143,163,0.2) 100%)',
                          border: '1px solid rgba(93,187,138,0.2)',
                          color: '#5DBB8A',
                        }}>
                        {training.instructor.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-white text-sm">{training.instructor.name}</p>
                      {training.instructor.title && (
                        <p className="text-xs text-white/45 mt-0.5">{training.instructor.title}</p>
                      )}
                    </div>
                  </div>

                  {training.instructor.bio && (
                    <p className="text-xs text-white/45 leading-relaxed mt-3 pt-3"
                      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                      {training.instructor.bio}
                    </p>
                  )}
                </div>
              )}

              {/* ── Back to training ── */}
              <Link href="/training"
                className="sidebar-back flex items-center gap-2 text-sm py-3 px-5 rounded-xl"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Trainings
              </Link>
            </aside>
          </div>
        </div>
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
