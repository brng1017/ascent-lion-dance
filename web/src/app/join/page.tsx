import type { Metadata } from 'next';
import { Arrow } from '@/components/arrow';
import { PageHero } from '@/components/page-hero';
import { SiteHeader } from '@/components/site-header';
import { getJoinPage } from '@/sanity/content';
import { joinDefaults } from '@/sanity/join-defaults';
import { imageUrl } from '@/sanity/image';

export const metadata: Metadata = {
  title: 'Join Us | Ascent Dragon & Lion Dance',
  description:
    'Interested in joining Ascent Dragon & Lion Dance in Denver? Meet your community and get in touch to learn how to get involved.',
};

export default async function JoinPage() {
  const content = await getJoinPage();
  const page = content ?? joinDefaults;
  const heroImage = content?.heroImage?.asset
    ? imageUrl(content.heroImage, 1920, 1280)
    : null;
  const email = page.email ?? joinDefaults.email;

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
          headingId='join-page-heading'
          title={page.heroTitle}
          highlight={page.heroHighlight}
          eyebrow={page.eyebrow}
          image={heroImage}
          imageAlt={content?.heroImage?.alt ?? ''}
        />

        <section
          aria-labelledby='join-introduction-heading'
          className='bg-cream text-ink'
        >
          <div className='mx-auto grid max-w-332 gap-10 px-6 py-20 md:grid-cols-[1.15fr_1fr] md:gap-20 md:py-24 lg:px-10 lg:py-28'>
            <div>
              <p className='mb-6 text-[10px] font-bold tracking-[.24em] text-crimson uppercase'>
                Join the team
              </p>
              <h2
                id='join-introduction-heading'
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
          aria-labelledby='join-contact-heading'
          className='mx-auto max-w-332 px-6 py-20 md:py-24 lg:px-10 lg:py-28'
        >
          <div className='rounded-2xl bg-crimson px-7 py-12 sm:px-12 sm:py-14'>
            <div className='flex flex-col justify-between gap-9 md:flex-row md:items-end'>
              <div>
                <p className='mb-5 text-[10px] font-semibold tracking-[.24em] uppercase'>
                  Get in touch
                </p>
                <h2
                  id='join-contact-heading'
                  className='max-w-2xl font-display text-[clamp(2.7rem,5.5vw,5rem)] leading-[1.08] whitespace-pre-line uppercase'
                >
                  {page.contactHeading}
                </h2>
                {page.contactText && (
                  <p className='mt-5 max-w-md font-body text-sm leading-7 text-white/85'>
                    {page.contactText}
                  </p>
                )}
              </div>
              <div className='flex shrink-0 flex-col items-start gap-4'>
                <a
                  href={`mailto:${email}?subject=Joining%20the%20Ascent%20team`}
                  className='inline-flex min-h-12 items-center gap-8 rounded-full bg-ink px-7 py-5 text-xs font-bold transition-colors hover:bg-ink-light'
                >
                  Email the team <Arrow diagonal />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
