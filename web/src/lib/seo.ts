import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const isSearchIndexable = process.env.SITE_ALLOW_INDEXING !== 'false';

export function absoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = `${title} | ${siteConfig.shortName}`;
  const image = {
    url: absoluteUrl('/opengraph-image'),
    width: 1200,
    height: 630,
    alt: `${siteConfig.name} — Lion and dragon dance in Denver, Colorado`,
  };

  return {
    title: fullTitle,
    description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      url: absoluteUrl(path),
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
