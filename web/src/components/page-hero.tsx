import Image from 'next/image';
import { siteConfig } from '@/config/site';

type PageHeroProps = {
  id?: string;
  variant?: 'home' | 'page' | 'compact';
  headingId: string;
  title: string | null;
  highlight: string | null;
  eyebrow?: string | null;
  image?: string | null;
  imageAlt?: string;
};

export function PageHero({
  id,
  variant = 'page',
  headingId,
  title,
  highlight,
  eyebrow,
  image,
  imageAlt = '',
}: PageHeroProps) {
  return (
    <div id={id} className='relative isolate overflow-clip bg-ink pt-24'>
      {image && (
        <div className='absolute inset-0 -z-10'>
          <Image
            src={image}
            alt={imageAlt}
            fill
            loading='eager'
            fetchPriority='high'
            sizes='100vw'
            className='object-cover object-[64%_center] lg:object-[center_47%]'
          />
          <div className='absolute inset-0 bg-black/60' />
        </div>
      )}
      <section
        aria-labelledby={headingId}
        className={`relative mx-auto flex max-w-332 flex-col justify-center px-6 lg:px-10 ${variant === 'compact' ? 'pt-8 pb-10 sm:pt-10 sm:pb-12' : 'min-h-162.5 pt-14 pb-24 md:min-h-175 lg:pt-16 lg:pb-28'}`}
      >
        {eyebrow && (
          <p className='mb-7 flex items-center gap-3 text-[10px] font-semibold tracking-[.2em] text-gold uppercase sm:text-xs'>
            {eyebrow}
          </p>
        )}
        <h1
          id={headingId}
          className={`font-display leading-[.95] font-normal tracking-tight uppercase ${variant === 'compact' ? 'text-[clamp(3.25rem,8vw,6rem)]' : variant === 'home' ? 'max-w-3xl text-[clamp(4.75rem,23vw,11.5rem)] sm:text-[clamp(6rem,13vw,11.5rem)]' : 'text-[clamp(4.75rem,18vw,11.5rem)]'}`}
        >
          {title}
          {variant === 'compact' ? ' ' : <br />}
          <span className='text-gold'>{highlight}</span>
        </h1>
        {variant !== 'compact' && (
          <a
            href={siteConfig.bookingUrl}
            className='mt-9 inline-flex min-h-12 w-fit items-center gap-8 rounded-full bg-crimson px-7 py-4 text-xs font-bold transition-colors hover:bg-crimson-light'
          >
            {siteConfig.bookingLabel}
            <svg
              aria-hidden='true'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.5'
              className='size-4'
            >
              <path d='M4 12h16m-6-6 6 6-6 6' />
            </svg>
          </a>
        )}
      </section>
    </div>
  );
}
