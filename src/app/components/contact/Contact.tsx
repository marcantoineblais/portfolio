"use client"

import Link from "next/link"
import React from "react"

export default function Contact() {

    const containerRef = React.useRef<HTMLDivElement | null>(null)

    React.useEffect(() => {
        if (!containerRef.current)
            return

        const container = containerRef.current
        setTimeout(() => {
            container.classList.remove("opacity-0")
        }, 1000)
    }, [])

    return (
        <div className="pt-5 h-full flex justify-center items-start">
            <div ref={containerRef} className="py-5 px-3 flex flex-col bg-white/10 rounded-lg gap-7 opacity-0 duration-1000">
                <h2 className="text-center text-3xl underline underline-offset-4">Marc-Antoine Blais</h2>
                <div className="flex justify-between gap-5 text-lg">
                    <div className="hidden sm:flex pr-3 flex-col border-r">
                        <span>Téléphone</span>
                        <span>Courriel</span>
                        <span>Github</span>
                        <span>LinkedIn</span>
                    </div>

                    <div className="flex flex-col sm:items-end">
                        <span>514-296-1923</span>
                        <a className="hover:text-gray-300 duration-200" href="mailto://blaisma@live.fr">blaisma@live.fr</a>
                        <Link className="hover:text-gray-300 duration-200" href={"https://github.com/marcantoineblais"} target="_blank">https://github.com/marcantoineblais</Link>
                        <Link className="hover:text-gray-300 duration-200" href={"https://linkedin.com/in/marcantoineblais"} target="_blank">https://linkedin.com/in/marcantoineblais</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}