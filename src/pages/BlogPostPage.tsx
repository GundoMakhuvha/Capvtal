import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { blogs } from "@/data/blogs";
import { useSEO } from "@/lib/seo";
import hustleWhite from "@/assets/hustle-white.png";
import hustleBlack from "@/assets/hustle-black.png";

const formatDate = (d: string) => {
  const date = new Date(d);
  return isNaN(date.getTime()) ? d : date.toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" });
};

const BlogPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const blog = blogs.find((b) => b.id === id);

  useSEO(blog ? { path: `/blog/${blog.id}` } : { path: `/blog/${id ?? ""}`, title: "Post not found | Capvtal Innovations", noindex: true });

  if (!blog) {
    return (
      <div className="container mx-auto px-5 py-24 text-center md:px-6">
        <h1 className="display-md text-foreground">Blog post not found</h1>
        <Link to="/blogs" className="btn-glass liquid-glass mt-8">
          <span className="relative z-10">← Back to blog</span>
        </Link>
      </div>
    );
  }

  const more = blogs.filter((b) => b.id !== blog.id && !b.isAd).slice(0, 3);

  return (
    <article className="container mx-auto max-w-3xl px-5 py-10 md:px-6 md:py-16">
      <button
        onClick={() => (window.history.length > 1 ? navigate(-1) : navigate("/blogs"))}
        className="liquid-glass mb-10 inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
      >
        <ArrowLeft size={16} className="relative z-10" /> <span className="relative z-10">Back</span>
      </button>

      {blog.isAd ? (
        <div className="mb-8 flex flex-col items-center">
          <span className="mb-5 rounded-full border border-foreground/10 bg-foreground/[0.04] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Built by Capvtal
          </span>
          <img src={hustleWhite} alt="Hustle app logo" className="hidden h-24 w-auto dark:block" />
          <img src={hustleBlack} alt="Hustle app logo" className="block h-24 w-auto dark:hidden" />
        </div>
      ) : (
        <p className="eyebrow">
          {blog.category} · {blog.readTime} · <time dateTime={blog.date}>{formatDate(blog.date)}</time>
        </p>
      )}

      <h1 className="display-md mt-4 text-foreground opacity-0 animate-fade-in">{blog.title}</h1>
      <div
        className="mt-8 whitespace-pre-line text-[18px] leading-[1.75] text-foreground/80 opacity-0 animate-fade-in"
        style={{ animationDelay: "0.1s" }}
      >
        {blog.content}
      </div>

      <div className="hairline my-16" />

      <aside aria-label="More insights">
        <h2 className="mb-6 text-xl font-semibold tracking-tight text-foreground">Keep reading</h2>
        <ul className="space-y-2">
          {more.map((b) => (
            <li key={b.id}>
              <Link
                to={`/blog/${b.id}`}
                className="group glass flex items-center justify-between gap-4 rounded-[18px] px-5 py-4 transition-colors hover:bg-[var(--glass-hover)]"
              >
                <span className="text-[15px] font-medium text-foreground">{b.title}</span>
                <ArrowRight size={16} className="shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </article>
  );
};

export default BlogPostPage;
