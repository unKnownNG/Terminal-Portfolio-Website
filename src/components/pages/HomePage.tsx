"use client";

import { useNavigation } from "@/lib/navigationStore";
import { motion } from "framer-motion";

const TECH_TAGS = [
  "C/C++", "Linux", "STM32", "Embedded", "Computer Architecture",
  "CAN Bus", "Networking", "Open Source", "Rust", "QEMU",
];

const FEATURED_PROJECTS = [
  {
    name: "Custom OS from Scratch",
    desc: "Bootloader in Assembly + C-based kernel with VGA text-mode, memory handling, and basic CLI.",
    tech: ["C", "x86 Assembly", "QEMU"],
    stars: 86,
    link: "https://github.com/unKnownNG/Custom-OS",
    color: "#50fa7b",
    image: "/projects/custom-os.jpg",
    icon: "🖥️",
  },
  {
    name: "Custom Programming Language",
    desc: "Lexical analysis, parsing, AST generation, and runtime evaluation engine.",
    tech: ["C++", "LLVM"],
    stars: 42,
    link: "https://github.com/unKnownNG/Custom-Programming-Language",
    color: "#bd93f9",
    image: "/projects/compiler.jpg",
    icon: "⚙️",
  },
  {
    name: "CodeNovel — AI Learning Platform",
    desc: "AI-powered platform for reading and understanding code with PostgreSQL backend.",
    tech: ["TypeScript", "Next.js", "Supabase"],
    stars: 31,
    link: "https://github.com/unKnownNG/Code-Novel",
    color: "#ff79c6",
    image: "/projects/codenovel.jpg",
    icon: "🤖",
  },
];

// Mini ASCII terminal animation for hero
const TERMINAL_LINES = [
  { text: "$ uname -a", color: "var(--green)" },
  { text: "Linux workstation 6.8.0-custom", color: "var(--foreground)" },
  { text: "$ cat skills.sh | head -4", color: "var(--green)" },
  { text: "→ OS: Arch Linux x86_64", color: "var(--cyan)" },
  { text: "→ Shell: zsh 5.9 + portfolio-sh", color: "var(--cyan)" },
  { text: "→ WM: Hyprland (Wayland)", color: "var(--cyan)" },
  { text: "→ Role: Systems & Embedded Dev", color: "var(--yellow)" },
  { text: "$ █", color: "var(--primary)" },
];

