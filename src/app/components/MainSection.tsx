"use client"

import React, { ReactNode } from "react"
import { anta, kode_mono } from "../fonts"
import DownArrow from "./DownArrow"


export default function Project(
    { children, opacity, section, name, className, nextSectionTitle, scrollTo }:
    { children: ReactNode, opacity: number, section: string, name: string, className: string, nextSectionTitle?: string, scrollTo?: Function }
) {

    const [overflow, setOverflow] = React.useState<string>("overflow-y-hidden")
    const containerRef = React.useRef<HTMLDivElement | null>(null)

    React.useEffect(() => {
        if (!containerRef.current)
            return

        const container = containerRef.current
        container.style.opacity = opacity.toString()

    }, [opacity, containerRef])

    React.useEffect(() => {
        setOverflow(opacity < 1 ? "overflow-y-hidden" : "overflow-y-auto")
    }, [opacity])

    return (
        <div ref={containerRef} className={`fixed inset-0 opacity-0 flex flex-col justify-between items-center ${className} ${overflow}`}>
            <div className={`container grow px-3 mx-auto w-full flex flex-col gap-1 min-h-[720px]`}>
                <div className="w-full pt-12 flex flex-col gap-3">
                    <h2 className={`${kode_mono.className} p-1 lg:p-3 text-3xl lg:text-5xl font-bold`}>{section}</h2>
                    <h2 className={`${anta.className} text-3xl lg:text-5xl text-center border-b`}>{name}</h2>
                </div>
                <div className={`grow ${overflow}`}>
                    {children}
                </div>
            </div>

            {scrollTo && nextSectionTitle && <DownArrow text={nextSectionTitle} action={() => scrollTo()} disabled={opacity < 1} /> }
        </div>
    )
}