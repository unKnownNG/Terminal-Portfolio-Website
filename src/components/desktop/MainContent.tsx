"use client";

import { useNavigation, Page } from "@/lib/navigationStore";
import { motion, AnimatePresence } from "framer-motion";
import HomePage from "@/components/pages/HomePage";
import ProjectsPage from "@/components/pages/ProjectsPage";
import ExperiencePage from "@/components/pages/ExperiencePage";
import OpenSourcePage from "@/components/pages/OpenSourcePage";
import SkillsPage from "@/components/pages/SkillsPage";
import ContactPage from "@/components/pages/ContactPage";

const PAGE_MAP: Record<Page, React.ComponentType> = {
  home:       HomePage,
  projects:   ProjectsPage,
  experience: ExperiencePage,
  opensource: OpenSourcePage,
  skills:     SkillsPage,
  contact:    ContactPage,
};

export default function MainContent() {
  const { page } = useNavigation();
  const PageComponent = PAGE_MAP[page];

  return (
    <div className="main-content-inner" style={{ minHeight: "100%" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18 }}
        >
          <PageComponent />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
