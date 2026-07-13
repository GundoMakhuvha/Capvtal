import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import GlassCard from "@/components/GlassCard";
import BlogCard from "@/components/BlogCard";
import MovingTicker from "@/components/MovingTicker";
import StarsBackground from "@/components/StarsBackground";
import ServiceIcons from "@/components/ServiceIcons";
import CapvtalAI from "@/components/CapvtalAI";
import { blogs } from "@/data/blogs";

const divisions = [
  {
    title: "Capvtal Technology",
    path: "/technology",
    description: "Cutting-edge software development, web solutions, data analytics, and reliable hosting infrastructure.",
    neonColor: "rgba(0, 170, 255, 0.3)",
    hoverShadow: "0 0 30px rgba(0, 170, 255, 0.2)",
  },
  {
    title: "Capvtal Production",
    path: "/production",
    description: "Creative brand design, content creation, digital marketing strategies, and professional presentations.",
    neonColor: "rgba(170, 0, 255, 0.3)",
    hoverShadow: "0 0 30px rgba(170, 0, 255, 0.2)",
  },
  
  {
    title: "Capvtal Innovations",
    path: "/about",
    description: "The parent company driving innovation across all divisions with a unified vision for excellence.",
    neonColor: "rgba(255, 255, 255, 0.15)",
    hoverShadow: "0 0 30px rgba(255, 255, 255, 0.1)",
  },
];

const FULL_TEXT = "Capvtal Innovations.";

const Index = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [typedCount, setTypedCount] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  // Typing effect
  useEffect(() => {
    if (typedCount < FULL_TEXT.length) {
      const t = setTimeout(() => setTypedCount((c) => c + 1), 180);
      return () => clearTimeout(t);
    }
  }, [typedCount]);

  // Blinking cursor
  useEffect(() => {
    const t = setInterval(() => setShowCursor((c) => !c), 530);
    return () => clearInterval(t);
  }, []);

  const hustleBlog = useMemo(() => blogs.find((b) => b.isAd), []);

  return (
    <div className="relative">
      {/* Interactive cursor glow */}
      <div
        className="fixed w-[500px] h-[500px] rounded-full pointer-events-none z-0"
        style={{
          left: mousePos.x - 250,
          top: mousePos.y - 250,
          background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
        }}
      />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Moving stars */}
        <StarsBackground />
        {/* Floating orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-[10%] w-72 h-72 rounded-full bg-foreground/[0.02] blur-3xl animate-float" />
          <div className="absolute bottom-20 right-[15%] w-96 h-96 rounded-full bg-foreground/[0.03] blur-3xl animate-float" style={{ animationDelay: "2s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-foreground/[0.015] blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-gradient mb-6 opacity-0 animate-fade-in">
            {FULL_TEXT.slice(0, typedCount)}
            <span
              className={`inline-block w-[4px] h-[0.85em] bg-foreground ml-1 align-middle transition-opacity duration-100 ${
                showCursor ? "opacity-100" : "opacity-0"
              }`}
            />
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Next Generation Innovation.
          </p>
          <div className="mt-10 flex gap-4 justify-center opacity-0 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <button
              onClick={() => navigate("/about")}
              className="glass-hover rounded-full px-8 py-3 text-sm font-medium text-foreground"
            >
              It's Us.
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="rounded-full px-8 py-3 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors"
            >
              Let's Chat.
            </button>
          </div>
        </div>
      </section>

      {/* Services icons */}
      <ServiceIcons />

      {/* Divisions */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-foreground mb-10">Our Divisions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {divisions.map((div, i) => (
            <div key={div.path} className="opacity-0 animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
              <GlassCard onClick={() => navigate(div.path)} className="h-full" neonColor={div.neonColor} hoverShadow={div.hoverShadow}>
                <h3 className="text-lg font-semibold text-foreground mb-3">{div.title}</h3>
                <p className="text-sm text-muted-foreground">{div.description}</p>
                <span className="inline-block mt-4 text-xs text-muted-foreground">Explore →</span>
              </GlassCard>
            </div>
          ))}
        </div>
      </section>

      {/* Blog Posts */}
      {hustleBlog && (
        <section className="container mx-auto px-6 py-10">
          <h2 className="text-3xl font-bold text-foreground mb-10">Latest Insights</h2>
          <div className="max-w-2xl mx-auto">
            <BlogCard blog={hustleBlog} large />
          </div>
        </section>
      )}

      {/* Moving Ticker */}
      <section className="container mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold text-foreground mb-4">Companies We've Worked With</h2>
        <MovingTicker />
      </section>

      {/* Time Display */}
      <div className="fixed bottom-6 left-6 z-50 glass rounded-full px-5 py-2">
        <span className="text-sm font-mono text-muted-foreground">
          {time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
        </span>
      </div>

      {/* Capvtal AI assistant */}
      <CapvtalAI />
    </div>
  );
};

export default Index;
