"use client"

import React from "react";
import TextBubble from "./TextBubble";
import CatcamImg1 from "../images/catcam-light.png"
import CatcamImg2 from "../images/catcam-dark.png"
import Image from "next/image";

export default function CatcamDescription() {

    const imageLightRef = React.useRef<HTMLImageElement|null>(null)
    const imageDarkRef = React.useRef<HTMLImageElement|null>(null)

    React.useEffect(() => {
        const interval = setInterval(() => {
            if (!imageLightRef.current || !imageDarkRef.current)
                return

            const imageLight = imageLightRef.current
            const imageDark = imageDarkRef.current

            imageLight.classList.toggle("opacity-0")
            imageDark.classList.toggle("opacity-0")
        }, 8000)

        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <>
            <div className="h-full w-full flex items-center gap-3">
                <div className="p-0.5 h-full flex flex-col justify-between gap-3">
                    <TextBubble className="bg-gray-200">La Catcam est une application web conçue spécifiquement pour regarder vos animaux lorsque vous quittez votre foyer.</TextBubble>
                    <TextBubble className="bg-gray-200">Il est possible d'utiliser une fonctionnalité de détections de mouvements pour enregistrer les méfaits de vos félins favoris et de les prendre la main dans le sac!</TextBubble>
                    <TextBubble className="bg-gray-200">Avec la Catcam, votre vie privée est protégée puisque l'application utilise un serveur local dans votre résidence pour diffuser et enregistrer les vidéos.</TextBubble>
                    <TextBubble className="bg-gray-200">
                        L'application offre un design simple et efficace autant sur mobile que sur PC. Il est possible de personnalisé certains aspects de l'interface pour mieux répondre à vos besoins.
                    </TextBubble>
                </div>
                <div className="p-3 relative h-full grow">
                    <Image ref={imageLightRef} className="absolute h-full inset-0 p-3 border-2 border-gray-200 bg-neutral-100 rounded-lg object-contain duration-1000" src={CatcamImg1} alt="capture d'écran de l'application Catcam" />
                    <Image ref={imageDarkRef} className="absolute h-full inset-0 p-3 border-2 border-neutral-200 bg-neutral-900 rounded-lg object-contain duration-1000 opacity-0" src={CatcamImg2} alt="capture d'écran de l'application Catcam" />
                </div>
            </div>
        </>
    )
}