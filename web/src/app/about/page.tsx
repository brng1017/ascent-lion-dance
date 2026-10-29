import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageHero } from '@/components/page-hero';
import { SiteHeader } from '@/components/site-header';
import { getAboutPage } from '@/sanity/content';
import { aboutDefaults } from '@/sanity/about-defaults';
import { imageUrl } from '@/sanity/image';

export const metadata: Metadata = {
  title: 'About Us | Ascent Dragon & Lion Dance',
  description:
    'Meet Ascent Dragon & Lion Dance, a Denver community celebrating tradition, connection, and the spirit of lion dance.',
};

export default async function AboutPage() {
  const content = await getAboutPage();
  const page = content ?? aboutDefaults;
  const heroImage = content?.heroImage?.asset
    ? imageUrl(content.heroImage, 1920, 1280)
    : null;
  const communityImage = content?.communityImage?.asset
    ? imageUrl(content.communityImage, 1200, 1000)
    : null;
  const email = page.email ?? aboutDefaults.email;

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
          headingId='about-page-heading'
          title={page.heroTitle}
          highlight={page.heroHighlight}
          eyebrow={page.eyebrow}
          image={heroImage}
          imageAlt={content?.heroImage?.alt ?? ''}
        />

        <section
          aria-labelledby='our-story-heading'
          className='bg-cream text-ink'
        >
          <div className='mx-auto grid max-w-332 gap-10 px-6 py-20 md:grid-cols-[1.15fr_1fr] md:gap-20 md:py-24 lg:px-10 lg:py-28'>
            <div>
              <p className='mb-6 text-[10px] font-bold tracking-[.24em] text-crimson uppercase'>
                Our story
              </p>
              <h2
                id='our-story-heading'
                className='max-w-xl font-display text-[clamp(2.4rem,4.5vw,4rem)] leading-[1.06] whitespace-pre-line uppercase'
              >
                {page.storyHeading}
              </h2>
            </div>
            <div className='space-y-5 font-body text-[13px] leading-[1.95] text-ink/75 md:pt-10'>
              {page.storyText?.split(/\n\s*\n/).map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section
          aria-labelledby='our-values-heading'
          className='mx-auto max-w-312 px-6 py-20 md:py-24 lg:px-10 lg:py-28'
        >
          <p className='mb-5 text-[10px] font-bold tracking-[.24em] text-gold uppercase'>
            {page.valuesIntroduction}
          </p>
          <h2
            id='our-values-heading'
            className='font-display text-[clamp(2.4rem,4.5vw,3.7rem)] leading-[1.08] uppercase'
          >
            {page.valuesHeading}
          </h2>
          <div className='mt-10 grid gap-5 md:grid-cols-3'>
            {(page.values ?? []).map((value) => (
              <div
                key={value._key}
                className='rounded-2xl border border-white/5 bg-ink-light p-7 lg:p-8'
              >
                <div aria-hidden='true' className='mb-8 h-px w-10 bg-crimson' />
                <h3 className='font-display text-3xl text-gold uppercase'>
                  {value.title}
                </h3>
                <p className='mt-4 font-body text-sm leading-7 text-white/70'>
                  {value.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          aria-labelledby='our-team-heading'
          className={`mx-auto mb-20 grid max-w-312 overflow-hidden bg-ink-light sm:mx-6 sm:rounded-2xl lg:mx-auto ${communityImage ? 'md:grid-cols-2' : ''}`}
        >
          {communityImage && (
            <div className='relative min-h-80 md:min-h-105'>
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
              id='our-team-heading'
              className='font-display text-3xl leading-[1.12] whitespace-pre-line uppercase lg:text-[39px]'
            >
              {page.communityHeading}
            </h2>
            <p className='mt-5 font-body text-[13px] leading-7 text-white/65'>
              {page.communityText}
            </p>
            <a
              href={`mailto:${email}?subject=Joining%20the%20Ascent%20team`}
              className='mt-7 inline-flex min-h-11 w-fit items-center gap-6 text-xs font-semibold text-gold hover:text-white'
            >
              Join our story <span aria-hidden='true'>↗</span>
            </a>
          </div>
        </section>

        <section
          aria-labelledby='celebrate-heading'
          className='mx-6 mb-20 max-w-312 rounded-2xl bg-crimson px-7 py-12 sm:px-12 sm:py-14 lg:mx-auto'
        >
          <div className='flex flex-col justify-between gap-9 md:flex-row md:items-end'>
            <div>
              <p className='mb-5 text-[10px] font-semibold tracking-[.24em] uppercase'>
                Make a memory
              </p>
              <h2
                id='celebrate-heading'
                className='font-display text-[clamp(2.7rem,5.5vw,5rem)] leading-[1.08] uppercase'
              >
                {page.bookingHeading}
              </h2>
              <p className='mt-5 max-w-sm font-body text-xs leading-7 text-white/85'>
                {page.bookingDescription}
              </p>
            </div>
            <Link
              href='/services'
              className='inline-flex min-h-12 w-fit shrink-0 items-center gap-8 rounded-full bg-ink px-7 py-5 text-xs font-bold transition-colors hover:bg-ink-light'
            >
              Explore our services <span aria-hidden='true'>↗</span>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
