import ServiceCard from "@/components/ServiceCard";
import ClientReviews from "@/components/ClientReviews";
import ToolLogo from "@/components/ToolLogo";
import DivisionIcons from "@/components/DivisionIcons";
import { Music2, Camera, Sliders, Film, Mic2, Headphones, Disc3, Radio, Video, Music, Volume2, Clapperboard } from "lucide-react";
import records1 from "@/assets/records-1.jpg";
import records2 from "@/assets/records-2.jpg";
import records3 from "@/assets/records-3.jpg";

const services = [
  {
    title: "Music Distribution",
    desc: "Get your music on 150+ platforms worldwide with strategic release planning.",
    details: {
      types: [
        "Spotify, Apple Music, Tidal & more",
        "Pre-save & pre-order campaigns",
        "Playlist pitching & curation",
        "Royalty collection & splits",
      ],
      differentiators: [
        "Same-day distribution to all major platforms",
        "Dedicated release strategist",
        "Keep 100% of your rights",
        "Transparent real-time analytics",
      ],
    },
  },
  {
    title: "Photography & Videography",
    desc: "Professional visual content that captures your artistic vision perfectly.",
    details: {
      types: [
        "Album & single artwork",
        "Artist portraits & press photos",
        "Behind-the-scenes content",
        "Event & concert coverage",
      ],
      differentiators: [
        "Cinematic quality on every shoot",
        "Full post-production & retouching",
        "Fast delivery with online galleries",
        "Creative direction included",
      ],
    },
  },
  {
    title: "Mastering & Engineering",
    desc: "Industry-standard audio mastering and sound engineering for radio-ready quality.",
    details: {
      types: [
        "Stereo & stem mastering",
        "Mixing & sound design",
        "Dolby Atmos spatial audio",
        "Podcast & voiceover production",
      ],
      differentiators: [
        "Grammy-experienced engineers",
        "State-of-the-art studio equipment",
        "Unlimited revisions per track",
        "Reference-matched to industry standards",
      ],
    },
  },
  {
    title: "Film & Editing",
    desc: "Cinematic music videos, documentaries, and creative film production.",
    details: {
      types: [
        "Music videos & lyric videos",
        "Short films & documentaries",
        "Promotional & ad content",
        "Live session recordings",
      ],
      differentiators: [
        "End-to-end production management",
        "4K+ cinema-grade equipment",
        "Colour grading & VFX included",
        "Story-driven creative concepts",
      ],
    },
  },
];

const tools = [
  { name: "Pro Tools", icon: "https://img.icons8.com/color/96/avid-pro-tools.png" },
  { name: "Logic Pro", icon: "https://img.icons8.com/color/96/logic-pro-x.png" },
  { name: "Ableton Live", icon: "https://img.icons8.com/color/96/ableton.png" },
  { name: "FL Studio", icon: "https://img.icons8.com/color/96/fl-studio.png" },
  { name: "Premiere Pro", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-original.svg" },
  { name: "After Effects", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg" },
  { name: "DaVinci Resolve", icon: "https://img.icons8.com/color/96/davinci-resolve.png" },
  { name: "Final Cut Pro", icon: "https://img.icons8.com/color/96/final-cut-pro-x.png" },
];

const reviews = [
  { name: "Sipho Dlamini", company: "Independent Artist", text: "Capvtal Records gave my music the platform it deserved. My streams increased 500% in the first month." },
  { name: "Zanele Khumalo", company: "Vibe Records", text: "The mastering quality is world-class. Every track sounds incredible. True professionals." },
  { name: "Jay Mthembu", company: "Film Director", text: "Their film production team brought my vision to life in ways I couldn't have imagined." },
];

const gallery = [
  { src: records1, alt: "Studio recording session" },
  { src: records2, alt: "Live concert performance" },
  { src: records3, alt: "Behind the scenes music video shoot" },
];

const Records = () => (
  <div className="division-records records-dark">
    <div className="container mx-auto px-6 py-16">
      <h1 className="text-5xl font-bold mb-4 opacity-0 animate-fade-in">
        <span style={{ color: "white" }}>Capvtal</span>{" "}
        <span className="neon-heading" style={{ color: "hsl(0, 100%, 55%)" }}>Records</span>
      </h1>
      <p className="text-muted-foreground mb-12 max-w-2xl opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
        Elevating artists through professional distribution, production, and creative services.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {services.map((s, i) => (
          <div key={s.title} className="opacity-0 animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
            <ServiceCard title={s.title} desc={s.desc} details={s.details} />
          </div>
        ))}
      </div>

      <section className="mb-20">
        <DivisionIcons
          accentColor="rgba(255,30,30,0.9)"
          items={[
            { name: "Music Distribution", icon: Music2 },
            { name: "Streaming", icon: Disc3 },
            { name: "Radio Promo", icon: Radio },
            { name: "Recording", icon: Mic2 },
            { name: "Mixing", icon: Sliders },
            { name: "Mastering", icon: Headphones },
            { name: "Sound Design", icon: Volume2 },
            { name: "Beat Production", icon: Music },
            { name: "Photography", icon: Camera },
            { name: "Videography", icon: Video },
            { name: "Music Videos", icon: Clapperboard },
            { name: "Film Editing", icon: Film },
          ]}
        />
      </section>

      <section className="mb-20">
        <h2 className="text-3xl font-bold text-foreground mb-8">Tools & Software</h2>
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {tools.map((tool) => (
            <ToolLogo key={tool.name} name={tool.name} icon={tool.icon} />
          ))}
        </div>
      </section>

      <section className="mb-20">
        <h2 className="text-3xl font-bold text-foreground mb-8">Gallery</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {gallery.map((img, i) => (
            <div key={i} className="glass rounded-2xl aspect-[4/3] overflow-hidden">
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      <ClientReviews reviews={reviews} />
    </div>
  </div>
);

export default Records;