export default function HomePage() {
  const { navigate } = useNavigation();

  return (
    <div>
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span>🏠</span>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-active">~/home</span>
      </div>

      {/* Hero Section */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: 20, marginBottom: 24, alignItems: "start" }}>
        <div>
          <p style={{ fontSize: 13, color: "var(--comment)", fontFamily: "'Fira Code', monospace", marginBottom: 4 }}>
            Hi, I&apos;m
          </p>
          <h1
            style={{
              fontSize: "clamp(22px, 3vw, 32px)",
              fontWeight: 700,
              color: "var(--foreground)",
              fontFamily: "'Fira Code', monospace",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              marginBottom: 8,
            }}
          >
            Mohammed Daiyaan
          </h1>
          <p style={{
            fontSize: 13,
            fontWeight: 600,
            color: "var(--primary-bright)",
            fontFamily: "'Fira Code', monospace",
            marginBottom: 12,
          }}>
            ECE Student&nbsp;•&nbsp;Systems &amp; Embedded Developer
          </p>
          <p style={{
            fontSize: 11,
            color: "var(--comment)",
            lineHeight: 1.7,
            maxWidth: 400,
            fontFamily: "'Fira Code', monospace",
            marginBottom: 16,
          }}>
            I build software close to the machine. Passionate about Operating Systems,
            Embedded Systems, and solving real-world problems through code.
          </p>

          {/* Tech Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {TECH_TAGS.map((tag) => (
              <span key={tag} className="tech-tag">{tag}</span>
            ))}
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <motion.button
              onClick={() => navigate("projects")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: "7px 16px",
                background: "color-mix(in srgb, var(--primary) 15%, transparent)",
                border: "1px solid var(--primary)",
                borderRadius: 4,
                color: "var(--primary)",
                fontFamily: "'Fira Code', monospace",
                fontSize: 11,
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              📂 View Projects
            </motion.button>
            <motion.button
              onClick={() => navigate("contact")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: "7px 16px",
                background: "color-mix(in srgb, var(--green) 10%, transparent)",
                border: "1px solid color-mix(in srgb, var(--green) 40%, transparent)",
                borderRadius: 4,
                color: "var(--green)",
                fontFamily: "'Fira Code', monospace",
                fontSize: 11,
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              📬 Contact Me
            </motion.button>
          </div>
        </div>

        {/* Neofetch Hero Widget */}
        <div style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 8,
          overflow: "hidden",
          width: "100%",
          maxWidth: 360,
          boxShadow: "0 4px 20px color-mix(in srgb, var(--primary) 5%, transparent)",
        }}>
          <div className="window-header">
            <span className="window-dot window-dot-red" />
            <span className="window-dot window-dot-yellow" />
            <span className="window-dot window-dot-green" />
            <span className="window-title">neofetch — daiyaan@workstation</span>
          </div>
          <div style={{ padding: "12px 14px", display: "flex", gap: 14, alignItems: "center" }}>
            {/* Tux / Arch ASCII */}
            <pre style={{
              fontSize: 8.5,
              lineHeight: 1.15,
              color: "var(--green)",
              fontFamily: "'Fira Code', monospace",
              margin: 0,
              textShadow: "0 0 10px color-mix(in srgb, var(--green) 40%, transparent)",
              userSelect: "none",
            }}>
{`      .--.
     |o_o |
     |:_/ |
    //   \\ \\
   (|     | )
  /'\\_   _/\`\\
  \\___)=(___/`}
            </pre>

            {/* Neofetch specs */}
            <div style={{ flex: 1, fontSize: 10, fontFamily: "'Fira Code', monospace", lineHeight: 1.6 }}>
              <p style={{ fontWeight: 700, marginBottom: 2 }}>
                <span style={{ color: "var(--primary-bright)" }}>daiyaan</span>
                <span style={{ color: "var(--foreground)" }}>@</span>
                <span style={{ color: "var(--accent)" }}>workstation</span>
              </p>
              <div style={{ height: 1, background: "var(--border)", margin: "3px 0 5px" }} />
              
              <p style={{ display: "flex", gap: 6 }}>
                <span style={{ color: "var(--cyan)", minWidth: 52 }}>OS</span>
                <span style={{ color: "var(--comment)" }}>:</span>
                <span style={{ color: "var(--foreground)" }}>Arch Linux x86_64</span>
              </p>
              <p style={{ display: "flex", gap: 6 }}>
                <span style={{ color: "var(--cyan)", minWidth: 52 }}>Host</span>
                <span style={{ color: "var(--comment)" }}>:</span>
                <span style={{ color: "var(--foreground)" }}>Systems &amp; Embedded</span>
              </p>
              <p style={{ display: "flex", gap: 6 }}>
                <span style={{ color: "var(--cyan)", minWidth: 52 }}>Kernel</span>
                <span style={{ color: "var(--comment)" }}>:</span>
                <span style={{ color: "var(--foreground)" }}>6.8.0-arch1-custom</span>
              </p>
              <p style={{ display: "flex", gap: 6 }}>
                <span style={{ color: "var(--cyan)", minWidth: 52 }}>WM</span>
                <span style={{ color: "var(--comment)" }}>:</span>
                <span style={{ color: "var(--foreground)" }}>Hyprland (Wayland)</span>
              </p>
              <p style={{ display: "flex", gap: 6 }}>
                <span style={{ color: "var(--cyan)", minWidth: 52 }}>Role</span>
                <span style={{ color: "var(--comment)" }}>:</span>
                <span style={{ color: "var(--green)" }}>OS &amp; Kernel Dev</span>
              </p>

              {/* Terminal Color Palette blocks */}
              <div style={{ display: "flex", gap: 3, marginTop: 6 }}>
                {["#ff5555", "#ffb86c", "#f1fa8c", "#50fa7b", "#8be9fd", "#bd93f9", "#ff79c6"].map((c) => (
                  <span
                    key={c}
                    style={{
                      display: "inline-block",
                      width: 12,
                      height: 10,
                      backgroundColor: c,
                      borderRadius: 2,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="divider" />

      {/* Featured Projects */}
      <div>
        <div className="section-header">
          <span className="section-title">📂 Featured Projects</span>
          <button
            className="view-all-link"
            onClick={() => navigate("projects")}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            view all →
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: 14 }}>
          {FEATURED_PROJECTS.map((project, idx) => (
            <motion.a
              key={project.name}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card"
              style={{ textDecoration: "none", display: "flex", flexDirection: "column", overflow: "hidden" }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + idx * 0.1 }}
              whileHover={{ y: -4 }}
            >
              {/* Project preview image with terminal styling */}
              <div style={{
                position: "relative",
                height: 130,
                width: "100%",
                overflow: "hidden",
                borderBottom: `1px solid color-mix(in srgb, ${project.color} 25%, var(--border))`,
                background: "var(--surface-light)",
              }}>
                {/* Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={project.name}
                  className="project-card-image-el"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 0.35s ease",
                  }}
                />

                {/* Subtle vignette gradient overlay */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 45%, color-mix(in srgb, var(--surface) 90%, transparent) 100%)",
                  pointerEvents: "none",
                }} />

                {/* Top mini terminal controls & project badge */}
                <div style={{
                  position: "absolute",
                  top: 8,
                  left: 8,
                  right: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  pointerEvents: "none",
                }}>
                  <div style={{
                    display: "flex",
                    gap: 4,
                    background: "rgba(10, 10, 15, 0.75)",
                    padding: "3px 6px",
                    borderRadius: 4,
                    backdropFilter: "blur(6px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#ff5555", display: "inline-block" }} />
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#f1fa8c", display: "inline-block" }} />
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#50fa7b", display: "inline-block" }} />
                  </div>

                  <span style={{
                    fontSize: 9.5,
                    fontFamily: "'Fira Code', monospace",
                    padding: "2px 7px",
                    borderRadius: 4,
                    background: "rgba(10, 10, 15, 0.8)",
                    color: project.color,
                    border: `1px solid color-mix(in srgb, ${project.color} 40%, transparent)`,
                    backdropFilter: "blur(6px)",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    fontWeight: 600,
                  }}>
                    <span>{project.icon}</span>
                    <span>{project.tech[0]}</span>
                  </span>
                </div>
              </div>

              <div className="project-card-body" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <p className="project-card-title" style={{ color: project.color }}>{project.name}</p>
                <p className="project-card-desc" style={{ flex: 1 }}>{project.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>
                  {project.tech.map((t) => (
                    <span key={t} className="tech-tag" style={{ fontSize: 9, padding: "1px 5px" }}>{t}</span>
                  ))}
                </div>
                <div className="project-card-footer">
                  <span className="project-card-stars">⭐ {project.stars}</span>
                  <span style={{ fontSize: 10, color: "var(--cyan)", display: "flex", alignItems: "center", gap: 4 }}>
                    🐙 GitHub →
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
