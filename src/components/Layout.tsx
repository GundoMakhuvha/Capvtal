import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import logoWhite from "@/assets/hustle-white.png";
import logoBlack from "@/assets/hustle-black.png";
import LiquidNav from "./LiquidNav";
import SiteBackground, { type BackgroundVariant } from "./SiteBackground";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const variantFor = (path: string): BackgroundVariant => {
  if (path.startsWith("/technology")) return "technology";
  if (path.startsWith("/production")) return "production";
  if (path.startsWith("/records")) return "records";
  return "brand";
};

const footerCols = [
  {
    title: "Divisions",
    links: [
      { label: "Capvtal Technology", path: "/technology" },
      { label: "Capvtal Production", path: "/production" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Home", path: "/" },
      { label: "About Capvtal", path: "/about" },
      { label: "Blog", path: "/blogs" },
      { label: "Contact", path: "/contact" },
    ],
  },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  useScrollReveal(pathname);

  return (
    <div className="relative flex min-h-screen min-h-[100dvh] flex-col">
      <SiteBackground variant={variantFor(pathname)} />
      <LiquidNav />

      <main id="main" className="relative z-10 flex-1 pt-24 md:pt-28">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-24 border-t border-foreground/[0.06]">
        <div className="container mx-auto px-5 pb-safe pt-14 md:px-6">
          <div className="grid grid-cols-2 gap-10 md:grid-cols-12">
            <div className="col-span-2 md:col-span-5">
              <Link to="/" className="inline-flex items-center gap-3" aria-label="Capvtal Innovations — home">
                <img src={logoWhite} alt="" width={40} height={34} loading="lazy" className="hidden h-9 w-auto dark:block" />
                <img src={logoBlack} alt="" width={40} height={34} loading="lazy" className="block h-9 w-auto dark:hidden" />
                <span className="text-lg font-semibold tracking-tight text-foreground">Capvtal Innovations</span>
              </Link>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
                Next Generation Innovation. A South African technology and creative company building software,
                websites, brands and content that move businesses forward.
              </p>
            </div>

            {footerCols.map((col) => (
              <div key={col.title} className="md:col-span-2">
                <h2 className="mb-4 text-[12px] font-medium uppercase tracking-[0.16em] text-muted-foreground">{col.title}</h2>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((l) => (
                    <li key={l.path}>
                      <Link to={l.path} className="text-sm text-foreground/80 transition-colors hover:text-foreground">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="col-span-2 md:col-span-3">
              <h2 className="mb-4 text-[12px] font-medium uppercase tracking-[0.16em] text-muted-foreground">Start something</h2>
              <p className="mb-5 text-sm text-muted-foreground">Have an idea, a brand or a product in mind? Let's talk.</p>
              <Link to="/contact" className="btn-primary h-11 px-5 text-sm">
                Start a project <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>

          <div className="hairline mt-12" />
          <div className="flex flex-col items-start justify-between gap-2 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
            <p>© {new Date().getFullYear()} Capvtal Innovations. All rights reserved.</p>
            <p>Designed &amp; built in South Africa by Capvtal Technology.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
