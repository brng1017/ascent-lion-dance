import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/seo';
import { getSitemapPages } from '@/sanity/content';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await getSitemapPages();
  return [
    ...['/', '/about', '/services', '/join', '/book'].map((path) => ({
      url: absoluteUrl(path),
    })),
    ...pages.flatMap((page) =>
      page.slug
        ? [
            {
              url: absoluteUrl(`/pages/${encodeURIComponent(page.slug)}`),
              lastModified: page._updatedAt,
            },
          ]
        : [],
    ),
  ];
}
