import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import { GoogleTagManager } from "@/components/tracking/GoogleTagManager";
import { TrackingDebugger } from "@/components/tracking/TrackingDebugger";
import { OfflineTracker } from "@/components/tracking/OfflineTracker";
import { PhoneLink } from "@/components/tracking/PhoneLink";
import { CartProvider } from "@/components/shop/CartContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Advanced Analytics Validation",
  description: "A comprehensive testing ground for GTM and GA4 implementation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${orbitron.variable} antialiased bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-primary-foreground`}
      >
        <GoogleTagManager />
        <CartProvider>
          {children}
          <PhoneLink />
          <OfflineTracker />
          <TrackingDebugger />
        </CartProvider>
      </body>
    </html>
  );
}
