import Sidebar from '../components/Sidebar';
import ArticleContent from '../components/ArticleContent';
import { getPayloadClient } from '../lib/payload';
import SearchComponent from '../components/SearchComponent';

export default async function DocsPage() {
  const payload = await getPayloadClient();
  // Fetch all data server-side
  const { docs: allDocs } = await payload.find({ collection: 'articles', limit: 0 });
  const { docs: categories } = await payload.find({ collection: 'categories', limit: 0 });
  const { docs: subcategories } = await payload.find({ collection: 'subcategories', limit: 0 });

  // Default to no article selected
  return (
    <div className="min-h-screen flex">
      <Sidebar categories={categories} subcategories={subcategories} docs={allDocs} />
      <main className="flex-grow p-8">
        <div className="mb-6">
          <SearchComponent articles={allDocs} />
        </div>
        <h2 className="text-xl">Select an article from the sidebar</h2>
      </main>
    </div>
  );
}