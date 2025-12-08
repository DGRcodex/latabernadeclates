import { RecentPostsSidebar } from './components/RecentPostsSidebar';
import './globals.css';
import Script from 'next/script';
import { SidebarProvider } from './context/SidebarContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { SidebarContent } from './components/SidebarContent';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID; // poner en .env.local

  return (
    <html lang="es" className="antialiased overflow-x-hidden w-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {process.env.NODE_ENV === 'production' && clarityId && (
          <Script id="ms-clarity" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${clarityId}");
            `}
          </Script>
        )}
      </head>
      <body className="bg-brutal-bg text-brutal-dark font-sans antialiased overflow-x-hidden w-full">
        <SidebarProvider>
          <div className="relative w-full min-h-screen overflow-x-hidden">
            {/* Header fijo (altura h-20 = 80px) */}
            <Header />

            {/* Sidebar de Recientes (Derecha) */}
            <RecentPostsSidebar />

            {/* Sidebar (Client) con contenido (Server) */}
            <Sidebar>
              <SidebarContent />
            </Sidebar>

            {/* Contenido principal: offset para no quedar bajo el header */}
            <main className="pt-nav">
              {children}
            </main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
