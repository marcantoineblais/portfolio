import type { Metadata } from "next"
import "./globals.css"
import { openSans } from "./fonts"

export const metadata: Metadata = {
    title: "Marc-Antoine Blais",
    description: "Portfolio du développeur web full-stack Marc-Antoine Blais",
    other: {
        "og:image": "https://www.marcblais.xyz/logo.png",
        image: "https://www.marcblais.xyz/logo.png",
        "og:url": "https://www.marcblais.xyz",
        url: "https://www.marcblais.xyz",
        "og:title": "Marc-Antoine Blais",
        "og:description": "Portfolio du développeur web full-stack Marc-Antoine Blais.",
        "og:type": "website",
        "twitter:card": "summary_large_image"
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={openSans.className + " bg-gray-950"}>{children}</body>
        </html>
    )
}
