import { Link } from "react-router-dom";
import { ArrowRight, Eye, Plus, Target } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import SectionHeader from "@/components/SectionHeader";
import founderImage from "@/assets/gundo-makhuvha-founder.jpg";
import { useSEO } from "@/lib/seo";
import { nameFaq } from "@/lib/seo-routes";

const story = [
  "Capvtal Innovations was founded on a powerful belief that technology, creativity, business, and culture have the ability to converge and create extraordinary outcomes. Established in South Africa, our vision has always extended beyond simply keeping pace with change. We exist to shape the future, pioneer new ideas, and build solutions that leave a lasting impact.",
  "From software solutions and digital transformation to putting your start up on the map, every division within Capvtal is driven by an uncompromising commitment to excellence, innovation, and world class execution. We believe that technology should empower, creativity should inspire, and culture should connect people in meaningful ways.",
  "At our core, Capvtal Innovations is more than a company. It is a movement built on ambition, ingenuity, and the relentless pursuit of greatness. We are committed to creating solutions, experiences, and opportunities that not only solve today's challenges but also define tomorrow's possibilities. Our mission is simple yet bold: to build a legacy of innovation that transcends industries, inspires communities, and demonstrates that African excellence can compete and lead on the global stage.",
];

const About = () => {
  useSEO({ path: "/about" });

  return (
    <div className="container mx-auto px-5 py-12 md:px-6 md:py-20">
      {/* ── Story ─────────────────────────────────────────── */}
      <section className="mb-24 grid gap-10 md:mb-32 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="eyebrow mb-4 opacity-0 animate-fade-in">About Capvtal</p>
          <h1 className="display-lg text-gradient opacity-0 animate-fade-in" style={{ animationDelay: "0.08s" }}>
            Our Story
          </h1>
        </div>
        <div className="space-y-6 md:col-span-7 md:pt-10">
          <p className="text-xl font-medium leading-relaxed tracking-tight text-foreground md:text-2xl" data-reveal>
            The name <strong className="text-brand-gradient">Capvtal</strong> is intentionally spelled with a “V” — a
            distinctive identity created to establish a unique brand presence and protect the originality of our vision.
            More than just a name, Capvtal represents ownership, innovation, and the pursuit of building something truly
            timeless.
          </p>
          {story.map((p, i) => (
            <p key={i} className="text-[17px] leading-relaxed text-muted-foreground" data-reveal>
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* ── Vision & Mission ──────────────────────────────── */}
      <section className="mb-24 grid grid-cols-1 gap-4 md:mb-32 md:grid-cols-2 md:gap-5" aria-label="Vision and mission">
        {[
          {
            icon: Eye,
            title: "Vision",
            text: "To become Africa's leading multi-disciplinary innovation company, setting global standards in technology, creative production, and artificial intelligence.",
            hue: "var(--brand-blue)",
          },
          {
            icon: Target,
            title: "Mission",
            text: "To deliver world-class solutions across technology and production, empowering businesses and entrepreneurs to reach their full potential through innovation and excellence.",
            hue: "var(--brand-purple)",
          },
        ].map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={card.title} data-reveal data-reveal-delay={(i * 0.08).toFixed(2)}>
              <GlassCard interactive={false} className="h-full !p-8 md:!p-10">
                <span
                  className="mb-8 grid h-12 w-12 place-items-center rounded-[16px]"
                  style={{ background: `hsl(${card.hue} / 0.12)`, color: `hsl(${card.hue})` }}
                >
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <h2 className="mb-3 text-3xl font-semibold tracking-tight text-foreground">{card.title}</h2>
                <p className="text-[17px] leading-relaxed text-muted-foreground">{card.text}</p>
              </GlassCard>
            </div>
          );
        })}
      </section>

      {/* ── Founder ──────────────────────────────────────── */}
      <section className="mb-24 md:mb-32" aria-label="Leadership">
        <SectionHeader eyebrow="Leadership" title="Meet the founder." />
        <div className="grid items-stretch gap-5 md:grid-cols-12">
          <div data-reveal className="md:col-span-4">
            <div className="glass relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[28px] md:max-w-none">
              <img
                src={founderImage}
                alt="Gundo Makhuvha, Founder and CEO of Capvtal Innovations"
                width={800}
                height={800}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-3 bottom-3 rounded-[20px] liquid-glass px-4 py-3">
                <p className="relative z-10 text-sm font-semibold text-foreground">Mr. Gundo Makhuvha</p>
                <p className="relative z-10 text-xs text-muted-foreground">Founder &amp; CEO</p>
              </div>
            </div>
          </div>
          <div data-reveal data-reveal-delay="0.08" className="md:col-span-8">
            <GlassCard interactive={false} className="h-full !p-8 md:!p-10">
              <h3 className="text-2xl font-semibold tracking-tight text-foreground">Mr. Gundo Makhuvha</h3>
              <span className="mb-6 mt-1 block text-sm text-muted-foreground">Founder &amp; CEO</span>
              <div className="space-y-5 text-[16px] leading-relaxed text-muted-foreground">
                <p>
                  Gundo Makhuvha is a visionary entrepreneur and technologist who founded Capvtal Innovations with the
                  ambition of connecting technology, creativity, and business. His entrepreneurial journey began in high
                  school, where he started trading under the name Capvtal, driven by a passion for creating value and
                  exploring new opportunities. Even at a young age, he believed that Capvtal represented more than just a
                  name and envisioned it as the foundation of something much greater in the future.
                </p>
                <p>
                  With a strong background in software development and a deep appreciation for the arts, Gundo has
                  transformed that early vision into Capvtal Innovations, a dynamic company that delivers innovative
                  solutions to clients across a variety of industries. By combining technical expertise with creativity and
                  strategic thinking, he has built a brand focused on solving problems and helping businesses embrace
                  digital transformation. His leadership philosophy is rooted in empowering people, fostering innovation,
                  and delivering meaningful, measurable results that create lasting impact.
                </p>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* ── FAQ (also feeds Google's FAQ rich result) ─────── */}
      <section aria-label="Frequently asked questions">
        <SectionHeader eyebrow="FAQ" title="Good to know." />
        <div className="mx-auto max-w-3xl space-y-3">
          {nameFaq.map((f, i) => (
            <details
              key={f.q}
              data-reveal
              data-reveal-delay={(i * 0.05).toFixed(2)}
              className="group glass rounded-[22px] px-6 py-1 [&_summary::-webkit-details-marker]:hidden"
              open={i === 0}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[17px] font-medium text-foreground">
                {f.q}
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-foreground/[0.06] transition-transform duration-500 ease-spring group-open:rotate-45">
                  <Plus className="h-4 w-4" />
                </span>
              </summary>
              <p className="pb-5 text-[15px] leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>

        <div className="mt-14 text-center" data-reveal>
          <Link to="/contact" className="btn-primary">
            Work with us <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
