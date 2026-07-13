import { useState, useEffect } from "react";
import logo from "@/assets/logo.png";
import hustleWhite from "@/assets/hustle-white.png";

const VHSLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 2500),
      setTimeout(() => onComplete(), 3200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden">
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Logo */}
        <img
          src={hustleWhite}
          alt="Capvtal"
          className={`h-16 w-auto transition-all duration-700 ${
            phase >= 1 ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-75 translate-y-4"
          }`}
        />

        {/* Tagline */}
        <p
          className={`text-white/50 text-sm tracking-[0.3em] uppercase font-light transition-all duration-700 ${
            phase >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          Next Generation Innovation.
        </p>
      </div>

      {/* Fade out */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-500 pointer-events-none ${
          phase >= 3 ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
};

export default VHSLoader;
