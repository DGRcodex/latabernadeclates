// app/layout.tsx
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
      <body className="bg-gray-900 text-white min-h-screen">
        <SidebarProvider>
          {/* Header fijo (altura h-20 = 80px) */}
          <Header />

          {/* Sidebar (Client) con contenido (Server) */}
          <Sidebar>
            <SidebarContent />
          </Sidebar>

          {/* Contenido principal: offset para no quedar bajo el header */}
          <main className="pt-nav p-6 md:p-8">
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
