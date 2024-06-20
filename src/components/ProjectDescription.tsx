"use client"

import React, { ReactNode } from "react";

export default function ProjectDescription({ children }: { children: ReactNode }) {

    const containerRef = React.useRef<HTMLDivElement | null>(null)

    React.useEffect(() => {
        const resize = () => {
            if (!containerRef.current)
                return

            const container = containerRef.current

            if (container.clientHeight < 540)
                container.style.fontSize = "0.8rem"
            else
                container.style.fontSize = "1rem"
        }

        window.addEventListener("resize", resize)
        resize()

        return () => {
            window.removeEventListener("resize", resize)
        }
    }, [])

    return (
        <div ref={containerRef} className="p-0.5 h-full flex flex-col justify-between items-center gap-3">
            { children }
        </div>
    )
}