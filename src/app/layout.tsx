import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Austin Dest - DJ, Producer & Musician",
    template: "%s | Austin Dest",
  },
  description:
    "Austin Dest, professional DJ, Producer, and Musician. Experience the best in House, Progressive, and Groove music. Book for events and performances.",
  keywords: [
    "Austin Dest",
    "DJ Austin",
    "DJ Austin Dest",
    "DJ",
    "Producer",
    "Musician",
    "JayDee",
    "Austin Martin",
    "House Music",
    "Progressive House",
    "Groove",
    "ADE",
    "A.D.E.",
    "Amsterdam Dance Event",
    "Electronic Music",
    "Music Producer",
    "Event DJ",
    "Club DJ",
    "Music Performance",
  ],
  authors: [{ name: "Pieter Rees" }],
  creator: "Pieter Rees",
  publisher: "Austin Dest",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://austindest.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://austindest.com",
    title: "Austin Dest - DJ, Producer & Musician",
    description:
      "Professional DJ, Producer, and Musician specializing in House, Progressive, and Groove music.",
    siteName: "Austin Dest",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Austin Dest - DJ, Producer & Musician",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Austin Dest - DJ, Producer & Musician",
    description:
      "Professional DJ, Producer, and Musician specializing in House, Progressive, and Groove music.",
    images: ["/images/twitter-image.jpg"],
    creator: "@austindest",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ff77e9" },
    { media: "(prefers-color-scheme: dark)", color: "#ff77e9" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
