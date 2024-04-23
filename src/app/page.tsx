"use client"

import React, { ReactNode } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Catcam from "./components/Catcam";
import Project from "./components/Project";
import Scrabble from "./components/Scrabble";
import useMainComponent from "./hooks/useMainComponent";
import { MainComponent } from "./models/MainComponent";

export default function Home() {
    const [windowHeight, setWindowHeight] = React.useState<number>(0)
    const [navbarVisible, setNavbarVisible] = React.useState<boolean>(false)

    const hero = useMainComponent(
        "hero", 
        (name: string, opacity: number) => <Hero opacity={opacity} scrollTo={(pageHeight: number) => scrollTo(pageHeight)} />
    )

    const catcam = useMainComponent(
        "catcam", 
        (name: string, opacity: number) => {
            return (
                <Project name={name} opacity={opacity} className="bg-gray-100 text-gray-950" >
                    <Catcam scrollTo={(pageHeight: number) => scrollTo(pageHeight)} />
                </Project>
            )
        }
    )
    
    const scrabble = useMainComponent(
        "scrabble", 
        (name: string, opacity: number) => {
            return (
                <Project name={name} opacity={opacity} className="bg-gray-100 text-gray-950" >
                    <Catcam scrollTo={(pageHeight: number) => scrollTo(pageHeight)} />
                </Project>
            )
        }
    )

    const [components] = React.useState<MainComponent[]>([hero, catcam, scrabble]);

    React.useEffect(() => {
        const scrollUp = () => {
            components[0].setOpacity(1)
            components[0].setIsRendered(true)
            window.scrollTo({ top: 0 })
        }

        window.addEventListener("load", scrollUp)

        return () => {
            window.removeEventListener("load", scrollUp)
        }
    }, [components])

    React.useEffect(() => {
        const resize = () => {
            const height = window.innerHeight
            let currentHeight = 0

            components.forEach((component, i) => {
                if (i === 0) {
                    component.setOpacity(1)
                    component.setIsRendered(true)
                    component.setStart(0)
                    component.setCenter(0)
                    component.setEnd(height)
                    currentHeight += 2 * height;
                    
                } else {
                    component.setStart(currentHeight)
                    component.setCenter(currentHeight + height)
                    component.setEnd(currentHeight + (2 * height))
                    currentHeight += 4 * height
                }
                console.log(component);
            })
        }

        window.scrollTo({ top: 0 })
        window.addEventListener("resize", resize)
        window.addEventListener("load", resize)
        resize()

        return () => {
            window.removeEventListener("resize", resize)
            window.removeEventListener("load", resize)
        }
    }, [components])

    React.useEffect(() => {
        const calculateScrollHeight = () => {
            const currentHeight = window.scrollY

            components.forEach(component => {
                if (component.start >= currentHeight && component.end <= currentHeight) {
                    component.setOpacity(1)
                    component.setIsRendered(true)
                } else {
                    component.setOpacity(0)
                    component.setIsRendered(false)
                }
            })
        }

        window.addEventListener("scroll", calculateScrollHeight)

        return () => {
            window.removeEventListener("scroll", calculateScrollHeight)
        }
    }, [components])

    function scrollTo(position: number) {
        window.scrollTo({ top: position, behavior: "smooth" })
    }

    function renderMainComponents() {
        const renderedComponents: ReactNode[] = []
        components.forEach(component => {            
            if (component.isRendered)
                renderedComponents.push(component.component)
        })

        return renderedComponents
    }

    return (
        <>
            <Navbar visible={navbarVisible} scrollToProject={() => scrollTo(components[1].center)} />
            <main className="flex flex-col items-center h-[2400vh]">
                { renderMainComponents() }
            </main>
        </>
    );
}
