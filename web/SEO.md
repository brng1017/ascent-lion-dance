# Search visibility

The site's canonical domain is `https://ascentliondance.org`, configured in
`src/config/site.ts`. Keep this aligned with the primary domain in Netlify.

## Implemented

- Unique page titles and descriptions focused on Denver lion and dragon dance.
- Canonical URLs, including `/book` for booking URLs with event-type parameters.
- Open Graph and Twitter metadata with a branded 1200 × 630 sharing image.
- `/robots.txt` and `/sitemap.xml`. The sitemap includes the five main routes and
  published Website Pages from Sanity. The sitemap revalidates hourly when
  requested, independently of browser live updates. Service sections are part of
  `/services`.
- Organization, website, and service structured data, using published Sanity
  contact details and the services actually shown on the page.
- Netlify builds with a non-production `CONTEXT` receive `noindex` meta tags.
  Robots remain allowed so crawlers can read those tags. Other hosting providers
  need equivalent preview indexing settings.

No private street address, business hours, reviews, prices, or ratings have been
invented. The team uses the PerformingGroup organization type rather than claiming
eligibility for Google's LocalBusiness rich results without a full public address.
Schema markup helps describe the content; it does not guarantee enhanced results.

## After deploying

1. Set `ascentliondance.org` as the primary domain and verify HTTPS. Redirect
   alternate hosts such as `www` and the production Netlify subdomain to it.
2. Verify a domain property for `ascentliondance.org` in
   [Google Search Console](https://search.google.com/search-console/about), using
   its DNS instructions. Submit `https://ascentliondance.org/sitemap.xml` and
   inspect the homepage and Services page. Review indexing reports over time.
3. Claim or update an eligible Google Business Profile. Use the same business
   name, contact details, website, and actual service area as the website. If
   customers do not visit your location, follow Google's service-area business
   guidance instead of publishing a private address.
4. Add recent performance photographs, keep service information accurate, and
   ask clients for honest reviews. Seek relevant links from venues, event
   organizers, community partners, and sponsors who have worked with the team.
5. Validate deployed markup with the
   [Schema Markup Validator](https://validator.schema.org/) and check supported
   Google features with the [Rich Results Test](https://search.google.com/test/rich-results).
6. If an older website has URLs that change, map those URLs to the closest new
   pages with permanent redirects. Review the previous site's URL list before
   retiring it; changing links alone does not preserve old search traffic.

Keep useful service descriptions, descriptive image alternative text, and
accurate Denver-area information in published Sanity content. Avoid keyword
stuffing or creating duplicate pages for cities you do not serve. Search results
take time to update, and no implementation can guarantee first position.

References:

- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Google's local ranking guidance](https://support.google.com/business/answer/7091)
- [Google's LocalBusiness structured data requirements](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- [Netlify build contexts](https://docs.netlify.com/build/configure-builds/environment-variables/)
