import {
  Shield,
  Lock,
  FolderOpen,
  KeyRound,
  FileCheck,
  Zap,
  ShieldCheck,
  Clock,
  Monitor,
  Globe,
  Eye,
  Upload,
  KeySquare,
  Settings,
  Download,
  CircleCheck,
  HelpCircle,
  ChevronRight,
} from "lucide-react";
import { PdfLocker } from "@/components/pdf-locker";
import { SiteFooter } from "@/components/site-footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FEATURE_PILLS = [
  { icon: Shield, text: "AES-256 bit encryption" },
  { icon: FolderOpen, text: "Batch process files & folders" },
  { icon: KeyRound, text: "Set open & permission passwords" },
  { icon: Lock, text: "Restrict printing, copying & editing" },
  { icon: FileCheck, text: "Preserve original document quality" },
  { icon: Zap, text: "No Adobe Acrobat required" },
];

const WHY_FEATURES = [
  {
    icon: Lock,
    title: "Military-Grade Encryption",
    description:
      "Protect your PDFs with AES-256 bit encryption — the same standard used by banks and governments. Set open passwords, permission passwords, or both.",
  },
  {
    icon: Monitor,
    title: "Works on Any Device",
    description:
      "Lock PDFs online from any browser, on Mac, Windows, iOS, or Android. No software installation required — just upload, lock, and download.",
  },
  {
    icon: ShieldCheck,
    title: "Safe From Start to Finish",
    description:
      "Your documents are protected with TLS encryption in transit, and all files are automatically deleted after one hour. Your documents are for your eyes only.",
  },
  {
    icon: Eye,
    title: "Full Control Over Permissions",
    description:
      "Restrict printing, copying, editing, and page extraction. Decide exactly what recipients can and cannot do with your document.",
  },
  {
    icon: Globe,
    title: "No Signup Required",
    description:
      "Start protecting your PDFs immediately. No account creation, no email verification, no credit card. Just upload and secure your files.",
  },
  {
    icon: Zap,
    title: "Batch Processing",
    description:
      "Lock multiple PDFs at once. Upload an entire folder and apply the same protection settings to all files in seconds.",
  },
];

const HOW_TO_STEPS = [
  {
    step: 1,
    icon: Upload,
    title: "Upload Your PDF",
    description:
      "Drag & drop your PDF files or folders into the tool, or click to browse and select files from your device.",
  },
  {
    step: 2,
    icon: KeySquare,
    title: "Set Your Password",
    description:
      "Enter an open password, a permission password, or both. Choose your encryption method and restriction preferences.",
  },
  {
    step: 3,
    icon: Settings,
    title: "Configure Restrictions",
    description:
      "Select which actions to restrict — printing, copying, editing, page extraction, commenting, and more.",
  },
  {
    step: 4,
    icon: Download,
    title: "Download Locked PDF",
    description:
      "Click \"Lock All\" and download your password-protected PDF. For multiple files, download them all as a convenient ZIP archive.",
  },
];

const FAQ_ITEMS = [
  {
    question: "Is it free to use PDF Locker?",
    answer:
      "Yes, PDF Locker is completely free to use. There are no hidden charges, no signup required, and no watermarks added to your documents.",
  },
  {
    question: "What encryption does PDF Locker use?",
    answer:
      "We support AES-256 bit encryption, which is the strongest encryption standard available for PDF documents. This is the same level of encryption used by banks and government agencies.",
  },
  {
    question: "Are my files safe and private?",
    answer:
      "Absolutely. Your files are encrypted during transfer using TLS encryption. All uploaded files are automatically deleted from our servers after 1 hour. We never access, read, or share your documents.",
  },
  {
    question: "What's the difference between an open password and a permission password?",
    answer:
      "An open password (also called a user password) is required to open and view the PDF. A permission password (also called an owner password) controls what actions are allowed — such as printing, copying, or editing. You can set one or both.",
  },
  {
    question: "Can I lock multiple PDFs at once?",
    answer:
      "Yes! You can upload multiple PDF files or even entire folders. The same password and restriction settings will be applied to all files. Once processed, you can download them individually or as a single ZIP archive.",
  },
  {
    question: "Do I need Adobe Acrobat to lock PDFs?",
    answer:
      "No. PDF Locker works entirely in your browser — no software installation or Adobe Acrobat subscription is needed. It works on Mac, Windows, iOS, Android, and Linux.",
  },
  {
    question: "What restrictions can I apply to a PDF?",
    answer:
      "You can restrict printing, copying text/images, editing, page extraction, commenting, form filling, and document assembly. This gives you granular control over how recipients interact with your document.",
  },
  {
    question: "Will locking a PDF affect its quality?",
    answer:
      "No. PDF Locker preserves the original document quality. The content, formatting, images, and fonts all remain exactly as they were — only the security layer is added.",
  },
  {
    question: "Is there a file size limit?",
    answer:
      "The tool supports standard PDF files. For very large files or enterprise-level batch processing needs, consider using our upcoming desktop application for even faster performance.",
  },
  {
    question: "Can I remove the password later?",
    answer:
      "If you know the password, you can use a PDF unlocker tool to remove the password protection. We recommend keeping your passwords stored safely as they cannot be recovered if forgotten.",
  },
];

