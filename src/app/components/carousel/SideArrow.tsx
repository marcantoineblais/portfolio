"use client"

import React from "react"

export default function SideArrow(
    { action, containerRef, reversed, disabled }: 
    { action: Function, containerRef: React.MutableRefObject<HTMLDivElement|null>, reversed: boolean, disabled: boolean }
) {

    const [classList, setClassList] = React.useState<string>("-translate-y-full opacity-0")
    const arrowRef = React.useRef<SVGSVGElement|null>(null)

    React.useEffect(() => {
        if (disabled) 
            setClassList(`${reversed ? "translate-x-full" : "-translate-x-full"} opacity-0`)
        else 
            setClassList("cursor-pointer hover:opacity-75")
        
    }, [disabled, reversed])

    return (
        <div ref={containerRef} className={`w-16 h-full flex flex-col justify-center ${reversed ? "items-end" : "items-start"}`}>
            <svg ref={arrowRef} onClick={disabled ? undefined : () => action()} className={`duration-500 ${classList} ${reversed ? "rotate-90" : "-rotate-90"}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
                <rect fill="currentColor" x="221.85" y="230.65" width="252" height="39.88" rx="4.17" transform="translate(774.26 294.99) rotate(150.17)" />
                <rect fill="currentColor" x="25.86" y="230.06" width="252" height="39.88" rx="4.17" transform="translate(146.24 -42.46) rotate(30.17)" />
            </svg>
        </div>
    )
}