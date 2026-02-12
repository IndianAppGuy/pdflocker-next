import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { Shield, Mail, Calendar } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Privacy Policy | pdflocker.io",
  description:
    "Learn how pdflocker.io handles your data, protects your privacy, and keeps your PDF documents secure.",
  robots: {
    index: false,
    follow: false,
  },
};

const LAST_UPDATED = "February 9, 2026";

export default function PrivacyPolicyPage() {
  return (
    <>
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Shield className="h-4 w-4" />
              <span>Legal</span>
              <span className="text-muted-foreground/40">/</span>
              <span>Privacy Policy</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Privacy Policy
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
              Your privacy matters to us. This policy explains what data we
              collect, how we use it, and the steps we take to keep your
              information safe.
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Last updated: {LAST_UPDATED}</span>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
          <div className="prose-style space-y-12">
            {/* 1 */}
            <article>
              <SectionNumber number="01" />
              <h2 className="mt-2 text-xl font-semibold tracking-tight">
                Introduction
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                pdflocker.io (&quot;we&quot;, &quot;our&quot;, or
                &quot;us&quot;) is committed to protecting your privacy. This
                Privacy Policy explains how we collect, use, disclose, and
                safeguard your information when you visit our website and use our
                PDF locking service. Please read this policy carefully. If you do
                not agree with the terms, please do not access the site.
              </p>
            </article>

            <Separator />

            {/* 2 */}
            <article>
              <SectionNumber number="02" />
              <h2 className="mt-2 text-xl font-semibold tracking-tight">
                Information We Collect
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                We aim to collect the minimum amount of information necessary to
                provide our service:
              </p>
              <ul className="mt-4 space-y-3">
                <ListItem title="Uploaded Files">
                  PDF files you upload for processing. These are temporarily
                  stored on our servers solely for the purpose of applying
                  password protection and are automatically deleted within 1 hour
                  of upload.
                </ListItem>
                <ListItem title="Usage Data">
                  We may collect anonymous usage data such as browser type,
                  device type, pages visited, and time spent on the site. This
                  data is collected through standard analytics tools and cannot
                  be used to identify you personally.
                </ListItem>
                <ListItem title="Cookies">
                  We use essential cookies to ensure the proper functioning of
                  our website. We do not use tracking cookies or third-party
                  advertising cookies.
                </ListItem>
              </ul>
              <Callout>
                We do <strong>not</strong> require account creation, collect
                email addresses, or store personal identification information to
                use our service.
              </Callout>
            </article>

            <Separator />

            {/* 3 */}
            <article>
              <SectionNumber number="03" />
              <h2 className="mt-2 text-xl font-semibold tracking-tight">
                How We Use Your Information
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Any information collected is used solely for the following
                purposes:
              </p>
              <ul className="mt-4 space-y-3">
                <ListItem title="Service Delivery">
                  To process your PDF files and apply the requested password
                  protection and encryption settings.
                </ListItem>
                <ListItem title="Service Improvement">
                  To understand how our service is used and identify areas for
                  improvement through aggregated, anonymous analytics.
                </ListItem>
                <ListItem title="Security">
                  To detect, prevent, and address technical issues or potential
                  security threats.
                </ListItem>
              </ul>
            </article>

            <Separator />

            {/* 4 */}
            <article>
              <SectionNumber number="04" />
              <h2 className="mt-2 text-xl font-semibold tracking-tight">
                File Storage & Deletion
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                We take the security of your files extremely seriously:
              </p>
              <ul className="mt-4 space-y-3">
                <ListItem title="Temporary Storage">
                  Uploaded PDF files are stored temporarily on secure servers
                  solely for processing purposes.
                </ListItem>
                <ListItem title="Automatic Deletion">
                  All uploaded and processed files are automatically and
                  permanently deleted from our servers within 1 hour of upload.
                </ListItem>
                <ListItem title="No Backup">
                  We do not create backups or copies of your files. Once deleted,
                  files cannot be recovered.
                </ListItem>
                <ListItem title="Encryption in Transit">
                  All file transfers between your device and our servers are
                  encrypted using TLS (Transport Layer Security) encryption.
                </ListItem>
              </ul>
            </article>

            <Separator />

            {/* 5 */}
            <article>
              <SectionNumber number="05" />
              <h2 className="mt-2 text-xl font-semibold tracking-tight">
                Third-Party Services
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                We may use the following third-party services that have their own
                privacy policies:
              </p>
              <ul className="mt-4 space-y-3">
                <ListItem title="Cloud Infrastructure">
                  We use industry-standard cloud hosting providers to process and
                  temporarily store your files. These providers adhere to strict
                  security and privacy standards.
                </ListItem>
                <ListItem title="Analytics">
                  We may use anonymous analytics services to understand usage
                  patterns. No personally identifiable information is shared with
                  these services.
                </ListItem>
              </ul>
            </article>

            <Separator />

            {/* 6 */}
            <article>
              <SectionNumber number="06" />
              <h2 className="mt-2 text-xl font-semibold tracking-tight">
                Data Security
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                We implement appropriate technical and organizational security
                measures to protect your data, including:
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  TLS encryption for all data in transit
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  Automatic file deletion after 1 hour
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  No long-term storage of user files or personal data
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  Regular security audits and updates
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  Secure cloud infrastructure with access controls
                </li>
              </ul>
            </article>

            <Separator />

            {/* 7 */}
            <article>
              <SectionNumber number="07" />
              <h2 className="mt-2 text-xl font-semibold tracking-tight">
                Your Rights
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Since we do not collect personal data or require account
                creation, traditional data subject rights (access, rectification,
                deletion) are largely not applicable. However, if you have any
                concerns about your data, you have the right to:
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  Request information about what data we hold (if any)
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  Request deletion of any data associated with your usage
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  Lodge a complaint with a data protection authority
                </li>
              </ul>
            </article>

            <Separator />

            {/* 8 */}
            <article>
              <SectionNumber number="08" />
              <h2 className="mt-2 text-xl font-semibold tracking-tight">
                Children&apos;s Privacy
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Our service is not directed to individuals under the age of 13.
                We do not knowingly collect personal information from children
                under 13. If we become aware that a child under 13 has provided
                us with personal information, we will take steps to remove such
                information immediately.
              </p>
            </article>

            <Separator />

            {/* 9 */}
            <article>
              <SectionNumber number="09" />
              <h2 className="mt-2 text-xl font-semibold tracking-tight">
                Changes to This Policy
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                We may update this Privacy Policy from time to time. Any changes
                will be posted on this page with an updated revision date. We
                encourage you to review this policy periodically for any changes.
                Your continued use of our service after any modifications
                indicates your acceptance of the updated policy.
              </p>
            </article>

            <Separator />

            {/* 10 */}
            <article>
              <SectionNumber number="10" />
              <h2 className="mt-2 text-xl font-semibold tracking-tight">
                Contact Us
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                If you have any questions or concerns about this Privacy Policy
                or our data practices, please contact us at:
              </p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-lg border bg-card px-4 py-3">
                <Mail className="h-4 w-4 text-primary" />
                <a
                  href="mailto:hey@pdflocker.io"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  hey@pdflocker.io
                </a>
              </div>
            </article>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function SectionNumber({ number }: { number: string }) {
  return (
    <span className="inline-block text-xs font-mono font-semibold text-primary/60 tracking-widest">
      {number}
    </span>
  );
}

function ListItem({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="rounded-lg border bg-card/50 px-4 py-3">
      <p className="text-sm font-medium text-foreground">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
        {children}
      </p>
    </li>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 rounded-lg border-l-4 border-primary bg-primary/5 px-4 py-3">
      <p className="text-sm text-muted-foreground leading-relaxed">
        {children}
      </p>
    </div>
  );
}
