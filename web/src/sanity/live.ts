import "server-only";
import { defineLive } from "next-sanity/live";
import { client } from "./client";

// Public content only. Drafts remain private in the standalone Studio.
export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: false,
  browserToken: false,
  strict: true,
});
