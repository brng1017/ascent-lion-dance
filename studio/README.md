# Ascent Sanity Studio

The standalone content editor for Sanity project e2taaqx6, dataset production.
It runs separately from the Next.js application in ../web.

## Local development

```sh
npm ci
npm run dev
```

Open http://localhost:3333 and sign in to Sanity. The sidebar contains Home Page,
About Page, Services Page, Join Page, Website Pages, Performance Services, and
Sponsors. Saving creates a draft; publish changes to update the public website.

On Windows with restricted PowerShell execution, use npm.cmd and npx.cmd.

## Development checks

```sh
npx eslint .
npx tsc --noEmit
npm run build
```

After editing schemas or frontend GROQ queries, run npm run typegen. This
regenerates schema.json and ../web/sanity.types.ts. Shared hero and photograph
field definitions live in schemaTypes/fields; stored field names remain stable.

Deploy the Studio independently with npm run deploy. See
[the Sanity connection guide](../web/SANITY.md) for configuration and deployment.
Historical local migration backups remain in the ignored .sanity/backups
folder. Setup and migration scripts have been retired; manage content in Studio.
