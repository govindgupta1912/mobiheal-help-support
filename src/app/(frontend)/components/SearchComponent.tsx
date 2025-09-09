'use client';

import { useState, useMemo, useEffect } from 'react';
import Fuse from 'fuse.js';
import Link from 'next/link';
import { lexicalToText } from '../utils/lexicalToText'; // ✅ use import, not require

interface Article {
  id: string;
  title: string;
  excerpt?: string;
  slug: string;
  content?: unknown; // ✅ replace `any` with safer type
  parent?: {
    relationTo: 'categories' | 'subcategories';
    value: { name: string; slug: string; description?: string };
  };
}

interface SearchProps {
  articles: Article[];
}

export default function SearchComponent({ articles }: SearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Article[]>([]);

  // Preprocess articles for Fuse.js
  const processedArticles = useMemo(
    () =>
      articles.map((article) => ({
        ...article,
        content: article.content ? lexicalToText(article.content) : '',
        parentName: article.parent?.value?.name || '',
      })),
    [articles]
  );

  // Setup Fuse.js
  const fuse = useMemo(
    () =>
      new Fuse(processedArticles, {
        keys: [
          { name: 'title', weight: 0.7 },
          { name: 'excerpt', weight: 0.4 },
          { name: 'content', weight: 0.3 },
          { name: 'parentName', weight: 0.2 },
        ],
        includeScore: true,
        threshold: 0.3,
        minMatchCharLength: 2,
        shouldSort: true,
      }),
    [processedArticles]
  );

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length >= 2) {
        const searchResults = fuse.search(query).map((result) => result.item);
        setResults(searchResults);
      } else {
        setResults([]);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query, fuse]);

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        placeholder="Search Mobiheal Docs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {results.length > 0 && (
        <ul className="absolute z-20 w-full bg-white border border-gray-200 rounded-md mt-1 max-h-80 overflow-auto shadow-lg">
          {results.map((article) => (
            <li key={article.id}>
              <Link
                href={`/docs/${article.slug}`}
                className="block p-3 hover:bg-gray-100"
              >
                <h3 className="text-base font-semibold text-gray-800">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {article.excerpt?.slice(0, 100) || 'No preview'}...
                </p>
                <small className="text-xs text-gray-500">
                  {article.parent
                    ? `${
                        article.parent.relationTo === 'categories'
                          ? 'Category'
                          : 'Subcategory'
                      }: ${article.parent.value.name}`
                    : 'No parent'}
                </small>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
