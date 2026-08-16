"use client";

export type Page = "home" | "projects" | "experience" | "opensource" | "skills" | "contact";

export const PAGES: { id: Page; label: string; path: string; icon: string }[] = [
  { id: "home",       label: "home",       path: "~/home",        icon: "🏠" },
  { id: "projects",   label: "projects",   path: "~/projects",    icon: "📁" },
  { id: "experience", label: "experience", path: "~/experience",  icon: "💼" },
  { id: "opensource", label: "opensource", path: "~/opensource",  icon: "</>" },
  { id: "skills",     label: "skills",     path: "~/skills",      icon: "⚡" },
  { id: "contact",    label: "contact",    path: "~/contact",     icon: "📬" },
];

type Listener = (page: Page) => void;

class NavigationStore {
  private _current: Page = "home";
  private _listeners: Listener[] = [];

  get current(): Page {
    return this._current;
  }

  navigate(page: Page): void {
    this._current = page;
    this._listeners.forEach((fn) => fn(page));
  }

  subscribe(fn: Listener): () => void {
    this._listeners.push(fn);
    return () => {
      this._listeners = this._listeners.filter((l) => l !== fn);
    };
  }
}

// Singleton store — shared across all components
export const navigationStore = new NavigationStore();

// React hook
import { useState, useEffect } from "react";

export function useNavigation() {
  const [page, setPage] = useState<Page>(navigationStore.current);

  useEffect(() => {
    return navigationStore.subscribe(setPage);
  }, []);

  return {
    page,
    navigate: (p: Page) => navigationStore.navigate(p),
  };
}
