// src/components/ui/Card.js
// Minimal shadcn-style Card primitives (JavaScript, Tailwind v4 friendly)

import { cn } from "../../lib/utils";

export function Card({ className = "", children, ...props }) {
  return (
    <div className={cn("rounded-lg border bg-background text-foreground shadow-sm", className)} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ className = "", children, ...props }) {
  return (
    <div className={cn("p-4 border-b", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className = "", children, ...props }) {
  return (
    <h3 className={cn("font-semibold tracking-tight", className)} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ className = "", children, ...props }) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ className = "", children, ...props }) {
  return (
    <div className={cn("p-4", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className = "", children, ...props }) {
  return (
    <div className={cn("p-4 border-t", className)} {...props}>
      {children}
    </div>
  );
}
