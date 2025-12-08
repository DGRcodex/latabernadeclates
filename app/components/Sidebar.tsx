'use client';
import { useSidebar } from '@/app/context/SidebarContext';
import { ReactNode } from 'react';

export function Sidebar({ children }: { children: ReactNode }) {
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <>
      {/* Fondo Oscuro (Overlay) */}
      <div
        onClick={toggleSidebar}
        className={`fixed inset-0 bg-black transition-opacity z-30
          ${isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'}`}
      />

      {/* El Menú Lateral */}
      <aside
        className={`fixed top-0 left-0 w-full max-w-sm h-full bg-brutal-dark text-brutal-bg border-r-2 border-white/20 z-40
                    p-6 pt-28 overflow-y-auto transition-opacity duration-300 ease-in-out
                    ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        {/* Aquí se renderiza el <SidebarContent /> (Server Component) */}
        {children}
      </aside>
    </>
  );
}