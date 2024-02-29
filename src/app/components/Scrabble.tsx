import React, { ReactNode } from "react";
import { anta, kode_mono } from "../fonts";
import DownArrow from "./DownArrow";
import Landing from "./scrabble/Landing";
import SavedGames from "./scrabble/SavedGames";
import Carousel from "./Carousel";

export default function Scrabble({ scrollTo }: { scrollTo: Function }) {

  return (
    <>
      <div className="w-full h-full flex flex-col justify-center items-center gap-7">
        <Carousel accentColor="bg-emerald-900">
          <Landing basis={2}/>
          <SavedGames basis={2}/>
        </Carousel>
      </div>
      <DownArrow text="Réalisation suivante" action={() => scrollTo()} />
    </>
  )
}