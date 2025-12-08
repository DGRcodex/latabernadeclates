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
      <section className={`px-4 pt-nav`}>
        <div className="mx-auto max-w-4xl text-center text-sm text-zinc-600 mt-12">
          No se encontró el monólogo. Ve al Studio y escríbelo.
        </div>
      </section>
    )
  }

  return (
    <section className={`px-4 md:px-8 pt-nav pb-12`}>
      <div className="card-brutal max-w-3xl mx-auto mt-8 relative">
        {/* Decorative corner element */}
        <div className="absolute -top-3 -left-3 w-6 h-6 bg-black z-0" aria-hidden="true" />

        <article className="prose prose-lg mx-auto relative z-10 pt-4">
          <h1 className="mb-6 font-black uppercase text-4xl border-b-4 border-black inline-block pb-2">
            {data.nombre ?? 'Sobre mí'}
          </h1>
          <div className="text-black font-medium leading-relaxed">
            <PortableText value={data.monologo_presentacion} />
          </div>
        </article>
      </div>
    </section>
  )
}
