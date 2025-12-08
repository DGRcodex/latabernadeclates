import { client } from '@/lib/sanity.client';
import { ContentGrid } from './components/ContentGrid';

// (La misma consulta GROQ de la respuesta anterior)
const CONTENT_QUERY = `
  *[_type == "publicacion" || _type == "obraTaller"] | order(
    coalesce(fecha_publicacion, fecha_realizacion) desc
  ) [0...30] {
    _id,
    _type,
    titulo,
    slug,
    imagen_portada,
    "tipo": coalesce(tipo_contenido, tipo_obra)
  }
`;

// Función para obtener y mezclar (barajar)
async function getContent() {
  const items = await client.fetch(CONTENT_QUERY, {}, {
    cache: 'no-store', // ¡Importante! Para que cambie en cada carga
  });

  // La magia del Caos: Barajar el array en el servidor
  return items.sort(() => Math.random() - 0.5);
}

export default async function HomePage() {
  const shuffledItems = await getContent();

  return (
    <div className="pt-8 px-6 md:px-8">
      <h1 className="text-4xl font-bold mb-6">El Escritorio</h1>
      <ContentGrid items={shuffledItems} />
    </div>
  );
}

// Opcional: Deshabilitar el cacheo de Next.js para esta página
export const revalidate = 0;