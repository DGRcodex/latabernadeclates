// components/GridItem.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity.image';

function getHref(item: any) {
  if (item?._type === 'publicacion') return `/ensayos/${item.slug?.current}`;
  if (item?._type === 'obraTaller') return `/obras/${item.slug?.current}`;
  return '/';
}

export function GridItem({ item, className }: { item: any; className?: string }) {
  const [isMobile, setIsMobile] = useState(true);

  // Spans aleatorios por recarga, solo mobile
  // col 1–2, row 2–3 para respetar 30vw x 30vh mínimos
  const mobileSpanRef = useRef<{ col: number; row: number } | null>(null);
  if (!mobileSpanRef.current) {
    const col = Math.random() < 0.35 ? 2 : 1;       // ~35% más anchas
    const row = 2 + (Math.random() < 0.5 ? 1 : 0);  // 2 o 3 filas
    mobileSpanRef.current = { col, row };
  }

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 640px)');
    const handler = () => setIsMobile(!mq.matches);
    handler();
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const { col, row } = mobileSpanRef.current!;

  return (
    <div
      className={`relative rounded-2xl overflow-hidden ${className ?? ''}`}
      style={
        isMobile
          ? {
              gridColumn: `span ${col} / span ${col}`,
              gridRow: `span ${row} / span ${row}`,
            }
          : undefined
      }
    >
      <Link href={getHref(item)} className="block w-full h-full">
        <div
          className="relative w-full h-full"
          style={isMobile ? { minHeight: `${row * 15}vh` } : undefined}
        >
          {item?.imagen_portada ? (
            <Image
              src={urlFor(item.imagen_portada)!.width(1600).height(1000).url()}
              alt={item?.titulo ?? 'Publicación'}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={false}
            />
          ) : (
            <div className="w-full h-full bg-neutral-800" />
          )}
        </div>

        {/* Overlay solo desktop */}
        <div className="pointer-events-none absolute inset-0 hidden sm:flex sm:flex-col sm:justify-end sm:p-4 sm:bg-black/60 sm:opacity-0 sm:hover:opacity-100 transition-opacity">
          {!!item?.tipo && <span className="text-xs uppercase text-yellow-400">{item.tipo}</span>}
          {!!item?.titulo && <h3 className="text-lg font-semibold text-white">{item.titulo}</h3>}
        </div>
      </Link>
    </div>
  );
}
