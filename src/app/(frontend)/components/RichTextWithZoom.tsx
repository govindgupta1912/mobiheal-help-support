"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface Props {
  data: any; // ✅ treat Lexical JSON as "any"
}

export default function RichTextWithZoom({ data }: Props) {
  const [zoomedImg, setZoomedImg] = useState<string | null>(null);

  if (!data) return null;

  const renderNode = (node: any, index: number): JSX.Element | null => {
    if (!node) return null;

    switch (node.type) {
      case "upload": {
        const img = node.value;
        if (!img?.url) return null;
        return (
          <img
            key={index}
            src={img.url}
            alt={img.alt || "Image"}
            className="max-w-full h-auto cursor-pointer rounded-md shadow-sm"
            onClick={() => setZoomedImg(img.url)}
          />
        );
      }
      case "heading": {
        const Tag = node.tag as keyof JSX.IntrinsicElements;
        return (
          <Tag key={index} className="mt-6 mb-2 font-semibold text-gray-800">
            {node.children?.map(renderNode)}
          </Tag>
        );
      }
      case "paragraph": {
        return (
          <p key={index} className="mb-4 text-blue-700 leading-relaxed">
            {node.children?.map(renderNode)}
          </p>
        );
      }
      case "text": {
        return node.text;
      }
      default:
        return node.children?.map(renderNode) || null;
    }
  };

  return (
    <>
      <div className="prose max-w-none">
        {data.root?.children?.map(renderNode)}
      </div>

      {zoomedImg && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999]"
          onClick={() => setZoomedImg(null)}
        >
          {/* Close button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setZoomedImg(null);
            }}
            className="absolute top-4 right-4 bg-black/70 text-white rounded-full p-2"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Zoomed Image */}
          <img
            src={zoomedImg}
            alt="Zoomed"
            className="max-w-5xl max-h-[85vh] object-contain rounded-lg shadow-lg"
          />
        </div>
      )}
    </>
  );
}
