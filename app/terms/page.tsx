import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { Scale, Mail, Calendar } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Terms of Service | pdflocker.io",
  description:
    "Read the terms and conditions governing the use of pdflocker.io PDF locking service.",
  robots: {
    index: false,
    follow: false,
  },
};

const LAST_UPDATED = "February 9, 2026";

export default function TermsOfServicePage() {
  return (
    <>
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Scale className="h-4 w-4" />
              <span>Legal</span>
              <span className="text-muted-foreground/40">/</span>
              <span>Terms of Service</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Terms of Service
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
              Please read these terms carefully before using our service. By
              accessing or using pdflocker.io, you agree to be bound by these
              terms.
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Last updated: {LAST_UPDATED}</span>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
          <div className="space-y-12">
            {/* 1 */}
            <article>
              <SectionNumber number="01" />
              <h2 className="mt-2 text-xl font-semibold tracking-tight">
                Acceptance of Terms
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                By accessing and using pdflocker.io (&quot;Service&quot;,
                &quot;Website&quot;), you accept and agree to be bound by these
                Terms of Service (&quot;Terms&quot;). If you do not agree to
                these Terms, you must not access or use the Service.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                These Terms apply to all visitors, users, and others who access
                or use the Service. We reserve the right to update or modify
                these Terms at any time without prior notice. Your continued use
                of the Service constitutes acceptance of any changes.
              </p>
            </article>

            <Separator />

            {/* 2 */}
            <article>
              <SectionNumber number="02" />
              <h2 className="mt-2 text-xl font-semibold tracking-tight">
                Description of Service
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                pdflocker.io provides an online tool that allows users to add
                password protection, encryption, and access restrictions to PDF
                documents. The Service includes:
              </p>
              <ul className="mt-4 space-y-3">
                <ListItem title="PDF Password Protection">
                  Adding open passwords and permission passwords to PDF
                  documents using AES-256 bit encryption.
                </ListItem>
                <ListItem title="Access Restrictions">
                  Setting restrictions on printing, copying, editing, page
                  extraction, commenting, form filling, and document assembly.
                </ListItem>
                <ListItem title="Batch Processing">
                  Processing multiple PDF files simultaneously with the same
                  security settings.
                </ListItem>
              </ul>
            </article>

            <Separator />

            {/* 3 */}
            <article>
              <SectionNumber number="03" />
              <h2 className="mt-2 text-xl font-semibold tracking-tight">
                User Responsibilities
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                By using the Service, you represent and warrant that:
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  You are at least 13 years of age.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  You have the legal right to upload and modify the PDF documents
                  you submit to the Service.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  You will not use the Service for any unlawful purpose or to
                  process documents containing illegal content.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  You will not attempt to interfere with, disrupt, or overload
                  the Service or its infrastructure.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  You are solely responsible for maintaining the confidentiality
                  of any passwords you set on your documents.
                </li>
              </ul>
            </article>

            <Separator />

            {/* 4 */}
            <article>
              <SectionNumber number="04" />
              <h2 className="mt-2 text-xl font-semibold tracking-tight">
                Intellectual Property
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                The Service, including its original content, features, and
                functionality, is owned by pdflocker.io and is protected by
                international copyright, trademark, and other intellectual
                property laws.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                You retain full ownership of all PDF documents you upload to the
                Service. We do not claim any rights to your content. The Service
                only processes your files as instructed and does not retain,
                analyze, or use your documents for any other purpose.
              </p>
            </article>

            <Separator />

            {/* 5 */}
            <article>
              <SectionNumber number="05" />
              <h2 className="mt-2 text-xl font-semibold tracking-tight">
                File Handling & Deletion
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                We handle your files with the utmost care:
              </p>
              <ul className="mt-4 space-y-3">
                <ListItem title="Temporary Processing">
                  Files are uploaded solely for the purpose of applying the
                  requested security settings and are stored temporarily on
                  secure servers.
                </ListItem>
                <ListItem title="Automatic Deletion">
                  All uploaded and processed files are automatically and
                  permanently deleted within 1 hour of upload.
                </ListItem>
                <ListItem title="No Access">
                  We do not access, read, review, or analyze the contents of your
                  documents. Processing is fully automated.
                </ListItem>
                <ListItem title="Download Responsibility">
                  It is your responsibility to download your locked files before
                  they are automatically deleted. We cannot recover deleted files.
                </ListItem>
              </ul>
            </article>

            <Separator />

            {/* 6 */}
            <article>
              <SectionNumber number="06" />
              <h2 className="mt-2 text-xl font-semibold tracking-tight">
                Limitation of Liability
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                The Service is provided on an &quot;as is&quot; and &quot;as
                available&quot; basis without warranties of any kind, either
                express or implied, including but not limited to implied
                warranties of merchantability, fitness for a particular purpose,
                and non-infringement.
              </p>
              <Callout>
                In no event shall pdflocker.io, its operators, directors,
                employees, or agents be liable for any indirect, incidental,
                special, consequential, or punitive damages, including but not
                limited to loss of data, profits, goodwill, or other intangible
                losses, resulting from your use of or inability to use the
                Service.
              </Callout>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Specifically, we are not responsible for:
              </p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  Lost or forgotten passwords set through the Service
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  Files not downloaded before automatic deletion
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  Any damage or loss resulting from unauthorized access to your
                  documents
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  Service interruptions or temporary unavailability
                </li>
              </ul>
            </article>

            <Separator />

            {/* 7 */}
            <article>
              <SectionNumber number="07" />
              <h2 className="mt-2 text-xl font-semibold tracking-tight">
                Acceptable Use
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                You agree not to use the Service to:
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" />
                  Upload documents containing malicious code, viruses, or
                  malware
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" />
                  Process documents you do not have the right to modify
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" />
                  Attempt to bypass, disable, or interfere with security features
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" />
                  Use automated tools to scrape, crawl, or overload the Service
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" />
                  Violate any applicable laws, regulations, or third-party rights
                </li>
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                We reserve the right to terminate or restrict access to the
                Service for any user who violates these Terms.
              </p>
            </article>

            <Separator />

            {/* 8 */}
            <article>
              <SectionNumber number="08" />
              <h2 className="mt-2 text-xl font-semibold tracking-tight">
                Service Availability
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                We strive to keep the Service available at all times but do not
                guarantee uninterrupted or error-free operation. We may modify,
                suspend, or discontinue the Service (or any part thereof)
                temporarily or permanently, with or without notice. We shall not
                be liable to you or any third party for any modification,
                suspension, or discontinuance of the Service.
              </p>
            </article>

            <Separator />

            {/* 9 */}
            <article>
              <SectionNumber number="09" />
              <h2 className="mt-2 text-xl font-semibold tracking-tight">
                Indemnification
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                You agree to indemnify, defend, and hold harmless pdflocker.io
                and its operators, employees, and agents from and against any
                claims, liabilities, damages, losses, and expenses (including
                reasonable attorney&apos;s fees) arising out of or in connection
                with your use of the Service, your violation of these Terms, or
                your violation of any rights of another party.
              </p>
            </article>

            <Separator />

            {/* 10 */}
            <article>
              <SectionNumber number="10" />
              <h2 className="mt-2 text-xl font-semibold tracking-tight">
                Governing Law
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                These Terms shall be governed by and construed in accordance with
                applicable laws, without regard to conflict of law principles.
                Any disputes arising from or relating to these Terms or the
                Service shall be resolved through good-faith negotiation first.
                If a resolution cannot be reached, disputes shall be submitted to
                the courts of competent jurisdiction.
              </p>
            </article>

            <Separator />

            {/* 11 */}
            <article>
              <SectionNumber number="11" />
              <h2 className="mt-2 text-xl font-semibold tracking-tight">
                Changes to Terms
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                We reserve the right to modify or replace these Terms at any
                time. If a revision is material, we will make reasonable efforts
                to provide notice prior to any new terms taking effect. What
                constitutes a material change will be determined at our sole
                discretion. Your continued use of the Service after changes are
                posted constitutes acceptance of the revised Terms.
              </p>
            </article>

            <Separator />

            {/* 12 */}
            <article>
              <SectionNumber number="12" />
              <h2 className="mt-2 text-xl font-semibold tracking-tight">
                Contact Us
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                If you have any questions about these Terms of Service, please
                contact us at:
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
