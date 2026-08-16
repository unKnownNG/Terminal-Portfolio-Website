"use client";

import Image from "next/image";
import TechTag from "./TechTag";

export interface ProjectCardData {
  name: string;
  desc: string;
  tech: string[];
  link: string;
  image?: string;
}

interface ProjectCardProps {
  project: ProjectCardData;
  onOpen?: () => void;
}

export default function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const handleClick = () => {
    if (onOpen) {
      onOpen();
    } else {
      window.open(`https://${project.link}`, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="project-card" onClick={handleClick} role="button" tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}>
      {/* Image / placeholder */}
      <div className="project-card-img relative overflow-hidden">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, var(--surface-light), var(--surface))",
            }}
          >
            <pre className="text-primary text-xs leading-tight opacity-60 select-none">{`
  ██████╗ ██████╗  ██████╗
 ██╔════╝██╔═══██╗██╔════╝
 ██║     ██║   ██║██║
 ██╚════╝██╚═══██╝██╚════╝
  ██████╝ ██████╝  ██████╝`}</pre>
          </div>
        )}
        {/* Top-right GitHub link indicator */}
        <div className="absolute top-2 right-2">
          <span className="statusbar-pill text-primary text-xs">↗ GitHub</span>
        </div>
      </div>

      {/* Body */}
      <div className="project-card-body space-y-2">
        <h3 className="text-primary-bright font-semibold text-sm leading-snug">{project.name}</h3>
        <p className="text-comment text-xs leading-relaxed line-clamp-2">{project.desc}</p>
        <div className="flex flex-wrap gap-1 pt-1">
          {project.tech.slice(0, 4).map((t) => (
            <TechTag key={t} label={t} variant="cyan" />
          ))}
          {project.tech.length > 4 && (
            <TechTag label={`+${project.tech.length - 4}`} variant="primary" />
          )}
        </div>
      </div>
    </div>
  );
}
