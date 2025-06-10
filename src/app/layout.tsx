import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/hooks/useLanguage";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Petabyte Tech - Teknologjia e Bërë e Thjeshtë",
  description: "Nga konfigurimi i PC-ve deri te riparimi i pajisjeve, ne jemi partneri juaj i teknologjisë",
  keywords: "PC configurator, PS5 controller, repair, gaming center, 3D printing, Kosovo, Kosovë",
  authors: [{ name: "Petabyte Tech" }],
  openGraph: {
    title: "Petabyte Tech",
    description: "Teknologjia e Bërë e Thjeshtë",
    url: "https://petabyte.al",
    siteName: "Petabyte Tech",
    locale: "sq_AL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sq" suppressHydrationWarning>
      <body className={inter.className}>
        <LanguageProvider>
          <div className="min-h-screen flex flex-col">
            {children}
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}