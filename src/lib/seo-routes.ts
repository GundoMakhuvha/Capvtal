/**
 * Single source of truth for SEO.
 * Used by the pages at runtime (via useSEO) AND by the build step in vite.config.ts,
 * which writes a real HTML file per route so Google sees the right title, description
 * and content without having to run JavaScript.
 *
 * Keep this file free of React / browser code.
 */
import { blogs } from "../data/blogs";

export const SITE_URL = "https://www.capvtal.com";
export const SITE_NAME = "Capvtal Innovations";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;
export const LOGO_URL = `${SITE_URL}/logo-512.png`;

/** Names people actually type into Google. */
export const ALTERNATE_NAMES = ["Capvtal", "Capital Innovations", "Capvtal Innovations South Africa"];

export interface RouteMeta {
  path: string;
  title: string;
  description: string;
  h1: string;
  /** Plain-text paragraphs placed in the prerendered HTML (what crawlers read first). */
  body: string[];
  noindex?: boolean;
  type?: "website" | "article";
  changefreq?: "weekly" | "monthly" | "yearly";
  priority?: number;
  lastmod?: string;
  jsonLd?: Record<string, unknown>;
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: ALTERNATE_NAMES,
  url: `${SITE_URL}/`,
  logo: LOGO_URL,
  image: DEFAULT_OG_IMAGE,
  slogan: "Next Generation Innovation.",
  description:
    "Capvtal Innovations is a South African multi-disciplinary technology and creative company offering software development, web development, data analytics, hosting, logo design, content creation and digital marketing.",
  foundingLocation: { "@type": "Place", name: "South Africa" },
  areaServed: [
    { "@type": "Country", name: "South Africa" },
    { "@type": "Place", name: "Worldwide" },
  ],
  founder: { "@type": "Person", name: "Gundo Makhuvha", jobTitle: "Founder & CEO" },
  department: [
    { "@type": "Organization", name: "Capvtal Technology", url: `${SITE_URL}/technology` },
    { "@type": "Organization", name: "Capvtal Production", url: `${SITE_URL}/production` },
  ],
  knowsAbout: [
    "Software development",
    "Web development",
    "Mobile app development",
    "Data analytics",
    "Power BI",
    "Web hosting",
    "Search engine optimisation",
    "Logo design",
    "Branding",
    "Content creation",
    "Digital marketing",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    url: `${SITE_URL}/contact`,
    areaServed: "ZA",
    availableLanguage: ["English"],
  },
  // Add your official profiles here once they exist — it strongly helps Google
  // recognise the brand (e.g. LinkedIn, Instagram, Facebook, X, GitHub).
  sameAs: [] as string[],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  alternateName: ALTERNATE_NAMES,
  url: `${SITE_URL}/`,
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-ZA",
};

const breadcrumb = (items: { name: string; path: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: `${SITE_URL}${it.path}`,
  })),
});

export const nameFaq = [
  {
    q: "Is it Capvtal or Capital Innovations?",
    a: 'It is Capvtal Innovations, spelled with a "V". People often search for "Capital Innovations" — you are in the right place. The V is intentional and gives the brand its own, protectable identity.',
  },
  {
    q: "What does Capvtal Innovations do?",
    a: "Capvtal Innovations is a South African technology and creative company. Capvtal Technology builds software, websites, mobile apps, data dashboards and hosting solutions. Capvtal Production handles logo design, branding, content creation and digital marketing.",
  },
  {
    q: "Who founded Capvtal Innovations?",
    a: "Capvtal Innovations was founded by Gundo Makhuvha, a South African software developer and entrepreneur who started trading under the Capvtal name in high school.",
  },
  {
    q: "Where is Capvtal Innovations based?",
    a: "Capvtal Innovations is based in South Africa and works with clients locally and internationally.",
  },
];

const today = new Date().toISOString().slice(0, 10);

