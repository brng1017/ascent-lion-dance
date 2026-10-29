'use client';

import { useRef, useState, type FormEvent } from 'react';
import emailjs from '@emailjs/browser';

const inputClass =
  'mt-2 min-h-12 w-full rounded-lg border border-white/10 bg-ink px-4 py-3 font-body text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-gold focus-visible:outline-none! disabled:opacity-60 [color-scheme:dark]';
const labelClass = 'block text-[11px] font-medium text-white/75';

type BookingFormProps = { services: string[]; email: string };

function today() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function BookingForm({ services, email }: BookingFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const pending = useRef(false);
  const successRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<
    'idle' | 'sending' | 'success' | 'error'
  >('idle');
  const [error, setError] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const value = (name: string) => String(data.get(name) ?? '').trim();
    if (value('website')) return;
    if (!form.reportValidity()) return;
    if (value('phone').replace(/\D/g, '').length < 7) {
      setError('Please enter a phone number including the area code.');
      setStatus('error');
      form.querySelector<HTMLInputElement>('[name="phone"]')?.focus();
      return;
    }
    if (value('event_date') < today()) {
      setError('Please choose today or a future event date.');
      setStatus('error');
      form.querySelector<HTMLInputElement>('[name="event_date"]')?.focus();
      return;
    }
    if (!serviceId || !templateId || !publicKey) {
      setError(
        'The booking form is temporarily unavailable. Please email our team instead.',
      );
      setStatus('error');
      return;
    }
    pending.current = true;
    setStatus('sending');
    setError('');
    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          firstname: value('first_name'),
          lastname: value('last_name'),
          email: value('email'),
          reply_to: value('email'),
          phone: value('phone'),
          event_name: value('event_name'),
          event_type: value('event_type'),
          event_date: value('event_date'),
          event_time: value('event_time'),
          event_address: value('event_address'),
          message: value('additional_details') || 'None provided',
        },
        { publicKey, limitRate: { id: 'booking', throttle: 10000 } },
      );
      form.reset();
      setSelectedService('');
      setStatus('success');
      requestAnimationFrame(() => successRef.current?.focus());
    } catch {
      setError(
        'Your request could not be sent. Please try again in a moment, or email our team. Your details are still here.',
      );
      setStatus('error');
    } finally {
      pending.current = false;
    }
  }

  if (status === 'success') {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role='status'
        className='rounded-2xl border border-gold/25 bg-ink-light p-7 sm:p-10'
      >
        <span
          aria-hidden='true'
          className='mb-6 flex size-12 items-center justify-center rounded-full bg-gold text-2xl text-ink'
        >
          ✓
        </span>
        <h2 className='font-display text-3xl uppercase sm:text-4xl'>
          Request received.
        </h2>
        <p className='mt-5 max-w-lg font-body text-sm leading-7 text-white/75'>
          Thanks for considering Ascent! Our team will contact you to discuss
          availability and details. Your booking is not confirmed yet.
        </p>
        <button
          type='button'
          onClick={() => setStatus('idle')}
          className='mt-8 min-h-11 rounded-full border border-white/25 px-6 py-3 text-xs font-bold hover:border-gold hover:text-gold'
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      aria-labelledby='booking-form-heading'
      aria-busy={status === 'sending'}
      className='rounded-2xl border border-white/5 bg-ink-light p-6 sm:p-8 lg:p-10'
    >
      <div aria-hidden='true' className='mb-7 h-0.5 bg-gold' />
      <div className='mb-7 flex flex-wrap items-baseline justify-between gap-3'>
        <h2
          id='booking-form-heading'
          className='font-display text-2xl uppercase'
        >
          Tell us about your event
        </h2>
        <p className='font-body text-xs text-white/45'>
          Optional fields are marked
        </p>
      </div>
      <div className='hidden' aria-hidden='true'>
        <label htmlFor='booking-website'>Leave this field empty</label>
        <input
          id='booking-website'
          name='website'
          type='text'
          tabIndex={-1}
          autoComplete='off'
        />
      </div>
      <fieldset
        disabled={status === 'sending'}
        className='grid gap-5 sm:grid-cols-2'
      >
        <legend className='sr-only'>Contact and event information</legend>
        <label className={labelClass} htmlFor='booking-first-name'>
          First name
          <input
            id='booking-first-name'
            name='first_name'
            autoComplete='given-name'
            required
            maxLength={80}
            pattern='.*\S.*'
            className={inputClass}
            placeholder='First name'
          />
        </label>
        <label className={labelClass} htmlFor='booking-last-name'>
          Last name
          <input
            id='booking-last-name'
            name='last_name'
            autoComplete='family-name'
            required
            maxLength={80}
            pattern='.*\S.*'
            className={inputClass}
            placeholder='Last name'
          />
        </label>
        <label className={labelClass} htmlFor='booking-phone'>
          Phone
          <input
            id='booking-phone'
            type='tel'
            name='phone'
            autoComplete='tel'
            required
            minLength={7}
            maxLength={40}
            className={inputClass}
            placeholder='(555) 123-4567'
          />
        </label>
        <label className={labelClass} htmlFor='booking-email'>
          Email
          <input
            id='booking-email'
            type='email'
            name='email'
            autoComplete='email'
            required
            maxLength={254}
            className={inputClass}
            placeholder='you@example.com'
          />
        </label>
        <label
          className={`${labelClass} sm:col-span-2`}
          htmlFor='booking-event-name'
        >
          Event name
          <input
            id='booking-event-name'
            name='event_name'
            required
            maxLength={160}
            pattern='.*\S.*'
            className={inputClass}
            placeholder='What are we celebrating?'
          />
        </label>
        <label
          className={`${labelClass} sm:col-span-2`}
          htmlFor='booking-event-address'
        >
          Event address
          <input
            id='booking-event-address'
            name='event_address'
            required
            pattern='.*\S.*'
            autoComplete='off'
            maxLength={300}
            className={inputClass}
            placeholder='Event location, street address, city'
          />
        </label>
        <label className={labelClass} htmlFor='booking-event-date'>
          Event date
          <input
            id='booking-event-date'
            type='date'
            name='event_date'
            required
            className={inputClass}
            onFocus={(event) => {
              event.currentTarget.min = today();
            }}
          />
        </label>
        <label className={labelClass} htmlFor='booking-event-time'>
          Performance time
          <input
            id='booking-event-time'
            type='time'
            name='event_time'
            required
            className={inputClass}
          />
          <span className='mt-2 block font-body text-xs text-white/40'>
            Use the local time at your event.
          </span>
        </label>
        <fieldset className='min-w-0 sm:col-span-2'>
          <legend className='mb-3 text-[11px] font-medium text-white/75'>
            Event type
          </legend>
          <div className='flex flex-wrap gap-2'>
            {services.map((service) => (
              <label key={service} className='relative cursor-pointer select-none'>
                <input
                  type='radio'
                  name='event_type'
                  value={service}
                  required
                  checked={selectedService === service}
                  onChange={() => setSelectedService(service)}
                  className='peer sr-only'
                />
                <span className='flex min-h-11 items-center rounded-full border border-white/20 px-4 py-2 font-body text-xs text-white/80 transition-colors peer-checked:border-gold peer-checked:bg-gold peer-checked:text-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-gold peer-disabled:cursor-wait hover:border-gold/70'>
                  {service}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <label
          className={`${labelClass} sm:col-span-2`}
          htmlFor='booking-details'
        >
          Additional details{' '}
          <span className='font-normal text-white/40'>(optional)</span>
          <textarea
            id='booking-details'
            name='additional_details'
            rows={4}
            maxLength={5000}
            className={`${inputClass} resize-y`}
            placeholder='Anything else we should know about your event?'
          />
        </label>
      </fieldset>
      {status === 'error' && (
        <div
          role='alert'
          className='mt-6 rounded-lg border border-crimson/50 p-4 font-body text-sm leading-6 text-white'
        >
          {error}{' '}
          <a className='text-gold underline' href={`mailto:${email}`}>
            Email {email}
          </a>
        </div>
      )}
      <button
        type='submit'
        disabled={status === 'sending'}
        className='mt-7 flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-crimson px-6 py-4 text-xs font-bold text-white transition-colors hover:bg-crimson-light disabled:cursor-wait disabled:opacity-60'
      >
        {status === 'sending' ? 'Sending request…' : 'Send request'}
        <span aria-hidden='true'>{status === 'sending' ? '…' : '↗'}</span>
      </button>
      <p className='mt-4 text-center font-body text-[11px] leading-5 text-white/40'>
        Submitting a request does not confirm your booking.
      </p>
    </form>
  );
}
