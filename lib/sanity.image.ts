// frontend/lib/sanity.image.ts
import createImageUrlBuilder from '@sanity/image-url'
// Importa las constantes del archivo client
import { dataset, projectId } from './sanity.client'

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

/**
 * Genera la URL para una imagen de Sanity.
 * Asegúrate de pasar una fuente válida.
 * Devuelve `undefined` si la fuente no es válida.
 */
export const urlFor = (source: any) => {
  // Verificación robusta de la fuente
  if (!source?.asset?._ref) {
    // console.warn('Fuente de imagen inválida o faltante:', source);
    return undefined // Es mejor devolver undefined que null o una string vacía
  }

  try {
    return imageBuilder?.image(source).auto('format').fit('max')
  } catch (error) {
    console.error('Error al construir URL de imagen:', error, 'Fuente:', source);
    return undefined; // Manejo de errores
  }
}

/**
 * Función helper opcional para obtener directamente la URL como string
 * o un valor por defecto (ej. un placeholder)
 */
export const urlForImage = (source: any, defaultUrl: string | undefined = undefined): string | undefined => {
  const builder = urlFor(source);
  return builder ? builder.url() : defaultUrl;
}