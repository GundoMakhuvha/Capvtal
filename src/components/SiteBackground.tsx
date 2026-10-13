/**
 * SiteBackground — calm, modern backdrop shared by every page.
 *
 * Layers (back → front):
 *  1. Two soft colour glows drifting slowly at the top of the page
 *  2. A fine dot-matrix grid that fades out towards the bottom
 *  3. Subtle film grain so gradients never band
 *
 * Pure CSS (no canvas / no JS animation loop), so it is cheap on phones.
 */

export type BackgroundVariant = "brand" | "technology" | "production" | "records";

const palettes: Record<BackgroundVariant, [string, string]> = {
  brand: ["var(--brand-blue)", "var(--brand-purple)"],
  technology: ["var(--brand-blue)", "190 100% 50%"],
  production: ["var(--brand-purple)", "320 90% 60%"],
  records: ["var(--brand-red)", "25 100% 55%"],
};

const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

const SiteBackground = ({ variant = "brand" }: { variant?: BackgroundVariant }) => {
  const [a, b] = palettes[variant];

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* 1 — colour glows */}
      <div
        className="site-glow absolute left-1/2 top-[-38vh] h-[95vh] w-[150vw] max-w-[1800px]"
        style={{
          background: `
            radial-gradient(closest-side at 32% 55%, hsl(${a} / 0.30), transparent 72%),
            radial-gradient(closest-side at 70% 48%, hsl(${b} / 0.26), transparent 72%)
          `,
          filter: "blur(30px)",
          animation: "glow-drift 16s ease-in-out infinite",
          transition: "background 0.8s ease",
        }}
      />

      {/* 2 — dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(var(--dot) 1px, transparent 1.3px)",
          backgroundSize: "22px 22px",
          WebkitMaskImage: "radial-gradient(ellipse 85% 65% at 50% 0%, #000 25%, transparent 78%)",
          maskImage: "radial-gradient(ellipse 85% 65% at 50% 0%, #000 25%, transparent 78%)",
        }}
      />

      {/* 3 — grain */}
      <div
        className="absolute inset-0"
        style={{ backgroundImage: GRAIN, opacity: "var(--grain-opacity)" as unknown as number }}
      />

      <style>{`
        .light .site-glow { opacity: 0.55; }
      `}</style>
    </div>
  );
};

export default SiteBackground;
