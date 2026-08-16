"use client";

import { useState, useRef, useEffect, KeyboardEvent, ReactNode } from "react";
import { motion } from "framer-motion";
import { executeCommand, getAllCommandNames } from "@/lib/commands/commandRegistry";
import { initTheme } from "@/lib/themeStore";
import "@/lib/commands/commands";

interface HistoryEntry {
  id: number;
  command: string;
  output: ReactNode;
}

const WELCOME_MESSAGE = (
  <div className="space-y-1 mb-1">
    <pre className="text-primary text-glow text-xs leading-tight">
{`  ╔══════════════════════════════════════════════════╗
  ║          Welcome to Portfolio Shell v1.0          ║
  ║                                                    ║
  ║   Type 'help' to see available commands            ║
  ║   Type 'neofetch' for system info                  ║
  ║   Type 'about' to learn about me                   ║
  ╚══════════════════════════════════════════════════╝`}
    </pre>
  </div>
);

export default function Terminal() {
  const [history, setHistory] = useState<HistoryEntry[]>([
    { id: 0, command: "", output: WELCOME_MESSAGE },
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [nextId, setNextId] = useState(1);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input on click anywhere
  const focusInput = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    initTheme();
    focusInput();
  }, []);

  const handleCommand = (input: string) => {
    const trimmed = input.trim();

    // Add to command history
    if (trimmed) {
      setCommandHistory((prev) => [...prev, trimmed]);
    }
    setHistoryIndex(-1);

    // Handle special commands
    if (trimmed === "clear") {
      setHistory([]);
      return;
    }

    if (trimmed === "history") {
      const historyOutput = (
        <div className="space-y-0.5">
          {commandHistory.concat(trimmed).map((cmd, i) => (
            <p key={i} className="text-foreground">
              <span className="text-comment mr-3">{String(i + 1).padStart(4, " ")}</span>
              {cmd}
            </p>
          ))}
        </div>
      );
      setHistory((prev) => [
        ...prev,
        { id: nextId, command: trimmed, output: historyOutput },
      ]);
      setNextId((n) => n + 1);
      return;
    }

    const result = executeCommand(input);
    setHistory((prev) => [
      ...prev,
      { id: nextId, command: trimmed, output: result.content },
    ]);
    setNextId((n) => n + 1);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(currentInput);
      setCurrentInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentInput("");
        } else {
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
        }
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setHistory([]);
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (!currentInput) return;

      const parts = currentInput.split(/\s+/);
      const isArgCompletion = parts.length >= 2 || currentInput.endsWith(" ");

      if (isArgCompletion) {
        // ── Argument-level completion ──────────────────────────
        const cmd = parts[0].toLowerCase();
        const argPrefix = (parts[1] ?? "").toLowerCase();

        // Known argument sets per command
        const ARG_MAP: Record<string, string[]> = {
          goto: ["linkedin", "github", "mail", "email"],
          theme: ["dracula", "cyberpunk", "nord", "monokai", "solarized"],
          cat: ["about.md", "resume.pdf", "skills.sh", "contact.json", "experience.log", "education.txt", "achievements.md"],
          projects: ["goto"],
        };

        const argOptions = ARG_MAP[cmd];
        if (!argOptions) return;

        const matches = argOptions.filter((a) => a.startsWith(argPrefix));
        if (matches.length === 1) {
          setCurrentInput(`${cmd} ${matches[0]}`);
        } else if (matches.length > 1) {
          setHistory((prev) => [
            ...prev,
            {
              id: nextId,
              command: currentInput,
              output: (
                <div className="flex flex-wrap gap-x-4">
                  {matches.map((m) => (
                    <span key={m} className="text-cyan">{m}</span>
                  ))}
                </div>
              ),
            },
          ]);
          setNextId((n) => n + 1);
        }
      } else {
        // ── Command-name completion ────────────────────────────
        const allCommands = getAllCommandNames();
        const matches = allCommands.filter((c) => c.startsWith(currentInput.toLowerCase()));
        if (matches.length === 1) {
          setCurrentInput(matches[0]);
        } else if (matches.length > 1) {
          setHistory((prev) => [
            ...prev,
            {
              id: nextId,
              command: currentInput,
              output: (
                <div className="flex flex-wrap gap-x-4">
                  {matches.map((m) => (
                    <span key={m} className="text-cyan">{m}</span>
                  ))}
                </div>
              ),
            },
          ]);
          setNextId((n) => n + 1);
        }
      }
    }
  };

  const Prompt = () => (
    <span className="whitespace-nowrap">
      <span className="text-green text-glow-green font-bold">visitor</span>
      <span className="text-foreground">@</span>
      <span className="text-primary-bright text-glow font-bold">daiyaan.portfolio</span>
      <span className="text-foreground">:</span>
      <span className="text-cyan text-glow-cyan font-bold">~</span>
      <span className="text-foreground">$ </span>
    </span>
  );

  return (
    <motion.div
      className="fixed inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="w-full h-full flex flex-col overflow-hidden border-t border-border">
        {/* Title Bar */}
        <div className="flex items-center px-4 py-2.5 bg-surface border-b border-border">
          <div className="flex gap-2 mr-4">
            <span className="w-3 h-3 rounded-full bg-red/80 hover:bg-red transition-colors cursor-pointer" />
            <span className="w-3 h-3 rounded-full bg-yellow/80 hover:bg-yellow transition-colors cursor-pointer" />
            <span className="w-3 h-3 rounded-full bg-green/80 hover:bg-green transition-colors cursor-pointer" />
          </div>
          <div className="flex-1 flex items-center justify-center">
            <span className="text-comment text-xs md:text-sm">
              visitor@daiyaan.portfolio: ~
            </span>
          </div>
          <div className="w-16" />
        </div>

        {/* Terminal Content */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto bg-background/95 backdrop-blur-sm p-4 md:p-6 font-mono text-xs md:text-sm cursor-text"
          onClick={focusInput}
        >
          {/* History */}
          {history.map((entry) => (
            <div key={entry.id} className="mb-3">
              {entry.command && (
                <div className="flex items-start">
                  <Prompt />
                  <span className="text-foreground">{entry.command}</span>
                </div>
              )}
              {entry.output && <div className="mt-1 ml-0">{entry.output}</div>}
            </div>
          ))}

          {/* Current Input Line */}
          <div className="flex items-baseline">
            <Prompt />
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-foreground font-mono text-xs md:text-sm p-0 m-0"
              style={{ caretColor: "var(--primary)", lineHeight: "1.5" }}
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
              aria-label="Terminal input"
            />
          </div>
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between px-4 py-1.5 bg-surface border-t border-border text-xs">
          <span className="text-comment">
            <span className="text-green">●</span> portfolio-sh
          </span>
          <span className="text-comment">
            {commandHistory.length} commands • UTF-8
          </span>
          <span className="text-comment">
            Ln 1, Col {currentInput.length + 1}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
