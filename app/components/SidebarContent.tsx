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
    <nav className="flex h-full flex-col space-y-8">
      
      {/* SECCIÓN "SOBRE MÍ" (Enlace al monólogo) */}
      <section>
        <Link href="/sobre-mi" className="text-2xl font-semibold hover:underline">
          Sobre Mí (El Monólogo)
        </Link>
      </section>

      {/* SECCIÓN DONACIÓN */}
      <section>
        <a 
          href={data.donacion} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-2xl font-semibold text-green-400 hover:underline"
        >
          Apoya la Taberna (Donar)
        </a>
      </section>

      {/* MIS OTROS PROYECTOS */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Mis Proyectos</h2>
        <ul className="space-y-2">
          {data.proyectos_propios?.map((proj) => (
            <li key={proj.titulo}>
              <a href={proj.url} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                {proj.titulo}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* AMIGOS Y EVENTOS */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Comunidad</h2>
        <ul className="space-y-2">
          {data.comunidad?.map((link) => (
            <li key={link._id}>
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                {link.nombre} ({link.tipo_enlace})
              </a>
            </li>
          ))}
        </ul>
      </section>
    </nav>
  );
}