import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight, Code2, Clapperboard, Sparkles } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import BlogCard from "@/components/BlogCard";
import MovingTicker from "@/components/MovingTicker";
import CloudsBackground from "@/components/CloudsBackground";
import ServiceIcons from "@/components/ServiceIcons";
import SectionHeader from "@/components/SectionHeader";
import CapvtalAI from "@/components/CapvtalAI";
import { blogs } from "@/data/blogs";
import { useSEO } from "@/lib/seo";

const divisions = [
  {
    title: "Capvtal Technology",
    path: "/technology",
    description: "Cutting-edge software development, web solutions, data analytics, and reliable hosting infrastructure.",
    icon: Code2,
    hue: "var(--brand-blue)",
    neonColor: "rgba(0, 170, 255, 0.35)",
    hoverShadow: "0 30px 80px -30px rgba(0, 170, 255, 0.45)",
    span: "md:col-span-3",
  },
  {
    title: "Capvtal Production",
    path: "/production",
    description: "Creative brand design, content creation, digital marketing strategies, and professional presentations.",
    icon: Clapperboard,
    hue: "var(--brand-purple)",
    neonColor: "rgba(170, 0, 255, 0.35)",
    hoverShadow: "0 30px 80px -30px rgba(170, 0, 255, 0.45)",
    span: "md:col-span-3",
  },
  {
    title: "Capvtal Innovations",
    path: "/about",
    description: "The parent company driving innovation across all divisions with a unified vision for excellence.",
    icon: Sparkles,
    hue: "0 0% 100%",
    neonColor: "rgba(255, 255, 255, 0.22)",
    hoverShadow: "0 30px 80px -30px rgba(255, 255, 255, 0.18)",
    span: "md:col-span-6",
  },
];

const HEADLINE = ["Capvtal", "Innovations."];

