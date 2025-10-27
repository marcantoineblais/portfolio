import React from "react";

import Carousel from "../../carousel/Carousel";
import Image from "next/image";
import CatcamImages from "./CatcamImages";
import ProjectDescription from "../../ProjectDescription";
import TextBubble from "../../ui/TextBubble";
import catcam1Image from "@/src/images/catcam/catcam1.png";
import catcam2Image from "@/src/images/catcam/catcam2.png";
import catcam3Image from "@/src/images/catcam/catcam3.png";
import catcam4Image from "@/src/images/catcam/catcam4.png";

export default function Catcam() {
  return (
    <div className="py-14 w-full h-full flex flex-col justify-center items-center gap-7">
      <Carousel>
        <CatcamImages />
        <ProjectDescription>
          <TextBubble className="bg-gray-200">
            La Catcam est une application web conçue spécifiquement pour
            regarder vos animaux lorsque vous quittez votre foyer.
          </TextBubble>
          <TextBubble className="bg-gray-200">
            Il est possible d&apos;utiliser une fonctionnalité de détections de
            mouvements pour enregistrer les méfaits de vos félins favoris et de
            les prendre la main dans le sac!
          </TextBubble>
          <TextBubble className="bg-gray-200">
            Votre vie privée est protégée puisque l&apos;application utilise un
            serveur local dans votre résidence pour diffuser et enregistrer les
            vidéos.
          </TextBubble>
          <TextBubble className="bg-gray-200">
            L&apos;application offre un design simple et efficace autant sur
            mobile que sur PC. Il est possible de personnalisé certains aspects
            de l&apos;interface pour mieux répondre à vos besoins.
          </TextBubble>
        </ProjectDescription>
        <Image
          src={catcam3Image}
          alt="Application catcam"
          className="h-full w-full object-contain border border-neutral-300 rounded-lg"
        />
        <Image
          src={catcam4Image}
          alt="Application catcam"
          className="h-full w-full object-contain border border-neutral-300 rounded-lg"
        />
        <Image
          src={catcam1Image}
          alt="Application catcam"
          className="h-full w-full object-contain border border-neutral-300 rounded-lg"
        />
        <Image
          src={catcam2Image}
          alt="Application catcam"
          className="h-full w-full object-contain border border-neutral-300 rounded-lg"
        />
      </Carousel>
    </div>
  );
}
