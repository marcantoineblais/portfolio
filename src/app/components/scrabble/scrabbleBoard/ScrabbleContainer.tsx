"use client"

import React, { ReactNode } from "react"

export default function ScrabbleContainer({ children, setWidth }: { children: ReactNode, setWidth: Function }) {

    const containerRef = React.useRef<HTMLDivElement|null>(null)    

    React.useEffect(() =>{
        function resize() {
            if (!containerRef.current)
                return
    
            const container = containerRef.current
            let width = container.clientWidth

            if (container.clientHeight > 64 && width > container.clientHeight)
                width = container.clientHeight

            container.style.width = width + "px"
            container.style.height = width + "px"
            setWidth(width)
        }
    
        resize()
        window.addEventListener("resize", resize)
        
        return () => {
            window.removeEventListener("resize", resize)
        }
    }, [setWidth])

    return (
        <div ref={containerRef} className="w-full h-full relative">
            { children }
        </div>
    )
}