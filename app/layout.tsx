import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { clsx } from "clsx";

const fontSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Student Study Hub - The Academic Weapon",
    template: "%s | Student Study Hub",
  },
  description: "Access 10,000+ verified notes, PYQs, and engineering resources. Join the decentralized library for students who defy the syllabus.",
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "Student Study Hub",
    description: "Unlock your academic superpower. Free notes, community, and leaderboards.",
    url: "https://studentstudyhub.vercel.app",
    siteName: "Student Study Hub",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Student Study Hub Preview",
      },
    ],
    type: "website",
  },
};

import Navbar from "@/components/Navbar";
import ConditionalFooter from "@/components/ConditionalFooter";
import GlobalBackground from "@/components/GlobalBackground";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en">
        <body
          className={clsx(
            fontSans.variable,
            "min-h-screen font-sans antialiased bg-[var(--background)] text-[var(--foreground)] selection:bg-blue-500/30",
            "flex flex-col" // Added flex-col
          )}
        >
          <GlobalBackground />
          <Navbar />

          <main className="flex-1 relative w-full">
            {children}
          </main>

          <ConditionalFooter />
          <Toaster richColors position="top-center" />
        </body>
      </html>
    </ClerkProvider>
  );
}

