import { useRef, useState } from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
  neonColor?: string;
  hoverShadow?: string;
}

const GlassCard = ({ children, className = "", onClick, interactive = true, neonColor, hoverShadow }: GlassCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interactive || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(`perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`);
  };

  const handleMouseLeave = () => {
    setTransform("");
    setIsHovered(false);
  };

  const neonStyle: React.CSSProperties = {
    transform,
    transition: "transform 0.3s ease-out, background 0.5s, border-color 0.5s, box-shadow 0.5s",
    ...(neonColor && isHovered
      ? { borderColor: neonColor, boxShadow: hoverShadow }
      : {}),
    ...(neonColor && !isHovered
      ? { borderColor: neonColor.replace(/[\d.]+\)$/, "0.15)") }
      : {}),
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`glass-card-3d ${onClick ? "cursor-pointer" : ""} ${className}`}
      style={neonStyle}
    >
      {children}
    </div>
  );
};

export default GlassCard;
