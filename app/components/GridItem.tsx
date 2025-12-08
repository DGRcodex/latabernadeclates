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
      className={`relative border-2 border-black bg-white transition-transform hover:-translate-y-1 hover:shadow-brutal ${className ?? ''}`}
      style={
        isMobile
          ? {
            gridColumn: `span ${col} / span ${col}`,
            gridRow: `span ${row} / span ${row}`,
          }
          : undefined
      }
    >
      <Link href={getHref(item)} className="block w-full h-full group">
        <div
          className="relative w-full h-full"
          style={isMobile ? { minHeight: `${row * 15}vh` } : undefined}
        >
          {item?.imagen_portada ? (
            <Image
              src={urlFor(item.imagen_portada)!.width(1600).height(1000).url()}
              alt={item?.titulo ?? 'Publicación'}
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={false}
            />
          ) : (
            <div className="w-full h-full bg-neutral-800" />
          )}
        </div>

        {/* Overlay Brutalista */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-white border-2 border-black p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            {!!item?.tipo && <span className="block text-xs font-bold uppercase text-brutal-accent mb-1">{item.tipo}</span>}
            {!!item?.titulo && <h3 className="text-lg font-black uppercase text-black leading-tight">{item.titulo}</h3>}
          </div>
        </div>
      </Link>
    </div>
  );
}
