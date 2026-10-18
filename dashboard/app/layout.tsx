import type { Metadata, Viewport } from "next";
import { Urbanist } from "next/font/google";
import { AppProvider } from "@/components/providers";
import "./globals.css";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-urbanist",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ITRAHUB — Gestion budgétaire",
  description:
    "Socle UI/UX ITRAHUB — périmètre budgétaire de la finance (ITRACOM Holding).",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={urbanist.variable}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
