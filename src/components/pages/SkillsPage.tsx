"use client";

import { useNavigation } from "@/lib/navigationStore";
import { motion } from "framer-motion";

interface SkillItem {
  name: string;
  level: number;
  color: string;
  icon?: string;
}

interface SkillCategory {
  title: string;
  filename: string;
  icon: string;
  skills: SkillItem[];
}

const CATEGORIES: SkillCategory[] = [
  {
    title: "Systems & OS Development",
    filename: "systems_kernel.h",
    icon: "⚙️",
    skills: [
      { name: "C & Modern C++ (C++17/20)", level: 92, color: "#50fa7b", icon: "⚙️" },
      { name: "Linux Internals & POSIX API", level: 90, color: "#8be9fd", icon: "🐧" },
      { name: "OS Kernel Dev (Bootloader, GDT, Paging)", level: 88, color: "#bd93f9", icon: "🖥️" },
      { name: "x86 Assembly (NASM / Real Mode)", level: 78, color: "#ffb86c", icon: "⚡" },
    ],
  },
  {
    title: "Embedded Systems & Hardware",
    filename: "embedded_robotics.c",
    icon: "🔌",
    skills: [
      { name: "Embedded C / STM32 (ARM Cortex-M)", level: 86, color: "#ff79c6", icon: "🔌" },
      { name: "CAN Bus & Serial Protocols (SPI, I2C, UART)", level: 84, color: "#bd93f9", icon: "📡" },
      { name: "Robotics Hardware & Sensor Integration", level: 82, color: "#ffb86c", icon: "🤖" },
      { name: "QEMU & Hardware Emulation", level: 85, color: "#50fa7b", icon: "💻" },
    ],
  },
  {
    title: "Compilers & Languages",
    filename: "compilers_languages.rs",
    icon: "📜",
    skills: [
      { name: "Compiler Construction (AST, Parsing, Lexing)", level: 85, color: "#8be9fd", icon: "📜" },
      { name: "Python (Optuna OSS, Data & Scripting)", level: 88, color: "#f1fa8c", icon: "🐍" },
      { name: "Rust (Memory Safety, Systems, Bevy)", level: 78, color: "#ff5555", icon: "🦀" },
      { name: "TypeScript & Next.js", level: 82, color: "#8be9fd", icon: "🌐" },
    ],
  },
  {
    title: "Tools, DevOps & Workflows",
    filename: "devops_tooling.sh",
    icon: "🛠️",
    skills: [
      { name: "Git, GitHub & Open-Source Workflows", level: 92, color: "#50fa7b", icon: "🐙" },
      { name: "LLVM, GCC & Clang Toolchains", level: 80, color: "#bd93f9", icon: "🔧" },
      { name: "Linux Environment (Arch, Hyprland, Zsh, Vim)", level: 90, color: "#8be9fd", icon: "💻" },
      { name: "Docker & Containerization", level: 75, color: "#ff79c6", icon: "🐳" },
    ],
  },
];

export default function SkillsPage() {
  const { navigate } = useNavigation();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Breadcrumb */}
      <div className="breadcrumb" style={{ marginBottom: 0 }}>
        <span>⚡</span>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-active">~/skills</span>
      </div>

      {/* Header */}
      <div>
        <h1
          style={{
            fontSize: "clamp(20px, 2.5vw, 24px)",
            fontWeight: 700,
            color: "var(--foreground)",
            fontFamily: "'Fira Code', monospace",
            letterSpacing: "-0.01em",
            lineHeight: 1.2,
          }}
        >
          ⚡ Technical Skills &amp; Proficiency
        </h1>
        <p
          style={{
            fontSize: 11.5,
            color: "var(--comment)",
            fontFamily: "'Fira Code', monospace",
            marginTop: 6,
            lineHeight: 1.6,
          }}
        >
          Specialized in low-level systems programming, embedded firmware, kernel development, and compiler architecture.
        </p>
      </div>

      {/* Clean 2-Column Grid for Categories */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
          gap: 16,
        }}
      >
        {CATEGORIES.map((cat, catIdx) => (
          <motion.div
            key={cat.title}
            className="window-pane"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: catIdx * 0.08 }}
            style={{
              display: "flex",
              flexDirection: "column",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            {/* Window Header */}
            <div className="window-header" style={{ padding: "6px 12px" }}>
              <span className="window-dot window-dot-red" />
              <span className="window-dot window-dot-yellow" />
              <span className="window-dot window-dot-green" />
              <span className="window-title" style={{ fontWeight: 600, color: "var(--foreground)" }}>
                {cat.filename}
              </span>
            </div>

            {/* Skills List */}
            <div
              style={{
                padding: "16px 18px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              {cat.skills.map((skill) => (
                <div key={skill.name} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {/* Skill Label + Percentage */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: 11,
                      fontFamily: "'Fira Code', monospace",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontSize: 13 }}>{skill.icon}</span>
                      <span style={{ color: "var(--foreground)", fontWeight: 600 }}>{skill.name}</span>
                    </div>
                    <span
                      style={{
                        fontWeight: 700,
                        color: skill.color,
                        background: `color-mix(in srgb, ${skill.color} 12%, transparent)`,
                        padding: "1px 6px",
                        borderRadius: 4,
                        fontSize: 10.5,
                      }}
                    >
                      {skill.level}%
                    </span>
                  </div>

                  {/* Horizontal Progress Bar */}
                  <div
                    style={{
                      height: 6,
                      background: "color-mix(in srgb, var(--surface-light) 80%, black)",
                      borderRadius: 3,
                      overflow: "hidden",
                      border: "1px solid color-mix(in srgb, var(--border) 40%, transparent)",
                    }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      style={{
                        height: "100%",
                        background: `linear-gradient(90deg, ${skill.color}, color-mix(in srgb, ${skill.color} 70%, white))`,
                        borderRadius: 3,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer Navigation */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 16,
          borderTop: "1px solid var(--border)",
          marginTop: 8,
        }}
      >
        <button
          onClick={() => navigate("opensource")}
          style={{
            background: "none",
            border: "none",
            color: "var(--comment)",
            cursor: "pointer",
            fontSize: 11,
            fontFamily: "'Fira Code', monospace",
          }}
        >
          ← ~/opensource
        </button>
        <button
          onClick={() => navigate("contact")}
          style={{
            background: "none",
            border: "none",
            color: "var(--primary-bright)",
            cursor: "pointer",
            fontSize: 11,
            fontWeight: 700,
            fontFamily: "'Fira Code', monospace",
          }}
        >
          ~/contact →
        </button>
      </div>
    </div>
  );
}
