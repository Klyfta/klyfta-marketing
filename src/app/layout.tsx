import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Verkio — European work suite, EU-resident",
  description: "Verkio is the work suite for European businesses that care about EU data residency. Mail, calendar, and contacts hosted in the EU, encrypted at rest, GDPR-native by default. Even our DNS lookups stay in the EU.",
  metadataBase: new URL("https://verkio.eu"),
  openGraph: {
    title: "Verkio — European work suite, EU-resident",
    description: "Premium European work suite for businesses that care about where their data lives.",
    url: "https://verkio.eu",
    siteName: "Verkio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
    <body className="bg-[#FAFAF7] font-sans antialiased">
    {children}
    </body>
    </html>
  );
}