export const staticRoutes: RouteMeta[] = [
  {
    path: "/",
    title: "Capvtal Innovations | Software, Web & Creative Agency in South Africa",
    description:
      "Capvtal Innovations is a South African tech and creative company — custom software, websites, data analytics, hosting, branding, content and digital marketing.",
    h1: "Capvtal Innovations.",
    body: [
      "Next Generation Innovation. Capvtal Innovations (often searched as Capital Innovations) is a South African multi-disciplinary company founded by Gundo Makhuvha.",
      "Capvtal Technology delivers software development, web development, data analysis and reporting, and domain, hosting and support. Capvtal Production delivers logo design, content creation and digital marketing.",
    ],
    changefreq: "weekly",
    priority: 1.0,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: `${SITE_URL}/`,
      name: "Capvtal Innovations",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
      primaryImageOfPage: DEFAULT_OG_IMAGE,
    },
  },
  {
    path: "/about",
    title: "About Capvtal Innovations | Founded by Gundo Makhuvha",
    description:
      "Meet Capvtal Innovations — a South African technology and creative company founded by Gundo Makhuvha. Our story, vision, mission and why Capvtal is spelled with a V.",
    h1: "Our Story",
    body: [
      "Capvtal Innovations was founded on a powerful belief that technology, creativity, business, and culture have the ability to converge and create extraordinary outcomes. Established in South Africa, we exist to shape the future, pioneer new ideas, and build solutions that leave a lasting impact.",
      'The name Capvtal is intentionally spelled with a "V" — a distinctive identity that sets us apart from the many companies called Capital Innovations.',
      "Founder & CEO: Mr. Gundo Makhuvha.",
    ],
    changefreq: "monthly",
    priority: 0.9,
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "AboutPage",
          name: "About Capvtal Innovations",
          url: `${SITE_URL}/about`,
          mainEntity: { "@id": `${SITE_URL}/#organization` },
        },
        {
          "@type": "Person",
          "@id": `${SITE_URL}/#founder`,
          name: "Gundo Makhuvha",
          jobTitle: "Founder & CEO",
          worksFor: { "@id": `${SITE_URL}/#organization` },
          image: `${SITE_URL}/founder.jpg`,
        },
        {
          "@type": "FAQPage",
          mainEntity: nameFaq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        },
        breadcrumb([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]),
      ],
    },
  },
  {
    path: "/technology",
    title: "Capvtal Technology | Software & Web Development in South Africa",
    description:
      "Capvtal Technology builds custom software, websites, mobile apps, Power BI dashboards and reliable hosting with SEO, professional email and 24/7 support.",
    h1: "Capvtal Technology",
    body: [
      "Building the future through innovative software solutions, data-driven insights, and reliable infrastructure.",
      "Services: Software Development, Web Development, Data Analysis & Reporting, Domain, Hosting & Support, SEO, professional email and data migration.",
    ],
    changefreq: "monthly",
    priority: 0.9,
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          name: "Capvtal Technology",
          serviceType: "Software and web development",
          provider: { "@id": `${SITE_URL}/#organization` },
          areaServed: "ZA",
          url: `${SITE_URL}/technology`,
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Technology services",
            itemListElement: [
              "Software Development",
              "Web Development",
              "Data Analysis & Reporting",
              "Domain, Hosting & Support",
            ].map((n) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: n } })),
          },
        },
        breadcrumb([
          { name: "Home", path: "/" },
          { name: "Technology", path: "/technology" },
        ]),
      ],
    },
  },
  {
    path: "/production",
    title: "Capvtal Production | Logo Design, Content & Digital Marketing",
    description:
      "Capvtal Production creates logos, brand identities, social content and data-driven digital marketing campaigns for South African and global brands.",
    h1: "Capvtal Production",
    body: [
      "Crafting compelling visual identities, content, and marketing strategies that elevate your brand.",
      "Services: Logo Design, Content Creation, Digital Marketing, branding, typography, social media, email marketing and SEO.",
    ],
    changefreq: "monthly",
    priority: 0.9,
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          name: "Capvtal Production",
          serviceType: "Branding, content creation and digital marketing",
          provider: { "@id": `${SITE_URL}/#organization` },
          areaServed: "ZA",
          url: `${SITE_URL}/production`,
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Production services",
            itemListElement: ["Logo Design", "Content Creation", "Digital Marketing"].map((n) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: n },
            })),
          },
        },
        breadcrumb([
          { name: "Home", path: "/" },
          { name: "Production", path: "/production" },
        ]),
      ],
    },
  },
  {
    path: "/contact",
    title: "Contact Capvtal Innovations | Start Your Project",
    description:
      "Get in touch with Capvtal Innovations for software, websites, hosting, branding or marketing. Tell us about your project and we'll get back to you shortly.",
    h1: "Let's build something.",
    body: ["Tell us about your project — software, web, data, branding, content or marketing — and we'll get back to you shortly."],
    changefreq: "yearly",
    priority: 0.7,
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ContactPage",
          name: "Contact Capvtal Innovations",
          url: `${SITE_URL}/contact`,
          about: { "@id": `${SITE_URL}/#organization` },
        },
        breadcrumb([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]),
      ],
    },
  },
  {
    path: "/blogs",
    title: "Blog & Insights | Capvtal Innovations",
    description:
      "Insights from Capvtal Innovations on software, AI, web development, data, branding, content and digital marketing.",
    h1: "Insights",
    body: blogs.filter((b) => !b.isAd).map((b) => `${b.title} — ${b.excerpt}`),
    changefreq: "weekly",
    priority: 0.6,
  },
  {
    path: "/records",
    title: "Capvtal Records | Capvtal Innovations",
    description: "Capvtal Records — music distribution, mastering and film production.",
    h1: "Capvtal Records",
    body: ["Elevating artists through professional distribution, production, and creative services."],
    noindex: true, // hidden division — not linked in the menu, keep it out of Google
  },
];

export const blogRoutes: RouteMeta[] = blogs.map((b) => ({
  path: `/blog/${b.id}`,
  title: `${b.title} | Capvtal Innovations`,
  description: b.excerpt.length > 158 ? `${b.excerpt.slice(0, 155).trimEnd()}…` : b.excerpt,
  h1: b.title,
  body: b.content.split("\n\n"),
  type: "article",
  changefreq: "yearly",
  priority: 0.5,
  lastmod: b.date,
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: b.title,
    description: b.excerpt,
    datePublished: b.date,
    dateModified: b.date,
    url: `${SITE_URL}/blog/${b.id}`,
    mainEntityOfPage: `${SITE_URL}/blog/${b.id}`,
    image: DEFAULT_OG_IMAGE,
    author: { "@type": "Organization", name: SITE_NAME, url: `${SITE_URL}/` },
    publisher: { "@id": `${SITE_URL}/#organization` },
  },
}));

export const allRoutes: RouteMeta[] = [...staticRoutes, ...blogRoutes].map((r) => ({
  lastmod: today,
  ...r,
}));

export const routeMeta = (path: string): RouteMeta | undefined => allRoutes.find((r) => r.path === path);
