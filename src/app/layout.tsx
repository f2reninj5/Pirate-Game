import type { Metadata } from "next";
import { Dr_Sugiyama } from "next/font/google";
import "./globals.css";
import { FileQuestion } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import FeedbackDialog from "@/component/feedback-dialog";
import Logo from "@/component/logo";
import ResetDialog from "@/component/reset-dialog";
import SheetsDialog from "@/component/sheets-dialog";
import IconButton from "@/component/ui/icon-button";
import { GameProvider } from "@/context/game-context";

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
      <body className="h-full font-sans bg-light text-dark">
        <GameProvider>
          <div className="min-h-full flex flex-col justify-between p-2">
            <header className="flex flex-row justify-center gap-[15vw] items-center">
              <span className="flex flex-row gap-2">
                <Link href="/instructions">
                  <IconButton icon={FileQuestion} />
                </Link>
                <FeedbackDialog />
              </span>
              <Logo />
              <span className="flex flex-row gap-2">
                <SheetsDialog />
                <ResetDialog></ResetDialog>
              </span>
            </header>
            <main className="flex flex-row justify-center gap-2 flex-wrap">
              {children}
            </main>
            <footer className="flex flex-row justify-center items-center">
              <span>
                Copyright © 2026 Maks Nowak. Licensed under the{" "}
                <a
                  className="text-blue-600"
                  href="https://www.apache.org/licenses/LICENSE-2.0"
                >
                  Apache License, Version 2.0
                </a>
                .
              </span>
            </footer>
          </div>
        </GameProvider>
      </body>
    </html>
  );
}
