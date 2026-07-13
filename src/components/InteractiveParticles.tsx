import { useEffect, useRef } from "react";

interface InteractiveParticlesProps {
  color?: string; // rgba string, e.g. "rgba(170,0,255,0.8)"
  density?: number;
}

const InteractiveParticles = ({ color = "rgba(255,255,255,0.8)", density = 100 }: InteractiveParticlesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = Array.from({ length: density }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      baseX: 0,
      baseY: 0,
      radius: Math.random() * 1.6 + 0.5,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      twinklePhase: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
    })).map((p) => ({ ...p, baseX: p.x, baseY: p.y }));

    let animationFrame: number;
    const repelRadius = 120;
    const repelStrength = 40;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const { x: mx, y: my } = mouseRef.current;

      particles.forEach((p) => {
        p.twinklePhase += p.twinkleSpeed;
        const opacity = (Math.sin(p.twinklePhase) + 1) / 2;

        // drift
        p.baseX += p.vx;
        p.baseY += p.vy;
        if (p.baseX < 0 || p.baseX > width) p.vx *= -1;
        if (p.baseY < 0 || p.baseY > height) p.vy *= -1;

        // mouse repulsion
        const dx = p.baseX - mx;
        const dy = p.baseY - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let drawX = p.baseX;
        let drawY = p.baseY;

        if (dist < repelRadius) {
          const force = (repelRadius - dist) / repelRadius;
          drawX += (dx / dist) * force * repelStrength;
          drawY += (dy / dist) * force * repelStrength;
        }

        ctx.beginPath();
        ctx.arc(drawX, drawY, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = color.replace(/[\d.]+\)$/, `${opacity * 0.9})`);
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [color, density]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
};

export default InteractiveParticles;