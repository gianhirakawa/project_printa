import type { LucideIcon } from "lucide-react";

interface PhotoPlaceholderProps {
  icon: LucideIcon;
  /** One line, e.g. "Sublimation jersey" — rendered as "Photo · …" */
  label: string;
  shape?: "portrait" | "square" | "wide";
  light?: boolean;
}

/**
 * Clearly-labeled placeholder tile. Must stay obviously a placeholder —
 * never swap in stock photos that look like Printabilya's real work (AGENTS.md).
 */
export default function PhotoPlaceholder({ icon: Icon, label, shape = "portrait", light }: PhotoPlaceholderProps) {
  return (
    <div
      className={[
        "ph",
        shape === "square" && "ph--square",
        shape === "wide" && "ph--wide",
        light && "ph--light",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Icon aria-hidden="true" />
      <span className="ph__label">Photo · {label}</span>
    </div>
  );
}
