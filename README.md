# Promise Wesley Initiative landing page

This is the Next.js App Router and TypeScript version of the PWI landing-page draft.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production check

```bash
npm run build
npm run start
```

## Project structure

- `app/layout.tsx` - page metadata and global layout
- `app/page.tsx` - interactive landing page and contact-form draft state
- `styles.css` - PWI design tokens, responsive layout, and motion system
- `public/brand-assets/` - PWI logo used by the Next.js image component
- `brand.md` - approved brand tokens and content direction

## Registration form

The registration form submits through `app/api/register/route.ts`, which forwards valid requests to the PWI Google Apps Script endpoint from the server.

To activate it, add the deployed Apps Script `/exec` URL to `GOOGLE_APPS_SCRIPT_WEB_APP_URL` in `.env.local` locally and in your production host’s encrypted environment variables. The script appends each registration to the `Registrations` sheet tab. Keep the form’s required-field validation and honeypot enabled.
