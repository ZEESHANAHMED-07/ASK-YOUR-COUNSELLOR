// src/components/ui/Button.js
// Minimal shadcn-style Button with variant and size support
// Usage:
//   <Button>Primary</Button>
//   <Button variant="secondary">Secondary</Button>
//   <Button href="/login" size="sm">Login</Button>

"use client";

import { cn } from "../../lib/utils";
import Link from "next/link";

const VARIANTS = {
  default:
    "bg-foreground text-background hover:bg-[color-mix(in_oklch,var(--foreground),black_12%)]",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),black_6%)]",
  ghost:
    "bg-transparent text-foreground hover:bg-[oklch(0.97_0.003_264.5)]",
};

const SIZES = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-base",
};

export default function Button({
  asChild = false,
  href,
  variant = "default",
  size = "md",
  className = "",
  ...props
}) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-md font-medium transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
    "disabled:pointer-events-none disabled:opacity-50",
    SIZES[size] || SIZES.md,
    VARIANTS[variant] || VARIANTS.default,
    className
  );

  // If href is provided, render a Next.js Link styled like a button to avoid nested interactive elements
  if (href) {
    return <Link href={href} className={classes} {...props} />;
  }

  if (asChild) {
    // Renders a non-interactive element that can be wrapped by Link for navigation
    return <span className={classes} {...props} />;
  }

  return <button className={classes} {...props} />;
}
