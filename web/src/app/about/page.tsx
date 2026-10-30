import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHero } from '@/components/page-hero';
import { PhotoGallery } from '@/components/photo-gallery';
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
  const lionDanceImage = content?.lionDanceImage?.asset
    ? imageUrl(content.lionDanceImage, 1200, 900)
    : null;
  const lionDanceHeading =
    content && content.lionDanceHeading !== null
      ? content.lionDanceHeading
      : aboutDefaults.lionDanceHeading;
  const lionDanceText =
    content && content.lionDanceText !== null
      ? content.lionDanceText
      : aboutDefaults.lionDanceText;
  const milestones = content?.milestones ?? aboutDefaults.milestones;
  const galleryImages =
    content?.galleryImages?.filter((photo) => photo.asset) ?? [];
  const dragonDanceImage = content?.dragonDanceImage?.asset
    ? imageUrl(content.dragonDanceImage, 1200, 900)
    : null;
  const dragonDanceHeading =
    content?.dragonDanceHeading ?? aboutDefaults.dragonDanceHeading;
  const dragonDanceText =
    content?.dragonDanceText ?? aboutDefaults.dragonDanceText;

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
          aria-labelledby='lion-dance-heading'
          className='mx-auto grid max-w-312 items-center gap-10 px-6 pt-20 md:grid-cols-2 md:gap-16 md:pt-24 lg:px-10 lg:pt-28'
        >
          <div>
            <p className='mb-5 text-[10px] font-bold tracking-[.24em] text-gold uppercase'>
              What is lion dance?
            </p>
            <h2
              id='lion-dance-heading'
              className='font-display text-[clamp(2.4rem,4.5vw,3.7rem)] leading-[1.08] whitespace-pre-line uppercase'
            >
              {lionDanceHeading}
            </h2>
            <div className='mt-6 space-y-4 font-body text-sm leading-7 text-white/70'>
              {lionDanceText?.split(/\n\s*\n/).map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className='relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink-light'>
            {lionDanceImage ? (
              <Image
                src={lionDanceImage}
                alt={content?.lionDanceImage?.alt ?? ''}
                fill
                sizes='(max-width: 767px) 100vw, 50vw'
                className='object-cover'
              />
            ) : (
              <div
                aria-hidden='true'
                className='absolute inset-0 flex items-end bg-[repeating-linear-gradient(135deg,transparent,transparent_12px,#ffffff05_12px,#ffffff05_24px)] p-5'
              >
                <span className='text-[10px] tracking-wide text-white/40'>
                  Lion dance photograph
                </span>
              </div>
            )}
          </div>
        </section>

        <section
          aria-labelledby='dragon-dance-heading'
          className='mx-auto grid max-w-312 items-center gap-10 px-6 pt-20 md:grid-cols-2 md:gap-16 md:pt-24 lg:px-10 lg:pt-28'
        >
          <div className='md:order-2'>
            <p className='mb-5 text-[10px] font-bold tracking-[.24em] text-gold uppercase'>
              What is dragon dance?
            </p>
            <h2
              id='dragon-dance-heading'
              className='font-display text-[clamp(2.4rem,4.5vw,3.7rem)] leading-[1.08] whitespace-pre-line uppercase'
            >
              {dragonDanceHeading}
            </h2>
            <div className='mt-6 space-y-4 font-body text-sm leading-7 text-white/70'>
              {dragonDanceText?.split(/\n\s*\n/).map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className='relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink-light md:order-1'>
            {dragonDanceImage ? (
              <Image
                src={dragonDanceImage}
                alt={content?.dragonDanceImage?.alt ?? ''}
                fill
                sizes='(max-width: 767px) 100vw, 50vw'
                className='object-cover'
              />
            ) : (
              <div
                aria-hidden='true'
                className='absolute inset-0 flex items-end bg-[repeating-linear-gradient(135deg,transparent,transparent_12px,#ffffff05_12px,#ffffff05_24px)] p-5'
              >
                <span className='text-[10px] tracking-wide text-white/40'>
                  Dragon dance photograph
                </span>
              </div>
            )}
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
            {(page.values ?? []).map((value, index) => (
              <div
                key={value._key}
                className='rounded-2xl border border-white/5 bg-ink-light p-7 lg:p-8'
              >
                <p
                  aria-hidden='true'
                  className='mb-9 font-display text-3xl text-crimson'
                >
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className='font-display text-2xl uppercase'>
                  {value.title}
                </h3>
                <p className='mt-4 font-body text-sm leading-7 text-white/70'>
                  {value.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {milestones.length > 0 && (
          <section
            aria-labelledby='journey-heading'
            className='mx-auto max-w-312 px-6 pb-20 md:pb-24 lg:px-10 lg:pb-28'
          >
            <h2
              id='journey-heading'
              className='font-display text-[clamp(2.4rem,4.5vw,3.7rem)] leading-[1.08] uppercase'
            >
              {content?.journeyHeading ?? aboutDefaults.journeyHeading}
            </h2>
            <ol className='mt-10 grid md:grid-flow-col md:auto-cols-fr'>
              {milestones.map((milestone) => (
                <li
                  key={milestone._key}
                  className='relative border-l border-white/15 pb-8 pl-7 last:pb-0 md:border-t md:border-l-0 md:pt-7 md:pr-8 md:pb-0 md:pl-0'
                >
                  <span
                    aria-hidden='true'
                    className='absolute top-1 -left-1 size-2 rounded-full bg-gold md:-top-1 md:left-0'
                  />
                  <h3 className='font-display text-2xl text-gold'>
                    {milestone.year}
                  </h3>
                  <p className='mt-3 max-w-xs font-body text-sm leading-7 text-white/70'>
                    {milestone.text}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        )}

        {galleryImages.length > 0 && (
          <section
            aria-labelledby='gallery-heading'
            className='mx-auto max-w-312 px-6 pb-20 md:pb-24 lg:px-10 lg:pb-28'
          >
            <h2
              id='gallery-heading'
              className='font-display text-[clamp(2.4rem,4.5vw,3.7rem)] leading-[1.08] uppercase'
            >
              {content?.galleryHeading || 'Photo gallery'}
            </h2>
            <PhotoGallery
              photos={galleryImages.map((photo) => ({
                id: photo._key,
                thumbnail: imageUrl(photo, 900, 675),
                fullSize: imageUrl(photo, 2400, 2400, 'max'),
                alt: photo.alt ?? '',
              }))}
            />
            <div className='mt-10 flex justify-center'>
              <a
                href='https://www.instagram.com/ascent.ld/'
                target='_blank'
                rel='noreferrer'
                aria-label='More photos on Instagram (opens in a new tab)'
                className='inline-flex min-h-12 items-center gap-8 rounded-full bg-crimson px-7 py-4 text-xs font-bold text-white transition-colors hover:bg-crimson-light'
              >
                More <span aria-hidden='true'>↗</span>
              </a>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
