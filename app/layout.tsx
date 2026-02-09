import type { Metadata } from "next";
import { Outfit, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SiteHeader } from "@/components/site-header";
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
  title: "PDF Locker - Password Protect & Encrypt PDF Documents | pdflocker.io",
  description:
    "Free online tool to add password protection, encryption, and restrictions to PDF documents. Batch process multiple files. No Adobe Acrobat required. AES-256 encryption.",
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
      </body>
    </html>
  );
}
