const companies = [
  "eDanndoo", "Student-Glam", "Yoan Group", "Mbusi Ndala", "Vercel",
  "Mens Legacy Foundation", "ThafelCap Group", "Hustle (By: Capvtal)", "Microsoft", "PayFast", "Cloudflare",
];

const MovingTicker = () => (
  <div className="ticker-mask overflow-hidden py-4">
    <ul className="ticker-track" aria-label="Companies we've worked with">
      {[...companies, ...companies].map((name, i) => (
        <li
          key={i}
          aria-hidden={i >= companies.length ? true : undefined}
          className="glass mx-2 flex h-14 min-w-[150px] items-center justify-center rounded-full px-7"
        >
          <span className="whitespace-nowrap text-[15px] font-medium text-foreground/70">{name}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default MovingTicker;
