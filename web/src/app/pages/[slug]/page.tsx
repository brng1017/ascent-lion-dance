import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import { getPage } from "@/sanity/content";

export default async function WebsitePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) notFound();

  return (
    <main className="mx-auto w-full max-w-3xl space-y-6 px-6 py-20">
      <Link className="underline" href="/">Ascent Lion Dance</Link>
      <h1 className="text-4xl font-semibold">{page.title}</h1>
      {page.summary && <p className="text-xl">{page.summary}</p>}
      {page.body && <div className="space-y-4"><PortableText value={page.body} /></div>}
      {page.services && page.services.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold">Performance services</h2>
          <ul className="mt-4 space-y-3">
            {page.services.map((service) => service && (
              <li key={service._id}>
                <Link className="underline" href={`/services#service-${service.slug || service._id}`}>{service.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
