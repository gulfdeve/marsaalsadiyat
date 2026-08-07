import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Marsa Al Saadiyat Abu Dhabi | Waterfront Residences",
  description:
    "A landmark AED 100 billion waterfront destination on Saadiyat Island — a 6.4 million sqm masterplan of private mansions, luxury villas, waterfront apartments and branded residences along an 8km waterfront with Abu Dhabi's largest marina.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <GoogleTagManager gtmId="GTM-KDTM3DZM" />
      <body className="min-h-full flex flex-col bg-background font-sans text-foreground">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KDTM3DZM"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
