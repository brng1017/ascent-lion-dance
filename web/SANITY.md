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
featured service references, community content, booking URL, and contact details.
The new homepage and additional service documents are drafts for review. The
frontend uses matching starter content from `src/sanity/home-defaults.ts` until
the Home Page is published. Publish featured services first, then Home Page.
Saving edits creates a draft; the public website only reads published documents.
Use **Publish** on Home Page to apply a new hero image or other edits. Clearing
the hero description on a published homepage hides it instead of restoring the
starter copy. Draft previews are not configured.
Only published references link to service detail routes; starter service cards
lead to the existing Ascent booking form.

Services display in a looping carousel with previous/next buttons: one card on
phones, two on tablets, and four on desktop. The featured services array has no
four-item limit. Starter categories are Lunar New Year, Grand Openings, Weddings,
Banquets, Birthdays, and Company Events. Add or reorder references in Home Page
to manage the carousel; publish the services and updated homepage when ready.

The booking buttons currently use `https://ascentliondance.org/book/`; change
the Home Page booking URL in Studio when a replacement booking flow is available.
Hero and service photographs can be replaced and cropped directly in Studio.
All homepage photographs come from Sanity; there are no local photo fallbacks.
Without an image, the hero keeps its dark background, a service card shows its
text on a dark background, and the community section omits its image column.
The shared logo remains local at `public/images/ascent-logo.png`.
The celebration ribbon uses the featured service titles automatically.

**Sponsors:** Create Sponsor documents with a company name, an optional logo,
and an optional website. Add them to Home Page → Our story → Our sponsors in
display order, then publish the sponsors and homepage. The white banner below
Our story scrolls continuously and uses the company name when no logo is set.
It pauses on hover or keyboard focus. Reduced
motion shows a static, horizontally scrollable list. While the sponsor drafts are
unpublished, the banner uses the provided names: Hoang Garage, The Do Family,
Vision Auto, and Re/Max. Publish sponsor documents first, then the updated homepage.

- **Website Page**: title, slug, summary, rich text, and references to performance services.
- **Performance Service**: title, slug, summary, and rich text.
- `/` lists published pages and services.
- `/pages/[slug]` renders a website page.
- `/services/[slug]` renders a performance service.

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
