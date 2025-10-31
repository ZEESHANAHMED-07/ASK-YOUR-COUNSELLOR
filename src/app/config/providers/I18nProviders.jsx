"use client";

import React from "react";
import { I18nProvider } from "../../../lib/i18n";

export default function I18nProviders({ children }) {
  return <I18nProvider>{children}</I18nProvider>;
}
