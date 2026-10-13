import { useState } from "react";
import ServiceCard from "@/components/ServiceCard";
import ClientReviews from "@/components/ClientReviews";
import ToolLogo from "@/components/ToolLogo";
import DivisionIcons from "@/components/DivisionIcons";
import DivisionHero from "@/components/DivisionHero";
import SectionHeader from "@/components/SectionHeader";
import { useSEO } from "@/lib/seo";
import { Palette, PenTool, Megaphone, Presentation, Image, Video, Mail, Search, Share2, Sparkles, Type, Layout } from "lucide-react";

const services = [
  {
    title: "Logo Design",
    desc: "Distinctive brand marks that capture your identity and leave lasting impressions.",
    details: {
      types: [
        "Wordmarks & lettermarks",
        "Icon & symbol logos",
        "Brand identity systems",
        "Logo animation & motion marks",
      ],
      differentiators: [
        "Research-driven creative process",
        "Unlimited revisions until perfect",
        "Full brand guideline documents",
        "Vector files for all formats",
      ],
    },
  },
  {
    title: "Content Creation",
    desc: "Engaging visual and written content tailored for your audience and platforms.",
    details: {
      types: [
        "Social media graphics & reels",
        "Blog & copywriting",
        "Photography & product shoots",
        "Video content & motion graphics",
      ],
      differentiators: [
        "Platform-specific optimisation",
        "Consistent brand voice across channels",
        "Content calendars & strategy",
        "Fast turnaround with quality guarantee",
      ],
    },
  },
  {
    title: "Digital Marketing",
    desc: "Strategic campaigns that drive growth, engagement, and measurable ROI.",
    details: {
      types: [
        "Social media management",
        "Paid ads (Google, Meta, TikTok)",
        "Email marketing & automation",
        "SEO & organic growth strategies",
      ],
      differentiators: [
        "Data-driven campaign optimisation",
        "Transparent reporting & analytics",
        "A/B testing on every campaign",
        "Dedicated strategist per client",
      ],
    },
  },
];

const tools = [
  { name: "Photoshop", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg" },
  { name: "Illustrator", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg" },
  { name: "Canva", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg" },
  { name: "After Effects", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg" },
  { name: "Premiere Pro", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-original.svg" },
  { name: "Google Analytics", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" },
  { name: "Google Search Console", icon: "https://thesvg.org/icons/google-search-console/default.svg" },
  { name: "Meta Ads Manager", icon: "https://thesvg.org/icons/meta/default.svg" },
  { name: "CapCut", icon: "https://thesvg.org/icons/capcut/mono.svg" },
  { name: "ClipChamp", icon: "https://thesvg.org/icons/microsoft-clipchamp/default.svg" },
];

const reviews = [
  { name: "Fezeka Patricia", company: "Fezline Pty Ltd", text: "Gundo's company Capvtal is so creative, time effecient, and easy to work with. Our new logo perfectly represents our brand." },
  { name: "Relebogile Lekalakala", company: "anonymous", text: "Capvtal designed clean, professional module banners that gave our LMS a polished and engaging look. They amazing" },
  { name: "Thakhani Ruben", company: "TC Group", text: "Capvtal productions gave us a polished, professional company profile that exceeded our expectations and made our IDC submission stand out." },
];

const Production = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  useSEO({ path: "/production" });

  return (
    <div className="division-production relative">
      <DivisionHero
        name="Production"
        tagline="Crafting compelling visual identities, content, and marketing strategies that elevate your brand."
        orbColors={["var(--brand-purple)", "320 90% 62%", "290 90% 60%", "250 90% 66%"]}
      />

      <div className="container relative z-10 mx-auto px-5 md:px-6">
        <section className="py-10 md:py-16" aria-label="Services">
          <SectionHeader eyebrow="Services" title="What we create." subtitle="Tap a card to see what each service includes." />
          <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-3 md:gap-5">
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
            title="Every creative need, covered."
            accentColor="rgba(170,0,255,0.9)"
            items={[
              { name: "Logo Design", icon: Palette },
              { name: "Branding", icon: Sparkles },
              { name: "Typography", icon: Type },
              { name: "Content Writing", icon: PenTool },
              { name: "Social Media", icon: Share2 },
              { name: "Digital Ads", icon: Megaphone },
              { name: "Email Marketing", icon: Mail },
              { name: "SEO", icon: Search },
            ]}
          />
        </section>

        <section className="py-10 md:py-16" aria-label="Tools we use.">
          <SectionHeader eyebrow="Stack" title="Tools we use." />
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 md:gap-4 lg:grid-cols-8">
            {tools.map((tool, i) => (
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

export default Production;
