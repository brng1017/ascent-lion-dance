import Image from 'next/image';
import { siteConfig } from '@/config/site';
import Link from 'next/link';
import type { HOME_PAGE_QUERY_RESULT } from '../../sanity.types';
import {
  homeDefaults,
  serviceDefaults,
} from '@/sanity/home-defaults';
import { imageUrl, logoUrl } from '@/sanity/image';
import { SiteHeader } from './site-header';
import { PageHero } from './page-hero';
import { ServicesCarousel } from './services-carousel';
import { SponsorsBanner, type Sponsor } from './sponsors-banner';

function Arrow({
  diagonal = false,
  className = '',
}: {
  diagonal?: boolean;
  className?: string;
}) {
  return (
    <svg
      aria-hidden='true'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      className={`size-5 ${className}`}
    >
      <path d={diagonal ? 'M6 18 18 6M6 6h12v12' : 'M4 12h16m-6-6 6 6-6 6'} />
    </svg>
  );
}

const values = ['Culture', 'Community', 'Tradition', 'Celebration'];

export function HomePage({ content }: { content: HOME_PAGE_QUERY_RESULT }) {
  const home = {
    eyebrow: content?.eyebrow ?? homeDefaults.eyebrow,
    heroTitle: content?.heroTitle ?? homeDefaults.heroTitle,
    heroHighlight: content?.heroHighlight ?? homeDefaults.heroHighlight,
    storyHeading: content?.storyHeading ?? homeDefaults.storyHeading,
    storyText: content?.storyText ?? homeDefaults.storyText,
    servicesHeading: content?.servicesHeading ?? homeDefaults.servicesHeading,
    servicesDescription:
      content?.servicesDescription ?? homeDefaults.servicesDescription,
    communityHeading:
      content?.communityHeading ?? homeDefaults.communityHeading,
    communityText: content?.communityText ?? homeDefaults.communityText,
    bookingHeading: content?.bookingHeading ?? homeDefaults.bookingHeading,
    bookingDescription:
      content?.bookingDescription ?? homeDefaults.bookingDescription,
    bookingUrl: siteConfig.bookingUrl,
    email: content?.email ?? homeDefaults.email,
    phone: content?.phone ?? homeDefaults.phone,
    instagramUrl: content?.instagramUrl ?? homeDefaults.instagramUrl,
  };
  const heroImage = content?.heroImage?.asset
    ? imageUrl(content.heroImage, 1920, 1280)
    : null;
  const communityImage = content?.communityImage?.asset
    ? imageUrl(content.communityImage, 1000, 800)
    : null;
  const publishedServices =
    content?.featuredServices?.filter((service) => service !== null) ?? [];
  const publishedSponsors = (content?.sponsors ?? []).flatMap((sponsor) =>
    sponsor?.name
      ? [
          {
            id: sponsor._id,
            name: sponsor.name,
            website: sponsor.website,
            logo: sponsor.logo?.asset
              ? logoUrl(sponsor.logo)
              : undefined,
            logoAlt: sponsor.logo?.alt ?? sponsor.name,
          },
        ]
      : [],
  );
  const sponsors: Sponsor[] = publishedSponsors;
  const services = publishedServices.length
    ? publishedServices.map((service) => ({
        key: service._id,
        title: service.title ?? 'Performance',
        tagline: service.tagline ?? 'Make it memorable',
        summary: service.summary,
        href: `/services#service-${service.slug || service._id}`,
        image: service.image?.asset ? imageUrl(service.image, 700, 900) : null,
        imageAlt:
          service.image?.alt ?? service.title ?? 'Lion dance performance',
      }))
    : serviceDefaults.map((service) => ({
        ...service,
        key: service.slug,
        href: `/services#service-${service.slug}`,
        image: null,
        imageAlt: service.title,
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
          id='home'
          variant='home'
          headingId='hero-heading'
          title={home.heroTitle}
          highlight={home.heroHighlight}
          eyebrow={home.eyebrow}
          image={heroImage}
          imageAlt={content?.heroImage?.alt ?? ''}
        />

        <div
          className='overflow-hidden bg-crimson py-4'
          aria-label={`Performances for ${services.map((service) => service.title).join(', ')}`}
        >
          <div
            className='flex w-max items-center gap-8 font-display text-base font-normal tracking-[.04em] uppercase'
            aria-hidden='true'
          >
            {[0, 1, 2].map((repeat) => (
              <div key={repeat} className='flex items-center gap-8'>
                {services.map((service) => (
                  <span key={service.key} className='flex items-center gap-8'>
                    {service.title}
                    <span className='text-gold'>✳</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <section
          id='about'
          aria-labelledby='about-heading'
          className='scroll-mt-6 bg-cream text-ink'
        >
          <div className='mx-auto grid max-w-332 gap-10 px-6 py-20 md:grid-cols-[1.15fr_1fr] md:gap-20 md:py-24 lg:px-10 lg:py-28'>
            <div>
              <p className='mb-6 text-[10px] font-bold tracking-[.24em] text-crimson uppercase'>
                Our story
              </p>
              <h2
                id='about-heading'
                className='max-w-xl font-display text-[clamp(2.4rem,4.5vw,4rem)] leading-[1.06] font-normal tracking-[-.015em] whitespace-pre-line uppercase'
              >
                {home.storyHeading}
              </h2>
            </div>
            <div className='md:pt-10'>
              <div className='space-y-5 text-[13px] leading-[1.95] text-ink/75'>
                {home.storyText.split(/\n\s*\n/).map((paragraph, index) => (
                  <p key={index} className='font-body'>
                    {paragraph}
                  </p>
                ))}
              </div>
              <Link
                href='/about'
                className='mt-7 inline-flex items-center gap-8 border-b border-crimson/30 pb-2 text-xs font-bold text-crimson transition-colors hover:border-crimson'
              >
                Get to know Ascent <Arrow />
              </Link>
            </div>
          </div>
        </section>

        <SponsorsBanner sponsors={sponsors} email={home.email} />

        <div className='bg-ink'>
          <div className='mx-auto grid max-w-332 grid-cols-2 gap-x-7 gap-y-8 px-6 pt-14 pb-8 lg:grid-cols-4 lg:px-10 lg:pt-16'>
            {values.map((title) => (
              <div key={title} className='border-t border-crimson/70 pt-5'>
                <p className='font-display text-[clamp(1.125rem,2.8vw,2.4rem)] font-normal tracking-normal text-gold uppercase'>
                  {title}
                  <span className='ml-1 text-crimson'>.</span>
                </p>
              </div>
            ))}
          </div>

          <section
            id='services'
            aria-labelledby='services-heading'
            className='mx-auto max-w-332 scroll-mt-8 px-6 pt-16 pb-20 lg:px-10 lg:pt-20 lg:pb-24'
          >
            <div className='mb-9 flex flex-wrap items-end justify-between gap-7'>
              <div>
                <p className='mb-5 text-[10px] font-bold tracking-[.24em] text-gold uppercase'>
                  What we do
                </p>
                <h2
                  id='services-heading'
                  className='font-display text-[clamp(2.4rem,4.5vw,3.7rem)] leading-[1.08] font-normal tracking-[-.015em] whitespace-pre-line uppercase'
                >
                  {home.servicesHeading}
                </h2>
              </div>
              <div className='max-w-70'>
                <p className='font-body text-xs leading-7 text-white/60'>
                  {home.servicesDescription}
                </p>
                <Link
                  href='/services'
                  className='mt-4 inline-flex items-center gap-4 text-xs font-semibold text-gold'
                >
                  Explore all services <Arrow diagonal />
                </Link>
              </div>
            </div>
            <ServicesCarousel services={services} />
          </section>

          <section
            id='community'
            aria-labelledby='community-heading'
            className={`mx-auto mb-20 grid max-w-312 scroll-mt-8 overflow-hidden bg-ink-light sm:mx-6 sm:rounded-2xl lg:mx-auto ${communityImage ? 'md:grid-cols-2' : ''}`}
          >
            {communityImage && (
              <div className='relative min-h-70 md:min-h-105'>
                <Image
                  src={communityImage}
                  alt={content?.communityImage?.alt ?? ''}
                  fill
                  sizes='(max-width: 767px) 100vw, 50vw'
                  className='object-cover'
                />
                <div className='absolute inset-0 bg-linear-to-t from-ink/40 to-transparent' />
              </div>
            )}
            <div className='flex flex-col justify-center px-7 py-12 lg:px-14'>
              <p className='mb-5 text-[10px] font-bold tracking-[.24em] text-gold uppercase'>
                The Ascent family
              </p>
              <h2
                id='community-heading'
                className='font-display text-3xl leading-[1.12] font-normal tracking-normal whitespace-pre-line uppercase lg:text-[39px]'
              >
                {home.communityHeading}
              </h2>
              <p className='mt-5 font-body text-[13px] leading-7 text-white/65'>
                {home.communityText}
              </p>
              <Link
                href='/join'
                className='mt-7 inline-flex w-fit items-center gap-8 text-xs font-semibold text-gold'
              >
                Find your place with us <Arrow />
              </Link>
            </div>
          </section>

          <section
            id='booking'
            aria-labelledby='booking-heading'
            className='relative mx-6 mb-20 max-w-312 scroll-mt-6 overflow-hidden rounded-2xl bg-crimson px-7 py-12 sm:px-12 sm:py-14 lg:mx-auto'
          >
            <div
              aria-hidden='true'
              className='pointer-events-none absolute -top-24 -right-14 size-115 rounded-full border border-white/10'
            >
              <div className='absolute inset-10 rounded-full border border-white/10' />
              <div className='absolute inset-20 rounded-full border border-white/10' />
              <div className='absolute inset-32 rounded-full border border-white/10' />
            </div>
            <div className='relative flex flex-col justify-between gap-9 md:flex-row md:items-end'>
              <div>
                <p className='mb-5 text-[10px] font-semibold tracking-[.24em] uppercase'>
                  Let&apos;s celebrate
                </p>
                <h2
                  id='booking-heading'
                  className='max-w-2xl font-display text-[clamp(2.7rem,5.5vw,5rem)] leading-[1.08] font-normal tracking-[-.015em] whitespace-pre-line uppercase'
                >
                  {home.bookingHeading}
                </h2>
                <p className='mt-5 max-w-sm font-body text-xs leading-7 text-white/85'>
                  {home.bookingDescription}
                </p>
              </div>
              <a
                href={home.bookingUrl}
                className='inline-flex w-fit shrink-0 items-center gap-10 rounded-full bg-ink px-7 py-5 text-xs font-bold transition-colors hover:bg-ink-light'
              >
                Request a booking <Arrow diagonal />
              </a>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
