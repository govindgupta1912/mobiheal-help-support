'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  categories: any[];
  subcategories: any[];
  docs: any[];
  selectedSlug?: string;
}

export default function Sidebar({
  categories,
  subcategories,
  docs,
  selectedSlug,
}: SidebarProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedSubcategory, setExpandedSubcategory] = useState<string | null>(null);

  // Find the parent category/subcategory of the selected doc
  useEffect(() => {
    if (!selectedSlug) return;

    const selectedDoc = docs.find(doc => doc.slug === selectedSlug);
    if (selectedDoc?.parent?.relationTo === 'categories') {
      setExpandedCategory(selectedDoc.parent.value.id);
      setExpandedSubcategory(null);
    } else if (selectedDoc?.parent?.relationTo === 'subcategories') {
      const subId = selectedDoc.parent.value.id;
      const sub = subcategories.find(s => s.id === subId);
      if (sub) {
        setExpandedCategory(sub.category?.id || null);
        setExpandedSubcategory(subId);
      }
    }
  }, [selectedSlug, docs, subcategories]);

  const toggleCategory = (id: string) => {
    setExpandedCategory(prev => (prev === id ? null : id));
    setExpandedSubcategory(null);
  };

  const toggleSubcategory = (id: string) => {
    setExpandedSubcategory(prev => (prev === id ? null : id));
  };

  const getSubcatsForCat = (catId: string) =>
    subcategories.filter(sub => sub.category?.id === catId);

  const getDocsForParent = (parentId: string, relationTo: string) =>
    docs.filter(
      doc =>
        doc.parent?.value?.id === parentId &&
        doc.parent?.relationTo === relationTo,
    );

  return (
    <aside className="w-72 bg-white border-r border-gray-200 p-4 overflow-y-auto h-screen">
      <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3">
        Documentation
      </h2>
      <ul className="space-y-2">
        {categories.map(cat => (
          <li key={cat.id}>
            {/* Category toggle */}
            <button
              onClick={() => toggleCategory(cat.id)}
              className="w-full flex justify-between items-center py-2 px-2 text-left font-medium text-gray-800 hover:bg-gray-100 rounded-md"
            >
              {cat.title}
              <span className="text-gray-400">
                {expandedCategory === cat.id ? '−' : '+'}
              </span>
            </button>

            <AnimatePresence>
              {expandedCategory === cat.id && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="ml-4 mt-2 space-y-1 border-l border-gray-200 pl-3"
                >
                  {/* Articles under category */}
                  {getDocsForParent(cat.id, 'categories').map(doc => (
                    <li key={doc.id}>
                      <Link
                        href={`/docs/${doc.slug}`}
                        className={`block py-1.5 px-2 rounded-md text-sm ${
                          selectedSlug === doc.slug
                            ? 'bg-blue-50 text-blue-600 font-semibold border-l-2 border-blue-600'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {doc.title}
                      </Link>
                    </li>
                  ))}

                  {/* Subcategories */}
                  {getSubcatsForCat(cat.id).map(sub => (
                    <li key={sub.id}>
                      <button
                        onClick={() => toggleSubcategory(sub.id)}
                        className="w-full flex justify-between items-center py-1.5 px-2 text-gray-700 hover:bg-gray-50 rounded-md text-sm"
                      >
                        {sub.title}
                        <span className="text-gray-400">
                          {expandedSubcategory === sub.id ? '−' : '+'}
                        </span>
                      </button>

                      <AnimatePresence>
                        {expandedSubcategory === sub.id && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="ml-4 mt-1 space-y-1 border-l border-gray-200 pl-3"
                          >
                            {getDocsForParent(sub.id, 'subcategories').map(
                              doc => (
                                <li key={doc.id}>
                                  <Link
                                    href={`/docs/${doc.slug}`}
                                    className={`block py-1.5 px-2 rounded-md text-sm ${
                                      selectedSlug === doc.slug
                                        ? 'bg-blue-50 text-blue-600 font-semibold border-l-2 border-blue-600'
                                        : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                  >
                                    {doc.title}
                                  </Link>
                                </li>
                              ),
                            )}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </li>
        ))}
      </ul>
    </aside>
  );
}
