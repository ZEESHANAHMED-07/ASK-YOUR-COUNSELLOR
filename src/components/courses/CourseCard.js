// src/components/courses/CourseCard.js
// Course card using shadcn-style Card and Button

import { GraduationCap } from "lucide-react";
import Button from "../ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/Card";
import { useI18n } from "../../lib/i18n";

export default function CourseCard({ course }) {
  const { t } = useI18n();
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
        <p className="text-sm text-muted-foreground">{t("courses.card_desc")}</p>
      </CardContent>
      <CardFooter>
        <Button
          variant="secondary"
          className="w-full"
          href={
            course.href ||
            `/courses/${encodeURIComponent(String(course.title || "").toLowerCase())}`
          }
        >
          {t("common.view_details")}
        </Button>
      </CardFooter>
    </Card>
  );
}
