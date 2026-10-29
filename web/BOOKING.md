# Booking form

`/book` uses the compact shared hero and `src/components/booking-form.tsx`.
Event types come from published Sanity performance services, with homepage
featured services first. Starter categories are used when none are published.
Each service's **Event type label** controls its booking option and the
`event_type` sent to EmailJS (for example Birthday instead of Birthdays).
Service titles remain unchanged on other pages. A missing label falls back to
the service title for compatibility with older content.
The shared booking destination in `src/config/site.ts` points to `/book`.

## EmailJS configuration

Set these public configuration values in `web/.env.local` and in Netlify's
environment variables, then rebuild/redeploy:

```dotenv
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_bdefevt
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_cuqabcg
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=ctP7soF5CD3V6eNJb
```

These are browser identifiers, not private account credentials. The local values
are configured; `.env.example` documents them for new checkouts.

In the EmailJS dashboard, template `template_cuqabcg` must have:

- **To Email:** `ascentmualan@gmail.com`, entered as a fixed recipient.
- **From Email:** the connected service's default address.
- **Reply-To:** `{{email}}` (the payload also includes `reply_to`).
- **Automatic acknowledgment:** disabled; the app sends only one team notification.

The payload matches this template:

```text
{{event_name}} - Performance Request

Name: {{firstname}} {{lastname}}
Email: {{email}}
Phone: {{phone}}
Event type: {{event_type}}
Event date: {{event_date}}
Performance time: {{event_time}}
Event address: {{event_address}}
Additional details:
{{message}}
```

Use double braces for visitor-supplied values, including names and event name.
EmailJS escapes double-brace variables; triple braces insert unescaped content.
The app cannot inspect or change dashboard templates or recipient settings.
The form and EmailJS template both use `event_address` for the event location.

All fields are required except Additional details. Dates may
not be in the past; performance time is local to the venue. Optional empty fields
are represented explicitly in the email. Requests are not confirmed bookings.

## Spam protection and testing

The form includes a hidden honeypot, an in-flight submission lock, and a 10-second
EmailJS SDK throttle. These browser checks do not replace provider protection.
In EmailJS, allow the origins `http://localhost:3000`,
`https://ascentliondance.org`, and `https://www.ascentliondance.org` when used.
Add any deployment preview origin you intend to test. No reCAPTCHA is configured.

Browser checks should intercept `https://api.emailjs.com/api/v1.0/email/send`
to test success/failure, exact template parameters, and duplicate prevention
without sending actual email. After deployment, submit one real request yourself
and verify all values, inbox delivery, and that Reply targets the visitor.
