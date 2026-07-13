import { LucideIcon } from "lucide-react";

export interface DivisionIconItem {
  name: string;
  icon: LucideIcon;
}

interface DivisionIconsProps {
  items: DivisionIconItem[];
  accentColor: string; // rgba/hsl
  title?: string;
}

const DivisionIcons = ({ items, accentColor, title = "Services" }: DivisionIconsProps) => {
  return (
    <section className="mb-20">
      <h2 className="text-3xl font-bold text-foreground mb-8">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {items.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={s.name}
              className="group relative flex flex-col items-center gap-3 p-5 rounded-2xl glass overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 opacity-0 animate-fade-in"
              style={{
                animationDelay: `${i * 0.05}s`,
                animationFillMode: "forwards",
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${accentColor} 0%, transparent 70%)`,
                }}
              />
              <Icon
                className="h-9 w-9 text-muted-foreground transition-all duration-300 group-hover:animate-wiggle relative z-10"
                style={{ ["--accent" as never]: accentColor }}
                onMouseEnter={(e) => ((e.currentTarget as SVGSVGElement).style.color = accentColor)}
                onMouseLeave={(e) => ((e.currentTarget as SVGSVGElement).style.color = "")}
              />
              <span className="text-xs text-muted-foreground text-center leading-tight relative z-10 group-hover:text-foreground transition-colors">
                {s.name}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default DivisionIcons;