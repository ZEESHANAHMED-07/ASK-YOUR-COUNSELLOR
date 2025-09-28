// src/app/blog/[slug]/page.js
import { use } from "react";
import CategoryClient from "./CategoryClient";

export default function BlogCategoryPage({ params }) {
  const { slug } = use(params);
  return <CategoryClient slug={slug} />;
}
