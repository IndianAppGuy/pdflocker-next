import type { Metadata } from "next";
import { Outfit, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SiteHeader } from "@/components/site-header";
import DataFastAnalytics from "@/components/global/DataFast";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Password Protect PDF Online Free — Encrypt & Lock PDF | PDF Locker",
  description:
    "Add password protection to PDF files online for free. AES-256 encryption, set open & permission passwords, restrict editing & printing. No signup, no software needed.",
  keywords: [
    "password protect pdf",
    "pdf locker",
    "encrypt pdf",
    "lock pdf",
    "how to password protect a pdf",
    "pdf encryption",
    "add password to pdf",
    "protect pdf online free",
  ],
  openGraph: {
    title: "Password Protect PDF Online Free — Encrypt & Lock PDF",
    description:
      "Add password protection to PDF files online for free. AES-256 encryption, restrict editing & printing. No signup needed.",
    url: "https://pdflocker.io",
    siteName: "PDF Locker",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Password Protect PDF Online Free — Encrypt & Lock PDF",
    description:
      "Add password protection to PDF files online for free. AES-256 encryption, restrict editing & printing.",
  },
  alternates: {
    canonical: "https://pdflocker.io",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.className} ${geistMono.variable} antialiased`}
      >
        <TooltipProvider delayDuration={300}>
          <SiteHeader />
          {children}
        </TooltipProvider>
        <Toaster richColors position="bottom-right" />
        <DataFastAnalytics />
      </body>
    </html>
  );
}
