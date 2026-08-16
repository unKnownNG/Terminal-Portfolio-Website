"use client";

import { useState, useEffect } from "react";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function formatTime(d: Date) {
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function formatUptime(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h}h ${pad(m)}m`;
}

export default function StatusBar() {
  const [time, setTime] = useState("");
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    // Simulated uptime — starts at a realistic value
    const BASE_UPTIME = 3 * 3600 + 42 * 60; // 3h 42m
    const startRef = Date.now();

    const tick = () => {
      const now = new Date();
      setTime(formatTime(now));
      setUptime(BASE_UPTIME + Math.floor((Date.now() - startRef) / 1000));
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="status-bar">
      {/* Left — hostname */}
      <div className="status-pill" style={{ color: "var(--green)", borderColor: "color-mix(in srgb, var(--green) 25%, transparent)" }}>
        <span style={{ color: "var(--green)" }}>⬡</span>
        <span style={{ color: "var(--primary-bright)", fontWeight: 600 }}>daiyaan</span>
        <span style={{ color: "var(--comment)" }}>@workstation:~</span>
      </div>

      {/* Center — kernel info */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center", gap: 8 }}>
        <div className="status-pill">
          <span style={{ color: "var(--yellow)" }}>🐧</span>
          <span style={{ color: "var(--foreground)" }}>Linux 6.8.0-arch1-1</span>
        </div>
        <div className="status-pill">
          <span style={{ color: "var(--cyan)" }}>⏱</span>
          <span>Uptime: {formatUptime(uptime)}</span>
        </div>
      </div>

      {/* Right — clock */}
      <div className="status-pill" style={{ color: "var(--orange)" }}>
        <span>🕐</span>
        <span style={{ fontWeight: 600, letterSpacing: "0.05em" }}>{time}</span>
      </div>
    </div>
  );
}
