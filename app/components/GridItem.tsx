// app/components/GridItem.tsx
'use client'; // Para los efectos de hover de Framer Motion

import { urlFor } from '@/lib/sanity.image'; // (Necesitas crear este helper)
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Variante para el item individual
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Helper para determinar la URL
const getHref = (item: any) => {
  if (item._type === 'publicacion') {
    return `/ensayos/${item.slug.current}`; // Asumiendo que tienes esta ruta
  }
  if (item._type === 'obraTaller') {
    return `/obras/${item.slug.current}`; // Asumiendo que tienes esta ruta
  }
  return '/';
};

export function GridItem({ item, className }: { item: any; className: string }) {
  const imageUrl = item.imagen_portada ? urlFor(item.imagen_portada).width(400).height(400).url() : null;

  return (
    <motion.div
      className={`relative rounded-lg overflow-hidden group ${className}`}
      variants={itemVariants}
      whileHover={{ scale: 1.03 }} // Efecto de zoom experimental
    >
      <Link href={getHref(item)} className="block w-full h-full">
        {/* Capa de Imagen */}
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={item.titulo}
            width={400}
            height={400}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="w-full h-full bg-gray-700" /> // Placeholder
        )}

        {/* Capa de Texto (Aparece al hacer hover) */}
        <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <span className="text-xs uppercase text-yellow-400">{item.tipo}</span>
          <h3 className="text-lg font-bold text-white">{item.titulo}</h3>
        </div>
      </Link>
    </motion.div>
  );
}