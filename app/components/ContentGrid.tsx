// components/ContentGrid.tsx
'use client';

import { GridItem } from './GridItem';
import { motion } from 'framer-motion';

// Variantes que solo aplican desde sm en adelante.
// En mobile, el caos lo controlan spans del GridItem con mínimos.
const VARIANTS_SM_UP = [
  'sm:col-span-2 sm:row-span-2',
  'sm:col-span-1 sm:row-span-2',
  'sm:col-span-2 sm:row-span-1',
  'sm:col-span-3 sm:row-span-2',
  'sm:col-span-2 sm:row-span-3',
  'sm:col-span-1 sm:row-span-3',
  'sm:col-span-1 sm:row-span-1',
  'sm:col-span-2 sm:row-span-1',
  'sm:col-span-1 sm:row-span-2',
];

// Pick determinista para patrón estable y variado
function pick(i: number) {
  const idx = Math.abs(Math.floor(Math.sin(i * 9301 + 49297) * 233280)) % VARIANTS_SM_UP.length;
  return VARIANTS_SM_UP[idx];
}

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

export function ContentGrid({ items }: { items: any[] }) {
  if (!items || items.length === 0) {
    return <p className="text-xl text-gray-400">La taberna está vacía por ahora. El autor está creando...</p>;
  }

  return (
    <motion.div
      className="grid-mobile-safe"
      variants={gridVariants}
      initial="hidden"
      animate="visible"
    >
      {items.map((item, i) => (
        <GridItem key={item._id ?? i} item={item} className={pick(i)} />
      ))}
    </motion.div>
  );
}
