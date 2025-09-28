// src/app/blog/[slug]/[post]/page.js
import { use } from "react";
import PostClient from "./PostClient";

export default function BlogPostPage({ params }) {
  const { slug, post } = use(params);
  return <PostClient categorySlug={slug} postSlug={post} />;
}
