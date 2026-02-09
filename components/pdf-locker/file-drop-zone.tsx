"use client";

import { useCallback, useRef, useState } from "react";
import { Upload, FolderOpen, FilePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FileDropZoneProps {
  onFilesAdded: (files: File[]) => void;
  isProcessing: boolean;
}

export function FileDropZone({
  onFilesAdded,
  isProcessing,
}: FileDropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);

  const filterPdfFiles = (files: FileList | File[]): File[] => {
    return Array.from(files).filter(
      (file) =>
        file.type === "application/pdf" ||
        file.name.toLowerCase().endsWith(".pdf")
    );
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);

      if (isProcessing) return;

      const files = filterPdfFiles(e.dataTransfer.files);
      if (files.length > 0) {
        onFilesAdded(files);
      }
    },
    [onFilesAdded, isProcessing]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files || isProcessing) return;
      const files = filterPdfFiles(e.target.files);
      if (files.length > 0) {
        onFilesAdded(files);
      }
      e.target.value = "";
    },
    [onFilesAdded, isProcessing]
  );

  return (
    <div className="space-y-3">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isProcessing && fileInputRef.current?.click()}
        className={cn(
          "relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-all duration-200 cursor-pointer",
          isDragOver
            ? "border-primary bg-primary/5 scale-[1.01]"
            : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50",
          isProcessing && "opacity-50 cursor-not-allowed"
        )}
      >
        <div
          className={cn(
            "rounded-full p-4 mb-4 transition-colors",
            isDragOver ? "bg-primary/10" : "bg-muted"
          )}
        >
          <Upload
            className={cn(
              "h-8 w-8 transition-colors",
              isDragOver ? "text-primary" : "text-muted-foreground"
            )}
          />
        </div>
        <p className="text-base font-medium text-foreground">
          Drag & drop PDF files or folders here
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          or click to browse files
        </p>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={isProcessing}
          className="flex-1"
        >
          <FilePlus className="h-4 w-4 mr-2" />
          Add Files
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => folderInputRef.current?.click()}
          disabled={isProcessing}
          className="flex-1"
        >
          <FolderOpen className="h-4 w-4 mr-2" />
          Add Folder
        </Button>
      </div>

      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,application/pdf"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />
      <input
        ref={folderInputRef}
        type="file"
        accept=".pdf,application/pdf"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {...({ webkitdirectory: "", directory: "" } as any)}
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}
