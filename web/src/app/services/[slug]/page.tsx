import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import { getService } from "@/sanity/content";

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();

  return (
    <main className="mx-auto w-full max-w-3xl space-y-6 px-6 py-20">
      <Link className="underline" href="/">Ascent Lion Dance</Link>
      <h1 className="text-4xl font-semibold">{service.title}</h1>
      {service.summary && <p className="text-xl">{service.summary}</p>}
      {service.body && <div className="space-y-4"><PortableText value={service.body} /></div>}
    </main>
  );
}
