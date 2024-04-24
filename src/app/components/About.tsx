"use client"

import React from "react";
import { kode_mono, openSans } from "../fonts";

export default function About({ opacity }: { opacity: number }) {

    const containerRef = React.useRef<HTMLDivElement | null>(null)

    React.useEffect(() => {
        if (!containerRef.current)
            return

        const container = containerRef.current
        container.style.opacity = opacity.toString()

    }, [opacity, containerRef])

    return (
        <div ref={containerRef} className="fixed inset-0 opacity-0 overflow-y-auto">
            <div className={`container px-3 mx-auto h-full min-h-[940px] w-full flex flex-col justify-between items-center gap-1`}>
                <div className="w-full pt-12 flex flex-col gap-7">
                    <h2 className={`${kode_mono.className} p-3 text-5xl font-bold text-gray-200`}>À propos</h2>
                </div>
                <div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ipsum laboriosam ab inventore, nemo vero harum iste tempore cum molestiae cupiditate nihil. Nemo sapiente exercitationem eius, ipsum dignissimos asperiores modi!</p>
                </div>
            </div>
        </div>
    )
}