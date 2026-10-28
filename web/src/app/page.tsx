import Link from "next/link";
import { getContentIndex } from "@/sanity/content";

export default async function Home() {
  const { pages, services } = await getContentIndex();
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-20">
      <h1 className="text-4xl font-semibold">Ascent Lion Dance</h1>
      <section className="mt-12" aria-labelledby="services-heading">
        <h2 id="services-heading" className="text-2xl font-semibold">Performance services</h2>
        {services.length === 0 && <p className="mt-4">Performance details are coming soon.</p>}
        <ul className="mt-6 space-y-6">
          {services.map((service) => (
            <li key={service._id}>
              <Link className="text-xl font-medium underline" href={`/services/${service.slug}`}>
                {service.title}
              </Link>
              {service.summary && <p className="mt-2">{service.summary}</p>}
            </li>
          ))}
        </ul>
      </section>
      {pages.length > 0 && (
        <nav className="mt-12" aria-label="Website pages">
          <ul className="flex flex-wrap gap-6">
            {pages.map((page) => (
              <li key={page._id}>
                <Link className="underline" href={`/pages/${page.slug}`}>{page.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </main>
  );
}
