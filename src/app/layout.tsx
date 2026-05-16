import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono, Playfair_Display } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/metadata";

import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  ...createMetadata({
    title: siteConfig.name,
    description: siteConfig.description,
    path: "/",
  }),
  metadataBase: new URL(siteConfig.url),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${playfair.variable} ${jetbrains.variable} min-h-screen font-sans text-base antialiased`}
      >
        <Header />
        <main className="mx-auto w-full max-w-content px-gutter py-10 md:py-14">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
