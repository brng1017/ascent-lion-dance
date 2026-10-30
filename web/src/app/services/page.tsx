import { Arrow } from '@/components/arrow';
import type { Metadata } from 'next';
import Image from 'next/image';
import { SiteHeader } from '@/components/site-header';
import { PageHero } from '@/components/page-hero';
import { siteConfig } from '@/config/site';
import { getHomePage, getServices, getServicesPage } from '@/sanity/content';
import { serviceDefaults } from '@/sanity/home-defaults';
import { servicesDefaults } from '@/sanity/services-defaults';
import { imageUrl } from '@/sanity/image';

export const metadata: Metadata = {
  title: 'Our Services | Ascent Dragon & Lion Dance',
  description:
    'Celebrate Lunar New Year, grand openings, weddings, banquets, birthdays, and company events with Ascent Lion Dance in Denver.',
};

export default async function ServicesPage() {
  const [home, publishedServices, content] = await Promise.all([
    getHomePage(),
    getServices(),
    getServicesPage(),
  ]);
  const options = (content?.performanceOptions ?? []).flatMap((option) =>
    option.image?.asset && option.title
      ? [{ id: option._key, title: option.title, image: option.image }]
      : [],
  );
  const page = content ?? servicesDefaults;
  const bookingUrl = siteConfig.bookingUrl;
  const bookingSteps = servicesDefaults.bookingSteps.map(
    (fallback, index) => page.bookingSteps?.[index] ?? fallback,
  );
  const heroPhoto = content ? content.heroImage : home?.heroImage;
  const heroImage = heroPhoto?.asset ? imageUrl(heroPhoto, 1920, 1280) : null;
  const featuredIds = (home?.featuredServices ?? []).flatMap((service) =>
    service ? [service._id] : [],
  );
  const featuredOrder = new Map(featuredIds.map((id, index) => [id, index]));
  const services = publishedServices.length
    ? [...publishedServices]
        .sort(
          (a, b) =>
            (featuredOrder.get(a._id) ?? featuredIds.length) -
            (featuredOrder.get(b._id) ?? featuredIds.length),
        )
        .map((service) => ({
          id: service._id,
          anchor: service.slug || service._id,
          eventType: service.eventTypeLabel?.trim() || service.title || '',
          title: service.title ?? 'Lion dance performance',
          summary: service.summary,
          image: service.image?.asset
            ? imageUrl(service.image, 1200, 850)
            : null,
          imageAlt: service.image?.alt ?? service.title ?? '',
        }))
    : serviceDefaults.map((service) => ({
        id: service.slug,
        anchor: service.slug,
        eventType: service.eventTypeLabel,
        title: service.title,
        summary: service.summary,
        image: null,
        imageAlt: '',
      }));

  return (
    <>
      <a
        href='#main-content'
        className='sr-only z-50 rounded-lg bg-gold px-5 py-3 font-bold text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3'
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id='main-content'>
        <PageHero
          headingId='services-heading'
          title={page.heroTitle}
          highlight={page.heroHighlight}
          eyebrow={page.eyebrow}
          image={heroImage}
          imageAlt={heroPhoto?.alt ?? ''}
        />

        <section
          aria-labelledby='services-introduction-heading'
          className='bg-cream text-ink'
        >
          <div className='mx-auto grid max-w-332 gap-10 px-6 py-20 md:grid-cols-[1.15fr_1fr] md:gap-20 md:py-24 lg:px-10 lg:py-28'>
            <div>
              <p className='mb-6 text-[10px] font-bold tracking-[.24em] text-crimson uppercase'>
                Our team. Your celebration.
              </p>
              <h2
                id='services-introduction-heading'
                className='max-w-xl font-display text-[clamp(2.4rem,4.5vw,4rem)] leading-[1.06] whitespace-pre-line uppercase'
              >
                {page.introHeading ?? servicesDefaults.introHeading}
              </h2>
            </div>
            <div className='space-y-5 font-body text-[13px] leading-[1.95] text-ink/75 md:pt-10'>
              {(page.introText ?? servicesDefaults.introText)
                .split(/\n\s*\n/)
                .map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
            </div>
          </div>
        </section>

        <section
          aria-label='Our performance services'
          className='mx-auto max-w-312 space-y-16 px-6 py-20 md:space-y-20 md:py-24 lg:px-10 lg:py-28'
        >
          {services.map((service, index) => (
            <article
              key={service.id}
              id={`service-${service.anchor}`}
              aria-labelledby={`service-heading-${service.id}`}
              className='grid items-center gap-8 md:grid-cols-2 md:gap-14 lg:gap-20'
            >
              <div
                className={`relative aspect-[1.4] overflow-hidden rounded-2xl bg-ink-light ${index % 2 ? 'md:order-2' : ''}`}
              >
                {service.image ? (
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes='(max-width: 767px) 100vw, 50vw'
                    className='object-cover'
                  />
                ) : (
                  <div
                    aria-hidden='true'
                    className='absolute inset-0 bg-[repeating-linear-gradient(135deg,transparent,transparent_12px,#ffffff05_12px,#ffffff05_24px)]'
                  />
                )}
              </div>
              <div className={index % 2 ? 'md:order-1' : ''}>
                <p
                  className='mb-4 text-[10px] font-bold tracking-[.2em] text-gold'
                  aria-hidden='true'
                >
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h2
                  id={`service-heading-${service.id}`}
                  className='font-display text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.08] uppercase'
                >
                  {service.title}
                </h2>
                {service.summary && (
                  <p className='mt-5 max-w-md font-body text-sm leading-7 text-white/75'>
                    {service.summary}
                  </p>
                )}
                <a
                  href={`${bookingUrl}?${new URLSearchParams({ event_type: service.eventType })}`}
                  aria-label={`${siteConfig.serviceRequestLabel}: ${service.title}`}
                  className='mt-7 inline-flex min-h-11 items-center gap-6 rounded-full border border-white/25 px-5 py-3 text-[11px] font-bold transition-colors hover:border-gold hover:text-gold'
                >
                  {siteConfig.serviceRequestLabel} <Arrow />
                </a>
              </div>
            </article>
          ))}
        </section>

        <section
          aria-label='Planning your performance'
          className='mx-auto grid max-w-312 gap-5 px-6 pb-20 md:grid-cols-3 lg:px-10 lg:pb-28'
        >
          {bookingSteps.map((step, index) => (
            <div
              key={step._key}
              className='rounded-2xl border border-white/5 bg-ink-light p-7 lg:p-8'
            >
              <p
                className='mb-10 font-display text-4xl text-crimson'
                aria-hidden='true'
              >
                {String(index + 1).padStart(2, '0')}
              </p>
              <h2 className='font-display text-2xl uppercase'>{step.title}</h2>
              {step.description && (
                <p className='mt-4 font-body text-sm leading-7 text-white/70'>
                  {step.description}
                </p>
              )}
              {index === 0 && (
                <a
                  href={bookingUrl}
                  className='mt-6 inline-flex min-h-11 items-center gap-5 text-xs font-bold text-gold hover:text-white'
                >
                  Plan your event <Arrow />
                </a>
              )}
            </div>
          ))}
        </section>
        {options.length > 0 && (
          <section
            aria-labelledby='performance-options-heading'
            className='mx-auto max-w-312 px-6 pb-20 lg:px-10 lg:pb-28'
          >
            <h2
              id='performance-options-heading'
              className='font-display text-[clamp(2.4rem,4.5vw,3.7rem)] leading-[1.08] uppercase'
            >
              Performance options
            </h2>
            <div className='mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
              {options.map((option) => (
                <article
                  key={option.id}
                  className='group relative isolate aspect-4/3 overflow-hidden rounded-2xl border border-white/5 bg-ink-light'
                >
                  <Image
                    src={imageUrl(option.image, 900, 675)}
                    alt={option.title ?? ''}
                    fill
                    sizes='(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw'
                    className='-z-10 object-cover transition-transform duration-700 motion-safe:group-hover:scale-105'
                  />
                  <div
                    aria-hidden='true'
                    className='absolute inset-0 -z-10 bg-linear-to-t from-ink via-ink/15 to-ink/5'
                  />
                  <h3 className='absolute inset-x-0 bottom-0 p-6 font-display text-2xl leading-tight uppercase'>
                    {option.title}
                  </h3>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
