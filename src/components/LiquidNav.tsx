import { Link, useLocation } from "react-router-dom";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Sun, Moon, ChevronRight } from "lucide-react";
import logoWhite from "@/assets/hustle-white.png";
import logoBlack from "@/assets/hustle-black.png";
import { useTheme } from "@/hooks/use-theme";

export const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Technology", path: "/technology", hue: "var(--brand-blue)" },
  { label: "Production", path: "/production", hue: "var(--brand-purple)" },
  { label: "Contact", path: "/contact" },
];

const companyLinks = navLinks.filter((l) => !l.hue);
const divisionLinks = navLinks.filter((l) => l.hue);

/* Track the pointer so the glass highlight follows it */
const trackPointer = (e: React.PointerEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
};

const ThemeButton = ({ isDark, toggle }: { isDark: boolean; toggle: () => void }) => (
  <button
    onClick={toggle}
    aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    className="relative grid h-10 w-10 place-items-center rounded-full text-foreground/80 transition-all duration-300 ease-spring hover:bg-[var(--lg-pill)] hover:text-foreground active:scale-90"
  >
    <Sun
      size={18}
      className={`absolute transition-all duration-500 ease-spring ${isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0"}`}
    />
    <Moon
      size={18}
      className={`absolute transition-all duration-500 ease-spring ${isDark ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100"}`}
    />
  </button>
);

