// src/components/courses/CourseCard.js
// Course card using shadcn-style Card and Button

import { GraduationCap } from "lucide-react";
import Button from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";

export default function CourseCard({ course }) {
  return (
    <Card className="h-full">
      <CardHeader className="flex items-center gap-3">
        <GraduationCap className="h-5 w-5" aria-hidden="true" />
        <div>
          <CardTitle className="text-base">{course.title}</CardTitle>
          <CardDescription>
            {course.level} • {course.length}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Structured lessons, focused practice, and clear outcomes.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="secondary" className="w-full">View Details</Button>
      </CardFooter>
    </Card>
  );
}
