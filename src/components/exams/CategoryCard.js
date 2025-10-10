// src/components/exams/CategoryCard.js
// Generic category card for exam sections with a list of sub-links.

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/Card";
import { cn } from "../../lib/utils";

export default function CategoryCard({ title, desc, icon: Icon, links = [], className = "" }) {
  return (
    <Card className={cn("h-full", className)}>
      <CardHeader className="flex items-center gap-3">
        {Icon ? <Icon className="h-5 w-5" aria-hidden="true" /> : null}
        <div>
          <CardTitle className="text-base">{title}</CardTitle>
          {desc ? <CardDescription>{desc}</CardDescription> : null}
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <ul className="space-y-2">
          {links.map((l) => (
            <li key={l.href} className="text-sm">
              <Link href={l.href} className="text-foreground/90 hover:underline">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
