import type { Metadata, Viewport } from "next";
import "@fontsource-variable/schibsted-grotesk";
import "./globals.css";
import { site, industryLabel } from "@/content/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mannyguerrero.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${site.name}, ${site.title}`,
  description: `${site.name} is ${site.roleLine}. Product leadership across ${industryLabel} industries.`,
  // Default for every page is hidden. Only the clients page (/) opts in to search.
  robots: { index: false, follow: false },
  icons: { icon: "/favicon.svg" },
  authors: [{ name: site.name }],
};

export const viewport: Viewport = {
  themeColor: "#0A0D12",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.title,
  sameAs: [site.linkedin],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
