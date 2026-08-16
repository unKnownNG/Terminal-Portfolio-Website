"use client";

import { useState, useRef, useEffect, KeyboardEvent, ReactNode } from "react";
import { executeCommand, getAllCommandNames } from "@/lib/commands/commandRegistry";
import { initTheme } from "@/lib/themeStore";
import { navigationStore } from "@/lib/navigationStore";
import "@/lib/commands/commands";

interface OutputEntry {
  id: number;
  command: string;
  output: ReactNode;
}

const CMD_REF = [
  { name: "about",      desc: "Who am I?" },
  { name: "projects",   desc: "View projects" },
  { name: "skills",     desc: "Tech skills" },
  { name: "experience", desc: "Work history" },
  { name: "opensource", desc: "OSS contributions" },
  { name: "contact",    desc: "Reach me" },
  { name: "neofetch",   desc: "System info" },
  { name: "theme",      desc: "Change theme" },
  { name: "help",       desc: "All commands" },
  { name: "clear",      desc: "Clear output" },
];

const QUICK_ACTIONS = ["projects", "skills", "contact", "clear"];

// Pre-loaded output shown on first render — makes terminal feel alive
const BOOT_OUTPUT: OutputEntry[] = [
  {
    id: -3,
    command: "whoami",
    output: <span style={{ color: "var(--green)", fontSize: 11, fontFamily: "'Fira Code', monospace" }}>visitor</span>,
  },
  {
    id: -2,
    command: "uname -a",
    output: <span style={{ color: "var(--foreground)", fontSize: 11, fontFamily: "'Fira Code', monospace" }}>Linux portfolio 6.8.0-custom #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux</span>,
  },
  {
    id: -1,
    command: "",
    output: (
      <span style={{ color: "var(--comment)", fontSize: 10, fontFamily: "'Fira Code', monospace", fontStyle: "italic" }}>
        Type a command or <span style={{ color: "var(--cyan)", fontStyle: "normal" }}>cd ~/projects</span> to navigate • Tab to autocomplete
      </span>
    ),
  },
];

interface EmbeddedTerminalProps {
  isOpen?: boolean;
  onToggleOpen?: () => void;
}

