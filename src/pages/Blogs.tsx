import BlogCard from "@/components/BlogCard";
import { blogs } from "@/data/blogs";

const Blogs = () => (
  <div className="container mx-auto px-6 py-16">
    <h1 className="text-5xl font-bold text-gradient mb-10 opacity-0 animate-fade-in">Blog</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {blogs.map((blog, i) => (
        <div key={blog.id} className="opacity-0 animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
          <BlogCard blog={blog} />
        </div>
      ))}
    </div>
  </div>
);

export default Blogs;
