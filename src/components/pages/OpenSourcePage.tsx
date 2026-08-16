"use client";

import { motion } from "framer-motion";

const CONTRIBUTIONS = [
  {
    project: "Optuna (v4.5.0, v4.6.0)",
    org: "optuna/optuna",
    orgLink: "https://github.com/optuna/optuna",
    desc: "Refactored backend modules to standardize return types; contribution included in official release notes for v4.5.0 and v4.6.0.",
    type: "Bug Fix / Refactor",
    language: "Python",
    prs: 2,
    badge: "Release Contributor",
    badgeColor: "var(--cyan)",
    icon: "🔬",
    stats: [
      { label: "PRs Merged", value: "2" },
      { label: "Release", value: "v4.5 + v4.6" },
      { label: "Language", value: "Python" },
    ],
  },
  {
    project: "Layer5 (CNCF)",
    org: "layer5io",
    orgLink: "https://github.com/layer5io",
    desc: "Contributed code and documentation improvements to cloud-native open-source projects in a global contributor environment. Part of the Cloud Native Computing Foundation ecosystem.",
    type: "Feature / Docs",
    language: "Go / YAML",
    prs: 5,
    badge: "CNCF Contributor",
    badgeColor: "var(--primary)",
    icon: "☁️",
    stats: [
      { label: "PRs Merged", value: "5+" },
      { label: "Ecosystem", value: "CNCF" },
      { label: "Language", value: "Go / YAML" },
    ],
  },
];

export default function OpenSourcePage() {
  return (
    <div>
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span>🌐</span>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-active">~/opensource</span>
      </div>

      <div style={{ marginBottom: 16 }}>
        <p style={{ fontSize: 11, color: "var(--comment)", fontFamily: "'Fira Code', monospace" }}>
          <span style={{ color: "var(--green)" }}>$</span> git log --author=&quot;Mohammed Daiyaan&quot; --all --merges | head
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {CONTRIBUTIONS.map((c, idx) => (
          <motion.div
            key={c.project}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.12 }}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 6,
              borderLeft: `3px solid ${c.badgeColor}`,
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div style={{
              padding: "10px 14px",
              background: "var(--window-header)",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 8,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 20 }}>{c.icon}</span>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: c.badgeColor, fontFamily: "'Fira Code', monospace" }}>
                    ▸ {c.project}
                  </p>
                  <a
                    href={c.orgLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: 10, color: "var(--cyan)", fontFamily: "'Fira Code', monospace", textDecoration: "none" }}
                  >
                    github.com/{c.org} →
                  </a>
                </div>
              </div>
              <span style={{
                fontSize: 9,
                color: c.badgeColor,
                background: `color-mix(in srgb, ${c.badgeColor} 10%, transparent)`,
                border: `1px solid color-mix(in srgb, ${c.badgeColor} 30%, transparent)`,
                borderRadius: 3,
                padding: "2px 8px",
                fontFamily: "'Fira Code', monospace",
                fontWeight: 700,
                letterSpacing: "0.05em",
              }}>
                ✓ {c.badge}
              </span>
            </div>

            {/* Body */}
            <div style={{ padding: "12px 14px" }}>
              <p style={{ fontSize: 11, color: "var(--foreground)", fontFamily: "'Fira Code', monospace", lineHeight: 1.7, marginBottom: 12 }}>
                {c.desc}
              </p>

              {/* Stats */}
              <div style={{ display: "flex", gap: 16 }}>
                {c.stats.map((s) => (
                  <div key={s.label}>
                    <p style={{ fontSize: 9, color: "var(--comment)", fontFamily: "'Fira Code', monospace", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      {s.label}
                    </p>
                    <p style={{ fontSize: 12, fontWeight: 700, color: c.badgeColor, fontFamily: "'Fira Code', monospace" }}>
                      {s.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Type tag */}
              <div style={{ marginTop: 8, display: "flex", gap: 6, alignItems: "center" }}>
                <span className="tech-tag" style={{ fontSize: 9, padding: "1px 5px" }}>{c.type}</span>
                <span className="tech-tag" style={{ fontSize: 9, padding: "1px 5px" }}>{c.language}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Call to action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{
          marginTop: 20,
          padding: "12px 14px",
          background: "color-mix(in srgb, var(--green) 6%, transparent)",
          border: "1px solid color-mix(in srgb, var(--green) 20%, transparent)",
          borderRadius: 6,
        }}
      >
        <p style={{ fontSize: 11, color: "var(--green)", fontFamily: "'Fira Code', monospace" }}>
          🌱 Always looking for impactful open source projects to contribute to.
          If you have one — let&apos;s collaborate!
        </p>
      </motion.div>
    </div>
  );
}
