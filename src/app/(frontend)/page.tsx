// app/page.tsx
import Link from 'next/link';
import SearchComponent from './components/SearchComponent';
import { getPayloadClient } from './lib/payload';

export default async function LandingPage() {
  const payload = await getPayloadClient();
  const { docs: allDocs } = await payload.find({
    collection: 'articles',
    limit: 0,
    depth: 2, // Populate parent category/subcategory
  });

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mobiheal Docs</h1>
        <div className="w-1/3">
          <SearchComponent articles={allDocs} />
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <Link href="/docs/assigning-and-pushing-apps">
            <button className="bg-green-500 text-white px-4 py-2 mr-4 rounded-md hover:bg-green-600">Get Started</button>
          </Link>
          <Link href="/docs">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Docs</button>
          </Link>
        </div>
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        © 2025 Mobiheal
      </footer>
    </div>
  );
}