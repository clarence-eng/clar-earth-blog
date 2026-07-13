import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import Providers from "@/components/Providers";
import { BASE_URL } from "@/lib/config";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "clar.earth",
  description: "In the shadow of trees, I find my voice. Where the earth listens, and the pen replies.",
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: "clar.earth",
    description: "Poetry and writing by Clare",
    url: BASE_URL,
    type: "website",
    siteName: "clar.earth",
    locale: "en_US",
    images: [{ url: `${BASE_URL}/images/posts/daughter-of-the-tides.jpg`, width: 1200, height: 800, alt: "Poetry and writing by Clare — clar.earth" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "clar.earth",
    description: "Poetry and writing by Clare",
    images: [`${BASE_URL}/images/posts/daughter-of-the-tides.jpg`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded focus:bg-[var(--forest)] focus:text-white focus:text-sm"
        >
          Skip to main content
        </a>
        <Providers>
          <CustomCursor />
          {children}
        </Providers>
      </body>
    </html>
  );
}
