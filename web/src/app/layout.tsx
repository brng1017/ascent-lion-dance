import type { Metadata } from 'next';
import { Anton, Geist, Geist_Mono, Roboto } from 'next/font/google';
import './globals.css';
import { Suspense } from 'react';
import { SanityLive } from '@/sanity/live';
import { SiteFooter } from '@/components/site-footer';
import { OrganizationSchema } from '@/components/organization-schema';
import { siteConfig } from '@/config/site';
import { isSearchIndexable, pageMetadata } from '@/lib/seo';

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
  metadataBase: new URL(siteConfig.url),
  ...pageMetadata({
    title: 'Lion & Dragon Dance in Denver, CO',
    description:
      'Book Ascent Dragon & Lion Dance for weddings, grand openings, Lunar New Year, and special events in Denver and surrounding Colorado communities.',
    path: '/',
  }),
  robots: {
    index: isSearchIndexable,
    follow: true,
    googleBot: {
      index: isSearchIndexable,
      follow: true,
      'max-image-preview': 'large',
    },
  },
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
        <OrganizationSchema />
        <Suspense fallback={null}>
          <SanityLive includeDrafts={false} />
        </Suspense>
      </body>
    </html>
  );
}
