import React from "react";

import Carousel from "../carousel/Carousel";
import ImageLiveLight from "../../images/catcam/mobile-live-light.png"
import ImageLiveDark from "../../images/catcam/mobile-live-dark.png"
import ImageLiveOverlayLight from "../../images/catcam/mobile-live-overlay-light.png"
import ImageLiveOverlayDark from "../../images/catcam/mobile-live-overlay-dark.png"
import Image from "next/image";
import CatcamDescription from "../ProjectDescription";
import CatcamImages from "./CatcamImages";
import ProjectDescription from "../ProjectDescription";
import TextBubble from "../TextBubble";

export default function Catcam({ disabledCarousel }: { disabledCarousel: boolean }) {

    return (
        <div className="w-full h-full flex flex-col justify-center items-center gap-7">
            <Carousel disabledArrows={disabledCarousel} accentColor="bg-sky-700">
                <CatcamImages />
                <ProjectDescription>
                    <TextBubble className="bg-gray-200">La Catcam est une application web conçue spécifiquement pour regarder vos animaux lorsque vous quittez votre foyer.</TextBubble>
                    <TextBubble className="bg-gray-200">Il est possible d&apos;utiliser une fonctionnalité de détections de mouvements pour enregistrer les méfaits de vos félins favoris et de les prendre la main dans le sac!</TextBubble>
                    <TextBubble className="bg-gray-200">Votre vie privée est protégée puisque l&apos;application utilise un serveur local dans votre résidence pour diffuser et enregistrer les vidéos.</TextBubble>
                    <TextBubble className="bg-gray-200">
                        L&apos;application offre un design simple et efficace autant sur mobile que sur PC. Il est possible de personnalisé certains aspects de l&apos;interface pour mieux répondre à vos besoins.
                    </TextBubble>
                </ProjectDescription>
                <Image src={ImageLiveLight} alt="Application catcam" className="h-full w-full object-contain border border-neutral-300 rounded-lg" />
                <Image src={ImageLiveOverlayLight} alt="Application catcam" className="h-full w-full object-contain border border-neutral-300 rounded-lg" />
                <Image src={ImageLiveDark} alt="Application catcam" className="h-full w-full object-contain border border-neutral-300 rounded-lg bg-neutral-900" />
                <Image src={ImageLiveOverlayDark} alt="Application catcam" className="h-full w-full object-contain border border-neutral-300 rounded-lg bg-neutral-900" />
            </Carousel>
        </div>
    )
}