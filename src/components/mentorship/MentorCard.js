// src/components/mentorship/MentorCard.js
// Mentor card using shadcn-style Card and Button

import { Users, Star } from "lucide-react";
import Button from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";

export default function MentorCard({ mentor }) {
  return (
    <Card className="h-full">
      <CardHeader className="flex items-center gap-3">
        <Users className="h-5 w-5" aria-hidden="true" />
        <div>
          <CardTitle className="text-base">{mentor.name}</CardTitle>
          <CardDescription>{mentor.title}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm">
          <Star className="h-4 w-4 text-[oklch(0.769_0.188_70.08)]" aria-hidden="true" />
          <span className="text-muted-foreground">{mentor.rating} / 5.0</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Book Session</Button>
      </CardFooter>
    </Card>
  );
}
