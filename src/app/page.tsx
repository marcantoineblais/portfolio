"use client"

import React, { useMemo } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Catcam from "./components/catcam/Catcam";
import MainSection from "./components/MainSection";
import Scrabble from "./components/scrabble/Scrabble";
import useMainComponent from "./hooks/useMainComponent";
import Skills from "./components/about/Skills";
import Technologies from "./components/about/Technologies";
import Contact from "./components/contact/Contact";

export default function Home() {
    const [navbarVisible, setNavbarVisible] = React.useState<boolean>(false)
    const [timers] = React.useState<any>({})

    const hero = useMainComponent(
        "Hero", 
        (_name: string, opacity: number) => {
            return (
                <Hero 
                    key={1} 
                    opacity={opacity} 
                    scrollToAbout={() => scrollTo(skills.center)} 
                    scrollToContact={() => scrollTo(contact.center)}
                    scrollToProjects={() => scrollTo(catcam.center)} 
                />
            )
        }
    )

    const catcam = useMainComponent(
        "La Catcam", 
        (name: string, opacity: number) => {
            return (
                <MainSection 
                    key={2} 
                    section="Réalisations" 
                    name={name} 
                    nextSectionTitle="Réalisation suivante" 
                    scrollTo={() => scrollTo(scrabble.center)} 
                    opacity={opacity} 
                    className="bg-gray-100 text-gray-950 border-gray-950" 
                >
                    <Catcam disabledCarousel={opacity < 1} />
                </MainSection>
            )
        }
    )
    
    const scrabble = useMainComponent(
        "Scrabble Cheetah", 
        (name: string, opacity: number) => {
            return (
                <MainSection 
                    key={3} 
                    section="Réalisations" 
                    name={name} 
                    nextSectionTitle="À propos" 
                    scrollTo={() => scrollTo(skills.center)} 
                    opacity={opacity} 
                    className="bg-orange-50 text-gray-950 border-gray-950"
                >
                    <Scrabble disabledCarousel={opacity < 1} />
                </MainSection>
            )
        }
    )
    
    const skills = useMainComponent(
        "Compétences", 
        (name: string, opacity: number) => {
            return (
                <MainSection 
                    key={4} 
                    section="À propos" 
                    name={name} 
                    nextSectionTitle="À propos (suite)" 
                    scrollTo={() => scrollTo(technology.center)} 
                    opacity={opacity} 
                    className="bg-stone-200 text-gray-900 border-gray-900" 
                >
                    <Skills />
                </MainSection>
            )
        }
    )

    const technology = useMainComponent(
        "Technologies utilisées", 
        (name: string, opacity: number) => {
            return (
                <MainSection 
                    key={5} 
                    section="À propos" 
                    name={name} 
                    nextSectionTitle="Contact" 
                    scrollTo={() => scrollTo(contact.center)} 
                    opacity={opacity} 
                    className="bg-stone-200 text-gray-900 border-gray-900" 
                >
                    <Technologies />
                </MainSection>
            )
        }
    )

    const contact = useMainComponent(
        "Contact",
        (name: string, opacity: number) => {
            return (
                <MainSection 
                    key={6} 
                    section={name} 
                    name="Rejoignez-moi" 
                    opacity={opacity} 
                    className="bg-yellow-50 text-gray-900 border-gray-950"
                >
                    <Contact />
                </MainSection>
            )
        }
    )

    const components = useMemo(() => [hero, catcam, scrabble, skills, technology, contact], [hero, catcam, scrabble, skills, technology, contact])
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
        const calculateScrollHeight = () => {
            const currentHeight = window.scrollY

            components.forEach((component, i) => {                
                if (component.start <= currentHeight && component.end >= currentHeight) {
                    component.setOpacity(1)
                    component.setIsRendered(true)
                    setNavbarVisible(i > 0)
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
            timers.scrollTimeout = window.setTimeout(() => scrollToNearestSection(), 1000)
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
            <Navbar visible={navbarVisible} scrollToProject={() => scrollTo(catcam.center)} scrollToAbout={() => scrollTo(skills.center)} scrollToContact={() => scrollTo(contact.center)} />
            <main ref={mainRef} className="flex flex-col items-center">
                { renderMainComponents() }
            </main>
        </>
    );
}
