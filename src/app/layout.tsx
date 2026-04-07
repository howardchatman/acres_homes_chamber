import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://chamber.chatmaninc.com"),
  title: {
    default: "Acres Homes Chamber of Commerce | Houston, TX",
    template: "%s | Acres Homes Chamber",
  },
  description:
    "The Acres Homes Chamber of Commerce supports local businesses, hosts a farmers market, offers community programs, and builds economic opportunity in northwest Houston.",
  keywords: [
    "Acres Homes chamber of commerce",
    "Houston chamber membership",
    "Acres Homes farmers market",
    "Houston vendor marketplace",
    "Acres Homes business support",
    "Houston hydroponics classes",
    "community event space Acres Homes",
    "northwest Houston business",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://chamber.chatmaninc.com",
    siteName: "Acres Homes Chamber of Commerce",
    title: "Acres Homes Chamber of Commerce",
    description:
      "Building business, community, and opportunity in Acres Homes, Houston, TX.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Acres Homes Chamber of Commerce",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Acres Homes Chamber of Commerce",
    description: "Building business, community, and opportunity in Acres Homes, Houston, TX.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
