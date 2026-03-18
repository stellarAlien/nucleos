'use client';

import { motion } from 'framer-motion';
import { PortableText } from 'next-sanity';
import type { PortableTextComponents } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/lib/client';
import {
  ArrowLeft, Calendar, Clock, ExternalLink, LinkIcon,
  Zap, Handshake, Bell, Newspaper,
} from 'lucide-react';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';

const B = { green: '#5DBB8A', teal: '#2E8FA3', warmWhite: '#F4F6F5', navy: '#1E2F44' };

type Category = 'technical' | 'partnership' | 'event' | 'news';

const THEMES: Record<Category, { icon: LucideIcon; label: string; pill: string }> = {
  technical: { icon: Zap, label: 'Technical Briefing', pill: 'bg-teal-400/10 border-teal-400/30 text-teal-300' },
  partnership: { icon: Handshake, label: 'New Partnership', pill: 'bg-emerald-400/10 border-emerald-400/30 text-emerald-300' },
  event: { icon: Bell, label: 'Event Announcement', pill: 'bg-amber-400/10 border-amber-400/30 text-amber-300' },
  news: { icon: Newspaper, label: 'Industry News', pill: 'bg-sky-400/10 border-sky-400/30 text-sky-300' },
};

type SanityImageBlock = {
  _type: 'image';
  asset: { _ref: string; _type: 'reference' };
  alt?: string;
  _imageUrl?: string;
};

export type ArticleContentProps = {
  title: string;
  body: any[];
  publishedAt: string;
  summary?: string;
  category: Category;
  coverImageUrl: string | null;
  coverImageAlt: string;
  references?: { label: string; url: string }[];
};

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, delay } },
});

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

const builder = imageUrlBuilder(client);
function urlFor(source: SanityImageBlock) {
  return builder.image(source).auto('format').fit('max');
}

const ptComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-14 mb-5 flex items-start gap-4">
        <span className="mt-1 flex-shrink-0 w-[3px] h-8 rounded-full inline-block"
          style={{ background: `linear-gradient(180deg, ${B.green} 0%, ${B.teal} 100%)` }} />
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl sm:text-2xl font-display font-bold text-white mt-10 mb-4">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="text-lg sm:text-[1.15rem] leading-[1.9] mb-7 font-sans tracking-[0.01em]"
        style={{ color: B.warmWhite }}>{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-10 pl-6 italic text-xl leading-relaxed font-sans"
        style={{ borderLeft: `2px solid ${B.teal}`, color: `${B.warmWhite}cc` }}>{children}</blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-extrabold" style={{ color: B.green }}>{children}</strong>,
    em: ({ children }) => <em className="italic" style={{ color: B.warmWhite }}>{children}</em>,
    code: ({ children }) => (
      <code className="font-mono text-sm rounded px-2 py-0.5"
        style={{ background: `${B.teal}22`, border: `1px solid ${B.teal}55`, color: B.warmWhite }}>
        {children}
      </code>
    ),
  },
  types: {
    image: ({ value }: { value: SanityImageBlock }) => (
      <motion.figure className="my-12 overflow-hidden rounded-2xl border border-white/8 shadow-2xl"
        initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: EASE }}>
        <img
          src={value._imageUrl ?? urlFor(value).width(1200).url()}
          alt={value.alt ?? 'Nucleos Research Asset'}
          className="w-full object-cover"
        />
        {value.alt && (
          <figcaption className="px-6 py-3 bg-white/4 border-t border-white/8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: B.teal }}>{value.alt}</p>
          </figcaption>
        )}
      </motion.figure>
    ),
  },
};

