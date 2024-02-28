"use client"

import React from "react"

export default function FoldArrow({ className, rotated }: { className: string, rotated: boolean }) {

    const arrowRef = React.useRef<HTMLDivElement|null>(null)

    React.useEffect(() => {
        if (!arrowRef.current)
            return

        const arrow = arrowRef.current

        if (rotated)
            arrow.classList.remove("rotate-180")
        else
            arrow.classList.add("rotate-180")
    }, [rotated])

    return (
        <div ref={arrowRef} className={className + " duration-500"} >
            <svg className="rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
                <rect fill="currentColor" x="26.01" y="198.84" width="252" height="39.88" rx="4.17" transform="translate(-89.02 105.31) rotate(-30)"/>
                <rect fill="currentColor" x="221.99" y="198.84" width="252" height="39.88" rx="4.17" transform="translate(539.97 582.25) rotate(-150)"/>
                <rect fill="currentColor" x="62.29" y="269.95" width="214.14" height="39.88" rx="4.17" transform="matrix(0.87, -0.5, 0.5, 0.87, -122.26, 123.52)"/>
                <rect fill="currentColor" x="225.37" y="270.35" width="215.72" height="39.88" rx="4.17" transform="translate(476.68 708.31) rotate(-150)"/>
            </svg>
        </div>
    )
}