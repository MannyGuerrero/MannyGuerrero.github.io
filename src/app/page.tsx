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
};

export default function Page() {
  return <Edition variant="clients" />;
}
