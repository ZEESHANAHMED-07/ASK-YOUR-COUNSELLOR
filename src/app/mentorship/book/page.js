// Redirect this route to /mentorship (page removed)
import { redirect } from "next/navigation";

export default function BookMentorPage() {
  redirect("/mentorship");
}
