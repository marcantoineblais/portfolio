"use client"

import React from "react"

export default function SideArrow({ action, reversed }: { action: Function, reversed: boolean }) {

    const arrowRef = React.useRef<SVGSVGElement|null>(null)

    React.useEffect(() => {
        const resize = () => {
            if (!arrowRef.current)
                return

            const arrow = arrowRef.current
            const width = 12 + (window.innerWidth / 25)
            arrow.style.width = width + "px"
        }

        window.addEventListener("resize", resize)
        resize()

        return () => {
            window.removeEventListener("resize", resize)
        }
    }, [])

    return (
        <div className={`h-full flex flex-col justify-center ${reversed ? "items-end" : "items-start"}`}>
            <svg ref={arrowRef} onClick={() => action()} className={`cursor-pointer hover:opacity-75 ${reversed ? "rotate-90" : "-rotate-90"}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
                <rect fill="currentColor" x="221.85" y="230.65" width="252" height="39.88" rx="4.17" transform="translate(774.26 294.99) rotate(150.17)" />
                <rect fill="currentColor" x="25.86" y="230.06" width="252" height="39.88" rx="4.17" transform="translate(146.24 -42.46) rotate(30.17)" />
            </svg>
        </div>
    )
}