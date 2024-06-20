"use client"

import Image from "next/image"
import React, { ReactNode } from "react"

import img1 from "../../images/scrabble/board1.png"
import img2 from "../../images/scrabble/board2.png"
import img3 from "../../images/scrabble/board3.png"
import img4 from "../../images/scrabble/board4.png"
import img5 from "../../images/scrabble/board5.png"
import img6 from "../../images/scrabble/board6.png"
import img7 from "../../images/scrabble/board7.png"
import img8 from "../../images/scrabble/board8.png"
import img9 from "../../images/scrabble/board9.png"
import img10 from "../../images/scrabble/board10.png"

export default function ScrabbleImages() {
    
    const [images, setImages] = React.useState<ReactNode[]>([])
    const [selectedImage, setSelectedImage] = React.useState<number>(0)

    const imagesRef = React.useRef<HTMLDivElement | null>(null)

    React.useEffect(() => {
        const sources = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10]
        const images = sources.map((src, i) => {
            return (
                <div key={i} className={`${i > 0 ? "absolute inset-0 opacity-0" : "h-full relative"}`}>
                    <Image 
                        src={src} 
                        alt="Capture ecran application scrabble" 
                        className="w-full h-full object-contain" 
                    />
                </div> 
            )
        })

        setImages(images)
    }, [])

    React.useEffect(() => {
        if (!imagesRef.current)
            return

        const images = imagesRef.current.children

        let timerDuration
        if (selectedImage === 0)
            timerDuration = 4000
        else if (selectedImage === 6)
            timerDuration = 1000
        else 
            timerDuration = 100

        const toggleImages = () => {
            for (let i = 0; i < images.length; i++) {
                if (i === selectedImage)
                    images[i].classList.remove("opacity-0")
                else
                    images[i].classList.add("opacity-0")
            }

            setSelectedImage(selectedImage === images.length - 1 ? 0 : selectedImage + 1)
        }

        const timeout = setTimeout(toggleImages, timerDuration)

        return () => {
            clearTimeout(timeout)
        }
    }, [images, selectedImage])

    return (
        <div ref={imagesRef} className="relative h-full flex justify-center items-center border border-neutral-300 rounded-lg">
            { images }
        </div>
    )
}