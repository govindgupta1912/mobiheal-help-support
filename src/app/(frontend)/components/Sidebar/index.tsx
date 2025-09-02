'use client'; // Client component for interactivity

import { useState } from 'react';
import Link from 'next/link';

interface SidebarProps {
  categories: any[];
  subcategories: any[];
  docs: any[];
  selectedSlug?: string;
}

export default function Sidebar({ categories, subcategories, docs, selectedSlug }: SidebarProps) {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  const toggle = (id: string) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getSubcatsForCat = (catId: string) => subcategories.filter(sub => sub.category?.id === catId);
  const getDocsForParent = (parentId: string, relationTo: string) =>
    docs.filter(doc => doc.parent?.value?.id === parentId && doc.parent?.relationTo === relationTo);

  return (
    <aside className="w-64 bg-gray-100 p-4 overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Documentation</h2>
      <ul>
        {categories.map(cat => (
          <li key={cat.id}>
            <button onClick={() => toggle(cat.id)} className="w-full text-left font-semibold">
              {cat.title} {expanded[cat.id] ? '-' : '+'}
            </button>
            {expanded[cat.id] && (
              <ul className="ml-4">
                {getDocsForParent(cat.id, 'categories').map(doc => (
                  <li key={doc.id}>
                    <Link href={`/docs/${doc.slug}`} className={selectedSlug === doc.slug ? 'font-bold' : ''}>
                      {doc.title}
                    </Link>
                  </li>
                ))}
                {getSubcatsForCat(cat.id).map(sub => (
                  <li key={sub.id}>
                    <button onClick={() => toggle(sub.id)} className="w-full text-left">
                      {sub.title} {expanded[sub.id] ? '-' : '+'}
                    </button>
                    {expanded[sub.id] && (
                      <ul className="ml-4">
                        {getDocsForParent(sub.id, 'subcategories').map(doc => (
                          <li key={doc.id}>
                            <Link href={`/docs/${doc.slug}`} className={selectedSlug === doc.slug ? 'font-bold' : ''}>
                              {doc.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}