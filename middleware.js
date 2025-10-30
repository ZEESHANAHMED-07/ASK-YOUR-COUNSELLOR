import { NextResponse } from "next/server";

const SUPPORTED_LOCALES = ["en", "hi", "bn", "ta", "te"];
const DEFAULT_LOCALE = "en";

function hasLocale(pathname) {
  const seg = pathname.split("/")[1];
  return SUPPORTED_LOCALES.includes(seg);
}

export function middleware(request) {
  return NextResponse.next();
}

export const config = {
  matcher: [],
};

