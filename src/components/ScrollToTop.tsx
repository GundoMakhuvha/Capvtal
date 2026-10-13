import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  // Reset scroll on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Centered pill so it never collides with the chat button (right) or clock (left)
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`liquid-glass bottom-safe fixed left-1/2 z-40 flex h-11 -translate-x-1/2 items-center gap-1.5 rounded-full px-4 text-[13px] font-medium text-foreground/80 transition-all duration-500 ease-spring hover:text-foreground ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
      aria-label="Back to top"
    >
      <ArrowUp className="relative z-10 h-4 w-4" />
      <span className="relative z-10">Top</span>
    </button>
  );
};

export default ScrollToTop;
