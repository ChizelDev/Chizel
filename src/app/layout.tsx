import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, Lora } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SalesChatbot } from "@/components/SalesChatbot";

import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
});
export const metadata: Metadata = {
  metadataBase: new URL("https://www.d2cora.com"),
  title: "D2CORA | One-Stop Digital Marketing Agency for Businesses, Clinics, E-commerce & Local Brands",
  description: "d2cora is your one-stop marketing ecosystem — helping service businesses, local brands, e-commerce stores, clinics, and D2C companies grow through performance marketing, lead generation, Meta & Google Ads, SEO, and conversion optimization. Scale smarter with d2cora.",
  keywords: [
    "digital marketing agency",
    "one stop marketing agency",
    "marketing ecosystem",
    "performance marketing",
    "lead generation agency",
    "Meta ads agency",
    "Google ads agency",
    "marketing for clinics",
    "marketing for local businesses",
    "ecommerce marketing agency",
    "D2C marketing",
    "service business marketing",
    "social media marketing agency",
    "SEO agency India",
    "CRO agency",
    "d2cora",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TGTVC3LZ');`,
          }}
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-YSS004F4T1"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-YSS004F4T1');
            `,
          }}
        />
      </head>
      <body
        className={cn(
          inter.variable,
          spaceGrotesk.variable,
          lora.variable,
          "min-h-screen font-sans antialiased selection:bg-[#3366FF]/25"
        )}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WPXXFKVN"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <Navbar />
        {children}
        <Footer />
        <SalesChatbot />
        <Analytics />
      </body>
    </html>
  );
}
