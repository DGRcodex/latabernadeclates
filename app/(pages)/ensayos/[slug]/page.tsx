// app/(pages)/ensayos/[slug]/page.tsx
import { client } from '@/lib/sanity.client'
import { urlFor } from '@/lib/sanity.image'
import { PortableText } from '@portabletext/react'
import type { Metadata } from 'next'
import Image from 'next/image'
import ShareBar from '@/app/components/ShareBar'
import SelectionShare from '@/app/components/SelectionShare'

// GROQ: trae campos necesarios
const PUBLICACION_QUERY = `*[_type == "publicacion" && slug.current == $slug][0]{
  titulo,
  fecha_publicacion,
  imagen_portada,
  video_youtube,
  cuerpo_texto,
  "tags": temas[]->{nombre, slug},
  "resumen": coalesce(resumen, "")
}`

interface PublicacionData {
  titulo: string
  fecha_publicacion: string
  imagen_portada: any
  video_youtube?: string
  cuerpo_texto: any[]
  resumen?: string
  tags: { nombre: string; slug: { current: string } }[]
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const data = await client.fetch<PublicacionData>(PUBLICACION_QUERY, { slug: params.slug })
  return { title: `${data?.titulo ?? 'Ensayo'} | La Taberna de Clates` }
}

export default async function EnsayoSlugPage({ params }: { params: { slug: string } }) {
  const data = await client.fetch<PublicacionData>(PUBLICACION_QUERY, { slug: params.slug })
  if (!data) return <div>Publicación no encontrada.</div>

  const tagNames = (data.tags ?? []).map(t => t.nombre)
  const excerpt = data.resumen && data.resumen.length > 0 ? data.resumen : undefined

  return (
    <div className="px-4 sm:px-6 pt-nav mt-8 md:mt-12">
      <article className="prose prose-lg max-w-4xl mx-auto pt-6">
        {/* Cover image */}
        {data.imagen_portada && (
          <div className="relative w-full h-96 mb-8">
            <Image
              src={urlFor(data.imagen_portada)!.url()}
              alt={data.titulo}
              fill
              className="object-cover rounded-none shadow-brutal border-2 border-black"
              sizes="100vw"
              priority
            />
          </div>
        )}

        {/* Title */}
        <h1 className="mb-2 uppercase font-black">{data.titulo}</h1>

        {/* Meta and tags */}
        <div className="text-gray-700 font-medium mb-6">
          Publicado el:{' '}
          {data.fecha_publicacion
            ? new Date(data.fecha_publicacion).toLocaleDateString('es-CL')
            : '—'}
          <div className="flex flex-wrap gap-2 mt-2">
            {data.tags?.map(tag => (
              <span
                key={tag.slug.current}
                className="bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-0.5 rounded"
              >
                {tag.nombre}
              </span>
            ))}
          </div>
        </div>



        {/* Body */}
        {data.cuerpo_texto ? <PortableText value={data.cuerpo_texto} /> : null}

        {/* YouTube (if any) */}
        {data.video_youtube && (
          <div className="aspect-video mt-8">
            <iframe
              width="100%"
              height="100%"
              src={data.video_youtube.replace('watch?v=', 'embed/')}
              title={data.titulo}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {/* ShareBar al final para facilitar compartir tras la lectura */}
        <ShareBar title={data.titulo} excerpt={excerpt} tags={tagNames} />
      </article>

      {/* Floating share for selected text (WhatsApp/X) */}
      <SelectionShare title={data.titulo} />
    </div>
  )
}
