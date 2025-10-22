import { client } from '@/lib/sanity.client'
import { urlFor } from '@/lib/sanity.image'
import { PortableText } from '@portabletext/react'
import { Metadata } from 'next'
import Image from 'next/image'

// 1. Consulta GROQ que usa un parámetro ($slug)
const PUBLICACION_QUERY = `*[_type == "publicacion" && slug.current == $slug][0]{
  titulo,
  fecha_publicacion,
  imagen_portada,
  video_youtube,
  cuerpo_texto,
  "tags": temas[]->{nombre, slug}
}`

interface PublicacionData {
  titulo: string
  fecha_publicacion: string
  imagen_portada: any
  video_youtube?: string
  cuerpo_texto: any[]
  tags: { nombre: string; slug: { current: string } }[]
}

// 2. (Opcional pero recomendado) Generar metadatos para SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const data = await client.fetch<PublicacionData>(PUBLICACION_QUERY, { slug: params.slug })
  return {
    title: `${data.titulo} | La Taberna de Clates`,
  }
}

// 3. El componente de página (async)
export default async function EnsayoSlugPage({ params }: { params: { slug: string } }) {
  const data = await client.fetch<PublicacionData>(PUBLICACION_QUERY, {
    slug: params.slug,
  })

  if (!data) {
    return <div>Publicación no encontrada.</div>
  }

  return (
    <article className="prose prose-invert prose-lg max-w-4xl mx-auto">
      {/* Imagen de Portada */}
      {data.imagen_portada && (
        <div className="relative w-full h-96 mb-8">
          <Image
            src={urlFor(data.imagen_portada)!.url()}
            alt={data.titulo}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}

      <h1>{data.titulo}</h1>

      {/* Fecha y Tags */}
      <div className="text-gray-400 mb-4">
        Publicado el: {new Date(data.fecha_publicacion).toLocaleDateString('es-CL')}
        <div className="flex gap-2 mt-2">
          {data.tags?.map((tag) => (
            <span key={tag.slug.current} className="bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-0.5 rounded">
              {tag.nombre}
            </span>
          ))}
        </div>
      </div>
      
      {/* Cuerpo del Ensayo */}
      {data.cuerpo_texto ? <PortableText value={data.cuerpo_texto} /> : null}

      {/* Video de YouTube (si existe) */}
      {data.video_youtube && (
        <div className="aspect-video mt-8">
          <iframe
            width="100%"
            height="100%"
            src={data.video_youtube.replace('watch?v=', 'embed/')}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </article>
  )
}