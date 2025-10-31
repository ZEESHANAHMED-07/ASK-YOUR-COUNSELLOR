export const metadata = {
  title: "AskYourCounsellor",
  description: "Mentorship, exam guidance, and courses for ambitious students.",
};
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import AuthProvider from "./config/providers/AuthProvider";
import I18nProviders from "./config/providers/I18nProviders";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

 
export default function RootLayout({ children }) {
  const lang = "en";
  return (
    <html lang={lang}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background text-foreground antialiased`}
      >
        <Suspense fallback={null}>
          <AuthProvider>
            <I18nProviders>
              <Header />
              <main className="min-h-[70vh]">{children}</main>
              <Footer />
            </I18nProviders>
          </AuthProvider>
        </Suspense>
      </body>
    </html>
  );
}