export default function EmbeddedTerminal({
  isOpen,
  onToggleOpen,
}: EmbeddedTerminalProps) {
  const [outputs, setOutputs] = useState<OutputEntry[]>(BOOT_OUTPUT);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [nextId, setNextId] = useState(1);
  const [localCollapsed, setLocalCollapsed] = useState(false);

  // Height and Drag-to-resize state
  const [height, setHeight] = useState(280);
  const [isDragging, setIsDragging] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const dragStartY = useRef<number>(0);
  const dragStartHeight = useRef<number>(280);
  const preMaxHeight = useRef<number>(280);

  // If controlled from parent (e.g. mobile tab dock), respect isOpen prop, else use local state
  const isCollapsed = isOpen !== undefined ? !isOpen : localCollapsed;

  const toggleCollapse = () => {
    if (onToggleOpen) {
      onToggleOpen();
    } else {
      setLocalCollapsed((c) => !c);
    }
  };

  const toggleMaximize = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (isMaximized) {
      setHeight(preMaxHeight.current || 280);
      setIsMaximized(false);
    } else {
      preMaxHeight.current = height;
      const targetMax = Math.max(380, Math.floor(window.innerHeight * 0.72));
      setHeight(targetMax);
      setIsMaximized(true);
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initTheme();
  }, []);

  // Global shortcut to toggle terminal: Ctrl+` or Ctrl+~
  useEffect(() => {
    const handleGlobalKey = (e: globalThis.KeyboardEvent) => {
      if ((e.ctrlKey && e.key === "`") || (e.ctrlKey && e.key === "~")) {
        e.preventDefault();
        toggleCollapse();
      }
    };
    window.addEventListener("keydown", handleGlobalKey);
    return () => window.removeEventListener("keydown", handleGlobalKey);
  }, [isCollapsed, onToggleOpen]);

  // Drag-to-resize mouse & touch listeners
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragStartY.current = e.clientY;
    dragStartHeight.current = height;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      dragStartY.current = e.touches[0].clientY;
      dragStartHeight.current = height;
    }
  };

  useEffect(() => {
    if (!isDragging) return;

    const onMouseMove = (e: MouseEvent) => {
      const delta = dragStartY.current - e.clientY;
      const maxAllowed = Math.max(220, window.innerHeight - 70);
      const newHeight = Math.max(140, Math.min(maxAllowed, dragStartHeight.current + delta));
      setHeight(newHeight);
      setIsMaximized(false);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const delta = dragStartY.current - e.touches[0].clientY;
        const maxAllowed = Math.max(220, window.innerHeight - 70);
        const newHeight = Math.max(140, Math.min(maxAllowed, dragStartHeight.current + delta));
        setHeight(newHeight);
        setIsMaximized(false);
      }
    };

    const onStopDrag = () => {
      setIsDragging(false);
    };

    document.body.style.userSelect = "none";
    document.body.style.cursor = "ns-resize";

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onStopDrag);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onStopDrag);

    return () => {
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onStopDrag);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onStopDrag);
    };
  }, [isDragging]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [outputs, isCollapsed]);

  const addOutput = (command: string, output: ReactNode) => {
    setOutputs((prev) => [...prev, { id: nextId, command, output }]);
    setNextId((n) => n + 1);
  };

  const handleCommand = (raw: string) => {
    const trimmed = raw.trim();
    if (trimmed) setCmdHistory((p) => [...p, trimmed]);
    setHistIdx(-1);
    if (!trimmed) return;

    // clear
    if (trimmed === "clear") {
      setOutputs([]);
      return;
    }

    // cd — navigate GUI
    if (trimmed.startsWith("cd ")) {
      const path = trimmed.slice(3).trim().replace(/^~\//, "");
      const validPages = ["home", "projects", "experience", "opensource", "skills", "contact"];
      if (validPages.includes(path)) {
        navigationStore.navigate(path as Parameters<typeof navigationStore.navigate>[0]);
        addOutput(trimmed, <span style={{ color: "var(--green)", fontSize: 11, fontFamily: "'Fira Code', monospace" }}>✓ Navigated to ~/{path}</span>);
      } else {
        addOutput(trimmed, <span style={{ color: "var(--red)", fontSize: 11, fontFamily: "'Fira Code', monospace" }}>cd: {path}: No such directory. Try: {validPages.map(p => `~/${p}`).join(", ")}</span>);
      }
      return;
    }

    // history
    if (trimmed === "history") {
      addOutput(trimmed, (
        <div>{cmdHistory.concat(trimmed).map((cmd, i) => (
          <p key={i} style={{ fontFamily: "'Fira Code', monospace", fontSize: 11, color: "var(--foreground)" }}>
            <span style={{ color: "var(--comment)", marginRight: 8 }}>{String(i + 1).padStart(4, " ")}</span>{cmd}
          </p>
        ))}</div>
      ));
      return;
    }

    const result = executeCommand(raw);
    addOutput(trimmed, result.content);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const newIdx = histIdx === -1 ? cmdHistory.length - 1 : Math.max(0, histIdx - 1);
        setHistIdx(newIdx);
        setInput(cmdHistory[newIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx !== -1) {
        const newIdx = histIdx + 1;
        if (newIdx >= cmdHistory.length) {
          setHistIdx(-1);
          setInput("");
        } else {
          setHistIdx(newIdx);
          setInput(cmdHistory[newIdx]);
        }
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setOutputs([]);
    } else if (e.key === "Tab") {
      e.preventDefault();
      triggerAutocomplete();
    } else if (e.key === "Escape") {
      toggleCollapse();
    }
  };

  const triggerAutocomplete = () => {
    if (!input) return;
    const matches = getAllCommandNames().filter((c) => c.startsWith(input.toLowerCase()));
    if (matches.length === 1) {
      setInput(matches[0]);
    } else if (matches.length > 1) {
      addOutput(input, (
        <span style={{ color: "var(--cyan)", fontSize: 10 }}>
          {matches.join("  ")}
        </span>
      ));
    }
  };

  const triggerHistoryUp = () => {
    if (cmdHistory.length > 0) {
      const newIdx = histIdx === -1 ? cmdHistory.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(newIdx);
      setInput(cmdHistory[newIdx]);
    }
  };

  const triggerHistoryDown = () => {
    if (histIdx !== -1) {
      const newIdx = histIdx + 1;
      if (newIdx >= cmdHistory.length) {
        setHistIdx(-1);
        setInput("");
      } else {
        setHistIdx(newIdx);
        setInput(cmdHistory[newIdx]);
      }
    }
  };

  if (isCollapsed) {
    return (
      <div
        className="terminal-panel collapsed"
        onClick={toggleCollapse}
        title="Click to open interactive terminal (Ctrl+`)"
      >
        <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "5px 12px", whiteSpace: "nowrap" }}>
          <span className="window-dot window-dot-green" />
          <span style={{ color: "var(--primary-bright)", fontWeight: 700, fontSize: 10, fontFamily: "'Fira Code', monospace" }}>&gt;_</span>
          <span style={{ color: "var(--green)", fontSize: 10, fontFamily: "'Fira Code', monospace", fontWeight: 600 }}>daiyaan</span>
          <span style={{ color: "var(--comment)", fontSize: 10, fontFamily: "'Fira Code', monospace" }}>@workstation:~</span>
          <span style={{
            fontSize: 9,
            color: "var(--primary)",
            background: "color-mix(in srgb, var(--primary) 15%, transparent)",
            border: "1px solid color-mix(in srgb, var(--primary) 30%, transparent)",
            borderRadius: 3,
            padding: "0 4px",
            fontFamily: "'Fira Code', monospace",
          }}>portfolio-sh</span>
          <span style={{ color: "var(--primary-bright)", fontSize: 9, marginLeft: 2 }}>▲</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`terminal-panel open ${isDragging ? "resizing" : ""}`}
      style={{
        height: `${height}px`,
        transition: isDragging ? "none" : "height 0.22s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* ─── Top Resizer Drag Handle Line ─── */}
      <div
        className={`terminal-resizer-line ${isDragging ? "dragging" : ""}`}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        title="Drag up/down to resize terminal height"
      >
        <div className="terminal-resizer-handle-pill" />
      </div>

      {/* ─── Panel Header ─── */}
      <div className="terminal-panel-header" onDoubleClick={toggleMaximize}>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <span
            className="window-dot window-dot-red"
            onClick={(e) => { e.stopPropagation(); toggleCollapse(); }}
            title="Close terminal"
            style={{ cursor: "pointer" }}
          />
          <span
            className="window-dot window-dot-yellow"
            onClick={(e) => { e.stopPropagation(); toggleCollapse(); }}
            title="Minimize terminal"
            style={{ cursor: "pointer" }}
          />
          <span
            className="window-dot window-dot-green"
            onClick={toggleMaximize}
            title={isMaximized ? "Restore size" : "Maximize terminal"}
            style={{ cursor: "pointer" }}
          />
        </div>

        <div
          style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, justifyContent: "center", minWidth: 0, overflow: "hidden", cursor: "pointer" }}
          onClick={toggleCollapse}
        >
          <span style={{ fontSize: 10, color: "var(--green)", fontFamily: "'Fira Code', monospace", fontWeight: 700 }}>daiyaan</span>
          <span style={{ fontSize: 10, color: "var(--comment)", fontFamily: "'Fira Code', monospace" }}>@workstation:~</span>
          <span style={{
            fontSize: 9,
            color: "var(--primary)",
            background: "color-mix(in srgb, var(--primary) 10%, transparent)",
            border: "1px solid color-mix(in srgb, var(--primary) 25%, transparent)",
            borderRadius: 3,
            padding: "0px 5px",
            fontFamily: "'Fira Code', monospace",
          }}>portfolio-sh</span>
          <span style={{ fontSize: 8.5, color: "var(--comment)", fontFamily: "'Fira Code', monospace", opacity: 0.75 }}>
            ↕ drag top line to resize
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <button
            type="button"
            onClick={toggleMaximize}
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--comment)", fontSize: 11, padding: "0 4px", lineHeight: 1 }}
            title={isMaximized ? "Restore" : "Maximize"}
            aria-label={isMaximized ? "Restore" : "Maximize"}
          >
            {isMaximized ? "❐" : "⛶"}
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleCollapse();
            }}
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--comment)", fontSize: 11, padding: "0 4px", lineHeight: 1 }}
            title="Collapse terminal"
            aria-label="Collapse terminal"
          >
            ▼
          </button>
        </div>
      </div>

      {/* ─── Panel Body (hidden when collapsed) ─── */}
      <div className="terminal-panel-body">
          {/* Left: Official Arch Linux ASCII Logo (hidden on mobile via CSS) */}
          <div className="terminal-art" style={{
            width: 180,
            padding: "8px 12px",
            borderRight: "1px solid color-mix(in srgb, var(--border) 50%, transparent)",
            overflow: "hidden",
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            userSelect: "none",
          }}>
            <pre style={{
              fontSize: 11,
              lineHeight: 1.22,
              color: "var(--cyan)",
              fontFamily: "'Fira Code', monospace",
              margin: 0,
              fontWeight: 700,
              textShadow: "0 0 14px color-mix(in srgb, var(--cyan) 50%, transparent)",
            }}>
{`       /\\
      /  \\
     /\\   \\
    /      \\
   /   ,,   \\
  /   |  |  -\\
 /_-''    ''-_\\`}
            </pre>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              marginTop: 6,
              fontSize: 9,
              fontFamily: "'Fira Code', monospace",
              color: "var(--comment)",
              letterSpacing: "0.08em",
            }}>
              <span style={{ color: "var(--green)", fontSize: 8 }}>●</span>
              <span style={{ color: "var(--primary-bright)", fontWeight: 600 }}>ARCH LINUX</span>
            </div>
          </div>

          {/* Center: Terminal output + Quick buttons + input */}
          <div className="terminal-input-area" onClick={() => inputRef.current?.focus()}>
            <div ref={outputRef} className="terminal-output">
              {outputs.map((entry) => (
                <div key={entry.id} style={{ marginBottom: 3 }}>
                  {entry.command && (
                    <p style={{ fontFamily: "'Fira Code', monospace", fontSize: 11, color: "var(--foreground)", lineHeight: 1.5 }}>
                      <span style={{ color: "var(--green)", fontWeight: 700 }}>$</span>{" "}{entry.command}
                    </p>
                  )}
                  {entry.output && (
                    <div style={{ marginTop: 1, fontSize: 11, fontFamily: "'Fira Code', monospace", lineHeight: 1.5 }}>
                      {entry.output}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Quick Command Pills for mobile & fast desktop access */}
            <div className="terminal-quick-actions">
              {QUICK_ACTIONS.map((cmd) => (
                <button
                  key={cmd}
                  type="button"
                  className="terminal-quick-chip"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCommand(cmd);
                  }}
                >
                  {cmd}
                </button>
              ))}
            </div>

            {/* Input prompt */}
            <div className="terminal-input-line" style={{ cursor: "text" }}>
              <span
                style={{
                  color: "var(--primary-bright)",
                  fontWeight: 700,
                  fontFamily: "'Fira Code', monospace",
                  fontSize: 11,
                  lineHeight: "18px",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                visitor@daiyaan:~$
              </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{
                  flex: 1,
                  minWidth: 0,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "var(--foreground)",
                  fontFamily: "'Fira Code', monospace",
                  fontSize: 11,
                  lineHeight: "18px",
                  padding: 0,
                  margin: 0,
                  caretColor: "var(--primary)",
                }}
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="off"
                aria-label="Terminal input"
              />
            </div>

            {/* Mobile Keyboard Helpers Bar */}
            <div className="terminal-mobile-shortcuts">
              <button
                type="button"
                className="terminal-shortcut-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  triggerAutocomplete();
                  inputRef.current?.focus();
                }}
              >
                [Tab]
              </button>
              <button
                type="button"
                className="terminal-shortcut-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  triggerHistoryUp();
                  inputRef.current?.focus();
                }}
              >
                [↑]
              </button>
              <button
                type="button"
                className="terminal-shortcut-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  triggerHistoryDown();
                  inputRef.current?.focus();
                }}
              >
                [↓]
              </button>
              <button
                type="button"
                className="terminal-shortcut-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setInput((p) => (p ? `goto ` : "goto "));
                  inputRef.current?.focus();
                }}
              >
                [Goto]
              </button>
              <button
                type="button"
                className="terminal-shortcut-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setOutputs([]);
                  setInput("");
                  inputRef.current?.focus();
                }}
              >
                [Clear]
              </button>
            </div>
          </div>

          {/* Right: Command Reference (hidden on small screens via CSS) */}
          <div className="terminal-cmd-ref" style={{
            borderLeft: "1px solid color-mix(in srgb, var(--border) 50%, transparent)",
            padding: "6px 10px",
            width: 230,
            flexShrink: 0,
            overflowY: "auto",
          }}>
            <p style={{ fontSize: 8.5, fontWeight: 700, color: "var(--comment)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 5, fontFamily: "'Fira Code', monospace" }}>
              TRY THESE COMMANDS
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "1px 8px" }}>
              {CMD_REF.map((cmd) => (
                <div key={cmd.name} style={{ display: "contents" }}>
                  <span
                    onClick={() => { setInput(cmd.name); inputRef.current?.focus(); }}
                    style={{ fontSize: 10, color: "var(--cyan)", fontFamily: "'Fira Code', monospace", cursor: "pointer", lineHeight: 1.75, whiteSpace: "nowrap" }}
                    onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                    onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
                  >
                    {cmd.name}
                  </span>
                  <span style={{ fontSize: 10, color: "var(--comment)", fontFamily: "'Fira Code', monospace", lineHeight: 1.75 }}>
                    — {cmd.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
