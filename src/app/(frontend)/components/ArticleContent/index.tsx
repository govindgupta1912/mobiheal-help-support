import { format } from "date-fns";
import { Calendar, Clock } from "lucide-react";
import RichTextWithZoom from "../RichTextWithZoom";

export default function ArticleContent({ article }: { article: any }) {
  const publishedDate = article.publishDate
    ? format(new Date(article.publishDate), "MMMM dd, yyyy")
    : "";

  return (
    <article className="max-w-4xl mx-auto px-6 py-8">
      <header className="border-b border-gray-200 pb-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{article.title}</h1>

        <div className="flex items-center text-sm text-gray-500 space-x-6">
          {article.readTime && (
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {article.readTime} min read
            </span>
          )}
          {publishedDate && (
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {publishedDate}
            </span>
          )}
        </div>
      </header>

      {/* Content */}
      <RichTextWithZoom data={article.content} />
    </article>
  );
}
