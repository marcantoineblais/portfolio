import React, { ReactNode } from "react";

import DownArrow from "./DownArrow";
import LiveStream from "./catcam/LiveStream";
import Carousel from "./Carousel";
import Recordings from "./catcam/Recordings";
import Settings from "./catcam/Settings";
import Login from "./catcam/Login";

export default function Catcam({ scrollTo }: { scrollTo: Function }) {

  return (
    <div className="w-full h-full pt-12 flex flex-col items-center">
      <div className="w-full h-full flex flex-col justify-center items-center gap-7">
        <Carousel accentColor="bg-sky-700">
          <Login basis={5} />
          <LiveStream basis={5} />
          <Recordings basis={5} />
          <Settings basis={5} />
        </Carousel>
      </div>
      <DownArrow text="Réalisation suivante" action={() => scrollTo()} />
    </div>
  )
}