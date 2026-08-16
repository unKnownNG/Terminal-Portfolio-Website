"use client";

import { useNavigation, Page } from "@/lib/navigationStore";

const COMMAND_HINTS = [
  { cmd: "help", desc: "Show available shell commands" },
  { cmd: "neofetch", desc: "Display Linux system info card" },
  { cmd: "cd ~/projects", desc: "Switch GUI page to Projects" },
  { cmd: "cd ~/experience", desc: "Switch GUI page to Experience" },
  { cmd: "cd ~/skills", desc: "Switch GUI page to Skills" },
  { cmd: "cd ~/contact", desc: "Switch GUI page to Contact" },
  { cmd: "theme cyberpunk", desc: "Change theme (dracula, cyberpunk, hacker)" },
  { cmd: "about", desc: "Print systems developer bio" },
  { cmd: "clear", desc: "Clear terminal screen buffer" },
];

export default function CommandReference() {
  const { navigate } = useNavigation();

  const handleCommandClick = (cmd: string) => {
    if (cmd.startsWith("cd ~/")) {
      const pageKey = cmd.replace("cd ~/", "") as Page;
      navigate(pageKey);
    }
  };

  return (
    <div className="embedded-terminal-commands flex flex-col h-full bg-surface/50 font-mono">
      <div className="text-[10px] font-bold text-comment uppercase tracking-wider mb-2 pb-1 border-b border-border flex items-center justify-between">
        <span>Quick Commands</span>
        <span className="text-green text-[9px]">● Interactive</span>
      </div>
      <div className="flex-1 space-y-1.5 overflow-y-auto pr-1">
        {COMMAND_HINTS.map((item) => (
          <div
            key={item.cmd}
            onClick={() => handleCommandClick(item.cmd)}
            className="group cursor-pointer p-1.5 rounded hover:bg-surface-light border border-transparent hover:border-border transition-colors"
          >
            <div className="text-cyan font-bold text-[11px] group-hover:text-primary transition-colors">
              {item.cmd}
            </div>
            <div className="text-[10px] text-comment line-clamp-1">
              {item.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
