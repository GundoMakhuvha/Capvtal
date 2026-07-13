const companies = [
  "eDanndoo", "Student-Glam", "Yoan Group", "Mbusi Ndala", "Vercel",
  "Mens Legacy Foundation", "ThafelCap Group", "Hustle (By: Capvtal)", "Microsoft", "PayFast","Cloudflare"
];

const MovingTicker = () => (
  <div className="overflow-hidden py-10">
    <div className="ticker-track">
      {[...companies, ...companies].map((name, i) => (
        <div
          key={i}
          className="glass rounded-xl px-8 py-4 mx-3 min-w-[160px] flex items-center justify-center"
        >
          <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">{name}</span>
        </div>
      ))}
    </div>
  </div>
);

export default MovingTicker;
