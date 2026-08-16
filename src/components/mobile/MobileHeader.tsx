"use client";

import { motion } from "framer-motion";

interface MobileHeaderProps {
  isDrawerOpen: boolean;
  onToggleDrawer: () => void;
  terminalOpen?: boolean;
  onToggleTerminal?: () => void;
}

export default function MobileHeader({
  isDrawerOpen,
  onToggleDrawer,
}: MobileHeaderProps) {
  return (
    <header className="mobile-header">
      {/* Left hostname / prompt */}
      <div className="mobile-header-prompt">
        <span className="mobile-header-dot" />
        <span className="mobile-header-user">daiyaan</span>
        <span className="mobile-header-host">@arch:~</span>
      </div>

      {/* Right Drawer toggle button */}
      <motion.button
        type="button"
        className={`mobile-header-btn ${isDrawerOpen ? "active" : ""}`}
        onClick={onToggleDrawer}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle profile sidebar drawer"
      >
        <span>{isDrawerOpen ? "Close" : "Open"}</span>
        <span className="mobile-header-icon">{isDrawerOpen ? "✕" : "⊞"}</span>
      </motion.button>
    </header>
  );
}
