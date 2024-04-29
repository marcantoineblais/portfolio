"use client"

import React, { useMemo } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Catcam from "./components/catcam/Catcam";
import Project from "./components/Project";
import Scrabble from "./components/Scrabble";
import useMainComponent from "./hooks/useMainComponent";
import About from "./components/About";

export default function Home() {
    const [navbarVisible, setNavbarVisible] = React.useState<boolean>(false)
    const [timers] = React.useState<any>({})

    const hero = useMainComponent(
        "Hero", 
        (_name: string, opacity: number) => <Hero key={1} opacity={opacity} scrollTo={() => scrollTo(catcam.center)} />
    )

    const catcam = useMainComponent(
        "La Catcam", 
        (name: string, opacity: number) => {
            return (
                <Project key={2} name={name} scrollTo={() => scrollTo(scrabble.center)} opacity={opacity} className="bg-gray-100 text-gray-950" >
                    <Catcam disabledCarousel={opacity < 1} />
                </Project>
            )
        }
    )
    
    const scrabble = useMainComponent(
        "Scrabble Cheetah", 
        (name: string, opacity: number) => {
            return (
                <Project key={3} name={name} scrollTo={() => scrollTo(about.center)} opacity={opacity} className="bg-orange-50 text-gray-950" >
                    <Scrabble disabledCarousel={opacity < 1} />
                </Project>
            )
        }
    )
    
    const about = useMainComponent(
        "À propos", 
        (_name: string, opacity: number) => <About key={4} opacity={opacity} />
    )

    const components = useMemo(() => [hero, catcam, scrabble, about], [hero, catcam, scrabble, about])
    const mainRef = React.useRef<HTMLDivElement|null>(null)


    React.useEffect(() => {
        hero.setIsRendered(true)
        hero.setOpacity(1)
        window.scrollTo({ top: 0 })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    React.useEffect(() => {
        const resize = () => {
            if (!mainRef.current)
                return

            const main = mainRef.current
            const height = window.innerHeight
            let currentHeight = 0

            components.forEach((component, i) => {
                if (i === 0) {
                    component.setStart(0)
                    component.setCenter(0)
                    component.setEnd(height)
                    currentHeight += 2 * height;
                } else if (i === components.length - 1) {
                    component.setStart(currentHeight)
                    component.setCenter(currentHeight + height)
                    component.setEnd(currentHeight + height)
                    currentHeight += height
                } else {
                    component.setStart(currentHeight)
                    component.setCenter(currentHeight + height)
                    component.setEnd(currentHeight + (2 * height))
                    currentHeight += 4 * height
                }
            })

            main.style.height = currentHeight + "px"
        }

        window.addEventListener("resize", resize)
        resize()

        return () => {
            window.removeEventListener("resize", resize)
        }
    }, [components])

    React.useEffect(() => {
        const scrollStart = window.scrollY

        const calculateScrollHeight = () => {
            const currentHeight = window.scrollY

            components.forEach((component, i) => {                
                if (component.start <= currentHeight && component.end >= currentHeight) {
                    component.setOpacity(1)
                    component.setIsRendered(true)
                    setNavbarVisible(i > 0)

                    // If entering the component, stick to it
                    if (scrollStart < component.start || scrollStart > component.end)
                        window.scrollTo({top: component.center, behavior: "smooth"})
                } else if (i > 0 && component.start > currentHeight && components[i - 1].end < currentHeight) {
                    component.setOpacity((currentHeight - components[i - 1].end) / (component.start - components[i - 1].end))
                    component.setIsRendered(true)
                } else if (i < components.length - 1 && component.end < currentHeight && components[i + 1].start > currentHeight) {
                    component.setOpacity((components[i + 1].start - currentHeight) / (components[i + 1].start - component.end))
                    component.setIsRendered(true)
                } else {
                    component.setOpacity(0)
                    component.setIsRendered(false)
                }
            })

            clearTimeout(timers.scrollTimeout)
            timers.scrollTimeout = window.setTimeout(() => scrollToNearestSection(), 300)
        }

        const scrollToNearestSection = () => {
            const currentHeight = window.scrollY
            let nearestSection = components[0]

            components.forEach(component => {
                if (Math.abs(currentHeight - component.center) < Math.abs(currentHeight - nearestSection.center))
                    nearestSection = component
            })
            
            window.scrollTo({top: nearestSection.center, behavior: "smooth"})
        }

        window.addEventListener("scroll", calculateScrollHeight)
        
        return () => {
            window.removeEventListener("scroll", calculateScrollHeight)
        }
    }, [components, timers])

    function scrollTo(position: number) {
        window.scrollTo({ top: position, behavior: "instant" })
    }

    function renderMainComponents() {
        return components.map(component => component.isRendered ? component.component : null)
    }

    return (
        <>
            <Navbar visible={navbarVisible} scrollToProject={() => scrollTo(catcam.center)} scrollToAbout={() => scrollTo(about.center)} />
            <main ref={mainRef} className="flex flex-col items-center">
                { renderMainComponents() }
            </main>
        </>
    );
}
