import React from 'react';

/**
 * Format text with proper paragraph breaks, lists, and structure
 */
export function formatText(text: string): React.ReactNode {
  if (!text) return null;

  // Split by double newlines for paragraphs
  const blocks = text.split(/\n\n+/);
  
  return (
    <>
      {blocks.map((block, blockIndex) => {
        const trimmedBlock = block.trim();
        
        if (!trimmedBlock) return null;

        // Check if block is a numbered list
        if (/^\d+\.\s/.test(trimmedBlock)) {
          const items = trimmedBlock.split(/\n(?=\d+\.\s)/);
          return (
            <ol key={blockIndex} className="space-y-2 ml-4 mb-4">
              {items.map((item, itemIndex) => {
                const cleanItem = item.replace(/^\d+\.\s*/, '');
                return (
                  <li key={itemIndex} className="text-gray-300 leading-relaxed pl-2 flex items-start gap-2">
                    <span className="text-cyan-400 font-semibold min-w-[1.5rem]">{itemIndex + 1}.</span>
                    <span className="flex-1">{cleanItem}</span>
                  </li>
                );
              })}
            </ol>
          );
        }
        
        // Check if block is a bullet list
        if (/^[•\-\*]\s/.test(trimmedBlock)) {
          const items = trimmedBlock.split(/\n(?=[•\-\*]\s)/);
          return (
            <ul key={blockIndex} className="space-y-2 ml-4 mb-4">
              {items.map((item, itemIndex) => {
                const cleanItem = item.replace(/^[•\-\*]\s*/, '');
                return (
                  <li key={itemIndex} className="text-gray-300 leading-relaxed pl-2 flex items-start gap-2">
                    <span className="text-cyan-400">•</span>
                    <span className="flex-1">{cleanItem}</span>
                  </li>
                );
              })}
            </ul>
          );
        }
        
        // Regular paragraph
        return (
          <p key={blockIndex} className="text-gray-300 leading-relaxed mb-4 last:mb-0">
            {trimmedBlock}
          </p>
        );
      })}
    </>
  );
}

/**
 * Format a list of strings with proper numbering
 */
export function formatList(items: string[]): React.ReactNode {
  if (!items || items.length === 0) return null;

  return (
    <ol className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-3">
          <span className="flex-shrink-0 w-7 h-7 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-sm font-semibold mt-0.5">
            {index + 1}
          </span>
          <span className="text-gray-300 leading-relaxed flex-1 pt-0.5">
            {item}
          </span>
        </li>
      ))}
    </ol>
  );
}

/**
 * Format with bullet points
 */
export function formatBulletList(items: string[]): React.ReactNode {
  if (!items || items.length === 0) return null;

  return (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-3">
          <span className="text-cyan-400 text-xl leading-none mt-1">•</span>
          <span className="text-gray-300 leading-relaxed flex-1">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}