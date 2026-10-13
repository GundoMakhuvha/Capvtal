import { LucideIcon } from "lucide-react";
import SectionHeader from "./SectionHeader";

export interface DivisionIconItem {
  name: string;
  icon: LucideIcon;
}

interface DivisionIconsProps {
  items: DivisionIconItem[];
  accentColor: string; // rgba/hsl
  title?: string;
  eyebrow?: string;
}

const DivisionIcons = ({ items, accentColor, title = "Everything you need.", eyebrow = "Services" }: DivisionIconsProps) => (
  <section>
    <SectionHeader eyebrow={eyebrow} title={title} />
    <ul className={`grid grid-cols-3 gap-3 sm:grid-cols-4 md:gap-4 ${items.length % 6 === 0 ? "lg:grid-cols-6" : "lg:grid-cols-8"}`}>
      {items.map((s, i) => {
        const Icon = s.icon;
        return (
          <li
            key={s.name}
            data-reveal
            data-reveal-delay={(i * 0.03).toFixed(2)}
            className="group glass relative flex aspect-square flex-col items-center justify-center gap-3 overflow-hidden rounded-[24px] p-3 transition-transform duration-500 ease-spring hover:-translate-y-1"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: `radial-gradient(circle at 50% 35%, ${accentColor.replace(/[\d.]+\)$/, "0.22)")} 0%, transparent 70%)` }}
            />
            <span
              className="relative grid h-12 w-12 place-items-center rounded-[16px] transition-transform duration-500 ease-spring group-hover:scale-110"
              style={{ background: accentColor.replace(/[\d.]+\)$/, "0.12)"), color: accentColor }}
            >
              <Icon className="h-6 w-6" strokeWidth={1.75} />
            </span>
            <span className="relative text-center text-[12px] font-medium leading-tight text-foreground/80 sm:text-[13px]">{s.name}</span>
          </li>
        );
      })}
    </ul>
  </section>
);

export default DivisionIcons;
