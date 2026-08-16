"use client";

import { useState } from "react";
import StatusBar from "./StatusBar";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import EmbeddedTerminal from "@/components/terminal/EmbeddedTerminal";
import FooterBar from "./FooterBar";
import MobileHeader from "@/components/mobile/MobileHeader";
import MobileDrawer from "@/components/mobile/MobileDrawer";
import MobileTabBar from "@/components/mobile/MobileTabBar";
import { motion } from "framer-motion";

export default function DesktopLayout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  return (
    <div className="desktop-root bg-gradient-radial">
      {/* ─── Top Desktop Waybar (Hidden on mobile ≤768px via CSS) ─── */}
      <StatusBar />

      {/* ─── Top Mobile Header (Visible only on mobile ≤768px via CSS) ─── */}
      <MobileHeader
        isDrawerOpen={isDrawerOpen}
        onToggleDrawer={() => setIsDrawerOpen((o) => !o)}
        terminalOpen={terminalOpen}
        onToggleTerminal={() => setTerminalOpen((t) => !t)}
      />

      {/* ─── Mobile Slide-down Sidebar Drawer ─── */}
      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

      {/* ─── Tiling Workspace (sidebar | main) ─── */}
      <div className="desktop-workspace">
        {/* Left sidebar tile (Hidden on mobile via CSS) */}
        <div className="desktop-sidebar desktop-tile">
          <Sidebar />
        </div>

        {/* Main content tile — full remaining width */}
        <div className="desktop-main desktop-tile">
          <MainContent />
        </div>
      </div>

      {/* ─── Bottom embedded terminal ─── */}
      <EmbeddedTerminal
        isOpen={terminalOpen}
        onToggleOpen={() => setTerminalOpen((t) => !t)}
      />

      {/* ─── Desktop Footer bar (Hidden on mobile via CSS) ─── */}
      <FooterBar
        terminalOpen={terminalOpen}
        onToggleTerminal={() => setTerminalOpen((t) => !t)}
      />

      {/* ─── Floating Bottom Tab Bar Dock (Visible only on mobile ≤768px) ─── */}
      <MobileTabBar
        terminalOpen={terminalOpen}
        onToggleTerminal={() => setTerminalOpen((t) => !t)}
      />
    </div>
  );
}
