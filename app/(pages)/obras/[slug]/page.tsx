// frontend/app/(pages)/obras/[slug]/page.tsx
import { client } from '@/lib/sanity.client'
import { PortableText } from '@portabletext/react'
import { Metadata } from 'next'
import { urlFor } from '@/lib/sanity.image'; // Asegúrate de importar esto

// 1. Consulta GROQ (¡Añade videoFile.asset->url!)
const OBRA_QUERY = `*[_type == "obraTaller" && slug.current == $slug][0]{
  titulo,
  tipo_obra,
  embed_code,
  descripcion,
  "videoUrl": videoFile.asset->url // <-- ¡AÑADIDO AQUÍ!
}`

interface ObraData {
  titulo: string
  tipo_obra: string
  embed_code: string
  descripcion: any[]
  videoUrl?: string // <-- ¡AÑADIDO AQUÍ!
}

// 2. Metadatos (sin cambios)
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const data = await client.fetch<ObraData>(OBRA_QUERY, { slug: params.slug })
  return {
    title: `${data.titulo} (${data.tipo_obra}) | La Taberna de Clates`,
  }
}

// 3. El componente de página (async)
export default async function ObraSlugPage({ params }: { params: { slug: string } }) {
  const data = await client.fetch<ObraData>(OBRA_QUERY, {
    slug: params.slug,
  })

  if (!data) {
    return <div>Obra no encontrada.</div>
  }

  return (
    <article className="max-w-4xl mx-auto pt-8"> {/* Añadido pt-8 para espacio superior */}
      <span className="text-yellow-400 uppercase">{data.tipo_obra}</span>
      <h1 className="text-5xl font-bold mb-8">{data.titulo}</h1>

      {/* 4. Renderizar Video Subido (SI EXISTE) */}
      {data.videoUrl && (
        <div className="aspect-video mb-8 bg-gray-700 rounded-lg overflow-hidden">
          <video controls className="w-full h-full object-cover">
            <source src={data.videoUrl} type="video/mp4" /> {/* Asumimos MP4, pero Sanity soporta otros */}
            Tu navegador no soporta el tag de video.
          </video>
        </div>
      )}

      {/* 5. Renderizar Embed Externo (SI EXISTE Y NO HAY VIDEO SUBIDO) */}
      {data.embed_code && !data.videoUrl && ( // Solo muestra embed si NO hay videoUrl
        <div 
          className="aspect-video mb-8"
          dangerouslySetInnerHTML={{ __html: data.embed_code }}
        />
      )}

      {/* 6. Descripción de la Obra (Estilo Prose) */}
      <div className="prose prose-invert prose-lg">
        {data.descripcion ? <PortableText value={data.descripcion} /> : null}
      </div>
    </article>
  )
}