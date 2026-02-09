"use client";

import {
  Lock,
  Square,
  Download,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { type ProcessingStats } from "@/lib/types";

interface ProcessingControlsProps {
  isProcessing: boolean;
  hasFiles: boolean;
  hasReadyFiles: boolean;
  hasLockedFiles: boolean;
  hasValidOptions: boolean;
  stats: ProcessingStats;
  onLockAll: () => void;
  onStop: () => void;
  onDownloadAll: () => void;
  onReset: () => void;
}

export function ProcessingControls({
  isProcessing,
  hasFiles,
  hasReadyFiles,
  hasLockedFiles,
  hasValidOptions,
  stats,
  onLockAll,
  onStop,
  onDownloadAll,
  onReset,
}: ProcessingControlsProps) {
  const progressPercent =
    stats.total > 0 ? (stats.processed / stats.total) * 100 : 0;
  const isComplete =
    !isProcessing && stats.processed > 0 && stats.processed === stats.total;

  return (
    <div className="space-y-4">
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        {!isProcessing && !isComplete && (
          <Button
            onClick={onLockAll}
            disabled={!hasFiles || !hasReadyFiles || !hasValidOptions}
            className="flex-1 min-w-[140px]"
            size="lg"
          >
            <Lock className="h-4 w-4 mr-2" />
            Lock All PDFs
          </Button>
        )}

        {isProcessing && (
          <>
            <Button disabled className="flex-1 min-w-[140px]" size="lg">
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Processing {stats.processed}/{stats.total}...
            </Button>
            <Button
              variant="destructive"
              onClick={onStop}
              size="lg"
              className="min-w-[100px]"
            >
              <Square className="h-4 w-4 mr-2" />
              Stop
            </Button>
          </>
        )}

        {isComplete && (
          <>
            {hasLockedFiles && (
              <Button
                onClick={onDownloadAll}
                className="flex-1 min-w-[140px] bg-emerald-600 hover:bg-emerald-700"
                size="lg"
              >
                <Download className="h-4 w-4 mr-2" />
                Download All
              </Button>
            )}
            <Button
              variant="outline"
              onClick={onReset}
              size="lg"
              className="min-w-[140px]"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Start Over
            </Button>
          </>
        )}
      </div>

      {/* Progress bar */}
      {(isProcessing || isComplete) && (
        <div className="space-y-2">
          <Progress value={progressPercent} className="h-2" />

          {/* Status counters */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            {stats.succeeded > 0 && (
              <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
                {stats.succeeded} succeeded
              </span>
            )}
            {stats.failed > 0 && (
              <span className="flex items-center gap-1.5 text-destructive">
                <XCircle className="h-4 w-4" />
                {stats.failed} failed
              </span>
            )}
            <span className="text-muted-foreground ml-auto">
              {stats.processed} of {stats.total} processed
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
