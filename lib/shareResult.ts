import { toPng } from "html-to-image";
import { SERVICE_NAME } from "@/lib/constants";

export async function renderNodeToPngBlob(node: HTMLElement): Promise<Blob> {
  const dataUrl = await toPng(node, {
    width: 1080,
    height: 1920,
    pixelRatio: 1,
    style: { transform: "none" },
  });
  const response = await fetch(dataUrl);
  return response.blob();
}

export function buildShareText(regionAndCity: string): string {
  return `내 랜덤 여행지는 ${regionAndCity}!\n너도 대한민국 지도에 핀을 던져봐.`;
}

export type ShareOutcome = "shared" | "cancelled" | "downloaded" | "error";

export async function shareOrDownloadImage(
  blob: Blob,
  shareText: string
): Promise<ShareOutcome> {
  const fileName = `${SERVICE_NAME}-result.png`;
  const file = new File([blob], fileName, { type: "image/png" });

  try {
    if (
      typeof navigator !== "undefined" &&
      "share" in navigator &&
      "canShare" in navigator &&
      navigator.canShare({ files: [file] })
    ) {
      await navigator.share({
        files: [file],
        title: SERVICE_NAME,
        text: shareText,
      });
      return "shared";
    }
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return "cancelled";
    }
    // fall through to download fallback below
  }

  try {
    downloadBlob(blob, fileName);
    return "downloaded";
  } catch {
    return "error";
  }
}

export function downloadBlob(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
