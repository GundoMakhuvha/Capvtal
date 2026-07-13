import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  pz: number;
}

const StarsBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const NUM = 250;
    const stars: Star[] = [];

    let mouseX = 0;
    let mouseY = 0;
    let speed = 2;
    let targetSpeed = 2;

    const reset = (s: Star) => {
      s.x = (Math.random() - 0.5) * width;
      s.y = (Math.random() - 0.5) * height;
      s.z = Math.random() * width;
      s.pz = s.z;
    };

    for (let i = 0; i < NUM; i++) {
      const star = { x: 0, y: 0, z: 0, pz: 0 };
      reset(star);
      stars.push(star);
    }

    const resize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", resize);

    const handleMove = (e: MouseEvent) => {
      mouseX = (e.clientX - width / 2) * 0.15;
      mouseY = (e.clientY - height / 2) * 0.15;

      targetSpeed = 2 + Math.abs(e.movementX + e.movementY) * 0.15;
      targetSpeed = Math.min(targetSpeed, 10);
    };

    window.addEventListener("mousemove", handleMove);

    const handleClick = () => {
      targetSpeed = 20;

      setTimeout(() => {
        targetSpeed = 2;
      }, 300);
    };

    window.addEventListener("click", handleClick);

    const isLight = () =>
      document.documentElement.classList.contains("light");

    let animation = 0;

    const render = () => {
      const light = isLight();

      speed += (targetSpeed - speed) * 0.05;
      targetSpeed *= 0.98;

      ctx.fillStyle = light
        ? "rgba(250,250,250,0.18)"
        : "rgba(0,0,0,0.22)";
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2 + mouseX;
      const cy = height / 2 + mouseY;

      for (const s of stars) {
        s.pz = s.z;
        s.z -= speed;

        if (s.z <= 1) {
          reset(s);
          continue;
        }

        const sx = (s.x / s.z) * width + cx;
        const sy = (s.y / s.z) * width + cy;

        const psx = (s.x / s.pz) * width + cx;
        const psy = (s.y / s.pz) * width + cy;

        const radius = (1 - s.z / width) * 2.5;
        const alpha = Math.min(1, (1 - s.z / width) * 1.2);

        // Trail
        ctx.strokeStyle = light
          ? `rgba(0,0,0,${alpha})`
          : `rgba(255,255,255,${alpha})`;

        ctx.lineWidth = radius;
        ctx.beginPath();
        ctx.moveTo(psx, psy);
        ctx.lineTo(sx, sy);
        ctx.stroke();

        // Star glow
        ctx.beginPath();
        ctx.fillStyle = light
          ? `rgba(0,0,0,${alpha})`
          : `rgba(255,255,255,${alpha})`;

        ctx.shadowBlur = radius * 8;
        ctx.shadowColor = light ? "#000" : "#fff";

        ctx.arc(sx, sy, radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;
      }

      animation = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animation);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default StarsBackground;