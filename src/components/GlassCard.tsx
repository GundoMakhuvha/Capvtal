import { useRef } from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  /** Subtle 3D tilt + spotlight on desktop. Ignored on touch screens. */
  interactive?: boolean;
  /** Accent colour for the hover border + spotlight, e.g. "rgba(0,170,255,0.3)" */
  neonColor?: string;
  hoverShadow?: string;
}

const canHover = () =>
  typeof window !== "undefined" && window.matchMedia?.("(hover: hover) and (pointer: fine)").matches;

const GlassCard = ({ children, className = "", onClick, interactive = true, neonColor, hoverShadow }: GlassCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  // Write CSS variables directly — no React re-render on every mouse move.
  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || !canHover()) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--gx", `${x * 100}%`);
    el.style.setProperty("--gy", `${y * 100}%`);
    if (interactive) {
      el.style.setProperty("--rx", `${(x - 0.5) * 6}deg`);
      el.style.setProperty("--ry", `${-(y - 0.5) * 6}deg`);
    }
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  const accent = neonColor ?? "var(--glass-highlight)";

  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`glass-card-3d group/card relative overflow-hidden ${onClick ? "cursor-pointer" : ""} ${className}`}
      style={
        {
          transform: interactive ? "perspective(900px) rotateX(var(--ry, 0deg)) rotateY(var(--rx, 0deg))" : undefined,
          "--card-accent": accent,
          "--card-shadow": hoverShadow ?? "none",
        } as React.CSSProperties
      }
    >
      {/* cursor spotlight */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
        style={{
          background: `radial-gradient(420px circle at var(--gx, 50%) var(--gy, 0%), ${
            neonColor ? neonColor.replace(/[\d.]+\)$/, "0.14)") : "rgba(255,255,255,0.06)"
          }, transparent 60%)`,
        }}
      />
      {/* accent rim on hover */}
      {neonColor && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
          style={{ boxShadow: `inset 0 0 0 1px ${neonColor}, ${hoverShadow ?? "none"}` }}
        />
      )}
      <div className="relative h-full">{children}</div>
    </div>
  );
};

export default GlassCard;
