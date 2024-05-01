import React from "react";
import Carousel from "../carousel/Carousel";
import ProjectDescription from "../ProjectDescription";
import TextBubble from "../TextBubble";
import ScrabbleImages from "./ScrabbleImages";
export default function Scrabble({ disabledCarousel }: { disabledCarousel: boolean }) {

    return (
        <>
            <div className="w-full h-full flex flex-col justify-center items-center gap-7">
                <Carousel disabledArrows={disabledCarousel} accentColor="bg-emerald-900">
                    <ScrabbleImages />
                    <ProjectDescription>
                        <TextBubble className="bg-orange-100">Scrabble Cheetah est une application qui vous permet de recevoir les meilleurs solutions possible pour votre grille de Scrabble.</TextBubble>
                        <TextBubble className="bg-orange-100">Il est présentement possible de trouver des solutions en français et en anglais avec plusieurs type de grilles de jeu.</TextBubble>
                        <TextBubble className="bg-orange-100">
                            Vous pouvez sauvegarder jusqu&apos;a 8 parties différentes sur votre compte.
                            Il est facile d&apos;identifier chaque partie avec un nom personnalisé et un aperçu de la grille de jeu.
                        </TextBubble>
                        <TextBubble className="bg-orange-100">L&apos;interface offre une grille de jeu interactive et facile à manipuler sur PC et sur mobile.</TextBubble>
                    </ProjectDescription>
                </Carousel>
            </div>
        </>
    )
}