import { useEffect } from "react";

/**
 * Fades + un-blurs any element with a `data-reveal` attribute as it scrolls into view.
 * Optional `data-reveal-delay="0.1"` (seconds) staggers items.
 * Elements are only hidden once JS opts in (`.reveal-ready`), so content is never lost.
 */
export function useScrollReveal(routeKey: string) {
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;

    const root = document.documentElement;
    root.classList.add("reveal-ready");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    const register = (scope: ParentNode) => {
      scope.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-revealed)").forEach((el) => {
        const d = el.dataset.revealDelay;
        if (d) el.style.setProperty("--reveal-delay", `${d}s`);
        io.observe(el);
      });
    };

    register(document);

    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((n) => {
          if (n instanceof HTMLElement) {
            if (n.matches("[data-reveal]")) register(n.parentElement ?? document);
            else register(n);
          }
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [routeKey]);
}
