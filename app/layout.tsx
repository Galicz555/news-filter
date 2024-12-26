'use client';

import localFont from 'next/font/local';
import './globals.css';
import Navbar from '@/components/modules/navigation/Navbar';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showNavbar, setShowNavbar] = useState(true);
  const pathname = usePathname() || '';

  useEffect(() => {
    const isArticlePage = /^\/article\/[\w:]+$/.test(pathname);
    setShowNavbar(!isArticlePage);
  }, [pathname]);

  return (
    <html
      lang="en"
      className={
        typeof window !== 'undefined' && localStorage.getItem('darkMode') === 'true' ? 'dark' : ''
      }
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Special+Elite&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const darkMode = localStorage.getItem('darkMode') === 'true';
                if (darkMode) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
        <title>The Duskwall Dispatch</title>
        <meta name="news-reader" content="Look through the eyes of an Opinionated God" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ fontFamily: 'Special Elite, cursive' }}
      >
        {showNavbar && <Navbar />}
        {children}
      </body>
    </html>
  );
}
