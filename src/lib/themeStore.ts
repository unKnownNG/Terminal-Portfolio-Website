export interface Theme {
  name: string;
  label: string;
  description: string;
}

export const THEMES: Theme[] = [
  { name: "dracula", label: "Dracula", description: "Classic purple haze — the default" },
  { name: "cyberpunk", label: "Cyberpunk", description: "Neon-lit night city vibes" },
  { name: "nord", label: "Nord", description: "Arctic, clean, and calm" },
  { name: "monokai", label: "Monokai", description: "Warm retro editor classic" },
  { name: "solarized", label: "Solarized", description: "Precision colors for readability" },
];

export function getTheme(): string {
  if (typeof window === "undefined") return "dracula";
  return localStorage.getItem("portfolio-theme") || "dracula";
}

export function setTheme(name: string): boolean {
  const theme = THEMES.find((t) => t.name === name);
  if (!theme) return false;
  document.documentElement.setAttribute("data-theme", name);
  localStorage.setItem("portfolio-theme", name);
  return true;
}

export function initTheme(): void {
  if (typeof window === "undefined") return;
  const saved = getTheme();
  document.documentElement.setAttribute("data-theme", saved);
}
