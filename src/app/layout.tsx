import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mohammed Daiyaan — Systems Engineer Portfolio",
  description:
    "Interactive terminal portfolio of Mohammed Daiyaan — systems-oriented engineer experienced in OS development, compilers, and embedded systems.",
  openGraph: {
    title: "Mohammed Daiyaan — Systems Engineer Portfolio",
    description:
      "Interactive terminal portfolio. Type commands to explore.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gradient-radial antialiased">
        <div className="crt-overlay" />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
