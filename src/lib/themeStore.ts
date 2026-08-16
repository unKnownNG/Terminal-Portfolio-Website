"use client";

export interface Theme {
  name: string;
  label: string;
  description: string;
}

const DEFAULT_THEME = "cyberpunk";
const THEME_KEY = "portfolio-theme";
const THEME_VERSION_KEY = "portfolio-theme-version";
const THEME_VERSION = "2"; // bump when changing the default theme

export const THEMES: Theme[] = [
  { name: "cyberpunk", label: "Cyberpunk",  description: "Neon-lit night city vibes — the default" },
  { name: "dracula",   label: "Dracula",    description: "Classic purple haze" },
  { name: "hacker",    label: "Hacker",     description: "Matrix green on black — pure hacker" },
  { name: "nord",      label: "Nord",       description: "Arctic, clean, and calm" },
  { name: "monokai",   label: "Monokai",    description: "Warm retro editor classic" },
  { name: "solarized", label: "Solarized",  description: "Precision colors for readability" },
];

export function getTheme(): string {
  if (typeof window === "undefined") return DEFAULT_THEME;
  // Migration: if the saved theme-version is outdated, reset to the new default
  const savedVersion = localStorage.getItem(THEME_VERSION_KEY);
  if (savedVersion !== THEME_VERSION) {
    localStorage.removeItem(THEME_KEY);
    localStorage.setItem(THEME_VERSION_KEY, THEME_VERSION);
    return DEFAULT_THEME;
  }
  return localStorage.getItem(THEME_KEY) || DEFAULT_THEME;
}

export function setTheme(name: string): boolean {
  const theme = THEMES.find((t) => t.name === name);
  if (!theme) return false;
  document.documentElement.setAttribute("data-theme", name);
  localStorage.setItem(THEME_KEY, name);
  localStorage.setItem(THEME_VERSION_KEY, THEME_VERSION);
  return true;
}

export function initTheme(): void {
  if (typeof window === "undefined") return;
  const saved = getTheme();
  document.documentElement.setAttribute("data-theme", saved);
}
