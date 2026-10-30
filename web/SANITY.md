# Sanity connection

The Next.js app uses project `e2taaqx6` and dataset `production`. The Studio is a
separate application in `../studio`; it is not mounted inside Next.js.

## Development

Copy `.env.example` to `.env.local` when setting up a fresh checkout. Both values
are public identifiers; this app does not need an API token for published content
in the public dataset.

Start each app in its own terminal:

```sh
cd studio
npm run dev
```

```sh
cd web
npm run dev
```

Studio runs at http://localhost:3333 and Next.js at http://localhost:3000.
On Windows with restricted PowerShell script execution, use `npm.cmd` and
`npx.cmd` in place of `npm` and `npx`.

## Content

The homepage has a dedicated **Home Page** singleton at the top of the Studio
sidebar. It contains hero copy and photography, the story,
featured service references, community content, booking copy, and contact details.
The new homepage and additional service documents are drafts for review. The
frontend uses matching starter content from `src/sanity/home-defaults.ts` until
the Home Page is published. Publish featured services first, then Home Page.
Saving edits creates a draft; the public website only reads published documents.
Use **Publish** on Home Page to apply a new hero image or other edits.
Draft previews are not configured.
Only published references link to service detail routes; starter service cards
lead to the existing Ascent booking form.

Services display in a looping carousel with previous/next buttons: one card on
phones, two on tablets, and four on desktop. The featured services array has no
four-item limit. Starter categories are Lunar New Year, Grand Openings, Weddings,
Banquets, Birthdays, and Company Events. Add or reorder references in Home Page
to manage the carousel; publish the services and updated homepage when ready.

Booking buttons use the shared URL and labels in `src/config/site.ts`.
These fixed settings are not editable in Sanity and are consistent across pages.
The booking destination is `/book`, with event choices from Performance Service
documents and delivery through EmailJS. See `BOOKING.md` for deployment settings
and the email template mapping. Booking requests are not saved in Sanity.
Hero and service photographs can be replaced and cropped directly in Studio.
All homepage photographs come from Sanity; there are no local photo fallbacks.
Without an image, the hero keeps its dark background, a service card shows its
text on a dark background, and the community section omits its image column.
The shared logo remains local at `public/images/ascent-logo.png`.
The celebration ribbon uses the featured service titles automatically.

**Sponsors:** Create Sponsor documents with a company name, an optional logo,
and an optional website. Publish a sponsor to include it automatically; no
homepage selection or display-order field is needed. The white banner below
Our story scrolls continuously and uses the company name when no logo is set.
It pauses on hover or keyboard focus. Reduced
motion shows a static, horizontally scrollable list. Draft sponsors are hidden.
When no sponsors are published, the banner shows a sponsorship contact link.
Unpublish or delete a sponsor to remove it from the banner.

- **Website Page**: title, slug, summary, rich text, and references to performance services.
- **Performance Service**: title, slug, summary, and rich text.
- **Event type label** on each Performance Service provides the singular booking
  form option, such as Wedding or Grand Opening. It does not change service titles
  on the homepage or services page. Publish label edits to update the booking form.
- `/` lists published pages and services.
- `/pages/[slug]` renders a website page.
- `/services/[slug]` renders a performance service.

The `/services` page lists all published performance services, using their titles,
summaries, and images. Homepage featured services appear first, in their chosen
order; additional services follow alphabetically. The six starter categories
appear when no services are published.

The **Services Page** singleton manages this page's hero introduction, headline,
photograph, and exactly three booking steps: Send a request, We
confirm, and We perform. Each step has an editable title and description.
Service listings continue to use Performance Service documents. Clearing the
published hero image removes it. Button labels and the booking
URL are fixed in shared site configuration; search metadata is fixed in the
route. The first step always has a "Plan your event" button. There is no
included-items panel. Home Page and Services Page use matching hero field names
and the same fixed "Book a show" action.

