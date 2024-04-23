"use client"

import React from "react";
import TextBubble from "./TextBubble";

import DownArrow from "./DownArrow";

export default function ScrabbleDescription({ scrollTo }: { scrollTo: Function }) {
  
  return (
    <div className="h-full w-full flex flex-col justify-between items-center gap-5">
      <div className="h-full w-full pt-12 flex justify-center items-center gap-3">
        <div className="basis-1/2 h-full flex flex-col justify-between gap-7">
          <TextBubble className="bg-gray-200 shadow-md max-w-96">
            <p className="text-justify">Scrabble Cheetah est une application qui vous permet de recevoir les meilleurs solutions possible pour votre grille de Scrabble.</p>            
          </TextBubble>

          <TextBubble className="bg-gray-200 shadow-md max-w-96 self-end">
            <p className="text-justify">
              Il est présentement possible de trouver des solutions en français et en anglais avec plusieurs type de grilles de jeu.
            </p>       
          </TextBubble>

          <TextBubble className="bg-gray-200 shadow-md max-w-96 self-center">
            <p className="text-justify">
              Vous pouvez sauvegarder jusqu'a 8 parties différentes sur votre compte. 
              Il est facile d'identifier chaque partie avec un nom personnalisé et un aperçu de la grille de jeu.
            </p>       
          </TextBubble>

          <TextBubble className="bg-gray-200 shadow-md max-w-96 self-start">
            <p className="text-justify">
              L'interface offre une grille de jeu interactive et facile à manipuler sur PC et sur mobile.
            </p>       
          </TextBubble>

          <small>
            *Veuillez noter que cette démonstration n'est pas connecté au serveur et que la majorité des fonctionnalités sont innaccessibles. 
            Pour en faire l'essaie, rendez-vous dans la section contact pour communiquer avec moi.
          </small>
        </div>
        <div className="basis-1/2 h-full flex justify-center">
          {/* <Login basis={1} /> */}
        </div>
      </div>

      <DownArrow text={"Voir la démonstration"} action={scrollTo}/>
    </div>
  )
}