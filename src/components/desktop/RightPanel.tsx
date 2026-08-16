"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SkillBarProps {
  name: string;
  percentage: number;
  color?: string;
}

function SkillBar({ name, percentage, color }: SkillBarProps) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setWidth(percentage); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [percentage]);

  return (
    <div className="skill-row" ref={ref}>
      <div className="skill-row-header">
        <span className="skill-name">{name}</span>
        <span className="skill-pct" style={color ? { color } : undefined}>{percentage}%</span>
      </div>
      <div className="skill-bar-track">
        <div
          className="skill-bar-fill"
          style={{
            width: `${width}%`,
            background: color
              ? `linear-gradient(90deg, ${color}, color-mix(in srgb, ${color} 60%, var(--accent)))`
              : undefined,
          }}
        />
      </div>
    </div>
  );
}

// GitHub contribution bars — random realistic heights
const CONTRIB_HEIGHTS = [40, 20, 60, 35, 80, 45, 30, 70, 55, 25, 65, 90, 40, 50, 75, 30, 85, 60, 45, 70, 35, 55, 80, 40, 65, 50, 30, 95];

export default function RightPanel() {
  return (
    <aside className="right-panel">
      {/* System Overview */}
      <div className="right-section">
        <p className="right-section-title">SYSTEM OVERVIEW</p>
        <SkillBar name="C/C++"     percentage={90} color="var(--cyan)" />
        <SkillBar name="Linux"     percentage={85} color="var(--green)" />
        <SkillBar name="Embedded"  percentage={80} color="var(--orange)" />
        <SkillBar name="Rust"      percentage={72} color="var(--accent)" />
        <SkillBar name="Algorithms" percentage={75} color="var(--primary)" />
      </div>

      {/* GitHub Activity */}
      <div className="right-section">
        <p className="right-section-title">GITHUB ACTIVITY</p>

        {/* Contribution bars */}
        <div className="contrib-bars">
          {CONTRIB_HEIGHTS.map((h, i) => (
            <div
              key={i}
              className="contrib-bar"
              style={{ height: `${h}%` }}
              title={`${Math.floor(h / 10)} contributions`}
            />
          ))}
        </div>
        <p style={{ fontSize: 9, color: "var(--comment)", marginTop: 3, fontFamily: "'Fira Code', monospace" }}>
          contributions in the last 30 days
        </p>

        <div style={{ marginTop: 8 }}>
          <div className="stat-row">
            <span className="stat-icon">⬢</span>
            <span className="stat-label">Public Repos</span>
            <span className="stat-value">8</span>
          </div>
          <div className="stat-row">
            <span className="stat-icon">🔀</span>
            <span className="stat-label">Open Source PRs</span>
            <span className="stat-value">23</span>
          </div>
          <div className="stat-row">
            <span className="stat-icon">⭐</span>
            <span className="stat-label">Total Stars</span>
            <span className="stat-value">247</span>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="right-section">
        <p className="right-section-title">ACHIEVEMENTS</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { icon: "🏆", title: "Codeforces Div.2", desc: "Global rank #3300 (Top 5%)", color: "var(--yellow)" },
            { icon: "🚀", title: "URC 2025", desc: "University Rover Challenge", color: "var(--cyan)" },
            { icon: "🌍", title: "IRC 2025", desc: "International Rover Challenge", color: "var(--green)" },
          ].map((a) => (
            <div key={a.title} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
              <span style={{ fontSize: 13, flexShrink: 0 }}>{a.icon}</span>
              <div>
                <p style={{ fontSize: 10, fontWeight: 600, color: a.color, fontFamily: "'Fira Code', monospace" }}>{a.title}</p>
                <p style={{ fontSize: 9, color: "var(--comment)", fontFamily: "'Fira Code', monospace" }}>{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Open Source */}
      <div className="right-section">
        <p className="right-section-title">OPEN SOURCE</p>
        {[
          { project: "Optuna v4.5+", desc: "Official release contributor", badge: "✓ Merged" },
          { project: "Layer5 / CNCF", desc: "Cloud-native OSS", badge: "✓ Merged" },
        ].map((o) => (
          <div key={o.project} style={{ marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <p style={{ fontSize: 10, fontWeight: 600, color: "var(--primary-bright)", fontFamily: "'Fira Code', monospace" }}>
                {o.project}
              </p>
              <span style={{
                fontSize: 8,
                color: "var(--green)",
                background: "color-mix(in srgb, var(--green) 10%, transparent)",
                border: "1px solid color-mix(in srgb, var(--green) 25%, transparent)",
                borderRadius: 3,
                padding: "1px 4px",
                fontFamily: "'Fira Code', monospace",
              }}>
                {o.badge}
              </span>
            </div>
            <p style={{ fontSize: 9, color: "var(--comment)", fontFamily: "'Fira Code', monospace" }}>{o.desc}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}
