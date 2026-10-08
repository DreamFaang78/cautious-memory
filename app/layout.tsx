import type { Metadata } from "next";
import { Inter, Sora, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });
const notoSans = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-noto-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HospitalOS | AI Hospital Management Platform for India",
  description:
    "HospitalOS is an open-source, AI-first platform that unifies patients, doctors and medical machines for Indian hospitals. Founded by Agam Singh.",
  keywords: [
    "AI hospital management India",
    "hospital management system",
    "ABDM ready",
    "doctor AI co-pilot",
    "lab analyzer integration",
    "Agam Singh",
    "HealthTech India",
  ],
  authors: [{ name: "Agam Singh", url: "https://amsh.me" }],
  creator: "Agam Singh",
  metadataBase: new URL("https://clientwise.tech"),
  openGraph: {
    title: "Your hospital, running on intelligence. | HospitalOS",
    description:
      "One AI platform that manages patients, doctors and medical machines, so your team can focus on care, not chaos. Founded by Agam Singh.",
    url: "https://clientwise.tech",
    siteName: "HospitalOS",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HospitalOS - Your hospital, running on intelligence.",
    description:
      "One AI brain for every patient, every doctor, every machine in your hospital. Built for India by Agam Singh.",
    creator: "@faangagam",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://amsh.me/#person",
        name: "Agam Singh",
        jobTitle: "Founder & Solo Builder",
        worksFor: { "@id": "https://clientwise.tech/#organization" },
        sameAs: [
          "https://github.com/DreamFaang78",
          "https://www.linkedin.com/in/agam-singh-dev/",
          "https://twitter.com/faangagam",
          "https://leetcode.com/agamsingh78/",
          "https://amsh.me",
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kanpur",
          addressCountry: "India",
        },
      },
      {
        "@type": "Organization",
        "@id": "https://clientwise.tech/#organization",
        name: "HospitalOS",
        url: "https://clientwise.tech",
        founder: { "@id": "https://amsh.me/#person" },
        description:
          "Open-source AI platform for hospital operations in India: unified patient and doctor workflows, medical device integration and AI-driven ops.",
      },
      {
        "@type": "SoftwareApplication",
        name: "HospitalOS",
        applicationCategory: "HealthApplication",
        operatingSystem: "Cloud / Linux / Web",
        creator: { "@id": "https://amsh.me/#person" },
        description:
          "One AI brain for every patient, every doctor, every machine in your hospital.",
      },
    ],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${sora.variable} ${notoSans.variable} font-sans antialiased selection:bg-[#00E5C3]/30 selection:text-[#00E5C3]`}
      >
        {children}
      </body>
    </html>
  );
}
