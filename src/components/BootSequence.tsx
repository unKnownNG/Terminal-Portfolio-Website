"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { initTheme } from "@/lib/themeStore";

interface BootLine {
  text: string;
  type: "bios" | "kernel" | "ok" | "info" | "login" | "ascii";
  delay: number;
}

// Shortened to ~2.5s total
const BOOT_LINES: BootLine[] = [
  { text: "", type: "ascii", delay: 0 },
  { text: "UEFI Firmware v2.8.0 — Secure Boot Active", type: "bios", delay: 80 },
  { text: "CPU: x86_64 Architecture — 8 cores @ 4.2 GHz", type: "bios", delay: 80 },
  { text: "Memory Test: 32768 MB OK", type: "bios", delay: 100 },
  { text: "", type: "info", delay: 60 },
  { text: ":: Booting Linux 6.8.0-custom...", type: "kernel", delay: 200 },
  { text: "[  OK  ] Reached target — Local File Systems", type: "ok", delay: 120 },
  { text: "[  OK  ] Started — NetworkManager", type: "ok", delay: 100 },
  { text: "[  OK  ] Started — Hyprland Compositor", type: "ok", delay: 100 },
  { text: "[  OK  ] Loaded — Portfolio Shell v1.0.0", type: "ok", delay: 150 },
  { text: "", type: "info", delay: 80 },
  { text: "daiyaan.portfolio login: visitor", type: "login", delay: 200 },
  { text: "Welcome to Portfolio Shell — Loading desktop...", type: "ok", delay: 300 },
];

const ASCII_LOGO = `
   █████╗ ██████╗  ██████╗██╗  ██╗
  ██╔══██╗██╔══██╗██╔════╝██║  ██║
  ███████║██████╔╝██║     ███████║
  ██╔══██║██╔══██╗██║     ██╔══██║
  ██║  ██║██║  ██║╚██████╗██║  ██║
  ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝
        L I N U X`;

interface BootSequenceProps {
  onComplete: () => void;
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"boot" | "loading" | "done">("boot");
  const scrollRef = useRef<HTMLDivElement>(null);

  const totalDelay = BOOT_LINES.reduce((sum, line) => sum + line.delay, 0);

  const startBoot = useCallback(() => {
    let elapsed = 0;
    BOOT_LINES.forEach((line, index) => {
      elapsed += line.delay;
      const cap = elapsed;
      setTimeout(() => {
        setVisibleLines(index + 1);
        setProgress(Math.min(100, Math.round((cap / totalDelay) * 100)));
      }, elapsed);
    });

    setTimeout(() => setPhase("loading"), elapsed + 200);
    setTimeout(() => setPhase("done"), elapsed + 600);
    setTimeout(() => onComplete(), elapsed + 1000);
  }, [onComplete, totalDelay]);

  useEffect(() => {
    initTheme();
    const timer = setTimeout(startBoot, 300);
    return () => clearTimeout(timer);
  }, [startBoot]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleLines]);

  const getLineColor = (type: BootLine["type"]) => {
    switch (type) {
      case "bios":   return "var(--comment)";
      case "kernel": return "var(--primary-bright)";
      case "ok":     return "var(--foreground)";
      case "info":   return "transparent";
      case "login":  return "var(--cyan)";
      case "ascii":  return "var(--primary)";
      default:       return "var(--foreground)";
    }
  };

  const renderLine = (line: BootLine, index: number) => {
    if (line.type === "ascii" && index === 0) {
      return (
        <pre className="text-glow" style={{ color: "var(--primary)", fontSize: 11, lineHeight: 1.2, marginBottom: 8 }}>
          {ASCII_LOGO}
        </pre>
      );
    }
    if (line.type === "ok") {
      const parts = line.text.match(/^(\[  OK  \])(.*)$/);
      if (parts) {
        return (
          <span>
            <span className="text-glow-green" style={{ color: "var(--green)", fontWeight: 700 }}>{parts[1]}</span>
            <span style={{ color: "var(--foreground)" }}>{parts[2]}</span>
          </span>
        );
      }
    }
    return <span style={{ color: getLineColor(line.type) }}>{line.text}</span>;
  };

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          style={{
            position: "fixed",
            inset: 0,
            background: "var(--background)",
            zIndex: 50,
            display: "flex",
            flexDirection: "column",
          }}
          exit={{ opacity: 0, scale: 1.01 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: "24px 32px", fontFamily: "'Fira Code', monospace", fontSize: 12 }}>
            <div>
              {BOOT_LINES.slice(0, visibleLines).map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.1 }}
                  style={{ lineHeight: "1.8", minHeight: "1.4em" }}
                >
                  {renderLine(line, index)}
                </motion.div>
              ))}
            </div>
          </div>

          <div style={{ padding: "16px 32px", flexShrink: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 11, fontFamily: "'Fira Code', monospace" }}>
              <span style={{ color: "var(--comment)" }}>
                {phase === "loading" ? "Initializing desktop..." : "Booting system..."}
              </span>
              <span style={{ color: "var(--primary-bright)" }}>{progress}%</span>
            </div>
            <div style={{ height: 4, background: "var(--surface-light)", borderRadius: 2, overflow: "hidden" }}>
              <motion.div
                className="progress-glow"
                style={{ height: "100%", borderRadius: 2, background: "linear-gradient(90deg, var(--primary), var(--accent), var(--cyan))" }}
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
