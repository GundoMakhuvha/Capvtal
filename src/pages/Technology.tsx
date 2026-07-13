import { useState } from "react";
import ServiceCard from "@/components/ServiceCard";
import ClientReviews from "@/components/ClientReviews";
import ToolLogo from "@/components/ToolLogo";
import DivisionIcons from "@/components/DivisionIcons";
import StarField from "@/components/StarField";
import { Code2, Globe, Smartphone, BarChart3, Database, Cloud, Cpu, Layers, Terminal, Mail, Search, RefreshCw } from "lucide-react";

const services = [
  {
    title: "Software Development",
    desc: "Custom applications built with modern frameworks and scalable architecture.",
    details: {
      types: [
        "Mobile apps (iOS & Android)",
        "Enterprise SaaS platforms",
        "API & backend development",
        "Desktop applications",
      ],
      differentiators: [
        "Agile delivery with 2-week sprints",
        "Clean, maintainable code architecture",
        "Full lifecycle from ideation to deployment",
        "Post-launch support & iteration",
      ],
    },
  },
  {
    title: "Web Development",
    desc: "Responsive, performant websites that deliver exceptional user experiences.",
    details: {
      types: [
        "Corporate & portfolio websites",
        "E-commerce platforms",
        "Progressive web apps (PWAs)",
        "Landing pages & microsites",
      ],
      differentiators: [
        "Performance-first approach (sub-2s load times)",
        "SEO-optimised from the ground up",
        "Accessible & responsive on all devices",
        "Modern frameworks: React, Next.js, TailwindCSS",
      ],
    },
  },
  {
    title: "Data Analysis & Reporting",
    desc: "Transform raw data into actionable insights with clear visual reports.",
    details: {
      types: [
        "Business intelligence dashboards",
        "Predictive analytics models",
        "Custom reporting pipelines",
        "Data visualisation & infographics",
      ],
      differentiators: [
        "Real-time data processing",
        "Interactive dashboards with drill-down",
        "Plain-language executive summaries",
        "Secure, compliant data handling",
      ],
    },
  },
  {
    title: "Domain, Hosting & Support",
    desc: "Reliable infrastructure management and 24/7 technical support.",
    details: {
      types: [
        "Domain registration & DNS management",
        "Cloud hosting (AWS, Azure, GCP)",
        "SSL certificates & security hardening",
        "Email hosting & configuration",
      ],
      differentiators: [
        "99.9% uptime guarantee",
        "24/7 monitoring & incident response",
        "Managed backups & disaster recovery",
        "Dedicated account manager",
      ],
    },
  },
];

const technologies = [
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "Microsoft", icon: "https://www.svgrepo.com/show/452062/microsoft.svg" },
  { name: "Supabase", icon: "https://thesvg.org/icons/supabase/default.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
  { name: "GitHub", icon: "https://www.svgrepo.com/show/452211/github.svg" },
  { name: "GraphQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
  { name: "TailwindCSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "PowerBI", icon: "https://thesvg.org/icons/azure-power-bi-embedded/default.svg" },
  { name: "Android Studio", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg" },
  { name: "NetBeans", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netbeans/netbeans-original.svg" },
];

const reviews = [
  { name: "Lolly Tembani", company: "ThaFelCap Group", text: "Capvtal provided exceptional service with professionalism and expertise, delivering a modern, efficient platform. Highly recommended." },
  { name: "Angela Ravele", company: "Yoan Group", text: "Capvtal Technology built our complex mobile app with exceptional quality and professionalism. The final product exceeded our expectations." },
  { name: "Wandile Dlodlo", company: "MLF NPO", text: "Thanks to Capvtal, we have our offical website up with browers SEO's, and we have professional work email's. Highly recommended." },
];

const Technology = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="division-technology relative">
      <StarField color="rgba(0,170,255,0.8)" density={150} />
      <div className="container mx-auto px-6 py-16 relative z-10">
        <h1 className="text-5xl font-bold mb-4 opacity-0 animate-fade-in">
          <span className="text-foreground">Capvtal</span>{" "}
          <span className="neon-heading" style={{ color: "hsl(200, 100%, 50%)" }}>Technology</span>
        </h1>
        <p className="text-muted-foreground mb-12 max-w-2xl opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          Building the future through innovative software solutions, data-driven insights, and reliable infrastructure.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {services.map((s, i) => (
            <div key={s.title} className="opacity-0 animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
              <ServiceCard
                title={s.title}
                desc={s.desc}
                details={s.details}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </div>
          ))}
        </div>

        <section className="mb-20">
          <DivisionIcons
            accentColor="rgba(0,170,255,0.9)"
            items={[
              { name: "Software Dev", icon: Code2 },
              { name: "Web Apps", icon: Globe },
              { name: "Mobile Apps", icon: Smartphone },
              { name: "Data Analytics", icon: BarChart3 },
              { name: "Databases", icon: Database },
              { name: "Cloud Hosting", icon: Cloud },
              { name: "AI / ML", icon: Cpu },
              { name: "APIs", icon: Layers },
              { name: "Automation", icon: Terminal },
              { name: "Professional Emails", icon: Mail },
              { name: "SEO", icon: Search },
              { name: "Data Migration", icon: RefreshCw },
            ]}
          />
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-bold text-foreground mb-8">Technologies We Use</h2>
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {technologies.map((tech) => (
              <ToolLogo key={tech.name} name={tech.name} icon={tech.icon} />
            ))}
          </div>
        </section>

        <ClientReviews reviews={reviews} />
      </div>
    </div>
  );
};

export default Technology;