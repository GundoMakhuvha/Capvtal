import { useState } from "react";
import { Plus } from "lucide-react";
import GlassCard from "@/components/GlassCard";

interface ServiceCardProps {
  title: string;
  desc: string;
  details: {
    types: string[];
    differentiators: string[];
  };
  /** Optional controlled state — falls back to its own state when omitted. */
  open?: boolean;
  onToggle?: () => void;
  index?: number;
}

const ServiceCard = ({ title, desc, details, open: openProp, onToggle, index }: ServiceCardProps) => {
  const [localOpen, setLocalOpen] = useState(false);
  const open = openProp ?? localOpen;
  const toggle = onToggle ?? (() => setLocalOpen((o) => !o));

  return (
    <GlassCard interactive={false} className="h-full">
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        className="flex w-full flex-col text-left focus-visible:outline-none"
      >
        <div className="flex w-full items-start justify-between gap-3">
          <div>
            {index !== undefined && (
              <span className="neon-text mb-3 block text-xs font-semibold tabular-nums tracking-wider">
                {String(index + 1).padStart(2, "0")}
              </span>
            )}
            <h3 className="text-xl font-semibold tracking-tight text-foreground">{title}</h3>
          </div>
          <span
            className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-foreground/[0.06] text-foreground/70 transition-transform duration-500 ease-spring ${
              open ? "rotate-45" : ""
            }`}
            aria-hidden="true"
          >
            <Plus className="h-4 w-4" />
          </span>
        </div>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{desc}</p>
      </button>

      <div
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-apple ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="mt-5 space-y-5 border-t border-foreground/[0.08] pt-5">
            {[
              { label: "What we offer", items: details.types },
              { label: "What sets us apart", items: details.differentiators },
            ].map((group) => (
              <div key={group.label}>
                <p className="mb-2.5 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">{group.label}</p>
                <ul className="space-y-2">
                  {group.items.map((t) => (
                    <li key={t} className="flex items-start gap-2.5 text-sm text-foreground/85">
                      <span className="neon-text mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-current" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default ServiceCard;
