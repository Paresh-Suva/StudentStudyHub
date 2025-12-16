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
  metadataBase: new URL("https://student-study-hub.vercel.app"),
  title: {
    default: "Student Study Hub | Free Engineering Notes & Resources",
    template: "%s | Student Study Hub",
  },
  description: "The ultimate academic resource platform. Download free GTU notes, syllabus copies, engineering study material, and previous year papers.",
  keywords: ["StudentStudyHub", "GTU Notes", "Engineering Notes", "College Study Material", "Syllabus", "Exam Papers", "Java Notes", "Computer Science"],
  authors: [{ name: "Student Community" }],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "Student Study Hub | Free Engineering Notes",
    description: "The ultimate academic resource platform. Download free GTU notes, syllabus copies, and study material.",
    url: "https://student-study-hub.vercel.app",
    siteName: "Student Study Hub",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Student Study Hub Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Student Study Hub | Free Engineering Notes",
    description: "Access 10,000+ verified notes, PYQs, and engineering resources.",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "YOUR_VERIFICATION_CODE_HERE",
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

