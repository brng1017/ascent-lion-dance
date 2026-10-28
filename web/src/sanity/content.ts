import "server-only";
import { sanityFetch } from "./live";
import { CONTENT_INDEX_QUERY, PAGE_QUERY, SERVICE_QUERY } from "./queries";

export async function getContentIndex() {
  "use cache";
  const { data } = await sanityFetch({
    query: CONTENT_INDEX_QUERY, perspective: "published", stega: false,
  });
  return data;
}

export async function getPage(slug: string) {
  "use cache";
  const { data } = await sanityFetch({
    query: PAGE_QUERY, params: { slug }, perspective: "published", stega: false,
  });
  return data;
}

export async function getService(slug: string) {
  "use cache";
  const { data } = await sanityFetch({
    query: SERVICE_QUERY, params: { slug }, perspective: "published", stega: false,
  });
  return data;
}
