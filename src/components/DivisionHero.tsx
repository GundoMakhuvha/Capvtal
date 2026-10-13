import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import CloudsBackground, { type CloudsVariant } from "./CloudsBackground";

interface DivisionHeroProps {
  name: string;
  tagline: string;
  /** @deprecated kept for compatibility — clouds are tinted per division automatically */
  orbColors?: string[];
  cta?: string;
}

/** Shared header for division pages — centred title over a tinted halo. */
const DivisionHero = ({ name, tagline, orbColors, cta = "Start a project" }: DivisionHeroProps) => (
  <section className="relative -mt-24 flex min-h-[78svh] items-center justify-center overflow-hidden pt-24 md:-mt-28 md:min-h-[86svh] md:pt-28">
    <CloudsBackground variant={name.toLowerCase() as CloudsVariant} />
    <div className="relative z-10 mx-auto max-w-3xl px-5 text-center">
      <p className="eyebrow mb-5 justify-center opacity-0 animate-fade-in">
        <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--neon))] shadow-[0_0_10px_hsl(var(--neon))]" />
        A Capvtal division
      </p>
      <h1 className="display-lg opacity-0 animate-fade-in" style={{ animationDelay: "0.08s" }}>
        <span className="text-gradient">Capvtal</span> <span className="neon-heading">{name}</span>
      </h1>
      <p className="lead mx-auto mt-5 max-w-xl opacity-0 animate-fade-in" style={{ animationDelay: "0.18s" }}>
        {tagline}
      </p>
      <div className="mt-9 opacity-0 animate-fade-in" style={{ animationDelay: "0.3s" }}>
        <Link to="/contact" className="btn-primary">
          {cta} <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  </section>
);

export default DivisionHero;
