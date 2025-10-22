import { client } from '@/lib/sanity.client'
import { PortableText } from '@portabletext/react'

// 1. La consulta GROQ para tu monólogo
const MONOLOGO_QUERY = `*[_type == "autor" && _id == "autor"][0]{
  nombre,
  monologo_presentacion
}`

// 2. Definir el tipo de datos (opcional pero recomendado)
interface AutorData {
  nombre: string
  monologo_presentacion: any[] // Tipo de PortableText
}

// 3. El componente de página (async)
export default async function SobreMiPage() {
  const data = await client.fetch<AutorData>(MONOLOGO_QUERY)

  if (!data) {
    return <div>No se encontró el monólogo. Ve al Studio y escríbelo.</div>
  }

  return (
    <div className="prose prose-invert prose-lg max-w-4xl mx-auto">
      {/* Usamos @tailwindcss/typography (prose) para estilizar el texto 
        que viene de Sanity. 
        (Asegúrate de instalarlo: npm install -D @tailwindcss/typography)
      */}
      <h1>{data.nombre} (El Monólogo)</h1>
      
      {/* 4. Renderizar el texto enriquecido */}
      {data.monologo_presentacion ? (
        <PortableText value={data.monologo_presentacion} />
      ) : null}
    </div>
  )
}