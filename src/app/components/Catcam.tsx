import React, { ReactNode } from "react";
import { anta, kode_mono } from "../fonts";
import DownArrow from "./DownArrow";

export default function Catcam({ children, containerRef, opacity }: { children: ReactNode, containerRef: React.MutableRefObject<HTMLDivElement|null>, opacity: number }) {

  const cellPhoneDisplayRef = React.useRef<HTMLDivElement|null>(null)

  React.useEffect(() => {
    if (!cellPhoneDisplayRef.current)
      return
    
    const cellPhoneDisplay = cellPhoneDisplayRef.current
    const resize = () => {
      const height = cellPhoneDisplay.clientHeight
      const width = height / 7 * 4
  
      cellPhoneDisplay.style.width = width + "px"
    }

    resize()
    window.addEventListener("resize", resize)

    return () => {
      window.removeEventListener("resize", resize)
    }
  }, [])

  React.useEffect(() => {
    if (!containerRef.current?.parentElement)
      return

    const container = containerRef.current.parentElement
    container.style.opacity = opacity.toString()
    
  }, [opacity, containerRef])

  return (
    <div className="w-full h-[400vh] bg-gray-100 text-gray-950">
      <div ref={containerRef} className="container mx-auto pt-12 sticky inset-0 h-screen flex flex-col justify-between items-center gap-3">
        <div className="w-full pt-12 flex flex-col gap-7">
          <h2 className={`${kode_mono.className} text-5xl text-center md:text-left`}>Réalisations:</h2>
          <h2 className={`${anta.className} text-5xl text-center border-b border-b-gray-950`}>La Catcam</h2>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-7 grow">
          <div className="basis-1/3 flex flex-col gap-7">
            <p className="text-justify">La Catcam est une application web conçue spécifiquement pour regarder nos animaux lorsque nous quittons notre foyer.</p>            
            <p className="text-justify">
              Il est possible d'utiliser une fonctionnalité de détections de mouvements pour enregistrer les méfaits de nos félins favoris et de les prendre la main dans le sac!
            </p> 
            <p className="text-justify">Avec la Catcam, votre vie privée est protégée puisque l'application utilise un serveur local dans votre résidence.</p>       
            <p className="text-justify">
              Vous pouvez manipuler l'interface ici afin de tester les contrôles de l'application et regarder son design.
              Pour consulter les autres pages, utilisez les flèches de gauche et de droite.
            </p>
          </div>
          <div ref={cellPhoneDisplayRef} className="border border-gray-950 rounded-xl h-3/5">
            { children }
          </div>
        </div>
        <DownArrow text="Réalisation suivante" action={() => false} />
      </div>
    </div>
  )
}