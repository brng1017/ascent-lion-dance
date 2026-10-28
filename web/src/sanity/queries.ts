import { defineQuery } from "next-sanity";

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
