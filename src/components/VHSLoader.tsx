import { useEffect, useState } from "react";
import logoWhite from "@/assets/hustle-white.png";

/**
 * Intro splash. Plays once per browser session and is short,
 * so returning visitors (and page speed scores) aren't held up.
 */
const VHSLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 80),
      setTimeout(() => setPhase(2), 450),
      setTimeout(() => setPhase(3), 1350),
      setTimeout(() => onComplete(), 1850),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#070709] transition-opacity duration-500 ease-apple ${
        phase >= 3 ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      <div
        className="absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-1000 ease-apple"
        style={{
          background: "radial-gradient(closest-side, hsl(200 100% 55% / 0.22), hsl(272 100% 66% / 0.12), transparent)",
          opacity: phase >= 1 ? 1 : 0,
          transform: `translate(-50%, -50%) scale(${phase >= 1 ? 1 : 0.6})`,
          filter: "blur(20px)",
        }}
      />
      <div className="relative z-10 flex flex-col items-center gap-6">
        <img
          src={logoWhite}
          alt=""
          className={`h-16 w-auto transition-all duration-700 ease-spring ${
            phase >= 1 ? "translate-y-0 scale-100 opacity-100 blur-0" : "translate-y-3 scale-90 opacity-0 blur-md"
          }`}
        />
        <p
          className={`text-[12px] font-medium uppercase tracking-[0.32em] text-white/55 transition-all duration-700 ease-apple ${
            phase >= 2 ? "translate-y-0 opacity-100 blur-0" : "translate-y-2 opacity-0 blur-sm"
          }`}
        >
          Next Generation Innovation.
        </p>
      </div>
    </div>
  );
};

export default VHSLoader;
