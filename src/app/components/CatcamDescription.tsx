"use client"

import React from "react";
import TextBubble from "./TextBubble";
import Login from "./catcam/Login";

export default function CatcamDescription({ basis }: { basis: number }) {

  const containerRef = React.useRef<HTMLDivElement|null>(null)
  const descriptionRef = React.useRef<HTMLDivElement|null>(null)

  React.useEffect(() => {
    if (!containerRef.current)
      return
    
    const container = containerRef.current
    container.style.flexBasis = (100 / basis) + "%"
  }, [basis])
  
  React.useEffect(() => {
    if (!containerRef.current || !descriptionRef.current)
      return
    
    const container = containerRef.current
    const description = descriptionRef.current

    const resize = () => {
      let height = container.clientHeight
      let width = height / 9 * 5

      if (width > container.clientWidth) {
        width = container.clientWidth
        height = width / 5 * 9
      }
  
      description.style.width = width + "px"
      description.style.height = height + "px"
    }

    resize()
    window.addEventListener("resize", resize)

    return () => {
      window.removeEventListener("resize", resize)
    }
  }, [])
  
  return (
    <div ref={containerRef} className="h-full flex justify-center gap-3">
      <div ref={descriptionRef} className="h-full flex flex-col justify-between gap-3">
        <TextBubble className="bg-gray-200 shadow-md">
          <p className="text-center">La Catcam est une application web conçue spécifiquement pour regarder nos animaux lorsque nous quittons notre foyer.</p>            
        </TextBubble>

        <TextBubble className="bg-gray-200 shadow-md">
          <p className="text-center">
            Il est possible d'utiliser une fonctionnalité de détections de mouvements pour enregistrer les méfaits de nos félins favoris et de les prendre la main dans le sac!
          </p> 
        </TextBubble>

        <TextBubble className="bg-gray-200 shadow-md">
          <p className="text-center">Avec la Catcam, votre vie privée est protégée puisque l'application utilise un serveur local dans votre résidence.</p>       
        </TextBubble>

        <TextBubble className="bg-gray-200 shadow-md">
          <p className="text-center">
            Vous pouvez manipuler l'interface ici afin de tester les contrôles de l'application et regarder son design.
            Pour consulter les autres pages, utilisez les flèches de gauche et de droite.
          </p>
        </TextBubble>
      </div>

      <Login basis={2}/>
    </div>
  )
}