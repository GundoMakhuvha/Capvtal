import { Link } from "react-router-dom";
import { Code2, Globe, BarChart3, Server, Palette, PenTool, Megaphone } from "lucide-react";
import SectionHeader from "./SectionHeader";

const BLUE = "var(--brand-blue)";
const PURPLE = "var(--brand-purple)";

const services = [
  { name: "Software Dev", icon: Code2, hue: BLUE, to: "/technology" },
  { name: "Web Development", icon: Globe, hue: BLUE, to: "/technology" },
  { name: "Data Analysis", icon: BarChart3, hue: BLUE, to: "/technology" },
  { name: "Hosting", icon: Server, hue: BLUE, to: "/technology" },
  { name: "Logo Design", icon: Palette, hue: PURPLE, to: "/production" },
  { name: "Content Creation", icon: PenTool, hue: PURPLE, to: "/production" },
  { name: "Digital Marketing", icon: Megaphone, hue: PURPLE, to: "/production" },
];

const ServiceIcons = () => (
  <section className="container mx-auto px-5 py-20 md:px-6 md:py-28" aria-label="What we do">
    <SectionHeader eyebrow="What we do" title="Every service, under one roof." subtitle="From the first line of code to the last frame of your campaign." />
    <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:gap-4 lg:grid-cols-7">
      {services.map((s, i) => {
        const Icon = s.icon;
        return (
          <li key={s.name} data-reveal data-reveal-delay={(i * 0.04).toFixed(2)}>
            <Link
              to={s.to}
              className="group glass flex aspect-square flex-col items-center justify-center gap-3 rounded-[24px] p-3 transition-transform duration-500 ease-spring hover:-translate-y-1 active:scale-95"
            >
              <span
                className="grid h-12 w-12 place-items-center rounded-[16px] transition-transform duration-500 ease-spring group-hover:scale-110"
                style={{ background: `hsl(${s.hue} / 0.12)`, color: `hsl(${s.hue})` }}
              >
                <Icon className="h-6 w-6" strokeWidth={1.75} />
              </span>
              <span className="text-center text-[12px] font-medium leading-tight text-foreground/80 sm:text-[13px]">{s.name}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  </section>
);

export default ServiceIcons;
