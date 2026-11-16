# Linear homepage recreation

A responsive, client-side recreation of the current Linear marketing homepage, built with Next.js App Router, React, TypeScript, Tailwind CSS, Motion, Lucide icons, and `next-themes`.

## Requirements

- Node.js 20.9 or newer (Node 24 is recommended)
- npm

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). To create and run a production build, use `npm run build` and `npm start`.

## Implementation notes

- `app/page.tsx` is intentionally small. The homepage sections and interactive client behavior live in `components/home-page.tsx`.
- Product previews are HTML and CSS mock interfaces, so they stay sharp at every screen size and do not depend on remote screenshots.
- The theme button in the navigation and footer persists a dark or light preference through `next-themes`.
- Product and resources menus, the mobile menu, issue tabs, issue selection, customer quotes, agent prompt, and toast are interactive.
- `app/globals.css` owns the visual system and responsive rules. Tailwind CSS 4 is configured through PostCSS and can be used alongside these component styles.

This is an independent frontend recreation and is not affiliated with Linear.
