"use client"

import React from "react";
import TextBubble from "../TextBubble";

export default function CatcamDescription() {

    return (
        <div className="p-0.5 h-full flex flex-col justify-between items-center gap-3">
            <TextBubble className="bg-gray-200">La Catcam est une application web conçue spécifiquement pour regarder vos animaux lorsque vous quittez votre foyer.</TextBubble>
            <TextBubble className="bg-gray-200">Il est possible d'utiliser une fonctionnalité de détections de mouvements pour enregistrer les méfaits de vos félins favoris et de les prendre la main dans le sac!</TextBubble>
            <TextBubble className="bg-gray-200">Avec la Catcam, votre vie privée est protégée puisque l'application utilise un serveur local dans votre résidence pour diffuser et enregistrer les vidéos.</TextBubble>
            <TextBubble className="bg-gray-200">
                L'application offre un design simple et efficace autant sur mobile que sur PC. Il est possible de personnalisé certains aspects de l'interface pour mieux répondre à vos besoins.
            </TextBubble>
        </div>
    )
}