"use client"

import React, { ReactNode } from "react"
import SideArrow from "./SideArrow"

export default function Carousel(
    { children, accentColor, className, disabledArrows }: 
    { children: ReactNode[], accentColor: string, className?: string, disabledArrows: boolean }
) {

    const [selectedIndex, setSelectedIndex] = React.useState<number>(0)
    const [nbItems, setNbItems] = React.useState<number>(0)
    const [dots, setDots] = React.useState<ReactNode | null>(null)
    const [content, setContent] = React.useState<ReactNode[]>([])
    const [carouselWidth, setCarouselWidth] = React.useState<number>(0)

    const containerRef = React.useRef<HTMLDivElement | null>(null)
    const carouselRef = React.useRef<HTMLDivElement | null>(null)
    const leftArrowRef = React.useRef<HTMLDivElement | null>(null)
    const rightArrowRef = React.useRef<HTMLDivElement | null>(null)
    
    // Group element by pair when display is large enough
    React.useEffect(() => {
        function setBreakPoint() {
            let updatedNbItems
            let content = []
            const width = window.innerWidth

            if (width < 1024) {
                updatedNbItems = children.length
                content = children.map((child, i) => {
                    return ( 
                        <div key={i} className="p-1 h-full flex justify-center items-center">
                            { child }
                        </div>
                    )
                })
            } else {
                updatedNbItems = Math.ceil(children.length / 2)

                for (let i = 0; i < updatedNbItems; i++) {
                    const index = 2 * i
                    content.push(
                        <div key={i} className="p-1 h-full w-full flex justify-center items-center gap-3">
                            {children[index]}
                            {children[index + 1]}
                        </div>
                    )
                }
            }
            
            setContent(content)
            setNbItems(updatedNbItems)

            if (selectedIndex > updatedNbItems - 1)
                setSelectedIndex(0)
        }

        window.addEventListener("resize", setBreakPoint)
        setBreakPoint()

        return () => {
            window.removeEventListener("resize", setBreakPoint)
        }
    }, [children, selectedIndex])

    // Remove opacity 0 once the carousel elements are loaded
    React.useEffect(() => {
        setTimeout(() => {
            if (!carouselRef.current)
                return
    
            const carousel = carouselRef.current
            carousel.classList.remove("opacity-0")
        }, 1000)
    }, [])

    // Change carousel width on screen resize
    React.useEffect(() => {
        const resize = () => {
            if (!containerRef.current)
                return
            
            const container = containerRef.current
            const width = container.clientWidth

            setCarouselWidth(width)
        }

        resize()
        window.addEventListener("resize", resize)

        return () => {
            window.removeEventListener("resize", resize)
        }

    }, [children])

    // Update carousel size when resizing window
    React.useEffect(() => {
        if (!carouselRef.current)
            return
        
        const carousel = carouselRef.current
        carousel.style.width = (carouselWidth * nbItems) + "px"
        
        for (let i = 0; i < carousel.children.length; i++) {
            const child = carousel.children[i] as HTMLElement
            child.style.width = carouselWidth + "px"
        }
    }, [children, nbItems, carouselWidth])

    // Update dots number and color when selecting an item or resizing
    React.useEffect(() => {
        const dots: ReactNode[] = []

        for (let i = 0; i < nbItems; i++) {
            const bg = i === selectedIndex ? accentColor : "bg-gray-300"
            dots.push(<div key={i} onClick={() => setSelectedIndex(i)} className={`w-4 h-4 rounded-full cursor-pointer duration-500 hover:opacity-75 ${bg}`}></div>)
        }

        setDots(dots)
    }, [nbItems, selectedIndex, accentColor])

    // Make the carousel move when its selection changes
    React.useEffect(() => {
        if (!carouselRef.current)
            return

        const carousel = carouselRef.current
        carousel.style.left = -(selectedIndex * carouselWidth) + "px"
    }, [selectedIndex, nbItems, carouselWidth])

    
    function scrollRight() {
        if (selectedIndex < nbItems - 1)
            setSelectedIndex(selectedIndex + 1)
        else
            setSelectedIndex(0)
    }

    function scrollLeft() {
        if (selectedIndex > 0)
            setSelectedIndex(selectedIndex - 1)
        else
            setSelectedIndex(nbItems - 1)
    }

    return (
        <div className={`w-full h-full flex flex-col justify-between items-center gap-3 ${className || ""}`}>
            <div className="w-full h-full flex justify-center items-center">
                <SideArrow containerRef={leftArrowRef} action={() => scrollLeft()} reversed={true} disabled={disabledArrows} />
                <div ref={containerRef} className="relative w-full h-full flex flex-col justify-center items-center overflow-hidden">
                    <div ref={carouselRef} className="absolute top-0 left-0 bottom-0 flex justify-around items-center opacity-0 duration-1000">
                        { content }
                    </div>
                </div>
                <SideArrow containerRef={rightArrowRef} action={() => scrollRight()} reversed={false} disabled={disabledArrows} />
            </div>
            <div className="flex justify-center items-center gap-7">
                {dots}
            </div>
        </div>
    )
}