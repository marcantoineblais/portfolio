import type { Metadata } from "next";
import "../globals.css";
import { openSans } from "../../fonts";
import { NextIntlClientProvider } from "next-intl";
import Navbar from "../../components/navbar/Navbar";

export const metadata: Metadata = {
  title: "Marc-Antoine Blais",
  description: "Portfolio du développeur web full-stack Marc-Antoine Blais",
  other: {
    "og:image": "https://marcblais.xyz/logo.png",
    image: "https://marcblais.xyz/logo.png",
    "og:url": "https://marcblais.xyz",
    url: "https://marcblais.xyz",
    "og:title": "Marc-Antoine Blais",
    "og:description":
      "Portfolio du développeur web full-stack Marc-Antoine Blais.",
    "og:type": "website",
    "twitter:card": "summary_large_image",
  },
};

type RootLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body
        className={`w-screen h-screen flex ${openSans.className} bg-gray-950`}
      >
        <div className="flex flex-col w-dvw h-dvh overflow-hidden">
          <NextIntlClientProvider locale={locale}>
            <Navbar />
            {children}
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
}
