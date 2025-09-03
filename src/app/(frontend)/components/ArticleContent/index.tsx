'use client';

import { RichText } from '@payloadcms/richtext-lexical/react';
import { format } from "date-fns";

export default function ArticleContent({ article }: { article: any }) {
   const publishedDate = article.publishDate
    ? format(new Date(article.publishDate), "yyyy-MM-dd") // stable format
    : "";
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="text-gray-500 mb-4">
        Read time: {article.readTime} min | Published: {publishedDate}
      </p>
      <div className="prose max-w-none">
        <RichText data={article.content} />
      </div>
    </div>
  );
}
