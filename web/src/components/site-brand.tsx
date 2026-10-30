import Image from 'next/image';
import Link from 'next/link';

export function SiteBrand() {
  return (
    <Link
      href='/#home'
      aria-label='Ascent Dragon and Lion Dance home'
      className='inline-flex shrink-0 items-center gap-3'
    >
      <Image
        src='/images/ascent-logo.png'
        width={60}
        height={44}
        alt=''
        className='h-11 w-auto object-contain'
      />
      <span className='block text-white'>
        <span className='block font-display text-[23px] leading-none font-normal tracking-[.06em]'>
          ASCENT
        </span>
        <span className='mt-1.5 block text-[8px] leading-none font-medium tracking-[.21em]'>
          DRAGON &amp; LION DANCE
        </span>
      </span>
    </Link>
  );
}
