"use client"

import React from "react";
import TextBubble from "./TextBubble";

import DownArrow from "./DownArrow";
import Login from "./scrabble/Login";

export default function ScrabbleDescription({ scrollTo }: { scrollTo: Function }) {
  
  return (
    <div className="h-full w-full flex flex-col justify-between items-center gap-5">
      <div className="h-full w-full pt-12 flex justify-center items-center gap-3">
        <div className="basis-1/2 h-full flex flex-col justify-between gap-7">
          <TextBubble className="bg-gray-200 shadow-md max-w-96">
            <p className="text-justify">Scrabble Cheetah est une application qui nous permet de recevoir les meilleurs solutions possible pour notre grille de Scrabble.</p>            
          </TextBubble>

          <TextBubble className="bg-gray-200 shadow-md max-w-96 self-end">
            <p className="text-justify">
              Vous pouvez ajouter des mots à votre grille de jeu à partir de l'onglet "Ajouter un mot".
            </p>       
          </TextBubble>

          <TextBubble className="bg-gray-200 shadow-md max-w-96 self-center">
            <p className="text-justify">
              Vous pouvez également modifier ou effacer un mot dans la grille à partir de l'onglet "Modifier un mot".
            </p>       
          </TextBubble>

          <TextBubble className="bg-gray-200 shadow-md max-w-96 self-start">
            <p className="text-justify">
              Pour trouver les solutions, utilisez l'onglet "Trouver les solutions"!
            </p>       
          </TextBubble>

          <small className="text-justify">
            *Veuillez noter que cette démonstration n'est pas connecté au serveur et que la majorité des fonctionnalités sont innaccessibles. 
            Pour en faire l'essaie, rendez-vous dans la section contact pour communiquer avec moi.
          </small>
        </div>
        <div className="basis-1/2 h-full flex justify-center">
          <Login basis={1} />
        </div>
      </div>

      <DownArrow text={"Voir la démonstration"} action={scrollTo}/>
    </div>
  )
}