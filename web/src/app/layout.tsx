import type { Metadata } from 'next';
import { Anton, Geist, Geist_Mono, Roboto } from 'next/font/google';
import './globals.css';
import { Suspense } from 'react';
import { SanityLive } from '@/sanity/live';
import { SiteFooter } from '@/components/site-footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const anton = Anton({
  variable: '--font-anton',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ascent Dragon & Lion Dance | Rise Above',
  description:
    'Rooted in tradition. Made for your moment. Discover Ascent Lion Dance in Denver and book a performance for your next celebration.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang='en'
      className={`${geistSans.variable} ${geistMono.variable} ${anton.variable} ${roboto.variable} h-full antialiased`}
    >
      {/* Browser extensions may add body attributes before hydration (e.g. cz-shortcut-listen). */}
      <body className='min-h-full flex flex-col' suppressHydrationWarning>
        {children}
        <SiteFooter />
        <Suspense fallback={null}>
          <SanityLive includeDrafts={false} />
        </Suspense>
      </body>
    </html>
  );
}
