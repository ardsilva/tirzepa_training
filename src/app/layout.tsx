import type { Metadata, Viewport } from "next";
import "./globals.css";
import { BottomNav } from "@/components/BottomNav";
import { RegisterSW } from "@/components/RegisterSW";

export const metadata: Metadata = {
  title: "Tirzepa Training",
  description:
    "Treinos de musculação para quem usa ou usou Mounjaro: perder gordura sem perder massa magra.",
  applicationName: "Tirzepa Training",
  appleWebApp: {
    capable: true,
    title: "Tirzepa",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: [{ url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0e0f11",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <main className="mx-auto min-h-dvh max-w-lg px-4 pt-[max(1.25rem,env(safe-area-inset-top))] pb-nav">
          {children}
        </main>
        <BottomNav />
        <RegisterSW />
      </body>
    </html>
  );
}
