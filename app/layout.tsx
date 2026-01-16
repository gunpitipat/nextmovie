import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NotFoundProvider } from '@/contexts/not-found-context';
import Navbar from '@/components/navbar/Navbar';
import BodyScrollBar from '@/components/BodyScrollBar';
import Footer from '@/components/footer/Footer';
import { Toaster } from 'sonner';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Nextmovie',
  description: 'Find your next favorite movie',
  icons: '/favicon.ico',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-overlayscrollbars-initialize>
      <body className={`${inter.variable}`} data-overlayscrollbars-initialize>
        <NotFoundProvider>
          <Navbar />
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
        </NotFoundProvider>
      </body>
    </html>
  );
}
