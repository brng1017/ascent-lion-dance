import "server-only";
import { sanityFetch } from "./live";
import {
  JOIN_PAGE_QUERY,
  ABOUT_PAGE_QUERY,
  CONTENT_INDEX_QUERY,
  HOME_PAGE_QUERY,
  PAGE_QUERY,
  SERVICE_QUERY,
  SERVICES_QUERY,
  SERVICES_PAGE_QUERY,
} from "./queries";

export async function getJoinPage() {
  "use cache";
  const { data } = await sanityFetch({
    query: JOIN_PAGE_QUERY,
    perspective: "published",
    stega: false,
  });
  return data;
}

export async function getAboutPage() {
  "use cache";
  const { data } = await sanityFetch({
    query: ABOUT_PAGE_QUERY,
    perspective: "published",
    stega: false,
  });
  return data;
}

export async function getServicesPage() {
  "use cache";
  const { data } = await sanityFetch({
    query: SERVICES_PAGE_QUERY,
    perspective: "published",
    stega: false,
  });
  return data;
}

export async function getServices() {
  "use cache";
  const { data } = await sanityFetch({
    query: SERVICES_QUERY,
    perspective: "published",
    stega: false,
  });
  return data;
}

export async function getHomePage() {
  "use cache";
  const { data } = await sanityFetch({
    query: HOME_PAGE_QUERY,
    perspective: "published",
    stega: false,
  });
  return data;
}

export async function getContentIndex() {
  "use cache";
  const { data } = await sanityFetch({
    query: CONTENT_INDEX_QUERY,
    perspective: "published",
    stega: false,
  });
  return data;
}

export async function getPage(slug: string) {
  "use cache";
  const { data } = await sanityFetch({
    query: PAGE_QUERY,
    params: { slug },
    perspective: "published",
    stega: false,
  });
  return data;
}

export async function getService(slug: string) {
  "use cache";
  const { data } = await sanityFetch({
    query: SERVICE_QUERY,
    params: { slug },
    perspective: "published",
    stega: false,
  });
  return data;
}