/** Headline letters blur in one by one. The full text is always in the DOM (good for SEO). */
const AnimatedHeadline = () => {
  let n = 0;
  return (
    <h1 className="display-xl" aria-label="Capvtal Innovations.">
      {HEADLINE.map((word, wi) => (
        <span key={word} className="inline-block whitespace-nowrap" aria-hidden="true">
          {word.split("").map((ch, ci) => (
            <span key={ci} className="hero-letter text-gradient" style={{ animationDelay: `${0.15 + n++ * 0.045}s` }}>
              {ch}
            </span>
          ))}
          {wi < HEADLINE.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </h1>
  );
};

const Clock = () => {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="liquid-glass bottom-safe fixed left-5 z-40 hidden h-11 items-center gap-2 rounded-full px-4 sm:flex" aria-hidden="true">
      <span className="relative z-10 h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
      <span className="relative z-10 text-[13px] font-medium tabular-nums text-foreground/75">
        {time.toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
      </span>
    </div>
  );
};

const Index = () => {
  useSEO({ path: "/" });
  const hustleBlog = useMemo(() => blogs.find((b) => b.isAd), []);

  return (
    <div className="relative">
      {/* ── Hero ───────────────────────────────────────────── */}
      <section
        className="relative -mt-24 flex min-h-[100svh] items-center justify-center overflow-hidden pt-24 md:-mt-28 md:pt-28"
        aria-label="Introduction"
      >
        <CloudsBackground variant="brand" />

        <div className="container relative z-10 mx-auto px-5 text-center md:px-6">
          <p
            className="liquid-glass mx-auto mb-7 inline-flex h-8 items-center gap-2 rounded-full px-3.5 text-[12px] font-medium tracking-wide text-foreground/80 opacity-0 animate-fade-in"
          >
            <span className="relative z-10 h-1.5 w-1.5 rounded-full bg-[hsl(var(--brand-blue))] shadow-[0_0_10px_hsl(var(--brand-blue))]" />
            <span className="relative z-10">This is</span>
          </p>

          <AnimatedHeadline />

          <p className="lead mx-auto mt-6 max-w-xl opacity-0 animate-fade-in" style={{ animationDelay: "0.9s" }}>
            Next Generation Innovation.
          </p>

          <div
            className="mt-10 flex flex-col items-center justify-center gap-3 opacity-0 animate-fade-in sm:flex-row"
            style={{ animationDelay: "1.05s" }}
          >
            <Link to="/contact" className="btn-primary w-full max-w-[260px] sm:w-auto" aria-label="Contact Capvtal Innovations">
              Let's Chat. <ArrowRight size={18} />
            </Link>
            <Link
              to="/about"
              className="btn-glass liquid-glass w-full max-w-[260px] sm:w-auto"
              aria-label="Learn more about Capvtal Innovations"
            >
              <span className="relative z-10">It's Us.</span>
            </Link>
          </div>
        </div>

        {/* scroll cue */}
        <div
          className="absolute bottom-8 left-1/2 hidden h-10 w-6 -translate-x-1/2 justify-center rounded-full border border-foreground/20 pt-2 opacity-0 animate-fade-in md:flex"
          style={{ animationDelay: "1.6s" }}
          aria-hidden="true"
        >
          <span className="h-2 w-[3px] animate-bounce rounded-full bg-foreground/50" />
        </div>
      </section>

      <ServiceIcons />

      {/* ── Divisions (bento) ─────────────────────────────── */}
      <section className="container mx-auto px-5 py-10 md:px-6 md:py-16" aria-label="Our divisions">
        <SectionHeader eyebrow="Our divisions" title="Two studios. One vision." subtitle="Engineering and creativity, working side by side." />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-5">
          {divisions.map((div, i) => {
            const Icon = div.icon;
            return (
              <Link key={div.path} to={div.path} className={`block rounded-[28px] ${div.span}`} data-reveal data-reveal-delay={(i * 0.08).toFixed(2)}>
                <GlassCard className="h-full !p-7 md:!p-9" neonColor={div.neonColor} hoverShadow={div.hoverShadow}>
                  <div className={`flex h-full flex-col gap-8 ${div.span === "md:col-span-6" ? "md:flex-row md:items-end md:justify-between" : ""}`}>
                    <div>
                      <span
                        className="mb-6 grid h-12 w-12 place-items-center rounded-[16px]"
                        style={{ background: `hsl(${div.hue} / 0.12)`, color: `hsl(${div.hue})` }}
                      >
                        <Icon className="h-6 w-6" strokeWidth={1.75} />
                      </span>
                      <h3 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">{div.title}</h3>
                      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted-foreground">{div.description}</p>
                    </div>
                    <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-foreground md:mt-0">
                      Explore
                      <ArrowUpRight size={16} className="transition-transform duration-300 ease-spring group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5" />
                    </span>
                  </div>
                </GlassCard>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Latest insight ─────────────────────────────────── */}
      {hustleBlog && (
        <section className="container mx-auto px-5 py-20 md:px-6 md:py-28" aria-label="Latest insights">
          <SectionHeader eyebrow="Latest" title="Fresh from the lab." align="center" />
          <div className="mx-auto max-w-2xl" data-reveal>
            <BlogCard blog={hustleBlog} large />
          </div>
        </section>
      )}

      {/* ── Clients ───────────────────────────────────────── */}
      <section className="py-10" aria-label="Companies we've worked with">
        <div className="container mx-auto px-5 md:px-6">
          <SectionHeader eyebrow="Trusted by" title="Companies we've worked with." align="center" />
        </div>
        <div data-reveal>
          <MovingTicker />
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="container mx-auto px-5 pt-20 md:px-6 md:pt-28" aria-label="Start a project">
        <div data-reveal className="liquid-glass relative overflow-hidden rounded-[36px] px-6 py-16 text-center md:px-12 md:py-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-[120%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl"
            style={{ background: "radial-gradient(closest-side, hsl(var(--brand-blue) / 0.35), hsl(var(--brand-purple) / 0.2), transparent)" }}
          />
          <div className="relative z-10">
            <h2 className="display-md mx-auto max-w-2xl text-foreground">
              Have an idea? <span className="text-brand-gradient">Let's make it real.</span>
            </h2>
            <p className="lead mx-auto mt-4 max-w-lg">Software, websites, brands and campaigns — built properly, the first time.</p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/contact" className="btn-primary w-full max-w-[260px] sm:w-auto">
                Start a project <ArrowRight size={18} />
              </Link>
              <Link to="/technology" className="btn-pill w-full max-w-[260px] text-foreground/80 hover:text-foreground sm:w-auto">
                Explore services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Clock />
      <CapvtalAI />
    </div>
  );
};

export default Index;
