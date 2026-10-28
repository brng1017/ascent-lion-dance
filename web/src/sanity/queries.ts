import { defineQuery } from "next-sanity";

export const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "homePage" && _id == "homePage"][0] {
    eyebrow, heroTitle, heroHighlight, heroDescription,
    heroImage {asset, alt, hotspot, crop},
    storyHeading, storyText, storyUrl, servicesHeading, servicesDescription,
    sponsors[]->{_id, name, website, logo {asset, alt, hotspot, crop}},
    featuredServices[]->{
      _id, title, tagline, summary, "slug": slug.current,
      image {asset, alt, hotspot, crop}
    },
    communityHeading, communityText,
    communityImage {asset, alt, hotspot, crop},
    bookingHeading, bookingDescription, bookingUrl, email, phone, instagramUrl
  }
`);

export const CONTENT_INDEX_QUERY = defineQuery(`{
  "pages": *[_type == "page" && defined(slug.current)] | order(title asc) {
    _id, title, summary, "slug": slug.current
  },
  "services": *[_type == "performanceService" && defined(slug.current)] | order(title asc) {
    _id, title, summary, "slug": slug.current
  }
}`);

export const PAGE_QUERY = defineQuery(`
  *[_type == "page" && slug.current == $slug][0] {
    _id, title, summary, body,
    services[]->{_id, title, summary, "slug": slug.current}
  }
`);

export const SERVICE_QUERY = defineQuery(`
  *[_type == "performanceService" && slug.current == $slug][0] {
    _id, title, summary, body
  }
`);
