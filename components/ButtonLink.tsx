import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

export function ButtonLink({ href, children, variant = "primary", className = "" }: ButtonLinkProps) {
  const styles = {
    primary: "bg-ink text-white hover:bg-cocoa",
    secondary: "bg-white text-ink ring-1 ring-ink/10 hover:bg-mint",
    ghost: "text-ink hover:bg-white/70"
  };

  return (
    <Link
      href={href}
      className={`focus-ring inline-flex min-h-11 items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition ${styles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
