import { useEffect } from "react";
import { SITE_URL, DEFAULT_OG_IMAGE, SITE_NAME, routeMeta } from "./seo-routes";

export { SITE_URL, DEFAULT_OG_IMAGE, SITE_NAME };

interface SEOOptions {
  title?: string;
  description?: string;
  path?: string; // e.g. "/about" — defaults to "/"
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
  jsonLd?: Record<string, unknown>;
}

function setMetaTag(attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/**
 * Dependency-free SEO hook. Pass just `{ path }` to use the title / description / schema
 * defined for that route in `seo-routes.ts`, or override any field.
 */
export function useSEO(options: SEOOptions) {
  const path = options.path ?? "/";
  const meta = routeMeta(path);
  const title = options.title ?? meta?.title ?? SITE_NAME;
  const description = options.description ?? meta?.description ?? "";
  const image = options.image ?? DEFAULT_OG_IMAGE;
  const type = options.type ?? meta?.type ?? "website";
  const noindex = options.noindex ?? meta?.noindex ?? false;
  const jsonLd = options.jsonLd ?? meta?.jsonLd;
  const jsonLdString = jsonLd ? JSON.stringify(jsonLd) : "";

  useEffect(() => {
    const url = `${SITE_URL}${path === "/" ? "/" : path}`;

    document.title = title;
    setMetaTag("name", "description", description);
    setMetaTag("name", "robots", noindex ? "noindex, follow" : "index, follow, max-image-preview:large");

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);

    setMetaTag("property", "og:site_name", SITE_NAME);
    setMetaTag("property", "og:type", type);
    setMetaTag("property", "og:url", url);
    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:image", image);

    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:url", url);
    setMetaTag("name", "twitter:title", title);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", image);

    document.getElementById("page-jsonld")?.remove();
    if (jsonLdString) {
      const script = document.createElement("script");
      script.id = "page-jsonld";
      script.type = "application/ld+json";
      script.textContent = jsonLdString;
      document.head.appendChild(script);
    }
  }, [title, description, path, image, type, noindex, jsonLdString]);
}
