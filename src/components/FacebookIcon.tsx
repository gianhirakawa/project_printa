interface FacebookIconProps {
  className?: string;
}

/**
 * Facebook "f" mark. lucide-react dropped brand icons in v1, so this is a
 * hand-rolled inline SVG matching lucide's 24px stroke style.
 */
export default function FacebookIcon({ className }: FacebookIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
