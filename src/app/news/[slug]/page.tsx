import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';
import { notFound } from 'next/navigation';
import ArticleContent from '@/components/ui/article-content';

// Pre-build all news slugs at build time → zero runtime Sanity calls for known pages
export async function generateStaticParams() {
  const slugs: { slug: string }[] = await client.fetch(
    `*[_type == "project"]{ "slug": slug.current }`,
    {},
    { next: { revalidate: 3600, tags: ['project'] } }
  );
  return slugs.map((s) => ({ slug: s.slug }));
}

// ISR fallback for newly published articles not in the build
export const revalidate = 3600;
export const dynamicParams = true;

interface SanityImage {
  _type: 'image';
  asset: { _ref: string; _type: 'reference' };
  alt?: string;
}

interface ProjectData {
  title: string;
  body: any;
  publishedAt: string;
  summary?: string;
  category: 'technical' | 'partnership' | 'event' | 'news';
  mainImage?: SanityImage;
  references?: { label: string; url: string }[];
}

export default async function ProjectArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const project: ProjectData = await client.fetch(
    `*[_type == "project" && slug.current == $slug][0]{
      title, body, publishedAt, summary, category, mainImage, references
    }`,
    { slug },
    { next: { revalidate: 3600, tags: [`project:${slug}`, 'project'] } }
  );

  if (!project) notFound();

  const coverImageUrl = project.mainImage
    ? urlFor(project.mainImage).width(1600).height(900).auto('format').url()
    : null;

  const body = project.body?.map((block: any) => {
    if (block._type === 'image' && block.asset) {
      return { ...block, _imageUrl: urlFor(block as SanityImage).width(1200).auto('format').url() };
    }
    return block;
  });

  return (
    <div className="bg-[#08161F] min-h-screen relative overflow-hidden selection:bg-teal-500/25">

      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-teal-950/60 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] bg-teal-950/40 rounded-full blur-[100px]" />
      </div>

      <div className="absolute top-0 right-0 w-full h-[900px] z-0 pointer-events-none opacity-50 sm:opacity-60">
        <svg viewBox="0 0 1000 900" preserveAspectRatio="none" className="w-full h-full">
          <defs>
            <linearGradient id="wg" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#4caf50" stopOpacity="0.0" />
              <stop offset="40%"  stopColor="#1f6930" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#0A3040" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          <path fill="url(#wg)" d="M0,900 C120,885 280,880 440,800 C620,710 780,580 900,320 C960,170 985,70 1000,0 L1000,900Z" />
        </svg>
      </div>

      <Navbar />

      <ArticleContent
        title={project.title}
        body={body}
        publishedAt={project.publishedAt}
        summary={project.summary}
        category={project.category ?? 'technical'}
        coverImageUrl={coverImageUrl}
        coverImageAlt={project.mainImage?.alt ?? project.title}
        references={project.references}
      />

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}