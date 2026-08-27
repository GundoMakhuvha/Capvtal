import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import logoWhite from "@/assets/logo-white.png";
import logoBlack from "@/assets/logo-black.png";
import hustleWhite from "@/assets/hustle-white.png";
import hustleBlack from "@/assets/hustle-black.png";

const mainNav = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  
  { label: "Contact Us", path: "/contact" },
];

const divisionNav = [
  {
    label: "Technology",
    path: "/technology",
    glow: "rgba(0, 170, 255, 0.3)",
  },
  {
    label: "Production",
    path: "/production",
    glow: "rgba(170, 0, 255, 0.3)",
  },
];

{divisionNav.map((item) => (
  <Link
    key={item.path}
    to={item.path}
    className="
      px-4 py-2 rounded-xl
      text-white transition-all duration-300
      hover:scale-105
      hover:bg-white/5
      active:scale-95
    "
    style={{
      boxShadow: "0 0 0 rgba(0,0,0,0)",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow = `0 0 30px ${item.glow}`;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = "0 0 0 rgba(0,0,0,0)";
    }}
  >
    {item.label}
  </Link>
))}

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") !== "light";
    }
    return true;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      root.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-background">
      {/* Main Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={hustleWhite} alt="Hustle" className="h-10 -auto dark:block hidden" />
            <img src={hustleBlack} alt="Hustle" className="h-10 w-auto dark:hidden block" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {mainNav.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors duration-300 ${
                  location.pathname === item.path
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              className="text-foreground p-2 glass rounded-full hover:bg-accent transition-colors"
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              className="md:hidden text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Division Sub-Navigation */}
        <div className="border-t border-border/30">
          <div className="container mx-auto px-6 h-10 hidden md:flex items-center gap-6">
            <span className="text-xs text-muted-foreground tracking-widest uppercase">Divisions</span>
            <div className="w-px h-4 bg-border" />
            {divisionNav.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-xs font-medium tracking-wide transition-colors duration-300 ${
                  location.pathname === item.path
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-20 px-6">
          <div className="flex flex-col gap-6">
            {mainNav.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className="text-2xl font-light text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <div className="h-px bg-border my-2" />
            <span className="text-xs text-muted-foreground tracking-widest uppercase">Divisions</span>
            {divisionNav.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className="text-xl font-light text-muted-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="pt-[104px]">{children}</main>

      {/* Footer */}
      <footer className="glass border-t border-border/50 mt-20">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <img src={hustleWhite} alt="Hustle" className="h-12 w-auto dark:block hidden" />
              <img src={hustleBlack} alt="Hustle" className="h-12 w-auto dark:hidden block" />
              <p className="text-sm text-muted-foreground">
                Next Genoration Innovation.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">Divisions</h4>
              <div className="flex flex-col gap-2">
                {divisionNav.map((item) => (
                  <Link key={item.path} to={item.path} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Capvtal {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">Links</h4>
              <div className="flex flex-col gap-2">
                {mainNav.map((item) => (
                  <Link key={item.path} to={item.path} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-border/50 mt-8 pt-8 text-center text-xs text-muted-foreground">
            © 2026 Capvtal Innovations. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
