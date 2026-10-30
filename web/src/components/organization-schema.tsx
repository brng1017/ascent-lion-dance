import { siteConfig } from '@/config/site';
import { absoluteUrl } from '@/lib/seo';
import { getHomePage } from '@/sanity/content';
import { homeDefaults } from '@/sanity/home-defaults';
import { JsonLd } from './json-ld';

export async function OrganizationSchema() {
  const home = await getHomePage();

  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'PerformingGroup',
            '@id': absoluteUrl('/#organization'),
            name: siteConfig.name,
            alternateName: 'Ascent Lion Dance',
            url: absoluteUrl('/'),
            logo: absoluteUrl('/images/ascent-logo.png'),
            description:
              'Denver-based lion and dragon dance team performing for Lunar New Year, grand openings, weddings, birthdays, banquets, company events, and school celebrations.',
            email: home?.email ?? homeDefaults.email,
            telephone: home?.phone ?? homeDefaults.phone,
            sameAs: [home?.instagramUrl ?? homeDefaults.instagramUrl].filter(
              Boolean,
            ),
            areaServed: {
              '@type': 'Place',
              name: 'Greater Denver area, Colorado',
            },
            location: {
              '@type': 'Place',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Denver',
                addressRegion: 'CO',
                addressCountry: 'US',
              },
            },
          },
          {
            '@type': 'WebSite',
            '@id': absoluteUrl('/#website'),
            name: siteConfig.name,
            alternateName: siteConfig.shortName,
            url: absoluteUrl('/'),
            inLanguage: 'en-US',
            publisher: { '@id': absoluteUrl('/#organization') },
          },
        ],
      }}
    />
  );
}
