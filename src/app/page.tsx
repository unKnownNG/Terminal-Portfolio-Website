"use client";

import { useState } from "react";
import BootSequence from "@/components/BootSequence";
import Terminal from "@/components/Terminal";

export default function Home() {
  const [phase, setPhase] = useState<"booting" | "terminal">("booting");

  return (
    <main className="h-screen h-[100dvh] w-screen overflow-hidden">
      {phase === "booting" && (
        <BootSequence onComplete={() => setPhase("terminal")} />
      )}
      {phase === "terminal" && <Terminal />}
    </main>
  );
}
