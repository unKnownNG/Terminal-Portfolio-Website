"use client";

import { useState, useEffect } from "react";
import { useNavigation } from "@/lib/navigationStore";
import { motion } from "framer-motion";

interface ContactChannel {
  icon: string;
  name: string;
  label: string;
  value: string;
  href: string;
  color: string;
  cliCommand?: string;
}

const CHANNELS: ContactChannel[] = [
  {
    icon: "📧",
    name: "Email",
    label: "Direct Inbox",
    value: "mohammeddaiyaan2005@gmail.com",
    href: "mailto:mohammeddaiyaan2005@gmail.com",
    color: "#8be9fd",
    cliCommand: "goto mail",
  },
  {
    icon: "🐙",
    name: "GitHub",
    label: "Code & Contributions",
    value: "github.com/unKnownNG",
    href: "https://github.com/unKnownNG",
    color: "#50fa7b",
    cliCommand: "goto github",
  },
  {
    icon: "💼",
    name: "LinkedIn",
    label: "Professional Profile",
    value: "linkedin.com/in/mohammed-daiyaan-6791a7276",
    href: "https://linkedin.com/in/mohammed-daiyaan-6791a7276",
    color: "#bd93f9",
    cliCommand: "goto linkedin",
  },
  {
    icon: "📱",
    name: "Phone",
    label: "Mobile / WhatsApp",
    value: "+91 7867922818",
    href: "tel:+917867922818",
    color: "#ffb86c",
  },
  {
    icon: "📍",
    name: "Location",
    label: "Current Base",
    value: "Chennai, Tamil Nadu, India",
    href: "",
    color: "#ff79c6",
  },
];

const PRESETS = [
  { label: "💼 Job Opportunity", msg: "Hi Mohammed, I saw your portfolio and would like to discuss an engineering role with our team." },
  { label: "🤝 OSS Collaboration", msg: "Hey Mohammed! I'm interested in collaborating on systems/embedded open-source projects." },
  { label: "☕ Quick Chat", msg: "Hello Mohammed, I'd love to connect and chat about OS development and compilers!" },
];

