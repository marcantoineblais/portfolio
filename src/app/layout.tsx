import type { Metadata } from "next";
import "./globals.css";
import { openSans } from "./fonts";

export const metadata: Metadata = {
  title: "Marc-Antoine Blais",
  description: "Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={openSans.className + " bg-gray-950"}>{children}</body>
    </html>
  );
}
