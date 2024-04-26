import React from "react";

import Carousel from "../Carousel";
import ImageLiveLight from "../../images/mobile-live-light.png"
import ImageLiveDark from "../../images/mobile-live-dark.png"
import ImageLiveOverlayLight from "../../images/mobile-live-overlay-light.png"
import ImageLiveOverlayDark from "../../images/mobile-live-overlay-dark.png"
import Image from "next/image";
import CatcamDescription from "./CatcamDescription";
import CatcamImages from "./CatcamImages";

export default function Catcam({ disabledCarousel }: { disabledCarousel: boolean }) {

    return (
        <div className="w-full h-full flex flex-col justify-center items-center gap-7">
            <Carousel disabledArrows={disabledCarousel} accentColor="bg-sky-700">
                <CatcamImages />
                <CatcamDescription />
                <Image src={ImageLiveLight} alt="Application catcam" className="h-full object-contain border border-neutral-300 rounded-lg" />
                <Image src={ImageLiveOverlayLight} alt="Application catcam" className="h-full object-contain border border-neutral-300 rounded-lg" />
                <Image src={ImageLiveDark} alt="Application catcam" className="h-full object-contain border border-neutral-300 rounded-lg bg-neutral-900" />
                <Image src={ImageLiveOverlayDark} alt="Application catcam" className="h-full object-contain border border-neutral-300 rounded-lg bg-neutral-900" />
            </Carousel>
        </div>
    )
}