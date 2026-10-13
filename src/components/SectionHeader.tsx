interface SectionHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
}

const SectionHeader = ({ eyebrow, title, subtitle, align = "left", as = "h2", className = "" }: SectionHeaderProps) => {
  const Heading = as;
  const center = align === "center";
  return (
    <div data-reveal className={`mb-10 md:mb-14 ${center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <Heading className={`${as === "h1" ? "display-lg" : "display-md"} text-foreground`}>{title}</Heading>
      {subtitle && <p className="lead mt-4">{subtitle}</p>}
    </div>
  );
};

export default SectionHeader;
