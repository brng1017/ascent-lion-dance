import 'server-only';
import { cacheLife } from 'next/cache';
import { sanityFetch } from './live';
import {
  JOIN_PAGE_QUERY,
  ABOUT_PAGE_QUERY,
  HOME_PAGE_QUERY,
  PAGE_QUERY,
  SERVICES_QUERY,
  SERVICES_PAGE_QUERY,
  SITEMAP_PAGES_QUERY,
} from './queries';

// Live events handle connected visitors. Timed refreshes also cover edits
// published before a browser connects, and cached snapshots reused by builds.
const publishedContentCache = { stale: 30, revalidate: 60, expire: 300 };

export async function getSitemapPages() {
  'use cache';
  const { data } = await sanityFetch({
    query: SITEMAP_PAGES_QUERY,
    perspective: 'published',
    stega: false,
  });
  // Crawlers do not mount SanityLive, so the sitemap also needs timed refreshes.
  cacheLife('hours');
  return data;
}

export async function getJoinPage() {
  'use cache';
  const { data } = await sanityFetch({
    query: JOIN_PAGE_QUERY,
    perspective: 'published',
    stega: false,
  });
  cacheLife(publishedContentCache);
  return data;
}

export async function getAboutPage() {
  'use cache';
  const { data } = await sanityFetch({
    query: ABOUT_PAGE_QUERY,
    perspective: 'published',
    stega: false,
  });
  cacheLife(publishedContentCache);
  return data;
}

export async function getServicesPage() {
  'use cache';
  const { data } = await sanityFetch({
    query: SERVICES_PAGE_QUERY,
    perspective: 'published',
    stega: false,
  });
  cacheLife(publishedContentCache);
  return data;
}

export async function getServices() {
  'use cache';
  const { data } = await sanityFetch({
    query: SERVICES_QUERY,
    perspective: 'published',
    stega: false,
  });
  cacheLife(publishedContentCache);
  return data;
}

export async function getHomePage() {
  'use cache';
  const { data } = await sanityFetch({
    query: HOME_PAGE_QUERY,
    perspective: 'published',
    stega: false,
  });
  cacheLife(publishedContentCache);
  return data;
}

export async function getPage(slug: string) {
  'use cache';
  const { data } = await sanityFetch({
    query: PAGE_QUERY,
    params: { slug },
    perspective: 'published',
    stega: false,
  });
  cacheLife(publishedContentCache);
  return data;
}
