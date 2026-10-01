import type { Metadata } from "next";
import "./globals.css";
import PostHogProvider from "@/components/PostHogProvider";
import { ChatProvider } from "@/context/ChatContext";
import ScrollObserver from "@/components/ScrollObserver";

export const metadata: Metadata = {
  metadataBase: new URL("https://tekbridges.com"),
  title: "TekBridges | Enterprise-Grade Web Infrastructure",
  description:
    "Secure, zero-friction digital infrastructure for independent financial professionals and B2B consultants.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "TekBridges | Enterprise-Grade Web Infrastructure",
    description:
      "Secure, zero-friction digital infrastructure for independent financial professionals and B2B consultants.",
    type: "website",
    siteName: "TekBridges",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "TekBridges Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "TekBridges | Enterprise-Grade Web Infrastructure",
    description:
      "Secure, zero-friction digital infrastructure for independent financial professionals and B2B consultants.",
    images: ["/icon.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <PostHogProvider>
          <ChatProvider>
            <ScrollObserver />
            {children}
          </ChatProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
