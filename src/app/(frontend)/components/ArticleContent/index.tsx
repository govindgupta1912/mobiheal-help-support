import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin'; // Fallback if not rich

interface ArticleContentProps {
  article: any;
}

export default function ArticleContent({ article }: ArticleContentProps) {
  const initialConfig = {
    namespace: 'article',
    theme: {}, // Add custom theme if needed
    onError: (error: Error) => console.error(error),
    editorState: JSON.stringify(article.content), // Assuming Lexical JSON
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="text-gray-500 mb-4">Read time: {article.readTime} min | Published: {new Date(article.publishDate).toLocaleDateString()}</p>
      <LexicalComposer initialConfig={initialConfig}>
        <RichTextPlugin
          contentEditable={<ContentEditable />}
          placeholder={<div>Empty</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
      </LexicalComposer>
    </div>
  );
}