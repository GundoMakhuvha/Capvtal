import GlassCard from "./GlassCard";

interface Review {
  name: string;
  company: string;
  text: string;
}

const ClientReviews = ({ reviews }: { reviews: Review[] }) => (
  <section className="mt-20">
    <h2 className="text-3xl font-bold text-foreground mb-8">Client Reviews</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {reviews.map((review, i) => (
        <GlassCard key={i} interactive={false}>
          <p className="text-sm text-muted-foreground italic mb-4">"{review.text}"</p>
          <div>
            <p className="text-sm font-semibold text-foreground">{review.name}</p>
            <p className="text-xs text-muted-foreground">{review.company}</p>
          </div>
        </GlassCard>
      ))}
    </div>
  </section>
);

export default ClientReviews;
