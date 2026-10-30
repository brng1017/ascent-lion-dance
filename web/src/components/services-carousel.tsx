'use client';

import { Arrow } from '@/components/arrow';

import Image from 'next/image';
import Link from 'next/link';
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from 'react';
import { flushSync } from 'react-dom';

function subscribeToViewport(listener: () => void) {
  window.addEventListener('resize', listener);
  return () => window.removeEventListener('resize', listener);
}

function visibleCardCount() {
  return window.matchMedia('(min-width: 1024px)').matches
    ? 4
    : window.matchMedia('(min-width: 640px)').matches
      ? 2
      : 1;
}

type Service = {
  key: string;
  title: string;
  tagline: string;
  href: string;
  image: string | null;
  imageAlt: string;
};

export function ServicesCarousel({ services }: { services: Service[] }) {
  const [start, setStart] = useState(0);
  const [moving, setMoving] = useState(false);
  const track = useRef<HTMLDivElement>(null);
  const animation = useRef<Animation | null>(null);
  const visibleCount = useSyncExternalStore(
    subscribeToViewport,
    visibleCardCount,
    () => 4,
  );

  useEffect(() => () => animation.current?.cancel(), [visibleCount]);

  if (services.length === 0) return null;

  const index = start % services.length;
  async function move(direction: number) {
    if (animation.current || services.length < 2 || !track.current) return;
    const advance = () =>
      setStart(
        (current) => (current + direction + services.length) % services.length,
      );
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      advance();
      return;
    }

    const card = track.current.firstElementChild as HTMLElement;
    const step =
      card.getBoundingClientRect().width +
      parseFloat(getComputedStyle(track.current).columnGap);
    const slide = track.current.animate(
      [
        { transform: `translateX(${-step}px)` },
        { transform: `translateX(${-step - direction * step}px)` },
      ],
      {
        duration: 420,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        fill: 'forwards',
      },
    );
    animation.current = slide;
    setMoving(true);
    try {
      await slide.finished;
      // Rotate the window and reset its offset in the same frame, including at the loop boundary.
      flushSync(advance);
    } catch {
      // Resizing or unmounting cancels the animation and keeps the current service.
    } finally {
      slide.cancel();
      animation.current = null;
      setMoving(false);
    }
  }

  return (
    <div
      role='region'
      aria-roledescription='carousel'
      aria-label='Performance services'
      className='relative'
    >
      <div className='mb-5 flex items-center justify-end gap-4 sm:pointer-events-none sm:absolute sm:inset-0 sm:z-10 sm:mb-0'>
        <div className='flex gap-3 sm:h-full sm:w-full sm:items-center sm:justify-between sm:px-3'>
          {[-1, 1].map((direction) => (
            <button
              key={direction}
              type='button'
              aria-label={
                direction === -1 ? 'Previous service' : 'Next service'
              }
              aria-controls='services-slides'
              disabled={services.length < 2}
              aria-disabled={moving || services.length < 2}
              onClick={() => move(direction)}
              className='pointer-events-auto flex size-12 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-gold hover:text-gold disabled:cursor-default disabled:opacity-30 sm:bg-ink/80 sm:shadow-lg sm:backdrop-blur-sm'
            >
              <Arrow className={`size-5 ${direction === -1 ? 'rotate-180' : ''}`} />
            </button>
          ))}
        </div>
      </div>
      <div
        id='services-slides'
        style={{ '--service-count': services.length } as CSSProperties}
        className='overflow-hidden [--visible-slides:min(1,var(--service-count))] sm:[--visible-slides:min(2,var(--service-count))] lg:[--visible-slides:min(4,var(--service-count))]'
      >
        <div
          ref={track}
          className='flex gap-5 transform-[translateX(calc(-1*(100%+1.25rem)/var(--visible-slides)))]'
        >
          {Array.from(
            { length: Math.min(4, services.length) + 2 },
            (_, slot) => {
              const offset = slot - 1;
              const position =
                (index + offset + services.length) % services.length;
              const service = services[position];
              const hidden =
                offset < 0 || offset >= Math.min(visibleCount, services.length);
              return (
                <article
                  key={slot}
                  aria-roledescription='slide'
                  aria-label={`${position + 1} of ${services.length}: ${service.title}`}
                  aria-hidden={hidden}
                  inert={hidden}
                  className='group relative isolate min-h-97.5 shrink-0 basis-[calc((100%+1.25rem)/var(--visible-slides)-1.25rem)] overflow-hidden rounded-xl bg-ink-light sm:min-h-102.5'
                >
                  {service.image && (
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      sizes='(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw'
                      className='-z-10 object-cover transition-transform duration-700 motion-safe:group-hover:scale-105'
                    />
                  )}
                  <div className='absolute inset-0 -z-10 bg-linear-to-t from-ink via-ink/15 to-ink/5' />
                  <div className='flex h-full min-h-[inherit] flex-col justify-end p-6'>
                    <p className='mb-3 text-[9px] font-semibold tracking-[.12em] text-white/70 uppercase'>
                      {service.tagline}
                    </p>
                    <div className='flex items-end justify-between gap-3'>
                      <h3 className='font-display text-[23px] leading-tight font-normal tracking-normal uppercase'>
                        <Link
                          href={service.href}
                          className='after:absolute after:inset-0'
                        >
                          {service.title}
                        </Link>
                      </h3>
                    </div>
                  </div>
                </article>
              );
            },
          )}
        </div>
      </div>
      <p
        role='status'
        aria-live='polite'
        aria-atomic='true'
        className='sr-only'
      >
        Starting with {services[index].title}, service {index + 1} of{' '}
        {services.length}.
      </p>
    </div>
  );
}
