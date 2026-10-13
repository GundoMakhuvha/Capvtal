import { useCallback, useEffect, useState } from "react";

type Theme = "dark" | "light";

const readStored = (): Theme => {
  try {
    return localStorage.getItem("theme") === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
};

/** Dark by default (brand look). Persists choice and keeps the iOS status-bar colour in sync. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => (typeof window === "undefined" ? "dark" : readStored()));

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.classList.toggle("light", theme === "light");
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* private mode — ignore */
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#070709" : "#f5f5f7");
  }, [theme]);

  const toggle = useCallback(() => setTheme((t) => (t === "dark" ? "light" : "dark")), []);

  return { theme, toggle, isDark: theme === "dark" };
}
