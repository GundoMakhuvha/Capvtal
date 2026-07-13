import { useNavigate } from "react-router-dom";
import GlassCard from "./GlassCard";
import type { BlogPost } from "@/data/blogs";
import hustleWhite from "@/assets/hustle-white.png";
import hustleBlack from "@/assets/hustle-black.png";

// Blog images map
import blogAi from "@/assets/blog-ai.jpg";
import blogBrand from "@/assets/blog-brand.jpg";
import blogMusic from "@/assets/blog-music.jpg";
import blogWebdev from "@/assets/blog-webdev.jpg";
import blogContent from "@/assets/blog-content.jpg";
import blogStudio from "@/assets/blog-studio.jpg";
import blogData from "@/assets/blog-data.jpg";
import blogMarketing from "@/assets/blog-marketing.jpg";
import blogArtist from "@/assets/blog-artist.jpg";

const imageMap: Record<string, string> = {
  "blog-ai": blogAi,
  "blog-brand": blogBrand,
  "blog-music": blogMusic,
  "blog-webdev": blogWebdev,
  "blog-content": blogContent,
  "blog-studio": blogStudio,
  "blog-data": blogData,
  "blog-marketing": blogMarketing,
  "blog-artist": blogArtist,
};

const BlogCard = ({ blog, large = false }: { blog: BlogPost; large?: boolean }) => {
  const navigate = useNavigate();

  if (blog.isAd) {
    return (
      <GlassCard
        onClick={() => navigate(`/blog/${blog.id}`)}
        className={`h-full overflow-hidden border-accent/30 ${large ? "p-10" : ""}`}
        neonColor="rgba(255, 255, 255, 0.1)"
        hoverShadow="0 0 30px rgba(255,255,255,0.08)"
      >
        <div className={`flex flex-col h-full items-center text-center ${large ? "gap-4" : ""}`}>
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1 px-2 py-0.5 rounded-full border border-border/50">
            Sponsored · Capvtal
          </span>
          <img
            src={hustleWhite}
            alt="Hustle"
            className={`${large ? "h-28" : "h-16"} w-auto mb-2 dark:block hidden`}
          />
          <img
            src={hustleBlack}
            alt="Hustle"
            className={`${large ? "h-28" : "h-16"} w-auto mb-2 dark:hidden block`}
          />
          <h3 className={`${large ? "text-2xl" : "text-lg"} font-semibold text-foreground mb-2`}>{blog.title}</h3>
          <p className={`${large ? "text-base max-w-md" : "text-sm"} text-muted-foreground flex-1`}>{blog.excerpt}</p>
          <span className={`mt-4 ${large ? "text-sm" : "text-xs"} font-medium text-foreground/80 uppercase tracking-wider`}>
            Learn More →
          </span>
        </div>
      </GlassCard>
    );
  }

  const imgSrc = blog.image ? imageMap[blog.image] : undefined;

  return (
    <GlassCard onClick={() => navigate(`/blog/${blog.id}`)} className="h-full overflow-hidden">
      <div className="flex flex-col h-full">
        {imgSrc && (
          <div className="-mx-6 -mt-6 mb-4 h-40 overflow-hidden">
            <img
              src={imgSrc}
              alt={blog.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        )}
        <span className="text-xs text-muted-foreground uppercase tracking-widest mb-2">
          {blog.category} · {blog.readTime}
        </span>
        <h3 className="text-lg font-semibold text-foreground mb-2">{blog.title}</h3>
        <p className="text-sm text-muted-foreground flex-1">{blog.excerpt}</p>
        <span className="text-xs text-muted-foreground mt-4">{blog.date}</span>
      </div>
    </GlassCard>
  );
};

export default BlogCard;
