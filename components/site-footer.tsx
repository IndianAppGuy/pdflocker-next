import { Lock, Shield, Heart, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const FOOTER_LINKS = {
  product: [
    { label: "PDF Locker", href: "/" },
    { label: "PDF Unlocker", href: "#" },
    { label: "PDF Merger", href: "#" },
    { label: "PDF Compressor", href: "#" },
  ],
  resources: [
    { label: "Blog", href: "/blog" },
    { label: "How It Works", href: "/#how-to" },
    { label: "FAQ", href: "/#faq" },
    { label: "Security", href: "/#why-this" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              <span className="text-lg font-semibold tracking-tight">
                pdflocker.io
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Secure your PDF documents with military-grade encryption. Free,
              fast, and private. No signup required.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Shield className="h-3.5 w-3.5" />
              <span>Your files never leave your browser</span>
            </div>
            <a
              href="mailto:hey@pdflocker.io"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>hey@pdflocker.io</span>
            </a>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Product</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.product.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Resources</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Legal</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} pdflocker.io. All rights
            reserved.
          </p>
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            Made with <Heart className="h-3 w-3 text-red-500" /> for secure
            document management
          </p>
        </div>
      </div>
    </footer>
  );
}
