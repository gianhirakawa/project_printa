import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type Variant = "primary" | "ghost" | "light";

interface ButtonProps {
  children: ReactNode;
  /** React Router route (e.g. "/#quote", "/services/apparel") */
  to?: string;
  /** External URL (tel:, mailto:, https://…) */
  href?: string;
  type?: "button" | "submit";
  variant?: Variant;
  sm?: boolean;
  block?: boolean;
  className?: string;
  onClick?: () => void;
}

const variantClass: Record<Variant, string> = {
  primary: "",
  ghost: "btn--ghost",
  light: "btn--light",
};

/**
 * Offset-shadow button (the signature print effect).
 * Render as <a> (href), <Link> (to), or <button> depending on the props given.
 */
export default function Button({
  children,
  to,
  href,
  type = "button",
  variant = "primary",
  sm,
  block,
  className = "",
  onClick,
}: ButtonProps) {
  const classes = [`btn`, variantClass[variant], sm && "btn--sm", block && "btn--block", className].filter(Boolean).join(" ");

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }
  if (href) {
    const external = href.startsWith("http");
    return (
      <a className={classes} href={href} {...(external ? { target: "_blank", rel: "noopener" } : {})}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
