'use client';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';

// Import nodes
import { HeadingNode } from '@lexical/rich-text';
import { ListNode, ListItemNode } from '@lexical/list';
import { QuoteNode } from '@lexical/rich-text';
import { CodeNode } from '@lexical/code';

interface ArticleContentProps {
  article: any;
}

export default function ArticleContent({ article }: ArticleContentProps) {
  const initialConfig = {
    namespace: 'article',
    theme: {},
    onError: (error: Error) => console.error(error),
    nodes: [HeadingNode, ListNode, ListItemNode, QuoteNode, CodeNode], // ✅ register needed nodes
    editorState: article?.content
      ? JSON.stringify(article.content) // ✅ pass JSON directly
      : undefined,
    editable: false, // read-only
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="text-gray-500 mb-4">
        Read time: {article.readTime} min | Published:{' '}
        {new Date(article.publishDate).toLocaleDateString()}
      </p>
      <LexicalComposer initialConfig={initialConfig}>
        <RichTextPlugin
          contentEditable={<ContentEditable className="prose max-w-none" />}
          placeholder={<div>Empty</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
      </LexicalComposer>
    </div>
  );
}
