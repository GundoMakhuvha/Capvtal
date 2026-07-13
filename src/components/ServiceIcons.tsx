import {
  Code2,
  Globe,
  BarChart3,
  Server,
  Palette,
  PenTool,
  Megaphone,
} from "lucide-react";

const services = [
  { name: "Software Dev", icon: Code2, color: "rgba(0,170,255,0.8)" },
  { name: "Web Development", icon: Globe, color: "rgba(0,170,255,0.8)" },
  { name: "Data Analysis", icon: BarChart3, color: "rgba(0,170,255,0.8)" },
  { name: "Hosting", icon: Server, color: "rgba(0,170,255,0.8)" },
  { name: "Logo Design", icon: Palette, color: "rgba(170,0,255,0.8)" },
  { name: "Content Creation", icon: PenTool, color: "rgba(170,0,255,0.8)" },
  { name: "Digital Marketing", icon: Megaphone, color: "rgba(170,0,255,0.8)" },
];

const ServiceIcons = () => {
  return (
    <section className="container mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-foreground mb-2">What We Do</h2>
      <p className="text-sm text-muted-foreground mb-10">Every service under one roof.</p>
      <div className="flex flex-wrap justify-center gap-3">
        {services.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={s.name}
              className="group flex flex-col items-center gap-2 p-3 rounded-xl glass hover:scale-105 transition-all duration-300 opacity-0 animate-fade-in cursor-pointer w-[80px]"
              style={{
                animationDelay: `${i * 0.04}s`,
                animationFillMode: "forwards",
                "--hover-color": s.color,
              } as React.CSSProperties}
              title={s.name}
            >
              <Icon className="h-6 w-6 transition-colors duration-300 text-muted-foreground group-hover:text-[var(--hover-color)]" />
              <span className="text-[10px] text-muted-foreground group-hover:text-[var(--hover-color)] text-center leading-tight transition-colors duration-300">
                {s.name}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ServiceIcons;