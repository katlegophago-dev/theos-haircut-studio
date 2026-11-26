# Theo's Haircut Studio

Independent website for Theo's Haircut Studio in Lyttelton. Includes a photo hero, service panels, grouped prices, photo/video gallery and WhatsApp appointment requests. All business media is stored in `public/media`; the site requires no account, database, API key or proprietary builder service.

## Run locally

Use Node.js 22.12 or newer (verified with Node.js 24).

```sh
npm ci
npm run dev
```

## Verify and build

```sh
npm test
npm run lint
npm run build
npm run preview
```

The app uses React, TanStack Start/Router, Tailwind CSS and the Cloudflare Vite adapter. Server rendering preserves page titles and descriptions before JavaScript loads. Build output is generated in `dist/client` and `dist/server`; it is not committed.

Browser checks run against the production preview:

```sh
npx playwright install chromium
npm run build
npm run test:e2e
```

If Chromium is already installed, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to its executable path. Browser tests intercept the WhatsApp action and do not send messages.

## Edit content

`src/content/siteContent.js` contains prices, the R50 appointment surcharge, contact details, social links, image focus positions and media paths. Replace files in `public/media` and update those paths to add new photography or a future studio film. The logo crops assume the original square artwork.

Appointment preferences stay in browser memory until the visitor chooses to continue in WhatsApp. The studio confirms availability and the total there. Date validation uses Africa/Johannesburg.

## Hosting

The included `wrangler.jsonc` targets Cloudflare Workers. After configuring your own Cloudflare account, run `npm run deploy`. No deployment is performed by cloning or installing this repository. Other hosts need a compatible TanStack Start server adapter; serving only `dist/client` is not the full server-rendered application.

Google Fonts supplies Archivo and Inter. Business images, videos, the logo, favicon and video poster frames are local assets. Opening the contact links uses WhatsApp, Google Maps, Instagram or TikTok.
