import { ChevronDown } from "lucide-react";
import GlassCard from "@/components/GlassCard";

interface ServiceCardProps {
  title: string;
  desc: string;
  details: {
    types: string[];
    differentiators: string[];
  };
  open: boolean;
  onToggle: () => void;
}

const ServiceCard = ({ title, desc, details, open, onToggle }: ServiceCardProps) => {
  return (
    <GlassCard interactive={false} className="h-full cursor-pointer" onClick={onToggle}>
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground shrink-0 mt-1 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>
      <p className="text-sm text-muted-foreground">{desc}</p>

      <div
        className={`overflow-hidden transition-all duration-400 ${
          open ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-border/30 pt-4 space-y-3">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground/70 mb-2">What we offer</p>
            <ul className="space-y-1">
              {details.types.map((t) => (
                <li key={t} className="text-sm text-foreground/80 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-foreground/40" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground/70 mb-2">What sets us apart</p>
            <ul className="space-y-1">
              {details.differentiators.map((d) => (
                <li key={d} className="text-sm text-foreground/80 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-foreground/40" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default ServiceCard;