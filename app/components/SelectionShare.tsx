// components/SelectionShare.tsx
'use client';

import { useEffect, useState } from 'react';
import { Quote, MessageCircle, Twitter } from 'lucide-react';

type Props = { title: string };

function selectedText() {
  if (typeof window === 'undefined') return '';
  const t = window.getSelection()?.toString().trim() ?? '';
  return t.replace(/\s+/g, ' ').slice(0, 220); // recorta para tweet/WA
}

export default function SelectionShare({ title }: Props) {
  const [snippet, setSnippet] = useState('');

  useEffect(() => {
    const onSel = () => setSnippet(selectedText());
    document.addEventListener('selectionchange', onSel);
    return () => document.removeEventListener('selectionchange', onSel);
  }, []);

  if (!snippet) return null;

  const text = `“${snippet}” — ${title}`;
  const wa = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  const x = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="floating-share">
        <Quote className="h-4 w-4 text-black" />
        <span className="hidden sm:inline text-sm font-bold text-black uppercase">Compartir selección</span>
        <a className="btn-share" href={wa} target="_blank" rel="noopener noreferrer" aria-label="Compartir selección por WhatsApp">
          <MessageCircle className="h-4 w-4" /><span className="hidden sm:inline">WhatsApp</span>
        </a>
        <a className="btn-share" href={x} target="_blank" rel="noopener noreferrer" aria-label="Compartir selección en X">
          <Twitter className="h-4 w-4" /><span className="hidden sm:inline">X</span>
        </a>
      </div>
    </div>
  );
}
