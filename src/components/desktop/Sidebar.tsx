"use client";

import { useNavigation, PAGES, Page } from "@/lib/navigationStore";
import { motion } from "framer-motion";

function NavIcon({ pageId, active }: { pageId: Page; active: boolean }) {
  const strokeWidth = active ? "2.2" : "1.8";

  switch (pageId) {
    case "home":
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`sidebar-svg-icon ${active ? "active-glow" : ""}`}
        >
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      );
    case "projects":
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`sidebar-svg-icon ${active ? "active-glow" : ""}`}
        >
          <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
        </svg>
      );
    case "experience":
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`sidebar-svg-icon ${active ? "active-glow" : ""}`}
        >
          <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      );
    case "opensource":
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`sidebar-svg-icon ${active ? "active-glow" : ""}`}
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
      );
    case "skills":
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`sidebar-svg-icon ${active ? "active-glow" : ""}`}
        >
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case "contact":
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`sidebar-svg-icon ${active ? "active-glow" : ""}`}
        >
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Sidebar() {
  const { page, navigate } = useNavigation();

  return (
    <aside className="sidebar">
      {/* Profile Card */}
      <div className="profile-card">
        <div className="avatar-container">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/avatar.jpg"
            alt="Mohammed Daiyaan"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
        <p style={{ fontSize: 15, fontWeight: 700, color: "var(--primary-bright)", fontFamily: "'Fira Code', monospace", letterSpacing: "0.04em" }}>
          MOHAMMED DAIYAAN
        </p>
        <p style={{ fontSize: 10.5, color: "var(--comment)", marginTop: 3, fontFamily: "'Fira Code', monospace" }}>
          Systems &amp; Embedded Developer
        </p>
        <div className="availability-badge">
          <span className="availability-dot" />
          Available for opportunities
        </div>
      </div>

      {/* Navigation */}
      <div className="sidebar-section">
        <p className="sidebar-section-title">NAVIGATION</p>
        {PAGES.map((p) => {
          const isActive = page === p.id;
          return (
            <motion.button
              key={p.id}
              className={`nav-item ${isActive ? "active" : ""}`}
              style={{ width: "100%", border: "none", background: "none", textAlign: "left", cursor: "pointer" }}
              onClick={() => navigate(p.id)}
              whileTap={{ scale: 0.97 }}
            >
              <span className="nav-item-icon-wrapper">
                <NavIcon pageId={p.id} active={isActive} />
              </span>
              <span className="nav-item-label" style={{ fontFamily: "'Fira Code', monospace", fontSize: 12.5, fontWeight: isActive ? 600 : 400 }}>
                ~/{p.label}
              </span>
              {isActive && (
                <span className="nav-active-pill" />
              )}
            </motion.button>
          );
        })}
      </div>

      <div style={{ height: 1, background: "color-mix(in srgb, var(--border) 50%, transparent)", margin: "0 0" }} />

      {/* Quick Links */}
      <div className="sidebar-section">
        <p className="sidebar-section-title">QUICK LINKS</p>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="quick-link group"
        >
          <span className="quick-link-icon-wrapper">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="12" y1="18" x2="12" y2="12" />
              <polyline points="9 15 12 18 15 15" />
            </svg>
          </span>
          <span style={{ flex: 1, fontSize: 12 }}>Resume.pdf</span>
          <span style={{ fontSize: 10, color: "var(--comment)" }}>↓</span>
        </a>

        <a
          href="https://github.com/unKnownNG"
          target="_blank"
          rel="noopener noreferrer"
          className="quick-link group"
        >
          <span className="quick-link-icon-wrapper">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </span>
          <span style={{ flex: 1, fontSize: 12 }}>GitHub Profile</span>
          <span style={{ fontSize: 10, color: "var(--comment)" }}>↗</span>
        </a>

        <a
          href="https://linkedin.com/in/mohammed-daiyaan-6791a7276"
          target="_blank"
          rel="noopener noreferrer"
          className="quick-link group"
        >
          <span className="quick-link-icon-wrapper">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.65 1.65 0 0 0 1.65-1.65A1.66 1.66 0 0 0 6.46 5.46a1.66 1.66 0 0 0-1.66 1.65 1.65 1.65 0 0 0 1.66 1.65m1.39 9.74v-8.37H5.07v8.37h2.78z" />
            </svg>
          </span>
          <span style={{ flex: 1, fontSize: 12 }}>LinkedIn</span>
          <span style={{ fontSize: 10, color: "var(--comment)" }}>↗</span>
        </a>
      </div>

      {/* Terminal Hint */}
      <div style={{ marginTop: "auto", padding: "12px 14px", borderTop: "1px solid color-mix(in srgb, var(--border) 50%, transparent)" }}>
        <p style={{ fontSize: 10, color: "var(--comment)", fontFamily: "'Fira Code', monospace", lineHeight: 1.6 }}>
          <span style={{ color: "var(--green)" }}>$</span> Try the terminal below<br />
          <span style={{ color: "var(--cyan)" }}>cd ~/projects</span> to navigate
        </p>
      </div>
    </aside>
  );
}
