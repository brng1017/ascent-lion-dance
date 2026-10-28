'use client';

import Image from 'next/image';

export type Sponsor = {
  id: string;
  name: string;
  logo?: string;
  logoAlt?: string;
  website?: string | null;
};

export function SponsorsBanner({
  sponsors,
  email,
}: {
  sponsors: Sponsor[];
  email: string;
}) {
  // Repeat short lists so the row stays filled, then duplicate the complete row for a seamless loop.
  const repeats = sponsors.length
    ? Math.max(1, Math.ceil(6 / sponsors.length))
    : 0;
  const row = Array.from({ length: repeats }, (_, repeat) =>
    sponsors.map((sponsor) => ({ ...sponsor, repeat })),
  ).flat();

  return (
    <section
      id='sponsors'
      aria-labelledby='sponsors-heading'
      className='bg-cream pb-16 text-ink md:pb-20'
    >
      <div className='mx-auto max-w-332 px-6 lg:px-10'>
        <div className='mb-9 border-t border-ink/15 pt-10 text-center'>
          <h2
            id='sponsors-heading'
            className='font-display text-2xl tracking-wide text-crimson uppercase sm:text-3xl'
          >
            Our sponsors
          </h2>
        </div>
      </div>
      {sponsors.length ? (
        <div
          tabIndex={0}
          role='group'
          aria-label='Sponsor banner'
          className='group overflow-hidden mask-[linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] motion-reduce:overflow-x-auto motion-reduce:[mask-image:none]'
        >
          <div
            data-sponsor-track
            style={{ animationDuration: `${Math.max(24, row.length * 5)}s` }}
            className='flex w-max animate-sponsors-scroll group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:animate-none'
          >
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                aria-label={copy === 0 ? 'Our sponsors' : undefined}
                aria-hidden={copy === 1 ? true : undefined}
                className={`flex min-w-screen shrink-0 items-center justify-around gap-12 px-6 lg:gap-16 lg:px-8 ${copy === 1 ? 'motion-reduce:hidden' : ''}`}
              >
                {row.map((sponsor) => {
                  const duplicate = copy === 1 || sponsor.repeat > 0;
                  const mark = sponsor.logo ? (
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.logoAlt || sponsor.name}
                      width={192}
                      height={80}
                      className='h-16 w-48 object-contain sm:h-20'
                    />
                  ) : (
                    <span className='font-display text-2xl leading-tight tracking-wide whitespace-nowrap uppercase sm:text-3xl'>
                      {sponsor.name}
                    </span>
                  );
                  return (
                    <li
                      key={`${sponsor.id}-${sponsor.repeat}`}
                      aria-hidden={duplicate ? true : undefined}
                      className={`flex min-h-24 min-w-48 shrink-0 items-center justify-center text-center ${sponsor.repeat > 0 ? 'motion-reduce:hidden' : ''}`}
                    >
                      {sponsor.website ? (
                        <a
                          href={sponsor.website}
                          target='_blank'
                          rel='noreferrer'
                          tabIndex={duplicate ? -1 : undefined}
                          aria-label={sponsor.name}
                          className='flex h-full w-full items-center justify-center transition-opacity hover:opacity-65'
                        >
                          {mark}
                        </a>
                      ) : (
                        mark
                      )}
                    </li>
                  );
                })}
              </ul>
            ))}
          </div>
        </div>
      ) : (
        <div className='mx-auto flex max-w-332 flex-wrap items-center justify-between gap-5 px-6 lg:px-10'>
          <p className='font-body text-sm text-ink/65'>
            Help us keep tradition moving.
          </p>
          <a
            href={`mailto:${email}?subject=Ascent%20sponsorship`}
            className='inline-flex min-h-11 items-center gap-5 text-xs font-semibold text-crimson'
          >
            Become a sponsor <span aria-hidden='true'>↗</span>
          </a>
        </div>
      )}
    </section>
  );
}
