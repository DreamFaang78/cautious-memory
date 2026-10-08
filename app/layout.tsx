import type { Metadata } from "next";
import { Inter, Sora, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });
const notoSans = Noto_Sans_Devanagari({ subsets: ["devanagari"], variable: "--font-noto-sans" });

export const metadata: Metadata = {
  title: "HospitalOS - Your hospital, running on intelligence.",
  description: "One AI platform that manages patients, doctors and medical machines for Indian hospitals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${sora.variable} ${notoSans.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
