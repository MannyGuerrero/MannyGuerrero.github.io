import type { Metadata } from "next";
import Edition from "@/components/Edition";
import { site, heroes } from "@/content/site";

export const metadata: Metadata = {
  title: `${site.name}, ${site.title}`,
  description: heroes.clients.sub,
  openGraph: {
    title: `${site.name}, ${site.title}`,
    description: heroes.clients.headline,
    images: ["/og/og-clients.png"],
    type: "website",
  },
  twitter: { card: "summary_large_image", images: ["/og/og-clients.png"] },
  // Source of truth page: the only page search engines may index.
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export default function Page() {
  return <Edition variant="clients" />;
}
