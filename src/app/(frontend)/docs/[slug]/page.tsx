import Sidebar from '../../components/Sidebar';
import ArticleContent from '../../components/ArticleContent';
import { getPayloadClient } from '../../lib/payload';

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const payload = await getPayloadClient();

  // Fetch all for sidebar + specific article
  const { docs: allDocs } = await payload.find({ collection: 'articles', limit: 0 });
  const { docs: categories } = await payload.find({ collection: 'categories', limit: 0 });
  const { docs: subcategories } = await payload.find({ collection: 'subcategories', limit: 0 });

  const { docs: [article] } = await payload.find({
    collection: 'docs',
    where: { slug: { equals: params.slug } },
  });

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="min-h-screen flex">
      <Sidebar categories={categories} subcategories={subcategories} docs={allDocs} selectedSlug={params.slug} />
      <main className="flex-grow p-8">
        <ArticleContent article={article} />
      </main>
    </div>
  );
}

// Generate static paths for SSG (optional, for better perf)
export async function generateStaticParams() {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({ collection: 'docs', limit: 0 });
  return docs.map((doc: any) => ({ slug: doc.slug }));
}