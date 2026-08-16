"use client";

interface FooterBarProps {
  terminalOpen?: boolean;
  onToggleTerminal?: () => void;
}

export default function FooterBar({ terminalOpen, onToggleTerminal }: FooterBarProps) {
  return (
    <footer className="footer-bar">
      <span style={{ color: "var(--comment)" }}>
        <span style={{ color: "var(--primary)" }}>daiyaan</span>@workstation:~
      </span>
      <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ color: "var(--yellow)" }}>⚡</span>
        <span>Built with Next.js</span>
        <span style={{ color: "var(--border)" }}>•</span>
        <span>Deployed on Vercel</span>
      </span>
      <button
        type="button"
        onClick={onToggleTerminal}
        style={{
          background: terminalOpen ? "color-mix(in srgb, var(--primary) 20%, transparent)" : "transparent",
          border: terminalOpen ? "1px solid color-mix(in srgb, var(--primary) 40%, transparent)" : "1px solid transparent",
          color: terminalOpen ? "var(--primary-bright)" : "var(--comment)",
          cursor: "pointer",
          padding: "2px 8px",
          borderRadius: 4,
          fontFamily: "'Fira Code', monospace",
          fontSize: 10,
          display: "flex",
          alignItems: "center",
          gap: 6,
          transition: "all 0.15s ease",
        }}
        title="Toggle floating terminal (Ctrl+`)"
      >
        <span style={{ color: "var(--green)" }}>{terminalOpen ? "▼" : "▲"}</span>
        <span>portfolio-sh</span>
        <span style={{
          fontSize: 8.5,
          padding: "0 4px",
          borderRadius: 3,
          background: "color-mix(in srgb, var(--surface) 80%, transparent)",
          border: "1px solid var(--border)",
          color: "var(--cyan)",
        }}>
          {terminalOpen ? "ESC to close" : "[>_]"}
        </span>
      </button>
    </footer>
  );
}
