import React, { ReactNode } from "react";

import DownArrow from "./DownArrow";
import LiveStream from "./catcam/LiveStream";
import Carousel from "./Carousel";
import CatcamDescription from "./CatcamDescription";
import Recordings from "./catcam/Recordings";
import Settings from "./catcam/Settings";

export default function Catcam({ scrollTo }: { scrollTo: Function }) {

  return (
    <>
      <div className="w-full h-full flex flex-col md:flex-row justify-center items-center gap-7">
        <Carousel>
          <CatcamDescription basis={4} />
          <LiveStream basis={4} />
          <Recordings basis={4} />
          <Settings basis={4} />
        </Carousel>
      </div>
      <DownArrow text="Réalisation suivante" action={() => scrollTo()} />
    </>
  )
}