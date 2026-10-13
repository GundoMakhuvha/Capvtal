# Capvtal website — modernisation update (Oct 2026)

Replace your project with this folder (or copy the files below over your repo), then push to GitHub — Vercel deploys as usual. No new npm packages were added.

## New files — create these
- `vercel.json` (project root) — clean URLs (`/about` serves the prerendered `about.html`), SPA fallback, asset caching, security headers
- `vite-plugin-seo.ts` (project root) — builds one SEO-ready HTML page per route + `sitemap.xml`
- `src/lib/seo-routes.ts` — **edit titles, descriptions, FAQ and schema here**
- `src/components/LiquidNav.tsx` — rounded liquid-glass navigation
- `src/components/SiteBackground.tsx` — new site-wide background (glow + dot grid + grain)
- `src/components/CloudsBackground.tsx` — animated WebGL clouds behind the hero on Home, Technology and Production (tinted per page; day sky in light mode, night sky in dark mode). Change colours in the `DARK` / `LIGHT` palettes at the top of the file.
- `src/components/DivisionHero.tsx`, `src/components/SectionHeader.tsx`
- `src/hooks/use-theme.ts`, `src/hooks/use-scroll-reveal.ts`
- `src/assets/gundo-makhuvha-founder.jpg` (85 KB, replaces the 447 KB PNG on the About page)
- `public/og-image.jpg` (1200×630 share image), `public/logo-512.png`, `public/founder.jpg`
- `public/favicon.ico` (replaced), `public/favicon-32.png`, `public/apple-touch-icon.png`, `public/icon-192.png`, `public/icon-512.png`, `public/icon-512-maskable.png`, `public/site.webmanifest`

## Deleted files
- `src/components/HeroOrb.tsx` (if you copied it from the previous version), `src/components/AuroraGridBackground.tsx`, `StarField.tsx`, `StarsBackground.tsx`, `InteractiveParticles.tsx`, `src/App.css`
- `public/sitemap.xml` (now generated automatically on every build — still at https://www.capvtal.com/sitemap.xml)
- `public/placeholder.svg`

## After deploying
1. Google Search Console → Sitemaps → resubmit `https://www.capvtal.com/sitemap.xml`
2. URL Inspection → `https://www.capvtal.com/` → Request indexing (repeat for /about, /technology, /production)
3. Add your social profile URLs to `sameAs` in `src/lib/seo-routes.ts`
4. In Vercel → Domains, make sure `capvtal.com` redirects to `www.capvtal.com`
