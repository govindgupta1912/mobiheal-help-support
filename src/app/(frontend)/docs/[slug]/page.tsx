import ArticleContent from "../../components/ArticleContent";
import SearchComponent from "../../components/SearchComponent";
import Sidebar from "../../components/Sidebar";
import { getPayloadClient } from "../../lib/payload";

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;   // ✅ await first

  const payload = await getPayloadClient();

  // Sidebar data
  const { docs: allDocs } = await payload.find({ collection: 'articles', limit: 0 });
  const { docs: categories } = await payload.find({ collection: 'categories', limit: 0 });
  const { docs: subcategories } = await payload.find({ collection: 'subcategories', limit: 0 });

  // Article data
  const { docs: [article] } = await payload.find({
    collection: 'articles',
    where: { slug: { equals: slug } },
  });

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="min-h-screen flex">
             
      <Sidebar
        categories={categories}
        subcategories={subcategories}
        docs={allDocs}
        selectedSlug={slug} // ✅ safe now
      />
      <main className="flex-grow p-8">
         <div className="mb-6">
                <SearchComponent articles={allDocs} />
              </div>
        <ArticleContent article={article} />
      </main>
    </div>
  );
}
