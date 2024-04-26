import React from "react";
import Carousel from "./Carousel";
export default function Scrabble({ disabledCarousel }: { disabledCarousel: boolean }) {

  return (
    <>
      <div className="w-full h-full flex flex-col justify-center items-center gap-7">
        <Carousel disabledArrows={disabledCarousel} accentColor="bg-emerald-900">
            {/* ADD PICTURES HERE */}
          <div></div>
          <div></div>
        </Carousel>
      </div>
    </>
  )
}