A sample Services Page draft contains the current copy and a copy of the homepage
hero image reference. Review it in Studio, then publish it to apply changes to
the public `/services` page. Until then, matching starter copy and the homepage
hero image are used. Later edits to the Services Page hero are independent of
the homepage. Rerun `npx sanity exec scripts/create-services-page.ts --with-user-token`
from `studio` if needed; the script preserves an existing Services Page.
The one-time `scripts/simplify-page-content.ts` cleanup removes the old settings
from saved page documents and adds the third booking step to a draft without
publishing editorial changes.

The **About Page** singleton manages `/about` independently: hero introduction,
headline and photograph; story heading and text; values introduction, heading,
and ordered cards; dance introductions and photographs; and journey milestones.
Hero field names and image controls
match Home Page and Services Page. Search metadata, navigation destinations, and
button labels stay in code.

Review and publish About Page in Studio to display its content and images. Before
publication, the route uses its own starter copy and no photographs. Its seed
script copies the existing hero image reference once, preserving
its crop and alt text; subsequent homepage edits do not affect About Page.
Run `npx sanity exec scripts/create-about-page.ts --with-user-token` from `studio`
to seed a missing draft; existing content is preserved. The shared footer still
uses global contact content from Home Page.

About Page also includes **What is lion dance?** (heading, description, and
photograph) and **Our journey** (heading and ordered year/description milestones).
**What is dragon dance?** follows the lion dance section with its own heading,
description, and photograph controls. The two sections use the same layout.
The white story section remains separate. Values cards are numbered automatically.
The timeline is horizontal on desktop and vertical on phones. Replace the marked
placeholder years and milestones in Studio, then publish About Page. The optional
`scripts/update-about-sections.ts` script adds missing fields to a draft while
preserving existing copy and images.

The **Photo gallery** tab on About Page controls the final gallery section.
Upload or choose images, enter required alternative text,
and drag photos into display order. Crops and hotspots control grid thumbnails.
Publish About Page to apply changes. The responsive grid shows one, two, or three
columns, and each photo opens in a full-screen viewer with looping previous/next
arrows. Click the backdrop, the close button, or press Escape to close; keyboard
arrow keys cycle photos. Empty galleries are
hidden; no starter photos are added automatically.

The **Join Page** singleton manages `/join` independently. It has the same hero
fields as the other pages, a short introduction heading and text, and a contact
heading, text, and team email. The page uses the shared hero, fixed booking
action, and fixed email button label. Search metadata stays in code.

Review and publish Join Page to display its content and photograph. Until then,
the page uses its own starter copy and no hero photograph. Its seed script copies
the homepage hero image reference once; later homepage changes do not affect it.
Run `npx sanity exec scripts/create-join-page.ts --with-user-token` from `studio`
to seed a missing draft. Existing Join Page content is preserved.

Three sample documents were created as drafts for review in Studio. Edit their
placeholder copy and publish when ready. Unpublished drafts do not appear on the
website; draft previews and Visual Editing are not configured.

The frontend uses `next-sanity` Live Content with Next.js Cache Components.
Cached query helpers live in `src/sanity/content.ts`, and `SanityLive` listens
for published content changes. See the official
[Cache Components guide](https://www.sanity.io/docs/nextjs/cache-components).

## Schema and query changes

Run in `studio` after changing schema types or frontend GROQ queries:

```sh
npm run typegen
npx sanity schemas deploy
```

TypeGen scans `../web/src` and writes `web/sanity.types.ts`. Commit the generated
types and `studio/schema.json`; do not edit the generated types manually.

The optional sample script can be rerun from `studio`:

```sh
npx sanity exec scripts/create-sample-drafts.ts --with-user-token
```

It checks existing slugs before creating any drafts. It does not publish content.

## Deployment

Set the two `.env.example` values in your web hosting environment. Deploy the
Studio independently using `npm run deploy` in `studio`. Add the deployed web
origin to Sanity CORS from `studio`:

```sh
npx sanity cors add https://your-web-domain.example --credentials
```

The local origin `http://localhost:3000` is configured for development. Add the
actual production origin when your website domain is known.
