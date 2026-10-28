import { HomePage } from "@/components/home-page";
import { getHomePage } from "@/sanity/content";

export default async function Home() {
  const content = await getHomePage();
  return <HomePage content={content} />;
}
