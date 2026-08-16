"use client";

interface TimelineEntryProps {
  role: string;
  company: string;
  location: string;
  period: string;
  details: string[];
  isLast?: boolean;
}

export default function TimelineEntry({
  role,
  company,
  location,
  period,
  details,
  isLast = false,
}: TimelineEntryProps) {
  return (
    <div className={`timeline-line relative pb-6 ${isLast ? "pb-0" : ""}`}>
      <div className="timeline-dot" />
      <div className="space-y-1">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="text-primary-bright font-semibold text-sm">{role}</span>
          <span className="text-comment text-xs">@</span>
          <span className="text-accent text-sm font-medium">{company}</span>
          <span className="text-comment text-xs">— {location}</span>
        </div>
        <div className="text-comment text-xs mb-2">{period}</div>
        <ul className="space-y-1">
          {details.map((detail, i) => (
            <li key={i} className="text-foreground text-xs flex gap-2">
              <span className="text-green flex-shrink-0">▸</span>
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
