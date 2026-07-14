import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SERVICE_DESCRIPTION, SERVICE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${SERVICE_NAME} | 대한민국 랜덤 여행`,
  description: SERVICE_DESCRIPTION,
  openGraph: {
    title: `${SERVICE_NAME} | 대한민국 랜덤 여행`,
    description: SERVICE_DESCRIPTION,
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#F6F1E7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <body className="h-full min-h-dvh bg-[var(--color-bg)] antialiased">
        {children}
      </body>
    </html>
  );
}
