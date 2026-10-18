import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LAMBTECH LLC",
  description: "LAMBTECH LLC corporate website foundation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
