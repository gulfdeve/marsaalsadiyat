import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Script from "next/script";
import { CustomTagsRuntime } from "@/components/custom-tags";
import { StaticCustomTags } from "@/components/static-custom-tags";
import { getSiteContent } from "@/lib/content";
import { defaultSiteContent } from "@/lib/site-content";
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
  title: defaultSiteContent.meta.title,
  description: defaultSiteContent.meta.description,
  verification: {
    google: "5i__v5eSB6Irgdza5L258pmTvrAAMOpr0yu07ail8HI",
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const { customTags = { head: "", body: "" } } = await getSiteContent();

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <StaticCustomTags html={customTags.head} />
      </head>
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
        <StaticCustomTags html={customTags.body} />
        <CustomTagsRuntime head={customTags.head} body={customTags.body} />
        <Script
          id="contentsquare-script"
          strategy="afterInteractive"
          src="https://t.contentsquare.net/uxa/b2116e26094a7.js"
        />
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KDTM3DZM');`,
          }}
        />
        <Script
          id="gtag-js"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-4869J8EZ7M"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-4869J8EZ7M');
gtag('config', 'AW-11256119676');`,
          }}
        />
      </body>
    </html>
  );
}
