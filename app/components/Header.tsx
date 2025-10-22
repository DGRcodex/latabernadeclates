'use client';
import { useSidebar } from '@/app/context/SidebarContext';
import Link from 'next/link';

export function Header() {
  const { toggleSidebar, isOpen } = useSidebar();

  return (
    <header className="fixed top-0 left-0 w-full h-20 bg-gray-900 bg-opacity-80 backdrop-blur-md border-b border-gray-700 z-50 flex items-center justify-between px-6">
      
      {/* Botón de Toggle (Hamburger) */}
      <button 
        onClick={toggleSidebar}
        className="text-white z-50 p-2 rounded-md hover:bg-gray-700"
        aria-label="Toggle Menu"
      >
        {/* Simple ícono de 3 líneas */}
        <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
        <div className={`w-6 h-0.5 bg-white transition-all ${isOpen ? 'opacity-0' : ''}`}></div>
        <div className={`w-6 h-0.5 bg-white mt-1.5 transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
      </button>

      {/* Título de la Taberna (Centrado o a la derecha) */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <Link href="/" className="text-2xl font-bold hover:text-yellow-400">
          La Taberna de Clates
        </Link>
      </div>
    </header>
  );
}