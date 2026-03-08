import ClientApp from '@/components/ClientApp';
import { client } from "@/sanity/lib/client";

export default async function Home() {
    // Fetch only the 3 most recent posts for the landing page section
    const posts = await client.fetch(`*[_type == "project"] | order(publishedAt desc)[0...3]{
        _id,
        title,
        "slug": slug.current,
        publishedAt,
        summary
    }`);

    return <ClientApp posts={posts} />;
}