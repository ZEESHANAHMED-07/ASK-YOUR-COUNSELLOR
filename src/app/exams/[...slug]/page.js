// src/app/exams/[...slug]/page.js
import { use } from "react";
import SlugClient from "./SlugClient";

export default function ExamsDetailPage({ params }) {
  const { slug } = use(params);
  const segments = Array.isArray(slug) ? slug : [];
  return <SlugClient segments={segments} />;
}
