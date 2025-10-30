// app/(pages)/obras/[slug]/page.tsx
import { client } from '@/lib/sanity.client'
import { PortableText } from '@portabletext/react'
import type { Metadata } from 'next'


const OBRA_QUERY = `*[_type == "obraTaller" && slug.current == $slug][0]{
  titulo,
  tipo_obra,
  embed_code,
  descripcion,
  "videoUrl": videoFile.asset->url,
  "resumen": coalesce(resumen, "")
}`

interface ObraData {
  titulo: string
  tipo_obra: string
  embed_code?: string
  descripcion: any[]
  videoUrl?: string
  resumen?: string
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const data = await client.fetch<ObraData>(OBRA_QUERY, { slug: params.slug })
  return { title: `${data?.titulo ?? 'Obra'} (${data?.tipo_obra ?? 'Taller'}) | La Taberna de Clates` }
}

export default async function ObraSlugPage({ params }: { params: { slug: string } }) {
  const data = await client.fetch<ObraData>(OBRA_QUERY, { slug: params.slug })
  if (!data) return <div>Obra no encontrada.</div>

  const excerpt = data.resumen && data.resumen.length > 0 ? data.resumen : undefined
  const tags = [data.tipo_obra].filter(Boolean)

  return (
    <div className="px-4 sm:px-6">
      <article className="max-w-4xl mx-auto pt-8">
        <span className="text-yellow-400 uppercase">{data.tipo_obra}</span>
        <h1 className="text-5xl font-bold mb-6">{data.titulo}</h1>

  

        {/* Video subido (Sanity file) */}
        {data.videoUrl && (
          <div className="aspect-video mb-8 bg-gray-700 rounded-lg overflow-hidden">
            <video controls className="w-full h-full object-cover">
              <source src={data.videoUrl} type="video/mp4" />
              Tu navegador no soporta el tag de video.
            </video>
          </div>
        )}

        {/* Embed externo si no hay video subido */}
        {data.embed_code && !data.videoUrl && (
          <div
            className="aspect-video mb-8 rounded-lg overflow-hidden"
            dangerouslySetInnerHTML={{ __html: data.embed_code }}
          />
        )}

        {/* Descripción en estilo de lectura */}
        <div className="prose prose-invert prose-lg">
          {data.descripcion ? <PortableText value={data.descripcion} /> : null}
        </div>

        {/* ShareBar al final para compartir luego de ver/leer */}
       
      </article>

      {/* Compartir selección de texto (útil cuando hay descripción larga) */}
  
    </div>
  )
}
