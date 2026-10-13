/**
 * Capvtal SEO build plugin (no extra dependencies).
 *
 * 1. Injects the homepage <head> tags + the site-wide Organization/WebSite schema into index.html
 *    (in dev and build), so the raw HTML is never an empty shell.
 * 2. After `vite build`, writes one HTML file per route (about.html, technology.html, blog/<id>.html …)
 *    each with its own title, description, canonical, Open Graph tags, JSON-LD and readable text.
 *    Vercel serves these directly (see vercel.json → cleanUrls), so Google, Bing, WhatsApp, LinkedIn
 *    and AI crawlers all see the right content without running JavaScript.
 * 3. Generates dist/sitemap.xml from the same route list, so it never goes stale.
 *
 * Edit titles / descriptions in src/lib/seo-routes.ts — not here.
 */
import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";
import {
  allRoutes,
  organizationSchema,
  websiteSchema,
  SITE_URL,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  type RouteMeta,
} from "./src/lib/seo-routes";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const json = (o: unknown) => JSON.stringify(o).replace(/</g, "\\u003c");

const urlFor = (p: string) => `${SITE_URL}${p === "/" ? "/" : p}`;

const headFor = (r: RouteMeta) =>
  [
    `<title>${esc(r.title)}</title>`,
    `<meta name="description" content="${esc(r.description)}" />`,
    `<meta name="robots" content="${r.noindex ? "noindex, follow" : "index, follow, max-image-preview:large"}" />`,
    `<link rel="canonical" href="${urlFor(r.path)}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:locale" content="en_ZA" />`,
    `<meta property="og:type" content="${r.type ?? "website"}" />`,
    `<meta property="og:url" content="${urlFor(r.path)}" />`,
    `<meta property="og:title" content="${esc(r.title)}" />`,
    `<meta property="og:description" content="${esc(r.description)}" />`,
    `<meta property="og:image" content="${DEFAULT_OG_IMAGE}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="Capvtal Innovations — Next Generation Innovation." />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:url" content="${urlFor(r.path)}" />`,
    `<meta name="twitter:title" content="${esc(r.title)}" />`,
    `<meta name="twitter:description" content="${esc(r.description)}" />`,
    `<meta name="twitter:image" content="${DEFAULT_OG_IMAGE}" />`,
    r.jsonLd ? `<script type="application/ld+json" id="page-jsonld">${json(r.jsonLd)}</script>` : "",
  ]
    .filter(Boolean)
    .join("\n    ");

const siteSchema = `<script type="application/ld+json" id="site-jsonld">${json({
  "@context": "https://schema.org",
  "@graph": [
    { ...organizationSchema, "@context": undefined },
    { ...websiteSchema, "@context": undefined },
  ],
})}</script>`;

const NAV = [
  ["/", "Home"],
  ["/about", "About"],
  ["/technology", "Capvtal Technology"],
  ["/production", "Capvtal Production"],
  ["/blogs", "Blog"],
  ["/contact", "Contact"],
];

/** Readable fallback content shown until the app boots (and to crawlers that don't run JS). */
const bodyFor = (r: RouteMeta) => `<div id="root"><div style="max-width:720px;margin:0 auto;padding:128px 20px 64px;font-family:-apple-system,BlinkMacSystemFont,'Inter','Segoe UI',Roboto,sans-serif;line-height:1.6;color:hsl(var(--muted-foreground))">
      <nav aria-label="Main" style="display:flex;flex-wrap:wrap;gap:16px;font-size:14px;margin-bottom:48px">${NAV.map(
        ([href, label]) => `<a href="${href}" style="color:inherit;text-decoration:none">${label}</a>`
      ).join("")}</nav>
      <main>
        <h1 style="font-size:44px;line-height:1.05;letter-spacing:-0.03em;color:hsl(var(--foreground));margin:0 0 24px">${esc(r.h1)}</h1>
        ${r.body.map((p) => `<p>${esc(p)}</p>`).join("\n        ")}
      </main>
    </div></div>`;

const injectHead = (html: string, r: RouteMeta) =>
  html.replace(/<!--seo-->[\s\S]*?<!--\/seo-->/, `<!--seo-->\n    ${headFor(r)}\n    <!--/seo-->`);

export default function seoPrerender(): Plugin {
  let outDir = "dist";
  let isBuild = false;
  const home = allRoutes.find((r) => r.path === "/")!;

  return {
    name: "capvtal-seo-prerender",

    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
      isBuild = config.command === "build";
    },

    transformIndexHtml: {
      order: "pre",
      handler(html) {
        return injectHead(html, home).replace("<!--site-schema-->", siteSchema);
      },
    },

    closeBundle() {
      if (!isBuild) return;
      const indexPath = path.join(outDir, "index.html");
      if (!fs.existsSync(indexPath)) return;
      const template = fs.readFileSync(indexPath, "utf8");

      for (const r of allRoutes) {
        const html = injectHead(template, r).replace('<div id="root"></div>', bodyFor(r));
        const file = r.path === "/" ? indexPath : path.join(outDir, `${r.path.slice(1)}.html`);
        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.writeFileSync(file, html);
      }

      const urls = allRoutes
        .filter((r) => !r.noindex)
        .map(
          (r) => `  <url>
    <loc>${urlFor(r.path)}</loc>
    <lastmod>${r.lastmod}</lastmod>
    <changefreq>${r.changefreq ?? "monthly"}</changefreq>
    <priority>${(r.priority ?? 0.5).toFixed(1)}</priority>
  </url>`
        )
        .join("\n");
      fs.writeFileSync(
        path.join(outDir, "sitemap.xml"),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
      );

      console.log(`\n  ✓ SEO: prerendered ${allRoutes.length} pages + sitemap.xml`);
    },
  };
}
