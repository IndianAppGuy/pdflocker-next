export const FILE_STATUS = {
  PENDING: "pending",
  UPLOADING: "uploading",
  READY: "ready",
  PROCESSING: "processing",
  SUCCESS: "success",
  FAILED: "failed",
} as const;

export type FileStatus = (typeof FILE_STATUS)[keyof typeof FILE_STATUS];

export const RESTRICTIONS = {
  PRINTING: "printing",
  COPYING: "copying",
  EDITING: "editing",
  PAGE_EXTRACTION: "pageExtraction",
  COMMENTING: "commenting",
  FORM_FILLING: "formFilling",
  DOCUMENT_ASSEMBLY: "documentAssembly",
} as const;

export type Restriction = (typeof RESTRICTIONS)[keyof typeof RESTRICTIONS];

export const ENCRYPTION_METHODS = {
  AES_256: "aes-256",
  AES_128: "aes-128",
  RC4_128: "rc4-128",
} as const;

export type EncryptionMethod =
  (typeof ENCRYPTION_METHODS)[keyof typeof ENCRYPTION_METHODS];

export interface LockOptions {
  openPassword: string;
  permissionPassword: string;
  restrictions: Restriction[];
  encryptionMethod: EncryptionMethod;
}

export interface LockResponse {
  signedUrl: string;
  fileName: string;
}

export interface PdfLockFileInfo {
  id: string;
  file: File;
  name: string;
  size: number;
  relativePath: string;
  status: FileStatus;
  errorMessage?: string;
  storagePath?: string;
  signedUrl?: string;
  lockedFileName?: string;
}

export interface ProcessingStats {
  total: number;
  processed: number;
  succeeded: number;
  failed: number;
}

/**
 * PDF permission bits (from PDF spec).
 * Setting a bit ALLOWS the corresponding action.
 * All permissions = -1 (0xFFFFFFFF).
 */
export const PERMISSION_BITS: Record<Restriction, number> = {
  [RESTRICTIONS.PRINTING]: 4 | 2048, // Bit 3 + Bit 12 (print + high-quality print)
  [RESTRICTIONS.COPYING]: 16 | 512, // Bit 5 + Bit 10 (copy + extract accessibility)
  [RESTRICTIONS.EDITING]: 8, // Bit 4 (modify contents)
  [RESTRICTIONS.PAGE_EXTRACTION]: 1024, // Bit 11 (assemble document)
  [RESTRICTIONS.COMMENTING]: 32, // Bit 6 (add/modify annotations)
  [RESTRICTIONS.FORM_FILLING]: 256, // Bit 9 (fill forms)
  [RESTRICTIONS.DOCUMENT_ASSEMBLY]: 1024, // Bit 11 (assemble document)
};

/**
 * Calculate the permissions integer from a set of restrictions.
 * Restrictions = things to DENY. We start with all permissions allowed,
 * then clear the bits for each restriction.
 */
export function calculatePermissions(restrictions: Restriction[]): number {
  // Start with all permissions (bits 3-12 set) = -1 in PDF spec
  // -1 means all 32 bits set
  let permissions = -1;

  for (const restriction of restrictions) {
    const bits = PERMISSION_BITS[restriction];
    if (bits) {
      // Clear the permission bits (deny the action)
      permissions &= ~bits;
    }
  }

  return permissions;
}
