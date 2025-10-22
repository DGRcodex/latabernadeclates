// frontend/app/components/ContentGrid.tsx
'use client';
import { GridItem } from './GridItem';
import { motion } from 'framer-motion'; // Make sure this import is present

// Possible sizes for the grid items
const SIZES = [
  'col-span-2 row-span-2', 'col-span-1 row-span-1', 'col-span-1 row-span-2',
  'col-span-2 row-span-1', 'col-span-1 row-span-1', 'col-span-1 row-span-1',
  'col-span-3 row-span-2', 'col-span-2 row-span-3', 'col-span-1 row-span-3',
];

// **CRITICAL: Define gridVariants HERE, before the component function**
const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // Each child animates 0.05s after the previous one
    },
  },
};

export function ContentGrid({ items }: { items: any[] }) {
  if (!items || items.length === 0) {
    return <p className="text-xl text-gray-400">La taberna está vacía por ahora. El autor está creando...</p>;
  }

  return (
    // Make sure 'variants', 'initial', and 'animate' props are correct
    <motion.div
      className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 auto-rows-[150px] gap-4"
      variants={gridVariants} // Use the defined variants
      initial="hidden"       // Start in the 'hidden' state
      animate="visible"      // Animate to the 'visible' state
    >
      {items.map((item, i) => {
        // Assign a random size on each render
        const randomSizeIndex = Math.floor(Math.random() * SIZES.length);
        const sizeClass = SIZES[randomSizeIndex];

        return <GridItem key={item._id} item={item} className={sizeClass} />;
      })}
    </motion.div>
  );
}