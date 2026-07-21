# Nova Studio

Marketing site for **Nova Studio** — an AI-native website studio. Built with
Next.js 16, React 19, Tailwind CSS v4, and Motion for animation.

> `Nova Studio` is a placeholder brand. Rename everything from one file:
> [`src/lib/site.ts`](src/lib/site.ts).

## Tech stack

- **Next.js 16** (App Router, Turbopack) + **React 19**
- **TypeScript**
- **Tailwind CSS v4** (CSS-first config in `src/app/globals.css`)
- **Motion** (`motion/react`) for scroll reveals, magnetic buttons, marquee
- **lucide-react** icons

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build   # production build
npm run start   # run the production server
npm run lint    # eslint
```

## Project structure

```
src/
  app/
    layout.tsx        # fonts, metadata, root layout
    page.tsx          # composes all sections
    globals.css       # theme tokens, animations, utilities (Tailwind v4)
  components/
    site-nav.tsx      # sticky, scroll-aware nav + mobile menu
    site-footer.tsx
    sections/         # hero, marquee, services, work, process, about, contact
    ui/               # reveal, magnetic, aurora, button, section-heading
  lib/
    site.ts           # 🔧 brand name, copy, links, nav — edit here
    utils.ts          # cn() class helper
```

## Customizing

- **Brand & copy** → `src/lib/site.ts`
- **Colors & fonts** → the `@theme` block in `src/app/globals.css` and the font
  imports in `src/app/layout.tsx`
- **Sections & content** → files in `src/components/sections/`

### Adding hero video

The hero uses an animated mock. To use real footage, drop a file in `public/`
and replace `HeroVisual` in `src/components/sections/hero.tsx`:

```tsx
<video src="/hero.mp4" autoPlay muted loop playsInline
  className="w-full rounded-4xl border border-border" />
```

### Wiring the contact form

The form in `src/components/sections/contact.tsx` currently opens the visitor's
mail client via `mailto:`. For real submissions, add a Next.js route handler
(`src/app/api/contact/route.ts`) or a form provider (Resend, Formspree, etc.)
and `fetch` it from `handleSubmit`.

## Deploying to Render

This repo includes [`render.yaml`](render.yaml), a Render Blueprint.

1. Push this repo to GitHub.
2. In Render, **New → Blueprint**, and point it at the repo.
3. Render reads `render.yaml`, builds with `npm ci && npm run build`, and serves
   with `npm run start`. `next start` binds to Render's `PORT` automatically.

You can also deploy manually as a **Web Service**:

- **Build command:** `npm ci && npm run build`
- **Start command:** `npm run start`
- **Node version:** 22.12.0