export default function Home() {
  return (
    <main id="top" className="min-h-screen bg-background">
      {/* ─── Hero Section ─── */}
      <section className="mx-auto max-w-2xl px-4 pt-12 pb-8 sm:pt-16">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-3 mb-4">
            <Lock className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Password Protect Your PDFs
          </h1>
          <p className="mt-3 text-muted-foreground max-w-md mx-auto">
            Add password protection, encryption, and restrictions to your PDF
            documents. Batch process multiple files at once. Free, fast, and
            secure.
          </p>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {FEATURE_PILLS.map((feature) => (
            <div
              key={feature.text}
              className="flex items-center gap-1.5 rounded-full border bg-card px-3 py-1.5 text-xs text-muted-foreground"
            >
              <feature.icon className="h-3.5 w-3.5" />
              {feature.text}
            </div>
          ))}
        </div>

        {/* Privacy Notice */}
        <div className="mb-8 rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/30 p-4">
          <div className="flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900 dark:text-blue-200">
                Your privacy is protected
              </p>
              <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                <Clock className="inline h-3 w-3 mr-1 -mt-0.5" />
                All uploaded files are{" "}
                <strong>automatically deleted after 1 hour</strong>. Files are
                encrypted in transit and only used for processing. We do not
                access, read, or share your documents.
              </p>
            </div>
          </div>
        </div>

        {/* Main Tool */}
        <PdfLocker />
      </section>

      {/* ─── Why PDF Locker Section ─── */}
      <section id="why-this" className="py-16 sm:py-20 bg-muted/30">
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1.5 text-xs text-muted-foreground mb-4">
              <Shield className="h-3.5 w-3.5" />
              Why choose us
            </div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Why Use PDF Locker?
            </h2>
            <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
              The simplest way to password-protect your PDF documents with
              enterprise-grade security. No software needed.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border bg-card p-6 transition-shadow hover:shadow-md"
              >
                <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-primary/10 p-2.5">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-base font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How To Section ─── */}
      <section id="how-to" className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1.5 text-xs text-muted-foreground mb-4">
              <CircleCheck className="h-3.5 w-3.5" />
              Simple steps
            </div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              How to Lock a PDF Online
            </h2>
            <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
              Protect your PDF documents in four simple steps. No account
              required.
            </p>
          </div>

          <div className="space-y-6">
            {HOW_TO_STEPS.map((step, index) => (
              <div key={step.step} className="flex gap-5">
                {/* Step number & line */}
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                    {step.step}
                  </div>
                  {index < HOW_TO_STEPS.length - 1 && (
                    <div className="w-px flex-1 bg-border mt-2" />
                  )}
                </div>

                {/* Content */}
                <div className="pb-8">
                  <div className="flex items-center gap-2 mb-1">
                    <step.icon className="h-4 w-4 text-primary" />
                    <h3 className="text-base font-semibold">{step.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a
              href="#top"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              Try it now — it&apos;s free
              <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ─── FAQ Section ─── */}
      <section id="faq" className="py-16 sm:py-20 bg-muted/30">
        <div className="mx-auto max-w-2xl px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1.5 text-xs text-muted-foreground mb-4">
              <HelpCircle className="h-3.5 w-3.5" />
              Got questions?
            </div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
              Everything you need to know about locking and protecting your PDF
              documents.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {FAQ_ITEMS.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-sm font-medium">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <SiteFooter />
    </main>
  );
}