const LiquidNav = () => {
  const { pathname } = useLocation();
  const { isDark, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [pill, setPill] = useState<{ left: number; width: number; visible: boolean }>({ left: 0, width: 0, visible: false });
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const activePath = navLinks.find((l) => l.path === pathname)?.path ?? null;
  const target = hovered ?? activePath;

  /* Sliding "liquid" pill behind the active / hovered link */
  const measure = useCallback(() => {
    const el = target ? linkRefs.current[target] : null;
    if (!el) {
      setPill((p) => ({ ...p, visible: false }));
      return;
    }
    setPill({ left: el.offsetLeft, width: el.offsetWidth, visible: true });
  }, [target]);

  useLayoutEffect(measure, [measure]);

  useEffect(() => {
    window.addEventListener("resize", measure);
    // fonts can shift widths after load
    document.fonts?.ready.then(measure).catch(() => undefined);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close the mobile sheet on navigation / Escape, and lock page scroll while open */
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const activeHue = navLinks.find((l) => l.path === target)?.hue;

  return (
    <>
      <header
        className="pointer-events-none fixed inset-x-0 z-50 flex justify-center px-3 transition-[top] duration-500 ease-apple"
        style={{ top: "max(0.75rem, env(safe-area-inset-top))" }}
      >
        <nav
          aria-label="Main"
          onPointerMove={trackPointer}
          className={`liquid-glass pointer-events-auto flex w-full max-w-[560px] items-center justify-between gap-1 rounded-full p-1.5 transition-all duration-500 ease-apple md:w-auto md:max-w-none md:justify-start ${
            scrolled || open ? "liquid-glass-strong" : ""
          }`}
        >
          {/* Logo */}
          <Link
            to="/"
            aria-label="Capvtal Innovations — home"
            className="flex h-10 items-center gap-2 rounded-full pl-2 pr-3 transition-transform duration-300 ease-spring active:scale-95 md:pr-2"
          >
            <img src={logoWhite} alt="" width={28} height={24} className="hidden h-6 w-auto dark:block" />
            <img src={logoBlack} alt="" width={28} height={24} className="block h-6 w-auto dark:hidden" />
            <span className="text-[15px] font-semibold tracking-tight text-foreground md:hidden">Capvtal</span>
          </Link>

          <span className="mx-1 hidden h-5 w-px bg-foreground/10 md:block" aria-hidden="true" />

          {/* Desktop links */}
          <div className="relative hidden items-center md:flex" onMouseLeave={() => setHovered(null)}>
            <span
              aria-hidden="true"
              className="absolute top-0 h-10 rounded-full transition-[left,width,opacity,background-color] duration-500 ease-spring"
              style={{
                left: pill.left,
                width: pill.width,
                opacity: pill.visible ? 1 : 0,
                background: activeHue ? `hsl(${activeHue} / 0.16)` : "var(--lg-pill)",
                boxShadow: "inset 0 1px 0 var(--lg-inner), inset 0 0 0 0.5px var(--lg-edge)",
              }}
            />
            {navLinks.map((item) => {
              const active = item.path === activePath;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  ref={(el) => (linkRefs.current[item.path] = el)}
                  onMouseEnter={() => setHovered(item.path)}
                  onFocus={() => setHovered(item.path)}
                  onBlur={() => setHovered(null)}
                  aria-current={active ? "page" : undefined}
                  className={`relative z-10 flex h-10 items-center gap-1.5 rounded-full px-4 text-[14px] font-medium transition-colors duration-300 ${
                    active ? "text-foreground" : "text-foreground/60 hover:text-foreground"
                  }`}
                >
                  {item.hue && (
                    <span
                      className="h-1.5 w-1.5 rounded-full transition-transform duration-300"
                      style={{ background: `hsl(${item.hue})`, boxShadow: `0 0 8px hsl(${item.hue})` }}
                      aria-hidden="true"
                    />
                  )}
                  {item.label}
                </Link>
              );
            })}
          </div>

          <span className="mx-1 hidden h-5 w-px bg-foreground/10 md:block" aria-hidden="true" />

          <div className="flex items-center gap-0.5">
            <ThemeButton isDark={isDark} toggle={toggle} />

            {/* Mobile menu button — morphing burger */}
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="relative grid h-10 w-10 place-items-center rounded-full text-foreground transition-all duration-300 ease-spring hover:bg-[var(--lg-pill)] active:scale-90 md:hidden"
            >
              <span
                className={`absolute h-[1.5px] w-[18px] rounded-full bg-current transition-transform duration-500 ease-spring ${
                  open ? "rotate-45" : "-translate-y-[4px]"
                }`}
              />
              <span
                className={`absolute h-[1.5px] w-[18px] rounded-full bg-current transition-transform duration-500 ease-spring ${
                  open ? "-rotate-45" : "translate-y-[4px]"
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile sheet */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] md:hidden"
            style={{ animation: "fade-in-plain 0.3s ease both" }}
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            id="mobile-menu"
            onPointerMove={trackPointer}
            className="liquid-glass liquid-glass-strong animate-sheet-in fixed inset-x-3 z-50 mx-auto max-w-[560px] origin-top rounded-[30px] p-2 md:hidden"
            style={{ top: "calc(max(0.75rem, env(safe-area-inset-top)) + 64px)" }}
          >
            <nav aria-label="Mobile" className="relative z-10 flex flex-col">
              {companyLinks.map((item, i) => (
                <MobileRow key={item.path} item={item} active={item.path === pathname} delay={i * 0.03} />
              ))}
              <div className="mx-4 my-2 h-px bg-foreground/10" />
              <span className="px-4 pb-1 pt-1 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Divisions
              </span>
              {divisionLinks.map((item, i) => (
                <MobileRow key={item.path} item={item} active={item.path === pathname} delay={0.1 + i * 0.03} />
              ))}
            </nav>
          </div>
          <style>{`@keyframes fade-in-plain { from { opacity: 0 } to { opacity: 1 } }`}</style>
        </>
      )}
    </>
  );
};

const MobileRow = ({
  item,
  active,
  delay,
}: {
  item: (typeof navLinks)[number];
  active: boolean;
  delay: number;
}) => (
  <Link
    to={item.path}
    aria-current={active ? "page" : undefined}
    className={`animate-pop-in flex h-14 items-center justify-between rounded-[20px] px-4 text-[17px] font-medium transition-colors duration-200 active:bg-[var(--lg-pill)] ${
      active ? "bg-[var(--lg-pill)] text-foreground" : "text-foreground/85"
    }`}
    style={{ animationDelay: `${delay}s` }}
  >
    <span className="flex items-center gap-3">
      {item.hue && (
        <span
          className="h-2 w-2 rounded-full"
          style={{ background: `hsl(${item.hue})`, boxShadow: `0 0 10px hsl(${item.hue})` }}
          aria-hidden="true"
        />
      )}
      {item.hue ? `Capvtal ${item.label}` : item.label}
    </span>
    <ChevronRight size={18} className="text-muted-foreground" />
  </Link>
);

export default LiquidNav;
