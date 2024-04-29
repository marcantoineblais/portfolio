"use client"

import React from "react";
import TextBubble from "./TextBubble";

export default function ScrabbleDescription() {
  
  return (
    <div className="basis-1/2 h-full flex flex-col justify-between gap-3">
        <TextBubble className="bg-gray-200">
            Scrabble Cheetah est une application qui vous permet de recevoir les meilleurs solutions possible pour votre grille de Scrabble.            
        </TextBubble>

        <TextBubble className="bg-gray-200">
            Il est présentement possible de trouver des solutions en français et en anglais avec plusieurs type de grilles de jeu.
        </TextBubble>

        <TextBubble className="bg-gray-200">
            Vous pouvez sauvegarder jusqu&apos;a 8 parties différentes sur votre compte. 
            Il est facile d&apos;identifier chaque partie avec un nom personnalisé et un aperçu de la grille de jeu.
        </TextBubble>

        <TextBubble className="bg-gray-200 shadow-md max-w-96">L&apos;interface offre une grille de jeu interactive et facile à manipuler sur PC et sur mobile.</TextBubble>
    </div>
  )
}