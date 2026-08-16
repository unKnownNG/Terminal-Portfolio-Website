"use client";

import { useState } from "react";
import BootSequence from "@/components/BootSequence";
import DesktopLayout from "@/components/desktop/DesktopLayout";

export default function Home() {
  const [phase, setPhase] = useState<"booting" | "desktop">("booting");

  return (
    <main style={{ width: "100vw", height: "100dvh", overflow: "hidden" }}>
      {phase === "booting" && (
        <BootSequence onComplete={() => setPhase("desktop")} />
      )}
      {phase === "desktop" && <DesktopLayout />}
    </main>
  );
}
