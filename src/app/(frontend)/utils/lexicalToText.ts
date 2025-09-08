// utils/lexicalToText.ts
export function lexicalToText(lexicalContent: any): string {
  if (!lexicalContent || !lexicalContent.root || !lexicalContent.root.children) {
    return '';
  }

  const extractText = (nodes: any[]): string => {
    return nodes
      .map(node => {
        if (node.type === 'text' && node.text) {
          return node.text;
        }
        if (node.children && Array.isArray(node.children)) {
          return extractText(node.children);
        }
        return '';
      })
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();
  };

  return extractText(lexicalContent.root.children);
}