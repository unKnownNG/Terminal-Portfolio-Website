"use client";

import { useNavigation, Page } from "@/lib/navigationStore";
import { motion } from "framer-motion";

interface MobileTabBarProps {
  terminalOpen: boolean;
  onToggleTerminal: () => void;
}

interface TabItem {
  id: Page | "terminal";
  label: string;
  icon: (active: boolean) => React.ReactNode;
}

export default function MobileTabBar({
  terminalOpen,
  onToggleTerminal,
}: MobileTabBarProps) {
  const { page, navigate } = useNavigation();

  const TABS: TabItem[] = [
    {
      id: "home",
      label: "Home",
      icon: (active) => (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={active ? "2.3" : "1.8"}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      id: "projects",
      label: "Projects",
      icon: (active) => (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={active ? "2.3" : "1.8"}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
        </svg>
      ),
    },
    {
      id: "skills",
      label: "Skills",
      icon: (active) => (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={active ? "2.3" : "1.8"}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
      ),
    },
    {
      id: "contact",
      label: "Contact",
      icon: (active) => (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={active ? "2.3" : "1.8"}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
    },
    {
      id: "terminal",
      label: "Terminal",
      icon: (active) => (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={active ? "2.3" : "1.8"}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" x2="20" y1="19" y2="19" />
        </svg>
      ),
    },
  ];

  return (
    <nav className="mobile-tab-bar" aria-label="Mobile Navigation">
      <div className="mobile-tab-bar-inner">
        {TABS.map((tab) => {
          const isTerminal = tab.id === "terminal";
          const isActive = isTerminal ? terminalOpen : page === tab.id;

          return (
            <motion.button
              key={tab.id}
              type="button"
              className={`mobile-tab-btn ${isActive ? "active" : ""}`}
              onClick={() => {
                if (isTerminal) {
                  onToggleTerminal();
                } else {
                  navigate(tab.id as Page);
                }
              }}
              whileTap={{ scale: 0.9 }}
              aria-label={tab.label}
              aria-current={isActive ? "page" : undefined}
            >
              <div className="mobile-tab-icon-wrapper">
                {tab.icon(isActive)}
                {isActive && (
                  <motion.div
                    className="mobile-tab-active-glow"
                    layoutId="mobileActiveTabGlow"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
