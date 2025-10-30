// app/layout.tsx
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
    <html lang="es" className="antialiased">
      <head>
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
