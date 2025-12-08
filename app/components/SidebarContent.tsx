import { client } from '@/lib/sanity.client';
import Link from 'next/link';

// (La misma consulta GROQ que definimos en la respuesta anterior)
const SIDEBAR_QUERY = `*[_type == "autor" && _id == "autor"][0]{
    nombre,
    monologo_presentacion,
    proyectos_propios[]{titulo, url},
    "donacion": *[_type == "siteSettings" && _id == "siteSettings"][0].link_donacion,
    "comunidad": *[_type == "enlaceComunidad"] | order(nombre asc) {
      _id,
      nombre,
      url,
      tipo_enlace
    }
}`;

interface SidebarData {
  nombre: string;
  donacion: string;
  proyectos_propios: { titulo: string; url: string }[];
  comunidad: { _id: string; nombre: string; url: string; tipo_enlace: string }[];
}

export async function SidebarContent() {
  // Obtenemos los datos en el servidor
  const data = await client.fetch<SidebarData>(SIDEBAR_QUERY, {}, {
    next: { revalidate: 3600 }
  });

  return (
    <nav className="flex h-full flex-col space-y-8 text-brutal-bg">

      {/* SECCIÓN "SOBRE MÍ" (Enlace al monólogo) */}
      <section>
        <Link href="/sobre-mi" className="block text-3xl font-black uppercase tracking-wide border-b-2 border-transparent hover:border-brutal-bg hover:pl-2 transition-all">
          Sobre Mí
        </Link>
      </section>

      {/* SECCIÓN DONACIÓN */}
      <section>
        <a
          href={data.donacion}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-2xl font-black uppercase text-brutal-accent hover:bg-brutal-accent hover:text-white p-2 border-2 border-brutal-accent text-center transition-all shadow-none hover:shadow-[4px_4px_0px_0px_#fff]"
        >
          ¡Donar!
        </a>
      </section>

      {/* MIS OTROS PROYECTOS */}
      <section>
        <h2 className="text-xl font-bold uppercase border-b border-white/20 pb-2 mb-4">Mis Proyectos</h2>
        <ul className="space-y-3">
          {data.proyectos_propios?.map((proj) => (
            <li key={proj.titulo}>
              <a href={proj.url} target="_blank" rel="noopener noreferrer" className="block text-lg font-medium text-white/80 hover:text-white hover:translate-x-1 transition-all">
                &rarr; {proj.titulo}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* AMIGOS Y EVENTOS */}
      <section>
        <h2 className="text-xl font-bold uppercase border-b border-white/20 pb-2 mb-4">Comunidad</h2>
        <ul className="space-y-3">
          {data.comunidad?.map((link) => (
            <li key={link._id}>
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="block text-lg font-medium text-white/80 hover:text-white hover:translate-x-1 transition-all">
                &rarr; {link.nombre} <span className="text-xs opacity-50">({link.tipo_enlace})</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </nav>
  );
}