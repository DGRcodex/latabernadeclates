'use client';

import { useSidebar } from '@/app/context/SidebarContext';
import Link from 'next/link';

export function Header() {
  const { toggleSidebar, isOpen } = useSidebar();

  return (
    <header
      className="
        fixed top-0 left-0 w-full
        h-20 md:h-20 lg:h-20
        bg-gray-900/80 backdrop-blur-md border-b border-gray-700
        z-50 flex items-center justify-between px-6
        pt-[env(safe-area-inset-top,0px)]
      "
      role="banner"
    >
      {/* Botón Hamburguesa */}
      <button
        onClick={toggleSidebar}
        className="text-white z-50 p-2 rounded-md hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
        aria-label="Abrir/cerrar menú lateral"
        aria-expanded={isOpen}
        aria-controls="app-sidebar"
        type="button"
      >
        <div className={`w-6 h-0.5 bg-white mb-1.5 transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
        <div className={`w-6 h-0.5 bg-white transition-opacity ${isOpen ? 'opacity-0' : ''}`} />
        <div className={`w-6 h-0.5 bg-white mt-1.5 transition-transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      {/* Título centrado */}
      <div className="absolute left-1/2 -translate-x-1/2 pointer-events-auto">
        <Link
          href="/"
          className="text-2xl md:text-3xl font-bold hover:text-yellow-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded"
        >
          La Taberna de Clates
        </Link>
      </div>

      {/* Placeholder derecho para mantener el título perfectamente centrado
          (mismo ancho aproximado que el botón) */}
      <div aria-hidden className="w-10" />
    </header>
  );
}
