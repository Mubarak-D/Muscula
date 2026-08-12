import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { CartProvider } from "@/lib/cart-context";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

/** One family, loaded once, with the width axis exposed. Display, body and
 *  label styles are all cut from this by varying wdth rather than by pulling in
 *  a second and third typeface. */
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://muscula.example"),
  title: {
    default: "Muscula Nutrition, Sri Lanka's first 27g protein bar",
    template: "%s | Muscula Nutrition",
  },
  description:
    "The taste of a Snickers, the nutrition of a premium protein bar. 27g protein, made in Sri Lanka by JNR Marketing.",
  openGraph: {
    title: "Muscula Nutrition",
    description: "Sri Lanka's first 27g high protein bar.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={archivo.variable}>
      <body className="flex min-h-screen flex-col antialiased">
        <CartProvider>
          <a
            href="#main"
            className="t-label sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-xs focus:bg-lime focus:px-4 focus:py-2 focus:text-xs focus:text-ink"
          >
            Skip to content
          </a>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
