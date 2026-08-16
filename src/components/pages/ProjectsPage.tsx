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
            style={{ textDecoration: "none", display: "block" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.07 }}
            whileHover={{ y: -3 }}
          >
            {/* Header */}
            <div style={{
              height: 90,
              background: `linear-gradient(135deg, color-mix(in srgb, ${project.color} 25%, var(--surface)) 0%, var(--surface-light) 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              borderBottom: `1px solid color-mix(in srgb, ${project.color} 20%, var(--border))`,
            }}>
              {project.icon}
            </div>

            <div className="project-card-body">
              <p className="project-card-title" style={{ color: project.color }}>{project.name}</p>
              <p className="project-card-desc">{project.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>
                {project.tech.map((t) => (
                  <span key={t} className="tech-tag" style={{ fontSize: 9, padding: "1px 5px" }}>{t}</span>
                ))}
              </div>
              <div className="project-card-footer">
                <span className="project-card-stars">⭐ {project.stars}</span>
                <span style={{ fontSize: 10, color: "var(--comment)" }}>🍴 {project.forks}</span>
                <span style={{ fontSize: 10, color: "var(--cyan)" }}>🐙 GitHub →</span>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
