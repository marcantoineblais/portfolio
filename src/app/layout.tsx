import type { Metadata } from "next"
import "./globals.css"
import { openSans } from "./fonts"

export const metadata: Metadata = {
    title: "Marc-Antoine Blais",
    description: "Portfolio du développeur web full-stack Marc-Antoine Blais",
    other: {
        image: "favicon.ico",
        url: "marcblais.xyz",
        "og:title": "Marc-Antoine Blais",
        "og:description": "Portfolio du développeur web full-stack Marc-Antoine Blais",
        "og:type": "image.png",
        "og:url": "https://marcblais.xyz",
        "og:image": "https://marcblais.xyz/logo.png",
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
