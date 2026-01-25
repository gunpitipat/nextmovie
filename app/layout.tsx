import { Suspense } from 'react';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import { NotFoundProvider } from '@/contexts/not-found-context';
import { TMDBConfigProvider } from '@/contexts/tmdb-config-context';
import { NavbarLayoutProvider } from '@/contexts/navbar-layout-context';
import { getTMDBConfig } from '@/lib/tmdb';
import NavbarSkeleton from '@/components/loading/NavbarSkeleton';
import Navbar from '@/components/navbar/Navbar';
import IOSChromeScrollFix from '@/components/IOSChromeScrollFix';
import BodyScrollBar from '@/components/BodyScrollBar';
import Footer from '@/components/footer/Footer';
import './globals.css';
import type { Metadata } from 'next';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Nextmovie',
  description: 'Find your next favorite movie',
  icons: '/favicon.ico',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const config = await getTMDBConfig();

  return (
    <html lang="en" data-overlayscrollbars-initialize>
      <body className={`${inter.variable}`} data-overlayscrollbars-initialize>
        <NotFoundProvider>
          <TMDBConfigProvider value={config}>
            <NavbarLayoutProvider>
              <Suspense fallback={<NavbarSkeleton />}>
                <Navbar />
              </Suspense>
              <Suspense>
                <IOSChromeScrollFix />
              </Suspense>
              <BodyScrollBar />
              <div
                id="dropdown-root"
                className="pointer-events-none fixed inset-0 z-50"
              />
              <main className="pt-14">{children}</main>
              <Toaster
                position="bottom-center"
                offset={40}
                mobileOffset={{ bottom: '40px', left: '32px', right: '32px' }}
                gap={12}
                toastOptions={{ duration: 3000 }}
              />
              <Footer />
            </NavbarLayoutProvider>
          </TMDBConfigProvider>
        </NotFoundProvider>
      </body>
    </html>
  );
}
