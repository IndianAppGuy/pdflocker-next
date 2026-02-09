import {
  Shield,
  Lock,
  FolderOpen,
  KeyRound,
  FileCheck,
  Zap,
  ShieldCheck,
  Clock,
} from "lucide-react";
import { PdfLocker } from "@/components/pdf-locker";

const FEATURES = [
  { icon: Shield, text: "AES-256 bit encryption" },
  { icon: FolderOpen, text: "Batch process files & folders" },
  { icon: KeyRound, text: "Set open & permission passwords" },
  { icon: Lock, text: "Restrict printing, copying & editing" },
  { icon: FileCheck, text: "Preserve original document quality" },
  { icon: Zap, text: "No Adobe Acrobat required" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-4 py-12 sm:py-16">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-3 mb-4">
            <Lock className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            PDF Locker
          </h1>
          <p className="mt-3 text-muted-foreground max-w-md mx-auto">
            Add password protection, encryption, and restrictions to your PDF
            documents. Batch process multiple files at once.
          </p>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {FEATURES.map((feature) => (
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

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-12">
          Files are temporarily stored for processing and automatically deleted
          after 1 hour. Your documents remain private and secure.
        </p>
      </div>
    </main>
  );
}
