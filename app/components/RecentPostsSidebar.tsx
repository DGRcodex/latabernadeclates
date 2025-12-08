'use client';
import { client } from '@/lib/sanity.client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// Simple groq para traer titulo y slug recientes
const RECENT_QUERY = `*[_type == "publicacion"] | order(fecha_publicacion desc)[0...10] {
  titulo,
  slug
}`;

export function RecentPostsSidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const [posts, setPosts] = useState<any[]>([]);

    useEffect(() => {
        // Client-side fetch para simpleza en este componente
        // Idealmente podrías pasarlo como prop server-side
        client.fetch(RECENT_QUERY).then(setPosts).catch(console.error);
    }, []);

    return (
        <>
            {/* Toggle Button (Right side fixed) */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed top-1/2 right-0 z-50 p-2 bg-brutal-dark text-brutal-bg border-l-2 border-y-2 border-white/20 hover:bg-black transition-all duration-300 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                style={{ writingMode: 'vertical-rl' }}
                aria-label="Ver últimas entradas"
            >
                <span className="font-bold uppercase tracking-widest text-sm py-2">Últimas Entradas</span>
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Drawer */}
            <aside className={`
        fixed top-0 right-0 h-full w-80 bg-brutal-dark text-brutal-bg border-l-2 border-white/20 z-50
        transition-opacity duration-300 ease-in-out p-6 pt-20
        ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
      `}>
                <div className="flex justify-between items-center mb-6 border-b border-white/20 pb-2">
                    <h2 className="text-xl font-black uppercase">Lo Reciente</h2>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-xs font-bold uppercase tracking-widest border border-white/50 px-2 py-1 hover:bg-white hover:text-black transition-colors"
                        >
                            Volver
                        </button>
                        <button onClick={() => setIsOpen(false)} className="text-2xl font-bold hover:text-brutal-accent">&times;</button>
                    </div>
                </div>

                <ul className="space-y-4">
                    {posts.map((post) => (
                        <li key={post.slug?.current}>
                            <Link
                                href={`/ensayos/${post.slug?.current}`}
                                className="block text-sm font-medium hover:text-white hover:translate-x-[-4px] transition-transform text-gray-300"
                                onClick={() => setIsOpen(false)}
                            >
                                {post.titulo}
                            </Link>
                        </li>
                    ))}
                </ul>
            </aside>
        </>
    );
}
