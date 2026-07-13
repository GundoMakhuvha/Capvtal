import { useState } from "react";
import ServiceCard from "@/components/ServiceCard";
import ClientReviews from "@/components/ClientReviews";
import ToolLogo from "@/components/ToolLogo";
import DivisionIcons from "@/components/DivisionIcons";
import InteractiveParticles from "@/components/InteractiveParticles";
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

  return (
    <div className="division-production relative">
      <InteractiveParticles color="rgba(170,0,255,0.8)" density={120} />
      <div className="container mx-auto px-6 py-16 relative z-10">
        <h1 className="text-5xl font-bold mb-4 opacity-0 animate-fade-in">
          <span className="text-foreground">Capvtal</span>{" "}
          <span className="neon-heading" style={{ color: "hsl(270, 100%, 65%)" }}>Production</span>
        </h1>
        <p className="text-muted-foreground mb-12 max-w-2xl opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          Crafting compelling visual identities, content, and marketing strategies that elevate your brand.
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

        <section className="mb-20">
          <h2 className="text-3xl font-bold text-foreground mb-8">Tools We Use</h2>
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {tools.map((tool) => (
              <ToolLogo key={tool.name} name={tool.name} icon={tool.icon} />
            ))}
          </div>
        </section>

        <ClientReviews reviews={reviews} />
      </div>
    </div>
  );
};

export default Production;