import type { Metadata } from "next";

import LenisProvider from "@/components/LenisProvider";

import "../styles/globals.css";


export const metadata: Metadata = {
  title: "SAKIB.STUDIO | Creative Frontend Engineer",
  description:
    "Premium frontend engineer crafting immersive 3D experiences, modern UI systems, and interactive web applications.",
  keywords: [
    "Frontend Developer",
    "Next.js",
    "Three.js",
    "React",
    "UI Designer",
    "SAKIB STUDIO",
  ],
  authors: [{ name: "Sakib" }],
  creator: "SAKIB.STUDIO",
  openGraph: {
    title: "SAKIB.STUDIO",
    description:
      "Crafting immersive 3D web experiences and modern UI systems.",
    url: "https://sakib.studio",
    siteName: "SAKIB.STUDIO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SAKIB.STUDIO",
    description:
      "Premium frontend engineer building immersive digital experiences.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased">
      <body className="min-h-full flex flex-col">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}