import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Mobiheal Docs</h1>
      </header>
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <Link href="/docs/assigning-and-pushing-apps"> {/* Adjust to your first article slug */}
            <button className="bg-green-500 text-white px-4 py-2 mr-4">Get Started</button>
          </Link>
          <Link href="/docs">
            <button className="bg-blue-500 text-white px-4 py-2">Docs</button>
          </Link>
        </div>
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        © 2025 Mobiheal
      </footer>
    </div>
  );
}