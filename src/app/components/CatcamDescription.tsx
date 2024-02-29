"use client"

import React from "react";
import TextBubble from "./TextBubble";
import Login from "./catcam/Login";
import DownArrow from "./DownArrow";

export default function CatcamDescription({ scrollTo }: { scrollTo: Function }) {
  
  return (
    <div className="h-full w-full flex flex-col justify-between items-center gap-5">
      <div className="h-full w-full pt-12 flex justify-center items-center gap-3">
        <div className="basis-1/2 h-full flex flex-col justify-between gap-7">
          <TextBubble className="bg-gray-200 shadow-md max-w-96">
            <p className="text-justify">La Catcam est une application web conçue spécifiquement pour regarder vos animaux lorsque vous quittez votre foyer.</p>            
          </TextBubble>

          <TextBubble className="bg-gray-200 shadow-md max-w-96 self-center">
            <p className="text-justify">
              Il est possible d'utiliser une fonctionnalité de détections de mouvements pour enregistrer les méfaits de vos félins favoris et de les prendre la main dans le sac!
            </p> 
          </TextBubble>

          <TextBubble className="bg-gray-200 shadow-md max-w-96 self-end">
            <p className="text-justify">Avec la Catcam, votre vie privée est protégée puisque l'application utilise un serveur local dans votre résidence pour diffuser et enregistrer les vidéos.</p>       
          </TextBubble>

          <TextBubble className="bg-gray-200 shadow-md max-w-96">
            <p className="text-justify">
              L'application offre un design simple et efficace autant sur mobile que sur PC. Il est possible de personnalisé certains
              aspects de l'interface pour mieux répondre à vos besoins.
            </p>
          </TextBubble>
        </div>
        <div className="basis-1/2 h-full flex justify-center">
          <Login basis={1}/>
        </div>
      </div>

      <DownArrow text={"Voir la démonstration"} action={scrollTo}/>
    </div>
  )
}