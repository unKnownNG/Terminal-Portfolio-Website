"use client";

import { motion } from "framer-motion";

const EXPERIENCE = [
  {
    role: "Software Engineering Intern",
    company: "CVRDE, DRDO",
    location: "Chennai",
    period: "May 2025 — Dec 2025",
    type: "Internship",
    color: "var(--cyan)",
    icon: "🔬",
    details: [
      "Designed and developed a custom MATLAB-based GUI application for scientific data visualization and analysis used by DRDO researchers.",
      "Replicated and optimized key functionality of a proprietary software tool, creating a cost-effective internal alternative.",
      "Improved workflow efficiency for data analysis through interactive visualization and simplified user interaction.",
    ],
    tags: ["MATLAB", "GUI", "Data Visualization", "Defense R&D"],
  },
  {
    role: "Control Systems Engineer",
    company: "Ad Astra Rover Team",
    location: "Chennai",
    period: "Oct 2024 — Sep 2025",
    type: "Robotics Team",
    color: "var(--orange)",
    icon: "🚀",
    details: [
      "Developed embedded control software for rover subsystems using STM32 and Arduino microcontrollers.",
      "Integrated hardware sensors and actuators with ROS2-based control pipelines for autonomous rover operations.",
      "Collaborated in a multidisciplinary robotics team to design and test embedded and control system components.",
    ],
    tags: ["STM32", "ROS2", "Arduino", "Embedded Systems", "CAN Bus"],
  },
];

export default function ExperiencePage() {
  return (
    <div>
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span>💼</span>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-active">~/experience</span>
      </div>

      <div className="timeline">
        {EXPERIENCE.map((exp, idx) => (
          <motion.div
            key={exp.role + exp.company}
            className="timeline-entry"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.15 }}
          >
            <div className="timeline-dot" style={{ background: exp.color }} />

            <div style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 6,
              overflow: "hidden",
              borderLeft: `3px solid ${exp.color}`,
            }}>
              {/* Header */}
              <div style={{
                padding: "10px 14px",
                borderBottom: "1px solid var(--border)",
                background: "var(--window-header)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 8,
              }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 16 }}>{exp.icon}</span>
                    <p style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: exp.color,
                      fontFamily: "'Fira Code', monospace",
                    }}>
                      {exp.role}
                    </p>
                  </div>
                  <p style={{ fontSize: 11, color: "var(--foreground)", fontFamily: "'Fira Code', monospace", marginLeft: 24 }}>
                    @ {exp.company}&nbsp;
                    <span style={{ color: "var(--comment)" }}>— {exp.location}</span>
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{
                    fontSize: 9,
                    color: exp.color,
                    background: `color-mix(in srgb, ${exp.color} 10%, transparent)`,
                    border: `1px solid color-mix(in srgb, ${exp.color} 25%, transparent)`,
                    borderRadius: 3,
                    padding: "2px 7px",
                    fontFamily: "'Fira Code', monospace",
                    display: "block",
                    marginBottom: 4,
                  }}>
                    {exp.type}
                  </span>
                  <p style={{ fontSize: 10, color: "var(--comment)", fontFamily: "'Fira Code', monospace" }}>
                    {exp.period}
                  </p>
                </div>
              </div>

              {/* Details */}
              <div style={{ padding: "10px 14px" }}>
                {exp.details.map((detail, i) => (
                  <p key={i} style={{
                    fontSize: 11,
                    color: "var(--foreground)",
                    fontFamily: "'Fira Code', monospace",
                    lineHeight: 1.7,
                    marginBottom: 6,
                    display: "flex",
                    gap: 8,
                  }}>
                    <span style={{ color: exp.color, flexShrink: 0 }}>▸</span>
                    {detail}
                  </p>
                ))}

                {/* Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 8 }}>
                  {exp.tags.map((tag) => (
                    <span key={tag} className="tech-tag" style={{ fontSize: 9, padding: "1px 5px" }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Education at bottom of timeline */}
        <motion.div
          className="timeline-entry"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
        >
          <div className="timeline-dot" style={{ background: "var(--yellow)" }} />
          <div style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 6,
            borderLeft: "3px solid var(--yellow)",
          }}>
            <div style={{
              padding: "10px 14px",
              background: "var(--window-header)",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 16 }}>🎓</span>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "var(--yellow)", fontFamily: "'Fira Code', monospace" }}>
                    B.E. — Electronics &amp; Communication Engineering
                  </p>
                  <p style={{ fontSize: 11, color: "var(--comment)", fontFamily: "'Fira Code', monospace" }}>
                    Sri Sai Ram Institute of Technology, Chennai
                  </p>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{
                  fontSize: 9,
                  color: "var(--yellow)",
                  background: "color-mix(in srgb, var(--yellow) 10%, transparent)",
                  border: "1px solid color-mix(in srgb, var(--yellow) 25%, transparent)",
                  borderRadius: 3,
                  padding: "2px 7px",
                  fontFamily: "'Fira Code', monospace",
                  display: "block",
                  marginBottom: 4,
                }}>
                  Education
                </span>
                <p style={{ fontSize: 10, color: "var(--comment)", fontFamily: "'Fira Code', monospace" }}>
                  2023 — 2027
                </p>
              </div>
            </div>
            <div style={{ padding: "10px 14px" }}>
              <p style={{ fontSize: 11, color: "var(--foreground)", fontFamily: "'Fira Code', monospace" }}>
                CGPA: <span style={{ color: "var(--green)", fontWeight: 700 }}>8.16</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
