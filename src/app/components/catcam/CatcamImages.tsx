"use client"

import Image from "next/image"
import React from "react"
import CatcamImg1 from "../../images/catcam-light.png"
import CatcamImg2 from "../../images/catcam-dark.png"

export default function CatcamImages() {
    
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
        <div className="relative h-full flex justify-center items-center">
            <Image 
                ref={imageLightRef} 
                className="h-full duration-1000 border border-neutral-300 rounded-lg object-contain" 
                src={CatcamImg1} 
                alt="capture d'écran de l'application Catcam" 
            />
            <Image 
                ref={imageDarkRef} 
                className="absolute top-0 h-full duration-1000 opacity-0 border border-neutral-300 rounded-lg bg-neutral-900 object-contain" 
                src={CatcamImg2} 
                alt="capture d'écran de l'application Catcam" 
            />
        </div>
    )
}