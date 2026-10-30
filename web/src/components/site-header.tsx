'use client';

import { SiteBrand } from './site-brand';
import { Arrow } from './arrow';
import { siteConfig } from '@/config/site';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, useState, useSyncExternalStore } from 'react';

function subscribeToScroll(listener: () => void) {
  window.addEventListener('scroll', listener, { passive: true });
  return () => window.removeEventListener('scroll', listener);
}

function hasScrolled() {
  return window.scrollY > 0;
}

const links = [
  { label: 'Home', href: '/#home' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Join us', href: '/join' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === '/#home'
      ? pathname === '/'
      : !href.includes('#') &&
        (pathname === href || pathname.startsWith(`${href}/`));
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    hasScrolled,
    () => false,
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 h-24 motion-safe:transition-[background-color,backdrop-filter] motion-safe:duration-300 ${scrolled ? 'bg-ink/95 backdrop-blur-md' : 'bg-transparent backdrop-blur-none'}`}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          setOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <div className='relative mx-auto flex h-full max-w-332 items-center justify-between px-6 lg:px-10'>
        <SiteBrand />
        <nav
          aria-label='Main navigation'
          className='hidden items-center gap-9 md:flex'
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? 'page' : undefined}
              className={`border-b pb-2 text-[10px] font-medium tracking-[.16em] uppercase transition-colors hover:text-gold ${isActive(link.href) ? 'border-crimson text-white' : 'border-transparent text-white/80'}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <a
          href={siteConfig.bookingUrl}
          className='hidden items-center rounded-full bg-crimson px-6 py-3.5 text-xs font-bold text-white transition-colors hover:bg-crimson-light md:inline-flex'
        >
          {siteConfig.bookingLabel} <Arrow diagonal className='ml-5 size-4' />
        </a>
        <button
          ref={toggle}
          type='button'
          aria-expanded={open}
          aria-controls='mobile-navigation'
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          onClick={() => setOpen(!open)}
          className='flex size-11 items-center justify-center rounded-full border border-white/25 text-white md:hidden'
        >
          <svg
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
            aria-hidden='true'
          >
            {open ? (
              <path d='m6 6 12 12M6 18 18 6' />
            ) : (
              <path d='M3 7h18M3 12h18M3 17h18' />
            )}
          </svg>
        </button>
        {open && (
          <nav
            id='mobile-navigation'
            aria-label='Mobile navigation'
            className='absolute top-full right-4 left-4 max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-b-2xl border border-white/15 bg-ink p-6 shadow-2xl md:hidden'
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className='block border-b border-white/10 py-4 font-display text-2xl font-normal tracking-wide uppercase'
              >
                {link.label}
              </Link>
            ))}
            <a
              href={siteConfig.bookingUrl}
              className='mt-5 flex items-center justify-between rounded-full bg-crimson px-5 py-4 font-bold'
            >
              {siteConfig.bookingLabel} <Arrow diagonal />
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
