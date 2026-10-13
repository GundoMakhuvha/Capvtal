import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import GlassCard from "./GlassCard";
import type { BlogPost } from "@/data/blogs";
import hustleWhite from "@/assets/hustle-white.png";
import hustleBlack from "@/assets/hustle-black.png";

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

const formatDate = (d: string) => {
  const date = new Date(d);
  return isNaN(date.getTime()) ? d : date.toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" });
};

const BlogCard = ({ blog, large = false }: { blog: BlogPost; large?: boolean }) => {
  if (blog.isAd) {
    return (
      <Link to={`/blog/${blog.id}`} className="block h-full rounded-[28px]" aria-label={`${blog.title} — learn more`}>
        <GlassCard className={`h-full ${large ? "p-8 md:p-12" : ""}`} neonColor="rgba(255, 255, 255, 0.18)">
          <div className={`flex h-full flex-col items-center text-center ${large ? "gap-4" : "gap-2"}`}>
            <span className="rounded-full border border-foreground/10 bg-foreground/[0.04] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Built by Capvtal
            </span>
            <img src={hustleWhite} alt="Hustle app logo" loading="lazy" className={`${large ? "h-24 md:h-28" : "h-16"} hidden w-auto dark:block`} />
            <img src={hustleBlack} alt="Hustle app logo" loading="lazy" className={`${large ? "h-24 md:h-28" : "h-16"} block w-auto dark:hidden`} />
            <h3 className={`${large ? "text-2xl md:text-3xl" : "text-lg"} font-semibold tracking-tight text-foreground`}>{blog.title}</h3>
            <p className={`${large ? "max-w-md text-base" : "text-sm"} flex-1 leading-relaxed text-muted-foreground`}>{blog.excerpt}</p>
            <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
              Learn more <ArrowRight size={16} className="transition-transform duration-300 group-hover/card:translate-x-1" />
            </span>
          </div>
        </GlassCard>
      </Link>
    );
  }

  const imgSrc = blog.image ? imageMap[blog.image] : undefined;

  return (
    <Link to={`/blog/${blog.id}`} className="block h-full rounded-[28px]">
      <GlassCard className="h-full !p-0" interactive={false}>
        <article className="flex h-full flex-col">
          {imgSrc && (
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={imgSrc}
                alt=""
                className="h-full w-full object-cover transition-transform duration-700 ease-apple group-hover/card:scale-[1.04]"
                loading="lazy"
                decoding="async"
              />
            </div>
          )}
          <div className="flex flex-1 flex-col p-6">
            <span className="mb-2 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              {blog.category} · {blog.readTime}
            </span>
            <h3 className="mb-2 text-lg font-semibold leading-snug tracking-tight text-foreground">{blog.title}</h3>
            <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{blog.excerpt}</p>
            <time dateTime={blog.date} className="mt-5 text-xs text-muted-foreground">
              {formatDate(blog.date)}
            </time>
          </div>
        </article>
      </GlassCard>
    </Link>
  );
};

export default BlogCard;
