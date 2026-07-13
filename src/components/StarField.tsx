import { useEffect, useRef } from "react";

interface StarFieldProps {
  color?: string; // rgba string for the star glow, e.g. "rgba(0,170,255,0.8)"
  density?: number; // number of stars, default scales with screen size
}

const StarField = ({ color = "rgba(255,255,255,0.8)", density = 120 }: StarFieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const stars = Array.from({ length: density }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.4 + 0.3,
      speed: Math.random() * 0.15 + 0.02,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinklePhase: Math.random() * Math.PI * 2,
    }));

    let animationFrame: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      stars.forEach((star) => {
        star.twinklePhase += star.twinkleSpeed;
        const opacity = (Math.sin(star.twinklePhase) + 1) / 2;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = color.replace(/[\d.]+\)$/, `${opacity * 0.9})`);
        ctx.fill();

        star.y += star.speed;
        if (star.y > height) {
          star.y = 0;
          star.x = Math.random() * width;
        }
      });
      animationFrame = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
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

export default StarField;