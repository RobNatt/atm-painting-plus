import type { Metadata, Viewport } from "next";
import { Public_Sans, Source_Serif_4 } from "next/font/google";
import { ConsentBanner } from "@/components/Consent";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { QuoteProvider } from "@/components/Quote";
import { localBusinessSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import "./globals.css";

const serif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-source-serif",
  display: "swap",
});

const sans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-public-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url.value),
  title: { default: `House Painter in Wyoming, MI | ${site.name}`, template: `%s | ${site.name}` },
  description: `Interior and exterior house painting by ${site.owner}, based in Wyoming, MI. Get a free quote.`,
  openGraph: { siteName: site.name, locale: "en_US", type: "website" },
  // Until the real domain is confirmed, keep placeholder builds out of search results.
  robots: site.url.confirmed ? undefined : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#F7F4EE",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        {/* Lets motion start states apply only when JS is running. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a
          href="#main"
          className="btn btn-primary fixed left-4 top-4 z-50 -translate-y-24 focus:translate-y-0"
        >
          Skip to content
        </a>
        <QuoteProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <ConsentBanner />
        </QuoteProvider>
        <JsonLd data={localBusinessSchema()} />
      </body>
    </html>
  );
}
