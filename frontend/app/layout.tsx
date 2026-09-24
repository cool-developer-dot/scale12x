import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

/** Brand typeface: Inter for everything (Bold 700, Regular 400, Medium 500). */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  style: ["normal"],
  adjustFontFallback: true,
});

/** Data face: JetBrains Mono Regular for figures, code and technical specifications. */
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  preload: false,
  adjustFontFallback: true,
});

const siteDescription =
  "Growth, engineered. Scale 12x builds the AI systems and growth infrastructure that let businesses scale without scaling headcount.";

export const metadata: Metadata = {
  metadataBase: new URL("https://scale12x.com"),
  title: {
    default: "Scale 12x: Growth, engineered.",
    template: "%s",
  },
  description: siteDescription,
  applicationName: "Scale 12x",
  keywords: [
    "growth infrastructure",
    "AI automation",
    "AI agents",
    "CRM architecture",
    "revenue operations",
    "cloud computing",
    "cybersecurity",
    "web design",
    "SEO",
    "GEO",
  ],
  authors: [{ name: "Scale 12x" }],
  creator: "Scale 12x",
  publisher: "Scale 12x",
  openGraph: {
    title: "Scale 12x: Growth, engineered.",
    description: siteDescription,
    type: "website",
    locale: "en_US",
    url: "https://scale12x.com",
    siteName: "Scale 12x",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scale 12x: Growth, engineered.",
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      {
        url: "/brand/favicon-512.png",
        type: "image/png",
        sizes: "512x512",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/brand/favicon-dark-512.png",
        type: "image/png",
        sizes: "512x512",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: [{ url: "/brand/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f2ed" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[var(--color-bg-deep)] text-[var(--color-text)]">
        {children}
      </body>
    </html>
  );
}
