# Ascent Dragon & Lion Dance

This repository contains two independent applications:

| Folder | Application | Local address |
| --- | --- | --- |
| web | Next.js website with Tailwind CSS | http://localhost:3000 |
| studio | Standalone Sanity content editor | http://localhost:3333 |

Install dependencies in each folder with npm ci. Copy web/.env.example to
web/.env.local, then start each application in a separate terminal using
npm run dev from its folder. On Windows, use npm.cmd if PowerShell blocks npm.

The website reads published Sanity content. Studio drafts remain unpublished
until you choose **Publish**. The Studio is deployed independently of the site.

See [web/README.md](web/README.md) and [studio/README.md](studio/README.md) for
development checks, [web/SANITY.md](web/SANITY.md) for content management, and
[web/BOOKING.md](web/BOOKING.md) for EmailJS configuration.
