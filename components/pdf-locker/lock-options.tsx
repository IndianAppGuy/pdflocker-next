"use client";

import { useState } from "react";
import { Settings2, Eye, EyeOff, ShieldAlert } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  type LockOptions,
  type Restriction,
  RESTRICTIONS,
  ENCRYPTION_METHODS,
} from "@/lib/types";

interface LockOptionsProps {
  options: LockOptions;
  onOptionsChange: (options: LockOptions) => void;
  isProcessing: boolean;
}

const RESTRICTION_LABELS: { id: Restriction; label: string }[] = [
  { id: RESTRICTIONS.PRINTING, label: "Printing" },
  { id: RESTRICTIONS.COPYING, label: "Copying text & images" },
  { id: RESTRICTIONS.EDITING, label: "Editing content" },
  { id: RESTRICTIONS.PAGE_EXTRACTION, label: "Page extraction" },
  { id: RESTRICTIONS.COMMENTING, label: "Commenting & annotations" },
  { id: RESTRICTIONS.FORM_FILLING, label: "Form filling" },
  { id: RESTRICTIONS.DOCUMENT_ASSEMBLY, label: "Document assembly" },
];

const ENCRYPTION_OPTIONS = [
  { value: ENCRYPTION_METHODS.AES_256, label: "AES-256 (Recommended)" },
  { value: ENCRYPTION_METHODS.AES_128, label: "AES-128" },
  { value: ENCRYPTION_METHODS.RC4_128, label: "RC4-128 (Legacy)" },
];

export function LockOptionsPanel({
  options,
  onOptionsChange,
  isProcessing,
}: LockOptionsProps) {
  const [showOpenPassword, setShowOpenPassword] = useState(false);
  const [showPermPassword, setShowPermPassword] = useState(false);

  const handlePasswordChange = (
    key: "openPassword" | "permissionPassword",
    value: string
  ) => {
    onOptionsChange({ ...options, [key]: value });
  };

  const handleRestrictionToggle = (restriction: Restriction) => {
    const current = options.restrictions;
    const updated = current.includes(restriction)
      ? current.filter((r) => r !== restriction)
      : [...current, restriction];
    onOptionsChange({ ...options, restrictions: updated });
  };

  const handleSelectAll = () => {
    const allRestrictions = RESTRICTION_LABELS.map((r) => r.id);
    const allSelected =
      options.restrictions.length === allRestrictions.length;
    onOptionsChange({
      ...options,
      restrictions: allSelected ? [] : allRestrictions,
    });
  };

  const hasAnyPassword = !!options.openPassword || !!options.permissionPassword;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Settings2 className="h-4 w-4" />
          Lock Options
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Document Open Password */}
        <div className="space-y-2">
          <Label htmlFor="openPassword" className="text-sm font-medium">
            Document Open Password
          </Label>
          <p className="text-xs text-muted-foreground">
            Requires this password to open the PDF
          </p>
          <div className="relative">
            <Input
              id="openPassword"
              type={showOpenPassword ? "text" : "password"}
              placeholder="Enter open password (optional)"
              value={options.openPassword}
              onChange={(e) =>
                handlePasswordChange("openPassword", e.target.value)
              }
              disabled={isProcessing}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowOpenPassword(!showOpenPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showOpenPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <Separator />

        {/* Permissions Password */}
        <div className="space-y-2">
          <Label htmlFor="permissionPassword" className="text-sm font-medium">
            Permissions Password
          </Label>
          <p className="text-xs text-muted-foreground">
            Required to change permissions or restrictions
          </p>
          <div className="relative">
            <Input
              id="permissionPassword"
              type={showPermPassword ? "text" : "password"}
              placeholder="Enter permissions password (optional)"
              value={options.permissionPassword}
              onChange={(e) =>
                handlePasswordChange("permissionPassword", e.target.value)
              }
              disabled={isProcessing}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPermPassword(!showPermPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPermPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Validation hint */}
        {!hasAnyPassword && (
          <div className="flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/30 p-3">
            <ShieldAlert className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700 dark:text-amber-300">
              At least one password is required to lock the PDF.
            </p>
          </div>
        )}

        <Separator />

        {/* Restrictions */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">
              Restrictions to Apply
            </Label>
            <button
              type="button"
              onClick={handleSelectAll}
              disabled={isProcessing}
              className="text-xs text-primary hover:underline disabled:opacity-50"
            >
              {options.restrictions.length === RESTRICTION_LABELS.length
                ? "Deselect All"
                : "Select All"}
            </button>
          </div>
          <p className="text-xs text-muted-foreground">
            Choose what actions to restrict in the locked PDF
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {RESTRICTION_LABELS.map((restriction) => (
              <div key={restriction.id} className="flex items-center gap-2">
                <Checkbox
                  id={`restriction-${restriction.id}`}
                  checked={options.restrictions.includes(restriction.id)}
                  onCheckedChange={() =>
                    handleRestrictionToggle(restriction.id)
                  }
                  disabled={isProcessing}
                />
                <Label
                  htmlFor={`restriction-${restriction.id}`}
                  className="text-sm cursor-pointer"
                >
                  {restriction.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Encryption Method */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Encryption Method</Label>
          <Select
            value={options.encryptionMethod}
            onValueChange={(value) =>
              onOptionsChange({
                ...options,
                encryptionMethod: value as LockOptions["encryptionMethod"],
              })
            }
            disabled={isProcessing}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ENCRYPTION_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
