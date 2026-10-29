import type { Metadata } from 'next';
import { BookingForm } from '@/components/booking-form';
import { PageHero } from '@/components/page-hero';
import { SiteHeader } from '@/components/site-header';
import { getHomePage, getServices } from '@/sanity/content';
import { homeDefaults, serviceDefaults } from '@/sanity/home-defaults';

export const metadata: Metadata = {
  title: 'Request a Booking | Ascent Dragon & Lion Dance',
  description:
    'Tell us about your celebration and request a lion dance performance from Ascent Dragon & Lion Dance in Denver.',
};

export default async function BookingPage() {
  const [home, services] = await Promise.all([getHomePage(), getServices()]);
  const featuredIds =
    home?.featuredServices?.flatMap((service) =>
      service ? [service._id] : [],
    ) ?? [];
  const order = new Map(featuredIds.map((id, index) => [id, index]));
  const eventTypes = services.length
    ? [...services]
        .sort(
          (a, b) =>
            (order.get(a._id) ?? featuredIds.length) -
            (order.get(b._id) ?? featuredIds.length),
        )
        .flatMap((service) => {
          const label = service.eventTypeLabel?.trim() || service.title;
          return label ? [label] : [];
        })
    : serviceDefaults.map((service) => service.eventTypeLabel);
  const email = home?.email ?? homeDefaults.email;
  const phone = home?.phone ?? homeDefaults.phone;

  return (
    <>
      <a
        href='#booking-form-heading'
        className='sr-only z-50 rounded-lg bg-gold px-5 py-3 font-bold text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3'
      >
        Skip to booking form
      </a>
      <SiteHeader />
      <main>
        <PageHero
          variant='compact'
          headingId='booking-heading'
          title='Book'
          highlight='Today.'
          eyebrow='Your celebration. Our energy.'
        />
        <div className='mx-auto grid max-w-332 items-start gap-6 px-6 pb-20 lg:grid-cols-[minmax(0,1fr)_minmax(15rem,.4fr)] lg:gap-8 lg:px-10 lg:pb-28'>
          <BookingForm
            services={[
              ...new Set(
                eventTypes.filter((label) => label.toLowerCase() !== 'other'),
              ),
              'Other',
            ]}
            email={email}
          />
          <aside
            aria-label='Booking information'
            className='grid gap-4 sm:grid-cols-3 lg:grid-cols-1'
          >
            <section className='rounded-2xl border border-white/5 bg-ink-light p-6'>
              <h2 className='text-xs font-bold text-gold'>What happens next</h2>
              <p className='mt-3 font-body text-sm leading-6 text-white/65'>
                We will be in touch to confirm availability and discuss the
                details of your event. You can expect to receive a complimentary
                performance consultation from us within 2-5 business days, where
                we will consider your needs, schedule, and budget.
              </p>
            </section>
            <section className='min-w-0 rounded-2xl border border-white/5 bg-ink-light p-6'>
              <h2 className='text-xs font-bold text-gold'>Questions?</h2>
              <a
                href={`mailto:${email}`}
                className='mt-3 block break-all font-body text-sm leading-6 text-white/65 hover:text-gold'
              >
                {email}
              </a>
              <a
                href={`tel:${phone.replace(/[^\d+]/g, '')}`}
                className='mt-1 block font-body text-sm leading-6 text-white/65 hover:text-gold'
              >
                {phone}
              </a>
            </section>
            <section className='rounded-2xl border border-white/5 bg-ink-light p-6'>
              <h2 className='text-xs font-bold text-gold'>Please note</h2>
              <p className='mt-3 font-body text-sm leading-6 text-white/65'>
                Use this form for performance booking requests. Your date is
                confirmed once we finalize the details together.
              </p>
            </section>
          </aside>
        </div>
      </main>
    </>
  );
}
