import Image from "next/image";
import { ExternalLink } from "lucide-react";

const SOCIALS = [
  { name: "Twitter", href: "https://twitter.com/IndianAppGuy" },
  { name: "YouTube", href: "https://youtube.com/@TheIndianAppGuy" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/lamsanskar" },
  { name: "GitHub", href: "https://github.com/theindianappguy" },
];

export function BuiltBy() {
  return (
    <section className="border-t py-16">
      <div className="mx-auto max-w-2xl px-4">
        <div className="rounded-xl border bg-card p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            <Image
              src="/sanskar.jpg"
              alt="Sanskar Tiwari"
              width={64}
              height={64}
              className="rounded-full shrink-0"
            />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground mb-1">Built by</p>
              <h3 className="text-lg font-semibold mb-2">
                <a
                  href="https://sanskartiwari.io"
                  className="hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener"
                >
                  Sanskar Tiwari
                </a>
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Founder of{" "}
                <a
                  href="https://indianappguy.com"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener"
                >
                  IndianAppGuy Tech
                </a>
                . Shipped 25+ products to 2M+ users, including{" "}
                <a
                  href="https://magicslides.app"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener"
                >
                  MagicSlides
                </a>{" "}
                and{" "}
                <a
                  href="https://sheetai.app"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener"
                >
                  SheetAI
                </a>
                . I build tools that solve real problems without making you sign
                up for stuff you don&apos;t need.
              </p>
              <div className="flex flex-wrap gap-3">
                {SOCIALS.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {s.name}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
