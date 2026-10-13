import { useState } from "react";
import ServiceCard from "@/components/ServiceCard";
import ClientReviews from "@/components/ClientReviews";
import ToolLogo from "@/components/ToolLogo";
import DivisionIcons from "@/components/DivisionIcons";
import DivisionHero from "@/components/DivisionHero";
import SectionHeader from "@/components/SectionHeader";
import { useSEO } from "@/lib/seo";
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
  useSEO({ path: "/technology" });

  return (
    <div className="division-technology relative">
      <DivisionHero
        name="Technology"
        tagline="Building the future through innovative software solutions, data-driven insights, and reliable infrastructure."
        orbColors={["var(--brand-blue)", "190 100% 55%", "220 100% 65%", "170 90% 50%"]}
      />

      <div className="container relative z-10 mx-auto px-5 md:px-6">
        <section className="py-10 md:py-16" aria-label="Services">
          <SectionHeader eyebrow="Services" title="What we build." subtitle="Tap a card to see what each service includes." />
          <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 xl:grid-cols-4 md:gap-5">
            {services.map((s, i) => (
              <div key={s.title} data-reveal data-reveal-delay={(i * 0.06).toFixed(2)}>
                <ServiceCard
                  index={i}
                  title={s.title}
                  desc={s.desc}
                  details={s.details}
                  open={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 md:py-24" aria-label="Capabilities">
          <DivisionIcons
            eyebrow="Capabilities"
            title="Every capability, covered."
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

        <section className="py-10 md:py-16" aria-label="Technologies we use.">
          <SectionHeader eyebrow="Stack" title="Technologies we use." />
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 md:gap-4 lg:grid-cols-8">
            {technologies.map((tool, i) => (
              <div key={tool.name} data-reveal data-reveal-delay={(i * 0.02).toFixed(2)}>
                <ToolLogo name={tool.name} icon={tool.icon} />
              </div>
            ))}
          </div>
        </section>

        <ClientReviews reviews={reviews} />
      </div>
    </div>
  );
};

export default Technology;
