"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BootLine {
  text: string;
  type: "bios" | "kernel" | "systemd" | "ok" | "info" | "warning" | "login" | "ascii";
  delay: number;
}

const BOOT_LINES: BootLine[] = [
  // BIOS / POST
  { text: "", type: "ascii", delay: 0 },
  { text: "UEFI Firmware v2.8.0 — Secure Boot Active", type: "bios", delay: 100 },
  { text: "Initializing Hardware Abstraction Layer...", type: "bios", delay: 200 },
  { text: "CPU: x86_64 Architecture — 8 cores @ 4.2 GHz", type: "bios", delay: 150 },
  { text: "Memory Test: 32768 MB OK", type: "bios", delay: 300 },
  { text: "GPU: NVIDIA RTX — Wayland Compositor Ready", type: "bios", delay: 150 },
  { text: "", type: "info", delay: 100 },

  // GRUB / Bootloader
  { text: ":: GRUB 2.12 — Loading kernel image...", type: "kernel", delay: 400 },
  { text: ":: Loading initramfs-linux.img...", type: "kernel", delay: 300 },
  { text: ":: Booting Linux 6.8.0-custom...", type: "kernel", delay: 500 },
  { text: "", type: "info", delay: 100 },

  // Kernel boot
  { text: "[    0.000000] Linux version 6.8.0-custom (gcc 13.2.1)", type: "info", delay: 100 },
  { text: "[    0.004521] Command line: BOOT_IMAGE=/vmlinuz-linux root=/dev/nvme0n1p2", type: "info", delay: 80 },
  { text: "[    0.182930] ACPI: PM-Timer IO Port: 0x1808", type: "info", delay: 60 },
  { text: "[    0.291044] PCI: Using configuration type 1 for base access", type: "info", delay: 60 },
  { text: "", type: "info", delay: 50 },

  // systemd services
  { text: "[  OK  ] Reached target — Local File Systems", type: "ok", delay: 200 },
  { text: "[  OK  ] Started — NetworkManager", type: "ok", delay: 250 },
  { text: "[  OK  ] Started — Bluetooth Service", type: "ok", delay: 150 },
  { text: "[  OK  ] Started — PipeWire Audio Service", type: "ok", delay: 150 },
  { text: "[  OK  ] Started — Hyprland Compositor", type: "ok", delay: 200 },
  { text: "[  OK  ] Started — D-Bus System Message Bus", type: "ok", delay: 100 },
  { text: "[  OK  ] Reached target — Graphical Interface", type: "ok", delay: 200 },
  { text: "[  OK  ] Loaded — Portfolio Shell v1.0.0", type: "ok", delay: 300 },
  { text: "", type: "info", delay: 100 },

  // Login
  { text: "Arch Linux 6.8.0-custom (tty1)", type: "login", delay: 300 },
  { text: "", type: "info", delay: 100 },
  { text: "portfolio login: daiyaan", type: "login", delay: 500 },
  { text: "Password: ••••••••", type: "login", delay: 400 },
  { text: "", type: "info", delay: 100 },
  { text: "Welcome to Portfolio Shell — Type 'help' to get started.", type: "ok", delay: 600 },
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
      const capturedElapsed = elapsed;
      setTimeout(() => {
        setVisibleLines(index + 1);
        setProgress(Math.min(100, Math.round((capturedElapsed / totalDelay) * 100)));
      }, elapsed);
    });

    setTimeout(() => {
      setPhase("loading");
    }, elapsed + 400);

    setTimeout(() => {
      setPhase("done");
    }, elapsed + 1200);

    setTimeout(() => {
      onComplete();
    }, elapsed + 1800);
  }, [onComplete, totalDelay]);

  useEffect(() => {
    const timer = setTimeout(startBoot, 500);
    return () => clearTimeout(timer);
  }, [startBoot]);

  // Auto-scroll to bottom as new lines appear
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleLines]);

  const getLineColor = (type: BootLine["type"]) => {
    switch (type) {
      case "bios":
        return "text-comment";
      case "kernel":
        return "text-primary-bright";
      case "systemd":
        return "text-foreground";
      case "ok":
        return "text-foreground";
      case "info":
        return "text-comment opacity-60";
      case "warning":
        return "text-yellow";
      case "login":
        return "text-cyan";
      case "ascii":
        return "text-primary";
      default:
        return "text-foreground";
    }
  };

  const renderLine = (line: BootLine, index: number) => {
    if (line.type === "ascii" && index === 0) {
      return (
        <pre className="text-primary text-glow text-xs md:text-sm leading-tight mb-2">
          {ASCII_LOGO}
        </pre>
      );
    }

    if (line.type === "ok") {
      const parts = line.text.match(/^(\[  OK  \])(.*)$/);
      if (parts) {
        return (
          <span>
            <span className="text-green text-glow-green font-bold">{parts[1]}</span>
            <span className="text-foreground">{parts[2]}</span>
          </span>
        );
      }
    }

    return <span className={getLineColor(line.type)}>{line.text}</span>;
  };

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 bg-background z-50 flex flex-col"
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Boot text area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-8 font-mono text-xs md:text-sm">
            <div>
              {BOOT_LINES.slice(0, visibleLines).map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15 }}
                  className="leading-relaxed min-h-[1.2em]"
                >
                  {renderLine(line, index)}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Progress bar at bottom */}
          <div className="p-4 md:p-8 shrink-0">
            <div>
              <div className="flex items-center justify-between mb-2 text-xs">
                <span className="text-comment">
                  {phase === "loading" ? "Initializing shell..." : "Booting system..."}
                </span>
                <span className="text-primary-bright">{progress}%</span>
              </div>
              <div className="h-1.5 bg-surface-light rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full progress-glow"
                  style={{
                    background:
                      "linear-gradient(90deg, #bd93f9, #ff79c6, #8be9fd)",
                  }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
