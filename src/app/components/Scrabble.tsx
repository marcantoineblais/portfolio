import React from "react";
import DownArrow from "./DownArrow";
import Carousel from "./Carousel";
export default function Scrabble({ scrollTo }: { scrollTo: Function }) {

  return (
    <>
      <div className="w-full h-full flex flex-col justify-center items-center gap-7">
        <Carousel accentColor="bg-emerald-900">
            {/* ADD PICTURES HERE */}
          <div></div>
          <div></div>
        </Carousel>
      </div>
      <DownArrow text="Réalisation suivante" action={() => scrollTo()} />
    </>
  )
}