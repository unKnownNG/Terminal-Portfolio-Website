"use client";

import { useEffect, useRef, useState } from "react";

interface SkillBarProps {
  label: string;
  level: number; // 0-100
  color?: "primary" | "cyan" | "green";
}

export default function SkillBar({ label, level, color = "primary" }: SkillBarProps) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setWidth(level);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [level]);

  const gradientMap = {
    primary: "linear-gradient(90deg, var(--primary), var(--accent))",
    cyan: "linear-gradient(90deg, var(--cyan), var(--primary))",
    green: "linear-gradient(90deg, var(--green), var(--cyan))",
  };

  return (
    <div ref={ref} className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-foreground text-xs">{label}</span>
        <span className="text-comment text-xs">{level}%</span>
      </div>
      <div className="skill-bar-track">
        <div
          className="skill-bar-fill"
          style={{
            width: `${width}%`,
            background: gradientMap[color],
          }}
        />
      </div>
    </div>
  );
}
