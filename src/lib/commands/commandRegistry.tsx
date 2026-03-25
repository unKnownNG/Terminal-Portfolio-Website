import { ReactNode } from "react";

export interface CommandOutput {
  content: ReactNode;
}

export interface CommandHandler {
  name: string;
  description: string;
  usage?: string;
  execute: (args: string[]) => CommandOutput;
}

const commandRegistry: Map<string, CommandHandler> = new Map();

export function registerCommand(handler: CommandHandler): void {
  commandRegistry.set(handler.name, handler);
}

export function getCommand(name: string): CommandHandler | undefined {
  return commandRegistry.get(name);
}

export function getAllCommands(): CommandHandler[] {
  return Array.from(commandRegistry.values());
}

export function executeCommand(input: string): CommandOutput {
  const trimmed = input.trim();
  if (!trimmed) {
    return { content: null };
  }

  const parts = trimmed.split(/\s+/);
  const cmdName = parts[0].toLowerCase();
  const args = parts.slice(1);

  const handler = commandRegistry.get(cmdName);
  if (handler) {
    return handler.execute(args);
  }

  return {
    content: (
      <span>
        <span className="text-red">bash: {cmdName}: command not found</span>
        <br />
        <span className="text-comment">
          Type <span className="text-green">&apos;help&apos;</span> to see available
          commands.
        </span>
      </span>
    ),
  };
}
