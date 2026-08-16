"use client";

interface TechTagProps {
  label: string;
  variant?: "primary" | "cyan" | "green" | "orange" | "red";
  onClick?: () => void;
  active?: boolean;
}

export default function TechTag({ label, variant = "primary", onClick, active }: TechTagProps) {
  const variantClass = `tech-tag-${variant}`;
  return (
    <span
      className={`tech-tag ${variantClass} ${onClick ? "cursor-pointer hover:opacity-80" : ""} ${active ? "ring-1 ring-current" : ""}`}
      onClick={onClick}
    >
      {label}
    </span>
  );
}
