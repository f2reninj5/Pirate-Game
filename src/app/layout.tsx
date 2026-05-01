import type { Metadata } from "next";
import { Dr_Sugiyama } from "next/font/google";
import "./globals.css";
import type { ReactNode } from "react";

const drSugiyama = Dr_Sugiyama({
  weight: "400",
  variable: "--font-dr-sugiyama",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pirate Game",
  description:
    "A mathsy classroom game of strategy, collaboration, and betrayal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${drSugiyama.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col justify-between p-2 font-sans bg-light text-dark">
        {children}
      </body>
    </html>
  );
}
