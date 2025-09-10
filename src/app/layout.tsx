import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import '@/styles/globals.css';
import Header from './components/header';
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants';

const inter = Inter({ subsets: ['latin'] });
const monoton = localFont({
  src: '../../public/fonts/Monoton-Regular.woff2',
  variable: '--font-monoton',
});

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  icons: [
    { rel: 'icon', url: '/favicon.ico' },
    { rel: 'apple-touch-icon', url: '/apple-touch-icon.png' },
  ],
  manifest: '/site.webmanifest',
  themeColor: '#000000',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta httpEquiv="Permissions-Policy" content="encrypted-media=*, autoplay=*" />
        <meta httpEquiv="Cross-Origin-Embedder-Policy" content="require-corp" />
        <meta httpEquiv="Cross-Origin-Opener-Policy" content="same-origin" />
      </head>
      <body className={`${inter.className} ${monoton.variable} bg-black text-white min-h-screen`}>
        <Header />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
