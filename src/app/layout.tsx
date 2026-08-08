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
  title: "d2cora | Top Digital Marketing Agency for D2C Brands & Ecommerce Growth",
  description: "d2cora is a leading digital marketing agency for D2C brands, specializing in performance marketing, conversion rate optimization (CRO), and ecommerce growth strategies. Partner with us to scale your business and boost your revenue today.",
  keywords: ["digital marketing agency", "D2C brands", "performance marketing", "CRO", "ecommerce growth", "d2c marketing"],
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
          "min-h-screen font-sans antialiased selection:bg-white/20"
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
