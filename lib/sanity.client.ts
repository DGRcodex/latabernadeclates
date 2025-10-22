import { createClient } from 'next-sanity'

// Revisa que la fecha de apiVersion sea actual
export const apiVersion = '2025-10-22'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // `false` si quieres datos frescos siempre (SSR), `true` para CDN (SSG)
})