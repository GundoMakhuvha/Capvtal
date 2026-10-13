import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useSEO } from "@/lib/seo";

const NotFound = () => {
  const location = useLocation();
  useSEO({ path: location.pathname, title: "Page not found | Capvtal Innovations", description: "This page doesn't exist.", noindex: true });

  return (
    <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
      <p className="text-brand-gradient text-[clamp(5rem,22vw,11rem)] font-bold leading-none tracking-tighter">404</p>
      <h1 className="display-md mt-4 text-foreground">This page took a different route.</h1>
      <p className="lead mt-3">The page you're looking for doesn't exist or has moved.</p>
      <Link to="/" className="btn-primary mt-9">
        Return home <ArrowRight size={18} />
      </Link>
    </div>
  );
};

export default NotFound;
