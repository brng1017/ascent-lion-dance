import { defineQuery } from 'next-sanity';

export const JOIN_PAGE_QUERY = defineQuery(`
  *[_type == "joinPage" && _id == "joinPage"][0] {
    eyebrow, heroTitle, heroHighlight,
    heroImage {asset, alt, hotspot, crop},
    storyHeading, storyText, contactHeading, contactText, email
  }
`);

export const ABOUT_PAGE_QUERY = defineQuery(`
  *[_type == "aboutPage" && _id == "aboutPage"][0] {
    eyebrow, heroTitle, heroHighlight,
    heroImage {asset, alt, hotspot, crop},
    storyHeading, storyText, valuesIntroduction, valuesHeading,
    lionDanceHeading, lionDanceText,
    lionDanceImage {asset, alt, hotspot, crop},
    dragonDanceHeading, dragonDanceText,
    dragonDanceImage {asset, alt, hotspot, crop},
    values[]{_key, title, text},
    journeyHeading, milestones[]{_key, year, text},
    galleryHeading,
    galleryImages[]{_key, asset, alt, hotspot, crop},
  }
`);

export const SERVICES_PAGE_QUERY = defineQuery(`
  *[_type == "servicesPage" && _id == "servicesPage"][0] {
    eyebrow, heroTitle, heroHighlight,
    heroImage {asset, alt, hotspot, crop},
    introHeading, introText,
    bookingSteps[]{_key, title, description},
    performanceOptions[]{_key, title, image {asset, hotspot, crop}}
  }
`);

export const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "homePage" && _id == "homePage"][0] {
    eyebrow, heroTitle, heroHighlight,
    heroImage {asset, alt, hotspot, crop},
    storyHeading, storyText, storyUrl, servicesHeading,
    "sponsors": *[_type == "sponsor"] | order(_createdAt asc, _id asc) {
      _id, name, website, logo {asset, alt, hotspot, crop}
    },
    featuredServices[]->{
      _id, title, tagline, summary, "slug": slug.current,
      image {asset, alt, hotspot, crop}
    },
    communityHeading, communityText,
    communityImage {asset, alt, hotspot, crop},
    bookingHeading, bookingDescription, email, phone, instagramUrl
  }
`);

export const PAGE_QUERY = defineQuery(`
  *[_type == "page" && slug.current == $slug][0] {
    _id, title, summary, body,
    services[]->{_id, title, summary, "slug": slug.current}
  }
`);

export const SERVICES_QUERY = defineQuery(`
  *[_type == "performanceService" && defined(slug.current)] | order(title asc) {
    _id, title, eventTypeLabel, tagline, summary, "slug": slug.current,
    image {asset, alt, hotspot, crop}
  }
`);
