"use client";

import { Lock, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function SiteHeader() {
  const handleDownload = () => {
    toast.info("Coming soon! Desktop app is under development.");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <a href="/" className="flex items-center gap-2">
          <Lock className="h-5 w-5 text-primary" />
          <span className="text-lg font-semibold tracking-tight">
            pdflocker.io
          </span>
        </a>

        <Button variant="outline" size="sm" onClick={handleDownload}>
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
      </div>
    </header>
  );
}
