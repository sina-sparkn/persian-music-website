import type React from "react";
import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import MobileMenu from "@/components/mobile-menu";
import NowPlaying from "@/components/now-playing";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazirmatn",
});

export const metadata: Metadata = {
  title: "سانگ باز - دانلود آهنگ جدید",
  description:
    "دانلود بهترین موزیک های جدید ایرانی با لینک مستقیم و کیفیت عالی",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className={`${vazirmatn.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Header />
          <main className="min-h-screen pt-16 pb-24">{children}</main>
          <NowPlaying />
          <MobileMenu />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
