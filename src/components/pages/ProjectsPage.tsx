"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const PROJECTS = [
  {
    name: "Custom Operating System from Scratch",
    desc: "Designed and implemented a minimal OS from scratch including a custom bootloader in Assembly and a C-based kernel. Implemented VGA text-mode drivers, memory handling, and a basic CLI running on an emulated x86 machine.",
    tech: ["C", "x86 Assembly", "GCC", "QEMU"],
    stars: 86,
    forks: 12,
    link: "https://github.com/unKnownNG/Custom-OS",
    icon: "🖥️",
    color: "#50fa7b",
    category: "systems",
    image: "/projects/custom-os.jpg",
  },
  {
    name: "Custom Programming Language (Compiler)",
    desc: "Designed and implemented a custom programming language with lexical analysis, parsing, and an execution engine. Built core compiler components — tokenization, AST generation, and runtime evaluation.",
    tech: ["C++", "LLVM"],
    stars: 42,
    forks: 7,
    link: "https://github.com/unKnownNG/Custom-Programming-Language",
    icon: "⚙️",
    color: "#bd93f9",
    category: "systems",
    image: "/projects/compiler.jpg",
  },
  {
    name: "CodeNovel — AI-Powered Code Learning Platform",
    desc: "Built a web platform for reading and understanding AI-generated code. Designed a backend data model using Supabase/PostgreSQL with AI-assisted schema generation. Integrated AI summarization for complex code snippets.",
    tech: ["TypeScript", "Next.js", "Supabase", "PostgreSQL"],
    stars: 31,
    forks: 4,
    link: "https://github.com/unKnownNG/Code-Novel",
    icon: "🤖",
    color: "#ff79c6",
    category: "web",
    image: "/projects/codenovel.jpg",
  },
  {
    name: "Bevy Snake Game",
    desc: "A classic snake game built using the Bevy game engine in Rust, featuring smooth rendering, input handling, and ECS-based architecture.",
    tech: ["Rust", "Bevy"],
    stars: 18,
    forks: 2,
    link: "https://github.com/unKnownNG/bevy-snake-game",
    icon: "🎮",
    color: "#ffb86c",
    category: "gamedev",
    image: "/projects/bevy-snake.jpg",
  },
  {
    name: "Psypathai — AI Psychology Career Guide",
    desc: "A web platform featuring an AI chatbot specializing in psychology to guide students in career decisions. Includes curated, popular roadmaps customized for students across various career paths.",
    tech: ["Next.js", "AI APIs"],
    stars: 24,
    forks: 3,
    link: "https://github.com/unKnownNG/Psypathai",
    icon: "🧠",
    color: "#8be9fd",
    category: "web",
    image: "/projects/psypathai.jpg",
  },
];

const FILTERS = [
  { id: "all",     label: "All" },
  { id: "systems", label: "Systems" },
  { id: "web",     label: "Web" },
  { id: "gamedev", label: "Game Dev" },
];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = PROJECTS.filter(
    (p) => activeFilter === "all" || p.category === activeFilter
  );

  return (
    <div>
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span>📁</span>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-active">~/projects</span>
      </div>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`tech-tag clickable ${activeFilter === f.id ? "active" : ""}`}
            style={{ border: "none", cursor: "pointer", fontSize: 11, padding: "4px 12px" }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
        {filtered.map((project, idx) => (
          <motion.a
            key={project.name}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card"
            style={{ textDecoration: "none", display: "flex", flexDirection: "column", overflow: "hidden" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.07 }}
            whileHover={{ y: -4 }}
          >
            {/* Project Header Image */}
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

              {/* Vignette gradient overlay */}
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 45%, color-mix(in srgb, var(--surface) 90%, transparent) 100%)",
                pointerEvents: "none",
              }} />

              {/* Top mini terminal controls & category/tech badge */}
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
                <span style={{ fontSize: 10, color: "var(--comment)" }}>🍴 {project.forks}</span>
                <span style={{ fontSize: 10, color: "var(--cyan)", display: "flex", alignItems: "center", gap: 4 }}>
                  🐙 GitHub →
                </span>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
