import './globals.css';
import { SidebarProvider } from './context/SidebarContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { SidebarContent } from './components/SidebarContent';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <SidebarProvider>
        <body className="bg-gray-900 text-white min-h-screen">
          
          {/* El Header con el botón de toggle */}
          <Header />

          {/* El Sidebar (ahora es un Client Component) */}
          {/* Le pasamos el contenido del sidebar (un Server Component) como 'children' */}
          <Sidebar>
            <SidebarContent />
          </Sidebar>

          {/* El contenido principal (el Escritorio Caótico) */}
          <main className="pt-20 p-6 md:p-8"> {/* pt-20 para dejar espacio al Header fijo */}
            {children}
          </main>
          
        </body>
      </SidebarProvider>
    </html>
  );
}