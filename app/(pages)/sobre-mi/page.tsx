// app/sobre-mi/page.tsx
import { client } from '@/lib/sanity.client'
import { PortableText } from '@portabletext/react'

const MONOLOGO_QUERY = `*[_type == "autor" && _id == "autor"][0]{
  nombre,
  monologo_presentacion
}`

interface AutorData {
  nombre: string
  monologo_presentacion: any[]
}

export const metadata = { title: 'Sobre mí — La Taberna de Clates' }

export default async function SobreMiPage() {
  const data = await client.fetch<AutorData>(MONOLOGO_QUERY)

  // Forzamos un “offset” vertical explícito que suma un margen extra
  // encima de lo que ya tenga el <main>. Ajusta +16/+24 si quieres más aire.
  const pageTop = 'mt-[calc(var(--nav-h)+16px)] md:mt-[calc(var(--nav-h)+24px)]'

  if (!data) {
    return (
      <section className={`px-4 ${pageTop}`}>
        <div className="mx-auto max-w-4xl text-center text-sm text-zinc-400">
          No se encontró el monólogo. Ve al Studio y escríbelo.
        </div>
      </section>
    )
  }

  return (
    <section className={`px-4 ${pageTop}`}>
      <article className="prose prose-invert prose-lg mx-auto max-w-3xl">
        <h1 className="mb-6 anchor-safe">{data.nombre ?? 'Sobre mí'}</h1>
        <PortableText value={data.monologo_presentacion} />
      </article>
    </section>
  )
}