export default function ContactPage() {
  const { navigate } = useNavigation();
  const [copied, setCopied] = useState<string | null>(null);
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }) + " IST"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormState({ name: "", email: "", subject: "", message: "" });
      }, 5000);
    }, 900);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Breadcrumb */}
      <div className="breadcrumb" style={{ marginBottom: 0 }}>
        <span>📬</span>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-active">~/contact</span>
      </div>

      {/* Header & Status Banner */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexWrap: "wrap",
        gap: 12,
        paddingBottom: 4,
      }}>
        <div>
          <h1 style={{ fontSize: "clamp(20px, 2.5vw, 26px)", fontWeight: 700, color: "var(--foreground)", fontFamily: "'Fira Code', monospace" }}>
            📬 Communication Hub
          </h1>
          <p style={{ fontSize: 11, color: "var(--comment)", fontFamily: "'Fira Code', monospace", marginTop: 4 }}>
            Direct channels for opportunities, collaborations, and engineering discussions.
          </p>
        </div>

        {/* Live Status Indicators */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "4px 10px",
            background: "color-mix(in srgb, var(--green) 12%, transparent)",
            border: "1px solid color-mix(in srgb, var(--green) 35%, transparent)",
            borderRadius: 4,
            fontSize: 10,
            fontFamily: "'Fira Code', monospace",
            color: "var(--green)",
            fontWeight: 600,
          }}>
            <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "var(--green)", boxShadow: "0 0 6px var(--green)" }} />
            OPEN TO OPPORTUNITIES
          </div>

          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "4px 10px",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 4,
            fontSize: 10,
            fontFamily: "'Fira Code', monospace",
            color: "var(--comment)",
          }}>
            <span>🕒</span>
            <span>{time || "UTC+5:30"}</span>
          </div>
        </div>
      </div>

      {/* Two Column Interactive Windows */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: 14 }}>
        
        {/* Left: Contact Channels Window */}
        <div className="window-pane" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <div className="window-header">
            <span className="window-dot window-dot-red" />
            <span className="window-dot window-dot-yellow" />
            <span className="window-dot window-dot-green" />
            <span className="window-title">channels.json — Direct Endpoints</span>
          </div>

          <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
            {CHANNELS.map((ch) => (
              <div
                key={ch.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 12px",
                  background: "var(--surface-light)",
                  border: "1px solid var(--border)",
                  borderRadius: 6,
                  transition: "all 0.15s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                  <span style={{ fontSize: 18 }}>{ch.icon}</span>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: 8.5, color: "var(--comment)", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Fira Code', monospace" }}>
                      {ch.label}
                    </p>
                    {ch.href ? (
                      <a
                        href={ch.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: ch.color,
                          fontFamily: "'Fira Code', monospace",
                          textDecoration: "none",
                          display: "block",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                        onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
                      >
                        {ch.value}
                      </a>
                    ) : (
                      <p style={{ fontSize: 11, fontWeight: 600, color: "var(--foreground)", fontFamily: "'Fira Code', monospace" }}>
                        {ch.value}
                      </p>
                    )}
                  </div>
                </div>

                {ch.href && (
                  <button
                    onClick={() => handleCopy(ch.value, ch.name)}
                    style={{
                      padding: "3px 8px",
                      background: copied === ch.name ? "color-mix(in srgb, var(--green) 20%, transparent)" : "var(--surface)",
                      border: copied === ch.name ? "1px solid var(--green)" : "1px solid var(--border)",
                      color: copied === ch.name ? "var(--green)" : "var(--comment)",
                      borderRadius: 4,
                      fontSize: 9.5,
                      fontFamily: "'Fira Code', monospace",
                      cursor: "pointer",
                      fontWeight: 600,
                      transition: "all 0.15s ease",
                      flexShrink: 0,
                      marginLeft: 8,
                    }}
                  >
                    {copied === ch.name ? "✓ Copied" : "Copy"}
                  </button>
                )}
              </div>
            ))}

            {/* Quick Terminal Telemetry Card */}
            <div style={{
              marginTop: "auto",
              padding: "10px 12px",
              background: "color-mix(in srgb, var(--surface) 90%, black)",
              border: "1px dashed color-mix(in srgb, var(--border) 60%, transparent)",
              borderRadius: 6,
              fontFamily: "'Fira Code', monospace",
              fontSize: 9.5,
              lineHeight: 1.6,
            }}>
              <p style={{ color: "var(--comment)" }}>
                <span style={{ color: "var(--green)" }}>$</span> quick-dispatch:
              </p>
              <p style={{ color: "var(--foreground)", marginTop: 2 }}>
                Response time: <span style={{ color: "var(--cyan)" }}>&lt; 24 hours</span> • Preferred: <span style={{ color: "var(--primary-bright)" }}>Email / LinkedIn</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right: Message Dispatcher Form Window */}
        <div className="window-pane" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <div className="window-header">
            <span className="window-dot window-dot-red" />
            <span className="window-dot window-dot-yellow" />
            <span className="window-dot window-dot-green" />
            <span className="window-title">send_message.sh — Interactive Dispatcher</span>
          </div>

          <div style={{ padding: 14, flex: 1, display: "flex", flexDirection: "column" }}>
            {submitted ? (
              <div style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "24px 16px",
                fontFamily: "'Fira Code', monospace",
              }}>
                <span style={{ fontSize: 36, marginBottom: 8 }}>🚀</span>
                <p style={{ fontSize: 14, fontWeight: 700, color: "var(--green)", marginBottom: 4 }}>
                  [EXIT 0] Message Transmitted Successfully!
                </p>
                <p style={{ fontSize: 10.5, color: "var(--comment)", maxWidth: 320, lineHeight: 1.6 }}>
                  Thank you for reaching out. I will get back to you shortly at <span style={{ color: "var(--cyan)" }}>{formState.email}</span>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                
                {/* Preset Chips */}
                <div>
                  <label style={{ fontSize: 8.5, color: "var(--comment)", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Fira Code', monospace", display: "block", marginBottom: 4 }}>
                    QUICK MESSAGE PRESETS
                  </label>
                  <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                    {PRESETS.map((p) => (
                      <button
                        key={p.label}
                        type="button"
                        onClick={() => setFormState((prev) => ({ ...prev, message: p.msg }))}
                        style={{
                          padding: "3px 8px",
                          background: "var(--surface)",
                          border: "1px solid var(--border)",
                          borderRadius: 4,
                          fontSize: 9,
                          fontFamily: "'Fira Code', monospace",
                          color: "var(--comment)",
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "var(--primary)";
                          e.currentTarget.style.color = "var(--foreground)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "var(--border)";
                          e.currentTarget.style.color = "var(--comment)";
                        }}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name and Email Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))", gap: 10 }}>
                  <div>
                    <label style={{ fontSize: 8.5, color: "var(--comment)", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Fira Code', monospace", display: "block", marginBottom: 3 }}>
                      SENDER_NAME <span style={{ color: "var(--red)" }}>*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Linus Torvalds"
                      style={{
                        width: "100%",
                        padding: "7px 10px",
                        background: "var(--surface-light)",
                        border: "1px solid var(--border)",
                        borderRadius: 4,
                        color: "var(--foreground)",
                        fontFamily: "'Fira Code', monospace",
                        fontSize: 10.5,
                        outline: "none",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: 8.5, color: "var(--comment)", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Fira Code', monospace", display: "block", marginBottom: 3 }}>
                      SENDER_EMAIL <span style={{ color: "var(--red)" }}>*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="e.g. recruiter@company.com"
                      style={{
                        width: "100%",
                        padding: "7px 10px",
                        background: "var(--surface-light)",
                        border: "1px solid var(--border)",
                        borderRadius: 4,
                        color: "var(--foreground)",
                        fontFamily: "'Fira Code', monospace",
                        fontSize: 10.5,
                        outline: "none",
                      }}
                    />
                  </div>
                </div>

                {/* Subject Line */}
                <div>
                  <label style={{ fontSize: 8.5, color: "var(--comment)", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Fira Code', monospace", display: "block", marginBottom: 3 }}>
                    SUBJECT_FLAG
                  </label>
                  <input
                    type="text"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    placeholder="--subject='Embedded Systems Opportunity'"
                    style={{
                      width: "100%",
                      padding: "7px 10px",
                      background: "var(--surface-light)",
                      border: "1px solid var(--border)",
                      borderRadius: 4,
                      color: "var(--foreground)",
                      fontFamily: "'Fira Code', monospace",
                      fontSize: 10.5,
                      outline: "none",
                    }}
                  />
                </div>

                {/* Message Textarea */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                  <label style={{ fontSize: 8.5, color: "var(--comment)", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Fira Code', monospace", display: "block", marginBottom: 3 }}>
                    MESSAGE_PAYLOAD <span style={{ color: "var(--red)" }}>*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Type your message or select a preset above..."
                    style={{
                      width: "100%",
                      flex: 1,
                      padding: "8px 10px",
                      background: "var(--surface-light)",
                      border: "1px solid var(--border)",
                      borderRadius: 4,
                      color: "var(--foreground)",
                      fontFamily: "'Fira Code', monospace",
                      fontSize: 10.5,
                      outline: "none",
                      resize: "none",
                      minHeight: 80,
                    }}
                  />
                </div>

                {/* Submit Action Button */}
                <motion.button
                  type="submit"
                  disabled={isSending}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  style={{
                    padding: "9px 16px",
                    background: "linear-gradient(90deg, color-mix(in srgb, var(--primary) 30%, transparent), color-mix(in srgb, var(--green) 30%, transparent))",
                    border: "1px solid var(--primary)",
                    borderRadius: 4,
                    color: "var(--primary-bright)",
                    fontFamily: "'Fira Code', monospace",
                    fontSize: 11,
                    fontWeight: 700,
                    cursor: isSending ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    marginTop: 4,
                    transition: "all 0.15s ease",
                  }}
                >
                  {isSending ? (
                    <>
                      <span>⏳</span> Transmitting payload...
                    </>
                  ) : (
                    <>
                      <span>⚡</span> Execute: send_message.sh
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 16, borderTop: "1px solid var(--border)" }}>
        <button
          onClick={() => navigate("skills")}
          style={{ background: "none", border: "none", color: "var(--comment)", cursor: "pointer", fontSize: 11, fontFamily: "'Fira Code', monospace" }}
        >
          ← ~/skills
        </button>
        <button
          onClick={() => navigate("home")}
          style={{ background: "none", border: "none", color: "var(--primary-bright)", cursor: "pointer", fontSize: 11, fontWeight: 700, fontFamily: "'Fira Code', monospace" }}
        >
          ~/home →
        </button>
      </div>
    </div>
  );
}
