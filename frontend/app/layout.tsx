import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  style: ["normal", "italic"],
  adjustFontFallback: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
  adjustFontFallback: true,
});

const siteDescription =
  "Growth, amplified. One partner. Every channel. Built on AI. Scale12x is the AI-native growth studio for US B2B teams investing $5K–$25K a month.";

export const metadata: Metadata = {
  metadataBase: new URL("https://scale12x.com"),
  title: {
    default: "Scale12x: AI-Native Growth Studio",
    template: "%s",
  },
  description: siteDescription,
  applicationName: "Scale12x",
  keywords: [
    "growth strategy",
    "AI automation",
    "digital agency",
    "cloud computing",
    "cybersecurity",
    "web design",
    "SEO",
    "GEO",
  ],
  authors: [{ name: "Scale12x" }],
  creator: "Scale12x",
  publisher: "Scale12x",
  openGraph: {
    title: "Scale12x: AI-Native Growth Studio",
    description: siteDescription,
    type: "website",
    locale: "en_US",
    url: "https://scale12x.com",
    siteName: "Scale12x",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scale12x: AI-Native Growth Studio",
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/favicon.ico" }],
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#05070d" },
    { media: "(prefers-color-scheme: light)", color: "#05070d" },
  ],
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geist.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[var(--color-bg-deep)] text-[var(--color-text)]">
        {children}
      </body>
    </html>
  );
}
