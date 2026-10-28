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
