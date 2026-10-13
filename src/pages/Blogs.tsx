import BlogCard from "@/components/BlogCard";
import { blogs } from "@/data/blogs";
import { useSEO } from "@/lib/seo";

const Blogs = () => {
  useSEO({ path: "/blogs" });
  return (
    <div className="container mx-auto px-5 py-12 md:px-6 md:py-20">
      <div className="mb-12 max-w-2xl md:mb-16">
        <p className="eyebrow mb-4 opacity-0 animate-fade-in">Blog</p>
        <h1 className="display-lg text-gradient opacity-0 animate-fade-in" style={{ animationDelay: "0.08s" }}>
          Insights
        </h1>
        <p className="lead mt-4 opacity-0 animate-fade-in" style={{ animationDelay: "0.16s" }}>
          Thinking on software, AI, data, branding and growth — from the Capvtal team.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
        {blogs.map((blog, i) => (
          <div key={blog.id} data-reveal data-reveal-delay={((i % 3) * 0.06).toFixed(2)}>
            <BlogCard blog={blog} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
