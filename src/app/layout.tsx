import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Austin Dest",
  description: "Austin Dest, DJ, Producer, and Musician",
  keywords: [
    "Austin",
    "Austin Dest",
    "Dest",
    "DJ Austin",
    "DJ Austin Dest",
    "DJ",
    "JayDee",
    "Austin Martin",
    "House",
    "Progressive",
    "Groove",
    "ADE",
    "A.D.E.",
    "Amsterdam",
    "Amsterdam Dance Event",
    "Amsterdam Dance Event 2023",
    "Amsterdam Dance Event 2022",
  ],
  creator: "Pieter Rees",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
