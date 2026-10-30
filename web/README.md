# Ascent website

The Next.js App Router frontend for Ascent Dragon & Lion Dance. Styling uses
Tailwind CSS, and published content comes from the standalone Sanity Studio in
../studio.

## Local development

Install dependencies with npm ci, then copy .env.example to .env.local and
run npm run dev. Open http://localhost:3000.

On Windows with restricted PowerShell execution, use npm.cmd and npx.cmd.

## Checks and production build

```sh
npm run lint
npx tsc --noEmit
npm run build
npm run start
```

The build checks TypeScript as well as compiling the application.

## Project structure

- src/app: homepage, About, Services, Join, booking, and generic content routes.
- src/components: shared layout, hero, carousels, gallery, form, and icons.
- src/config/site.ts: shared booking destination and button labels.
- src/sanity: published-content queries, cached fetching, images, and fallbacks.
- sanity.types.ts: generated from the Studio schema and GROQ queries.
- public/images: local brand logo and image source credits.

Use the formatting settings in .prettierrc.json when editing frontend code.
Regenerate Sanity types from ../studio using npm run typegen; do not edit the
generated file manually.

See [SANITY.md](SANITY.md) for content management and deployment, and
[BOOKING.md](BOOKING.md) for EmailJS configuration and booking form behavior.
See [SEO.md](SEO.md) for search metadata and the post-deployment indexing checklist.
