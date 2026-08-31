import type { Metadata } from "next";
import { Bricolage_Grotesque, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { site } from "@/lib/site";
import "./globals.css";

/* The same three faces the desktop application uses, so the site reads as the
   product it documents: Bricolage for display, Plex Sans for body, Plex Mono for
   paths, timecodes and anything the reader may need to type. */
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.fullName} — Lightweight Media Player for Windows`,
    template: `%s — ${site.fullName}`,
  },
  description: site.description,
  applicationName: site.fullName,
  keywords: [
    "Harissa",
    "media player",
    "Windows media player",
    "Electron",
    "React",
    "TypeScript",
    "local media playback",
  ],
  openGraph: {
    type: "website",
    siteName: site.fullName,
    title: `${site.fullName} — Lightweight Media Player for Windows`,
    description: site.description,
    url: site.url,
    locale: "en_GB",
    images: [{ url: "/logo.png", width: 382, height: 382, alt: site.fullName }],
  },
  twitter: {
    card: "summary",
    title: `${site.fullName} — Lightweight Media Player for Windows`,
    description: site.description,
    images: ["/logo.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${plexSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-ink">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-md focus:bg-chili focus:px-3 focus:py-2 focus:text-[13px] focus:text-white"
        >
          Skip to content
        </a>
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
