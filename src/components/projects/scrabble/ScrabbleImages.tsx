"use client";

import Image from "next/image";

import img1 from "@/src/images/scrabble/board1.png";
import img2 from "@/src/images/scrabble/board2.png";
import img3 from "@/src/images/scrabble/board3.png";
import img4 from "@/src/images/scrabble/board4.png";
import img5 from "@/src/images/scrabble/board5.png";
import img6 from "@/src/images/scrabble/board6.png";
import img7 from "@/src/images/scrabble/board7.png";
import img8 from "@/src/images/scrabble/board8.png";
import img9 from "@/src/images/scrabble/board9.png";
import img10 from "@/src/images/scrabble/board10.png";
import { useEffect, useMemo, useState } from "react";

export default function ScrabbleImages() {
  const [selectedSrc, setSelectedSrc] = useState(img1);
  const sources = useMemo(
    () => [img1, img2, img3, img4, img5, img6, img6, img7, img8, img9, img10],
    []
  );

  useEffect(() => {
    let index = 0;
    let interval: NodeJS.Timeout;
    let timeout: NodeJS.Timeout;

    const rollImages = () => {
      interval = setInterval(() => {
        setSelectedSrc(sources[index]);
        index++;
  
        if (index >= sources.length) {
          index = 0;
          clearInterval(interval);
          timeout = setTimeout(rollImages, 1000);
        };
      }, 100);
    };

    timeout = setTimeout(rollImages, 1000);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [sources]);

  return (
    <div className="mx-auto h-fit w-fit max-h-full max-w-full rounded-lg overflow-hidden">
      <Image
        src={selectedSrc}
        alt="Scrabble Cheetah images"
        className="object-contain"
        loading="eager"
      />
    </div>
  );
}
