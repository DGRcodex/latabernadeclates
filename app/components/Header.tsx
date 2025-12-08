'use client';

import { useSidebar } from '@/app/context/SidebarContext';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

export function Header() {
  const { toggleSidebar, isOpen } = useSidebar();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Mostrar si se sube (scrollUp) o si estamos en el tope
      if (currentScrollY < lastScrollY.current || currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > 100 && currentScrollY > lastScrollY.current) {
        // Ocultar si se baja y hemos pasado el header
        setIsVisible(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 w-full
        h-16 md:h-20 lg:h-24
        bg-brutal-bg border-b-2 border-black
        z-50 flex items-center justify-between px-4 sm:px-6
        pt-[env(safe-area-inset-top,0px)]
        transition-transform duration-300 ease-in-out
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}
      `}
      role="banner"
    >
      {/* Botón Hamburguesa Brutalista */}
      <button
        onClick={toggleSidebar}
        className="
          flex flex-col justify-center items-center
          w-10 h-10 bg-white border-2 border-black 
          hover:shadow-brutal transition-all active:translate-y-1 active:shadow-none
        "
        aria-label="Abrir/cerrar menú lateral"
        aria-expanded={isOpen}
      >
        <span className={`w-5 h-0.5 bg-black mb-1 transition-transform ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
        <span className={`w-5 h-0.5 bg-black transition-opacity ${isOpen ? 'opacity-0' : ''}`} />
        <span className={`w-5 h-0.5 bg-black mt-1 transition-transform ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
      </button>

      {/* Logo Imagen + Texto Centrado */}
      <div className="absolute left-1/2 -translate-x-1/2 pointer-events-auto h-full flex items-center justify-center py-2">
        <Link href="/" className="h-full flex items-center gap-3">
          {/* Using standard img tag for simplicity with local asset in public */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-surreal.png"
            alt="Logo"
            className="h-full w-auto object-contain"
          />
          <span className="font-black uppercase text-lg sm:text-xl md:text-2xl tracking-tight text-black whitespace-nowrap hidden sm:block">
            La Taberna de Clates
          </span>
        </Link>
      </div>

      {/* Placeholder derecho */}
      <div aria-hidden className="w-12" />
    </header>
  );
}
