"use client"

import React, { ReactNode } from "react";
import FoldArrow from "./FoldArrow";

export default function Drawer(
    { children, title, id, open, openDrawer }:
    { children: ReactNode, title: string, id: number, open: boolean, openDrawer: Function }
) {

    const [rotated, setRotated] = React.useState<boolean>(false)
    const titleRef = React.useRef<HTMLDivElement|null>(null)
    const drawerRef = React.useRef<HTMLDivElement|null>(null)
    const containerRef = React.useRef<HTMLDivElement|null>(null)

    React.useEffect(() => {
        if (!drawerRef.current || !containerRef.current || !titleRef.current)
            return

        const title = titleRef.current
        const drawer = drawerRef.current
        const container = containerRef.current

        if (open) {
            drawer.classList.remove("-translate-y-full")
            container.style.maxHeight = title.clientHeight + drawer.clientHeight + "px"
            setRotated(false)
        } else {
            drawer.classList.add("-translate-y-full")
            container.style.maxHeight = title.clientHeight + 8 + "px"
            setRotated(true)
        }
    }, [open])

    return (
        <div ref={containerRef} className="flex flex-col border-b border-b-neutral-900 border-spacing-12 rounded duration-500">
            <div ref={titleRef} onClick={() => openDrawer(id)} className="flex justify-between items-center ">
                <h2 className="font-bold underline">{ title }</h2>
                <FoldArrow className="w-[1.5rem]" rotated={rotated} />
            </div>
            <div className="overflow-hidden">
                <div ref={drawerRef} className="py-1 flex flex-col gap-5 -translate-y-full origin-top duration-500">
                    { children }
                </div>
            </div>
        </div>
    )
}