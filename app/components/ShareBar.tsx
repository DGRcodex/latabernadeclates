// components/ShareBar.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  Share2, Mail, MessageCircle, Send, Twitter, Linkedin, Facebook, Copy, Smartphone, Link as LinkIcon
} from 'lucide-react';

type Props = {
  title: string;
  excerpt?: string;
  tags?: string[];
  urlOverride?: string;
};

function encode(s = '') {
  return encodeURIComponent(s);
}

export default function ShareBar({ title, excerpt, tags = [], urlOverride }: Props) {
  const pathname = usePathname();
  const [origin, setOrigin] = useState<string>('');

  useEffect(() => {
    try {
      setOrigin(urlOverride ? new URL(urlOverride).origin : window.location.origin);
    } catch {
      if (typeof window !== 'undefined') setOrigin(window.location.origin);
    }
  }, [urlOverride]);

  const siteUrl = useMemo(() => {
    const envBase = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
    if (urlOverride) return urlOverride;
    if (envBase && pathname) return `${envBase}${pathname}`;
    if (origin && pathname) return `${origin}${pathname}`;
    return '';
  }, [origin, pathname, urlOverride]);

  const baseText = excerpt?.trim()?.length ? `${title} — ${excerpt}` : title;
  const hash = tags.filter(Boolean).map(t => t.replace(/^#/, '')).join(',');

  const xUrl  = `https://twitter.com/intent/tweet?text=${encode(baseText)}&url=${encode(siteUrl)}${hash ? `&hashtags=${encode(hash)}` : ''}`;
  const bsky  = `https://bsky.app/intent/compose?text=${encode(`${baseText} ${siteUrl}`)}`;
  const liUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encode(siteUrl)}`;
  const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encode(siteUrl)}`;
  const waUrl = `https://api.whatsapp.com/send?text=${encode(`${baseText}\n\n${siteUrl}`)}`;
  const tgUrl = `https://t.me/share/url?url=${encode(siteUrl)}&text=${encode(baseText)}`;
  const mail  = `mailto:?subject=${encode(title)}&body=${encode(`${baseText}\n\n${siteUrl}`)}`;

  const canWebShare = typeof navigator !== 'undefined' && !!navigator.share;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(siteUrl);
      // Toast simple sin dependencia:
      const el = document.createElement('div');
      el.textContent = 'Enlace copiado';
      el.className = 'toast-mini';
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 1200);
    } catch {}
  };

  const handleWebShare = async () => {
    try {
      if (canWebShare) await navigator.share({ title, text: baseText, url: siteUrl });
    } catch {}
  };

  return (
    <section className="mt-8">
      <div className="card-glass">
        <div className="flex items-center gap-2 text-sm text-white/80 mb-3">
          <Share2 className="h-4 w-4" />
          <span className="font-medium">Compartir</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <a className="btn-share" href={xUrl} target="_blank" rel="noopener noreferrer" aria-label="Compartir en X">
            <Twitter className="h-4 w-4" /><span className="hidden sm:inline">X</span>
          </a>

          <a className="btn-share" href={bsky} target="_blank" rel="noopener noreferrer" aria-label="Compartir en Bluesky">
            <Send className="h-4 w-4" /><span className="hidden sm:inline">Bluesky</span>
          </a>

          <a className="btn-share" href={liUrl} target="_blank" rel="noopener noreferrer" aria-label="Compartir en LinkedIn">
            <Linkedin className="h-4 w-4" /><span className="hidden sm:inline">LinkedIn</span>
          </a>

          <a className="btn-share" href={fbUrl} target="_blank" rel="noopener noreferrer" aria-label="Compartir en Facebook">
            <Facebook className="h-4 w-4" /><span className="hidden sm:inline">Facebook</span>
          </a>

          <a className="btn-share" href={waUrl} target="_blank" rel="noopener noreferrer" aria-label="Compartir por WhatsApp">
            <MessageCircle className="h-4 w-4" /><span className="hidden sm:inline">WhatsApp</span>
          </a>

          <a className="btn-share" href={tgUrl} target="_blank" rel="noopener noreferrer" aria-label="Compartir en Telegram">
            <Send className="h-4 w-4" /><span className="hidden sm:inline">Telegram</span>
          </a>

          <a className="btn-share" href={mail} aria-label="Compartir por Email">
            <Mail className="h-4 w-4" /><span className="hidden sm:inline">Email</span>
          </a>

          <button className="btn-share" onClick={handleCopy} aria-label="Copiar enlace">
            <Copy className="h-4 w-4" /><span className="hidden sm:inline">Copiar</span>
          </button>

          {canWebShare && (
            <button className="btn-share" onClick={handleWebShare} aria-label="Compartir desde el dispositivo">
              <Smartphone className="h-4 w-4" /><span className="hidden sm:inline">Compartir</span>
            </button>
          )}

          {/* URL visible y copiable */}
          <div className="ml-auto hidden lg:flex items-center gap-2 text-xs text-white/60 rounded-xl border border-white/10 px-3 py-1.5">
            <LinkIcon className="h-3.5 w-3.5" />
            <span className="truncate max-w-[28ch]">{siteUrl}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