export default function ArticleContent({
  title, body, publishedAt, summary, category, coverImageUrl, coverImageAlt, references,
}: ArticleContentProps) {
  const theme = THEMES[category] ?? THEMES.technical;
  const CategoryIcon = theme.icon;

  const formattedDate = new Date(publishedAt).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  });

  return (
    <>
      {/* ── HERO ── */}
      <div className="relative z-10 w-full min-h-[70vh] sm:min-h-[80vh] lg:min-h-[88vh]">
        {coverImageUrl ? (
          <div className="absolute inset-0 w-full h-full">
            <motion.img
              src={coverImageUrl} alt={coverImageAlt} className="w-full h-full object-cover"
              initial={{ scale: 1.06, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: EASE }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#08161F]/85 via-transparent to-[#08161F]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08161F] via-[#08161F]/50 to-transparent" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-[#08161F]/0 to-[#08161F]" />
        )}

        <div className="relative z-10 flex flex-col justify-end min-h-[70vh] sm:min-h-[80vh] lg:min-h-[88vh]">
          <div className="container mx-auto px-4 sm:px-6 max-w-[900px] pt-28 sm:pt-32 pb-10 sm:pb-16">

            <motion.div variants={fadeUp(0)} initial="hidden" animate="show">
              <Link href="/news"
                className="inline-flex items-center gap-2 transition-colors mb-8 sm:mb-12 group text-[0.65rem] font-black uppercase tracking-[0.22em] text-[#F4F6F580] hover:text-[#5DBB8A]">
                <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                Back to Insights
              </Link>
            </motion.div>

            <motion.div variants={fadeUp(0.1)} initial="hidden" animate="show">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-[0.65rem] font-black uppercase tracking-[0.18em] mb-5 sm:mb-6 backdrop-blur-sm ${theme.pill}`}>
                <CategoryIcon className="w-3 h-3" size={12} />
                {theme.label}
              </div>
            </motion.div>

            <motion.h1
              className="text-[2rem] sm:text-5xl lg:text-[3.5rem] font-display font-extrabold text-white leading-[1.07] mb-8 sm:mb-10 tracking-tight drop-shadow-2xl max-w-[820px]"
              initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: EASE, delay: 0.18 }}>
              {title}
            </motion.h1>

            <motion.div
              className="flex flex-wrap items-center gap-4 sm:gap-5 text-[0.65rem] font-black uppercase tracking-[0.18em] pt-7 border-t border-white/10"
              style={{ color: B.warmWhite + '99' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}>
              <span className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5" style={{ color: B.green }} />
                {formattedDate}
              </span>
              <span className="w-px h-3 bg-white/20" />
              <span className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5" style={{ color: B.green }} />
                5 Min Read
              </span>
            </motion.div>

          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <main className="relative z-10 pt-16 sm:pt-24 pb-24 sm:pb-32">
        <div className="container mx-auto px-4 sm:px-6 max-w-[820px]">

          {/* Executive Summary */}
          {summary && (
            <motion.div
              initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.45 }}
              className="mb-0"
            >
              {/* Glassmorphism card */}
              <div className="relative rounded-3xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(46,143,163,0.13) 0%, rgba(93,187,138,0.07) 60%, rgba(8,22,31,0.55) 100%)',
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  border: '1px solid rgba(46,143,163,0.22)',
                  boxShadow: `0 8px 48px rgba(46,143,163,0.18), 0 2px 12px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.07)`,
                }}>
                {/* Left gradient stripe */}
                <div className="absolute left-0 top-0 bottom-0 w-[4px] rounded-l-3xl"
                  style={{ background: `linear-gradient(180deg, ${B.green} 0%, ${B.teal} 100%)` }} />
                {/* Top sheen */}
                <div className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, rgba(93,187,138,0.4), transparent)` }} />
                <div className="relative z-10 px-7 sm:px-10 py-8 sm:py-10 pl-10 sm:pl-13">
                  <p className="text-[0.6rem] font-black uppercase tracking-[0.28em] mb-5 flex items-center gap-2.5"
                    style={{ color: B.green }}>
                    <span className="inline-block w-6 h-px" style={{ background: `linear-gradient(90deg, ${B.green}, ${B.teal})` }} />
                    Executive Summary
                    <span className="inline-block w-6 h-px" style={{ background: `linear-gradient(90deg, ${B.teal}, transparent)` }} />
                  </p>
                  <p className="text-lg sm:text-[1.18rem] leading-[1.9] font-sans italic font-medium"
                    style={{ color: B.warmWhite }}>
                    {summary}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4 mt-12 mb-14 sm:mt-16 sm:mb-16">
                <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${B.teal}60, transparent)` }} />
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: B.green }} />
                  <div className="w-1 h-1 rounded-full opacity-60" style={{ background: B.teal }} />
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: B.green }} />
                </div>
                <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${B.teal}60)` }} />
              </div>
            </motion.div>
          )}

          {/* Article body */}
          <motion.article className="mb-20" initial="hidden" whileInView="show"
            viewport={{ once: true, margin: '-40px' }} variants={stagger}>
            <PortableText value={body} components={ptComponents} />
          </motion.article>

          {/* References */}
          {references && references.length > 0 && (
            <motion.section
              className="mt-4 pt-10 sm:pt-12"
              style={{ borderTop: `1px solid rgba(46,143,163,0.2)` }}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              {/* Section header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${B.teal}25, ${B.green}15)`,
                    border: `1px solid ${B.teal}45`,
                    boxShadow: `0 0 20px rgba(46,143,163,0.15)`,
                  }}>
                  <LinkIcon className="w-4 h-4" style={{ color: B.green }} />
                </div>
                <div>
                  <p className="text-[0.6rem] font-black uppercase tracking-[0.28em] mb-0.5" style={{ color: B.green }}>
                    Further Reading
                  </p>
                  <h3 className="text-base sm:text-lg font-display font-bold text-white leading-none">
                    Citations & Sources
                  </h3>
                </div>
              </div>

              {/* Cards — each is a real clickable link with full URL */}
              <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
                {references.map((ref, i) => (
                  <motion.a
                    key={i}
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={fadeUp(0)}
                    className="flex items-center justify-between px-5 py-4 sm:py-5 rounded-2xl group relative overflow-hidden"
                    style={{
                      background: 'rgba(30,47,68,0.55)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      border: `1px solid rgba(46,143,163,0.2)`,
                      boxShadow: '0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
                    }}
                    whileHover={{
                      borderColor: `rgba(93,187,138,0.5)`,
                      boxShadow: `0 8px 32px rgba(46,143,163,0.2), 0 0 0 1px rgba(93,187,138,0.15), inset 0 1px 0 rgba(255,255,255,0.07)`,
                      y: -3,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Hover sheen */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                      style={{ background: `linear-gradient(135deg, rgba(93,187,138,0.06) 0%, transparent 60%)` }} />

                    <div className="flex items-center gap-3 min-w-0 relative z-10">
                      {/* Numbered badge */}
                      <span
                        className="flex-shrink-0 w-7 h-7 rounded-lg text-[0.65rem] font-black flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${B.green}25, ${B.teal}15)`,
                          border: `1px solid ${B.green}35`,
                          color: B.green,
                        }}>
                        {i + 1}
                      </span>
                      <div className="min-w-0">
                        <span
                          className="block text-sm sm:text-[0.95rem] font-semibold leading-snug truncate group-hover:text-white transition-colors duration-200"
                          style={{ color: B.warmWhite }}>
                          {ref.label}
                        </span>
                        {/* Show truncated URL as subtitle */}
                        <span className="block text-[0.65rem] mt-0.5 truncate opacity-40 group-hover:opacity-60 transition-opacity"
                          style={{ color: B.teal }}>
                          {ref.url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}
                        </span>
                      </div>
                    </div>
                    <ExternalLink
                      className="w-3.5 h-3.5 flex-shrink-0 ml-4 opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 relative z-10"
                      style={{ color: B.green }}
                    />
                  </motion.a>
                ))}
              </motion.div>
            </motion.section>
          )}

        </div>
      </main>
    </>
  );
}