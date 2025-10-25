import React from "react";
import Carousel from "../../carousel/Carousel";
import ProjectDescription from "../../ProjectDescription";
import TextBubble from "../../ui/TextBubble";
import ScrabbleImages from "./ScrabbleImages";
import scrabble2Image from "@/src/images/scrabble/scrabble2.png";
import scrabble3Image from "@/src/images/scrabble/scrabble3.png";
import scrabble4Image from "@/src/images/scrabble/scrabble4.png";
import scrabble5Image from "@/src/images/scrabble/scrabble5.png";
import Image from "next/image";

export default function Scrabble() {
  return (
    <>
      <div className="w-full h-full flex flex-col justify-center items-center gap-7">
        <Carousel accentColor="bg-primary">
          <ScrabbleImages />
          <ProjectDescription>
            <TextBubble className="bg-orange-100">
              Scrabble Cheetah est une application qui vous permet de recevoir
              les meilleurs solutions possible pour votre grille de Scrabble.
            </TextBubble>
            <TextBubble className="bg-orange-100">
              Il est présentement possible de trouver des solutions en français
              et en anglais avec plusieurs types de grilles de jeu.
            </TextBubble>
            <TextBubble className="bg-orange-100">
              Vous pouvez sauvegarder jusqu&apos;à 8 parties différentes sur
              votre compte. Il est facile d&apos;identifier chaque partie avec
              un nom personnalisé et un aperçu de la grille de jeu.
            </TextBubble>
            <TextBubble className="bg-orange-100">
              L&apos;interface offre une grille de jeu interactive et facile à
              manipuler sur PC et sur mobile.
            </TextBubble>
          </ProjectDescription>
          <Image
            src={scrabble2Image}
            alt="Application scrabble cheetah"
            className="h-full w-full object-contain border border-neutral-300 rounded-lg"
          />
          <Image
            src={scrabble3Image}
            alt="Application scrabble cheetah"
            className="h-full w-full object-contain border border-neutral-300 rounded-lg"
          />
          <Image
            src={scrabble4Image}
            alt="Application scrabble cheetah"
            className="h-full w-full object-contain border border-neutral-300 rounded-lg"
          />
          <Image
            src={scrabble5Image}
            alt="Application scrabble cheetah"
            className="h-full w-full object-contain border border-neutral-300 rounded-lg"
          />
        </Carousel>
      </div>
    </>
  );
}
