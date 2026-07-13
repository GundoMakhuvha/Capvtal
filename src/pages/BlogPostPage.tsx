import { useParams, useNavigate } from "react-router-dom";
import { blogs } from "@/data/blogs";
import { ArrowLeft } from "lucide-react";
import hustleWhite from "@/assets/hustle-white.png";
import hustleBlack from "@/assets/hustle-black.png";

const BlogPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const blog = blogs.find((b) => b.id === id);

  if (!blog) {
    return (
      <div className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-3xl font-bold text-foreground">Blog post not found</h1>
        <button onClick={() => navigate("/blogs")} className="mt-4 text-muted-foreground hover:text-foreground transition-colors">
          ← Back to blogs
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-16 max-w-3xl">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft size={16} /> Back
      </button>
      {blog.isAd && (
        <div className="flex flex-col items-center mb-8">
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4 px-3 py-1 rounded-full border border-border/50">
            Sponsored · Built by Capvtal
          </span>
          <img src={hustleWhite} alt="Hustle" className="h-24 w-auto dark:block hidden" />
          <img src={hustleBlack} alt="Hustle" className="h-24 w-auto dark:hidden block" />
        </div>
      )}
      {!blog.isAd && (
        <span className="text-xs text-muted-foreground uppercase tracking-widest">
          {blog.category} · {blog.readTime} · {blog.date}
        </span>
      )}
      <h1 className="text-4xl font-bold text-foreground mt-3 mb-6 opacity-0 animate-fade-in">{blog.title}</h1>
      <div className="text-muted-foreground leading-relaxed whitespace-pre-line opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
        {blog.content}
      </div>
    </div>
  );
};

export default BlogPostPage;
