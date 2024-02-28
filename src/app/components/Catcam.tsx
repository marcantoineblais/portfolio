import React, { ReactNode } from "react";
import { anta, kode_mono } from "../fonts";
import DownArrow from "./DownArrow";
import LiveStream from "./catcam/LiveStream";
import Carousel from "./Carousel";
import CatcamDescription from "./CatcamDescription";
import Recordings from "./catcam/Recordings";
import Login from "./catcam/Login";
import Settings from "./catcam/Settings";

export default function Catcam({ containerRef, opacity }: { containerRef: React.MutableRefObject<HTMLDivElement|null>, opacity: number }) {

  React.useEffect(() => {
    if (!containerRef.current?.parentElement)
      return

    const container = containerRef.current.parentElement
    container.style.opacity = opacity.toString()
    
  }, [opacity, containerRef])

  return (
    <div className="w-full h-[800vh] bg-gray-100 text-gray-950">
      <div ref={containerRef} className="container px-3 mx-auto pt-12 sticky inset-0 h-screen flex flex-col justify-between items-center gap-7 overflow-y-auto">
        <div className="w-full pt-12 flex flex-col gap-7">
          <h2 className={`${kode_mono.className} text-5xl text-center md:text-left`}>Réalisations:</h2>
          <h2 className={`${anta.className} text-5xl text-center border-b border-b-gray-950`}>La Catcam</h2>
        </div>
        <div className="w-full h-full flex flex-col md:flex-row justify-center items-center gap-7">
          <div className="h-full basis-1/2">
            <CatcamDescription />
          </div>

          <Carousel>
            <Login />
            <LiveStream />
            <Recordings />
            <Settings />
          </Carousel>
        </div>
        <DownArrow text="Réalisation suivante" action={() => false} />
      </div>
    </div>
  )
}