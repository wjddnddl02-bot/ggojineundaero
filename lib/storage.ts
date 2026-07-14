import { STORAGE_KEYS } from "@/lib/constants";
import type { ThrowResult } from "@/types/destination";

function readSessionStorage(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeSessionStorage(key: string, value: string): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    // sessionStorage unavailable (private mode, disabled storage, etc.) - ignore
  }
}

export function getStoredResult(): ThrowResult | null {
  const raw = readSessionStorage(STORAGE_KEYS.result);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ThrowResult;
  } catch {
    return null;
  }
}

export function setStoredResult(result: ThrowResult): void {
  writeSessionStorage(STORAGE_KEYS.result, JSON.stringify(result));
}

export function hasUsedReroll(): boolean {
  return readSessionStorage(STORAGE_KEYS.rerollUsed) === "1";
}

export function setRerollUsed(): void {
  writeSessionStorage(STORAGE_KEYS.rerollUsed, "1");
}
