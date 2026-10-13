import { Quote } from "lucide-react";
import GlassCard from "./GlassCard";
import SectionHeader from "./SectionHeader";

interface Review {
  name: string;
  company: string;
  text: string;
}

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const ClientReviews = ({ reviews }: { reviews: Review[] }) => (
  <section className="mt-24" aria-label="Client reviews">
    <SectionHeader eyebrow="Testimonials" title="Loved by the people we build for." />
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
      {reviews.map((review, i) => (
        <div key={i} data-reveal data-reveal-delay={(i * 0.08).toFixed(2)}>
          <GlassCard interactive={false} className="flex h-full flex-col">
            <figure className="flex h-full flex-col">
              <Quote className="neon-text mb-4 h-6 w-6 opacity-70" aria-hidden="true" />
              <blockquote className="flex-1 text-[15px] leading-relaxed text-foreground/85">“{review.text}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-foreground/[0.07] text-xs font-semibold text-foreground/80">
                  {initials(review.name)}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-foreground">{review.name}</span>
                  <span className="block text-xs text-muted-foreground">{review.company}</span>
                </span>
              </figcaption>
            </figure>
          </GlassCard>
        </div>
      ))}
    </div>
  </section>
);

export default ClientReviews;
