"use client";

import { ReactNode } from "react";

interface WindowPaneProps {
  title: string;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  noPadding?: boolean;
}

export default function WindowPane({ title, children, className = "", style = {}, noPadding = false }: WindowPaneProps) {
  return (
    <div className={`window-pane ${className}`} style={style}>
      <div className="window-header">
        <span className="window-dot window-dot-red" />
        <span className="window-dot window-dot-yellow" />
        <span className="window-dot window-dot-green" />
        <span className="window-title">{title}</span>
      </div>
      <div style={noPadding ? undefined : { padding: "12px" }}>
        {children}
      </div>
    </div>
  );
}
