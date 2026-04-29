import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Klyfta — European email, EU-resident",
  description: "Klyfta is the email provider for European businesses that care about EU data residency. Mail, calendar, and contacts hosted in the EU, encrypted at rest, GDPR-native by default.",
  metadataBase: new URL("https://klyfta.eu"),
  openGraph: {
    title: "Klyfta — European email, EU-resident",
    description: "Premium European email for businesses that care about where their data lives.",
    url: "https://klyfta.eu",
    siteName: "Klyfta",
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