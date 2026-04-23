import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cancely — Cancel every subscription you forgot.",
  description:
    "Connect your card. See the 23 things you're paying for. Cancel any in one tap. Keep what you love.",
  openGraph: {
    title: "Cancely — Cancel every subscription you forgot.",
    description:
      "Connect your card. See the 23 things you're paying for. Cancel any in one tap. Keep what you love.",
    images: [
      {
        url: "https://waitlist-api-sigma.vercel.app/api/og?title=Cancely&accent=red&category=Personal%20finance",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      "https://waitlist-api-sigma.vercel.app/api/og?title=Cancely&accent=red&category=Personal%20finance",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-neutral-900 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
