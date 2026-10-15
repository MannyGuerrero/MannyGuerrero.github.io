import type { Metadata } from "next";
import Edition from "@/components/Edition";
import { site, heroes } from "@/content/site";

export const metadata: Metadata = {
  title: `${site.name}, ${site.title}`,
  description: heroes.peers.sub,
  openGraph: {
    title: `${site.name}, ${site.title}`,
    description: heroes.peers.headline,
    images: ["/og/og-peers.png"],
    type: "website",
  },
  twitter: { card: "summary_large_image", images: ["/og/og-peers.png"] },
};

export default function Page() {
  return <Edition variant="peers" />;
}
