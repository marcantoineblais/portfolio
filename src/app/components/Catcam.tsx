import React from "react";

import DownArrow from "./DownArrow";
import Carousel from "./Carousel";
import ImageLiveLight from "../images/mobile-live-light.png"
import ImageLiveDark from "../images/mobile-live-dark.png"
import ImageLiveOverlayLight from "../images/mobile-live-overlay-light.png"
import ImageLiveOverlayDark from "../images/mobile-live-overlay-dark.png"
import Image from "next/image";
import CatcamDescription from "./CatcamDescription";

export default function Catcam({ scrollTo }: { scrollTo: Function }) {

    const [lgScreen, setLgScreen] = React.useState<boolean>(false);

    React.useEffect(() => {
        function setBreakPoint() {
            const width = window.innerWidth
            setLgScreen(width > 1024)
        }

        window.addEventListener("resize", setBreakPoint)
        setBreakPoint()

        return () => {
            window.removeEventListener("resize", setBreakPoint)
        }
    }, [])

    return (
        <div className="w-full h-full flex flex-col items-center">
            <div className="w-full h-full flex flex-col justify-center items-center gap-7">
                { lgScreen ? 
                    <Carousel accentColor="bg-sky-700">
                        <CatcamDescription />
                        <div className="h-full flex justify-center items-center gap-3">
                            <Image src={ImageLiveLight} alt="Application catcam" className="h-full p-3 border-2 border-gray-200 rounded-lg object-contain" />
                            <Image src={ImageLiveOverlayLight} alt="Application catcam" className="h-full p-3 border-2 border-gray-200 rounded-lg object-contain" />
                        </div>
                        <div className="h-full flex justify-center items-center gap-3">
                            <Image src={ImageLiveDark} alt="Application catcam" className="h-full p-3 border-2 border-neutral-200 bg-neutral-900 rounded-lg object-contain" />
                            <Image src={ImageLiveOverlayDark} alt="Application catcam" className="h-full p-3 border-2 border-neutral-200 bg-neutral-900 rounded-lg object-contain" />
                        </div>
                    </Carousel>
                :
                    <Carousel accentColor="bg-sky-700">
                        <Image src={ImageLiveLight} alt="Application catcam" className="h-full p-3 border-2 border-gray-200 rounded-lg object-contain" />
                        <Image src={ImageLiveOverlayLight} alt="Application catcam" className="h-full p-3 border-2 border-gray-200 rounded-lg object-contain" />
                        <Image src={ImageLiveDark} alt="Application catcam" className="h-full p-3 border-2 border-neutral-200 bg-neutral-900 rounded-lg object-contain" />
                        <Image src={ImageLiveOverlayDark} alt="Application catcam" className="h-full p-3 border-2 border-neutral-200 bg-neutral-900 rounded-lg object-contain" />
                    </Carousel>
                }
            </div>
            <DownArrow text="Réalisation suivante" action={() => scrollTo()} />
        </div>
    )
}