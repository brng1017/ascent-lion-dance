'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export type GalleryPhoto = {
  id: string;
  thumbnail: string;
  fullSize: string;
  alt: string;
};

export function PhotoGallery({ photos }: { photos: GalleryPhoto[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const isOpen = activeIndex !== null;
  const active = activeIndex === null ? null : photos[activeIndex];

  useEffect(() => {
    if (!isOpen) return;
    const element = dialog.current;
    if (!element) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    element.showModal();
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  function close() {
    dialog.current?.close();
    setActiveIndex(null);
  }

  function cycle(direction: number) {
    setActiveIndex((current) =>
      current === null
        ? null
        : (current + direction + photos.length) % photos.length,
    );
  }

  return (
    <>
      <div className='mt-10 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3'>
        {photos.map((photo, index) => (
          <figure key={photo.id} className='min-w-0'>
            <button
              type='button'
              aria-label={`View photo: ${photo.alt || 'Ascent performance'}`}
              aria-haspopup='dialog'
              onClick={() => setActiveIndex(index)}
              className='group relative block aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-2xl bg-ink-light'
            >
              <Image
                src={photo.thumbnail}
                alt={photo.alt}
                fill
                sizes='(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw'
                className='object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105'
              />
            </button>
          </figure>
        ))}
      </div>

      <dialog
        ref={dialog}
        aria-label='Photo gallery viewer'
        onClose={() => setActiveIndex(null)}
        onCancel={close}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight') {
            event.preventDefault();
            cycle(1);
          }
          if (event.key === 'ArrowLeft') {
            event.preventDefault();
            cycle(-1);
          }
        }}
        className='fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none border-0 bg-transparent p-0 text-white outline-none backdrop:bg-black/90'
      >
        {active && (
          <>
            <button
              type='button'
              autoFocus
              onClick={close}
              aria-label='Close photo viewer'
              className='absolute top-4 right-4 z-10 flex size-12 items-center justify-center rounded-full border border-white/25 bg-ink/80 text-3xl hover:border-gold hover:text-gold sm:top-6 sm:right-6'
            >
              <span aria-hidden='true'>×</span>
            </button>
            <div className='pointer-events-none flex h-full w-full flex-col items-center justify-center gap-4 px-4 pt-20 pb-24 sm:px-20 sm:pb-20'>
              <Image
                key={active.id}
                src={active.fullSize}
                alt={active.alt}
                width={2400}
                height={1600}
                unoptimized
                className='pointer-events-auto h-auto max-h-[calc(100dvh-12rem)] w-auto max-w-full object-contain'
              />
              <div
                role='status'
                aria-live='polite'
                aria-atomic='true'
                className='pointer-events-auto max-w-3xl text-center'
              >
                <p className='mt-2 text-xs text-white/50'>
                  {(activeIndex ?? 0) + 1} / {photos.length}
                </p>
              </div>
            </div>
            {photos.length > 1 && (
              <>
                <button
                  type='button'
                  onClick={() => cycle(-1)}
                  aria-label='Previous photo'
                  className='absolute bottom-5 left-6 flex size-12 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-ink/80 text-white shadow-lg backdrop-blur-sm transition-colors hover:border-gold hover:text-gold sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2'
                >
                  <svg
                    aria-hidden='true'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    className='size-5 rotate-180'
                  >
                    <path d='M4 12h16m-6-6 6 6-6 6' />
                  </svg>
                </button>
                <button
                  type='button'
                  onClick={() => cycle(1)}
                  aria-label='Next photo'
                  className='absolute right-6 bottom-5 flex size-12 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-ink/80 text-white shadow-lg backdrop-blur-sm transition-colors hover:border-gold hover:text-gold sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2'
                >
                  <svg
                    aria-hidden='true'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    className='size-5'
                  >
                    <path d='M4 12h16m-6-6 6 6-6 6' />
                  </svg>
                </button>
              </>
            )}
          </>
        )}
      </dialog>
    </>
  );
}
