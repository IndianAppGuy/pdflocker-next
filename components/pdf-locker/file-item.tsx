"use client";

import {
  FileText,
  X,
  Download,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { type PdfLockFileInfo, FILE_STATUS } from "@/lib/types";
import { formatFileSize } from "@/lib/utils";

interface FileItemProps {
  file: PdfLockFileInfo;
  onRemove: (id: string) => void;
  onDownload: (id: string) => void;
  isProcessing: boolean;
}

export function FileItem({
  file,
  onRemove,
  onDownload,
  isProcessing,
}: FileItemProps) {
  const statusConfig = {
    [FILE_STATUS.PENDING]: {
      label: "Pending",
      variant: "secondary" as const,
      icon: FileText,
    },
    [FILE_STATUS.UPLOADING]: {
      label: "Uploading...",
      variant: "secondary" as const,
      icon: Upload,
    },
    [FILE_STATUS.READY]: {
      label: "Ready",
      variant: "secondary" as const,
      icon: FileText,
    },
    [FILE_STATUS.PROCESSING]: {
      label: "Locking...",
      variant: "secondary" as const,
      icon: Loader2,
    },
    [FILE_STATUS.SUCCESS]: {
      label: "Locked",
      variant: "secondary" as const,
      icon: CheckCircle2,
    },
    [FILE_STATUS.FAILED]: {
      label: "Failed",
      variant: "destructive" as const,
      icon: AlertCircle,
    },
  };

  const config = statusConfig[file.status];
  const StatusIcon = config.icon;

  const displayPath =
    file.relativePath && file.relativePath !== file.name
      ? file.relativePath
      : file.name;

  return (
    <div className="flex items-center gap-3 rounded-lg border bg-card p-3 transition-colors hover:bg-muted/30">
      {/* File icon */}
      <div className="shrink-0">
        <FileText className="h-5 w-5 text-muted-foreground" />
      </div>

      {/* File info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="text-sm font-medium truncate max-w-[200px] sm:max-w-[300px]">
                {displayPath}
              </p>
            </TooltipTrigger>
            <TooltipContent>
              <p>{displayPath}</p>
            </TooltipContent>
          </Tooltip>
          <span className="text-xs text-muted-foreground shrink-0">
            {formatFileSize(file.size)}
          </span>
        </div>

        {/* Error message */}
        {file.errorMessage && (
          <p className="text-xs text-destructive mt-1">{file.errorMessage}</p>
        )}
      </div>

      {/* Status badge */}
      <Badge
        variant={config.variant}
        className={`shrink-0 gap-1 text-xs ${
          file.status === FILE_STATUS.SUCCESS
            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
            : ""
        }`}
      >
        <StatusIcon
          className={`h-3 w-3 ${
            file.status === FILE_STATUS.PROCESSING ||
            file.status === FILE_STATUS.UPLOADING
              ? "animate-spin"
              : ""
          }`}
        />
        {config.label}
      </Badge>

      {/* Actions */}
      <div className="flex items-center gap-1 shrink-0">
        {file.status === FILE_STATUS.SUCCESS && file.signedUrl && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-emerald-600 hover:text-emerald-700"
                onClick={() => onDownload(file.id)}
              >
                <Download className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Download locked PDF</TooltipContent>
          </Tooltip>
        )}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-destructive"
              onClick={() => onRemove(file.id)}
              disabled={file.status === FILE_STATUS.PROCESSING}
            >
              <X className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Remove file</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
