"use client";

import { Trash2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { FileItem } from "./file-item";
import { type PdfLockFileInfo } from "@/lib/types";

interface FileListProps {
  files: PdfLockFileInfo[];
  onRemoveFile: (id: string) => void;
  onClearAll: () => void;
  onDownloadFile: (id: string) => void;
  isProcessing: boolean;
}

export function FileList({
  files,
  onRemoveFile,
  onClearAll,
  onDownloadFile,
  isProcessing,
}: FileListProps) {
  if (files.length === 0) return null;

  return (
    <div className="rounded-xl border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">
            {files.length} {files.length === 1 ? "file" : "files"} added
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          disabled={isProcessing}
          className="text-muted-foreground hover:text-destructive h-7 text-xs"
        >
          <Trash2 className="h-3.5 w-3.5 mr-1.5" />
          Clear All
        </Button>
      </div>

      <Separator />

      {/* File list */}
      <ScrollArea className={files.length > 5 ? "h-[360px]" : ""}>
        <div className="p-2 space-y-1.5">
          {files.map((file) => (
            <FileItem
              key={file.id}
              file={file}
              onRemove={onRemoveFile}
              onDownload={onDownloadFile}
              isProcessing={isProcessing}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
