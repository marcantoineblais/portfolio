"use client"

import { StaticImport } from "next/dist/shared/lib/get-img-props"
import Image from "next/image"
import React from "react"

export default function AboutSection({ title, images, wait }: { title: string, images: StaticImport[], wait: number }) {

    const containerRef = React.useRef<HTMLDivElement | null>(null)
    const imagesRef = React.useRef<HTMLDivElement | null>(null)

    React.useEffect(() => {
        if (!containerRef.current || !imagesRef.current)
            return

        const container = containerRef.current
        const images = imagesRef.current.children
        const timeouts: NodeJS.Timeout[] = []

        const initialTimeout = setTimeout(() => {
            container.classList.remove("opacity-0")

            for (let i = 0; i < images.length; i++) {
                const image = images[i]
                const duration = ((i + 1) * 200)
                const timeout = setTimeout(() => {
                    image.classList.remove("opacity-0")
                }, duration)

                timeouts.push(timeout)
            }
        }, wait)

        return () => {
            clearTimeout(initialTimeout)
            timeouts.forEach(timeout => clearTimeout(timeout))
        }
    }, [images])

    function renderImages() {
        return images.map((image, i) => {
            return <Image key={i} src={image} alt="logo" className="w-fit h-16 lg:h-24 px-1.5 lg:px-5 object-contain opacity-0 duration-500" />
        })
    }

    return (
        <div ref={containerRef} className="py-1 w-full flex flex-col justify-center items-center gap-3 opacity-0 duration-500">
            <h3 className="w-full tracking-widest text-xl lg:text-3xl underline underline-offset-4">{ title }</h3>

            <div ref={imagesRef} className="py-1 flex justify-center items-center flex-wrap gap-3">
                { renderImages() }
            </div>
        </div>
    )
}