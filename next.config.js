/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '', // Puerto por defecto (vacío)
        pathname: '**', // Permite cualquier ruta dentro de cdn.sanity.io
      },
    ],
  },
  // Puedes añadir otras configuraciones de Next.js aquí si las necesitas
}

module.exports = nextConfig