import ClientApp from '@/components/ClientApp';
import { client } from "@/sanity/lib/client";

// Revalidate this page at most once per hour
export const revalidate = 3600;

export default async function Home() {
    // Fetch only the 3 most recent posts for the landing page section
    const posts = await client.fetch(
        `*[_type == "project"] | order(publishedAt desc)[0...3]{
            _id,
            title,
            "slug": slug.current,
            publishedAt,
            summary
        }`,
        {},
        { next: { revalidate: 3600, tags: ['project'] } }
    );

    return <ClientApp posts={posts} />;
}