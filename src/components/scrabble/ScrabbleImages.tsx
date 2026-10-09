"use client";

import Image from "next/image";
import React from "react";

import img1 from "../../images/scrabble/board1.png";
import img2 from "../../images/scrabble/board2.png";
import img3 from "../../images/scrabble/board3.png";
import img4 from "../../images/scrabble/board4.png";
import img5 from "../../images/scrabble/board5.png";
import img6 from "../../images/scrabble/board6.png";
import img7 from "../../images/scrabble/board7.png";
import img8 from "../../images/scrabble/board8.png";
import img9 from "../../images/scrabble/board9.png";
import img10 from "../../images/scrabble/board10.png";

const SOURCES = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

/** Plays the board being solved, frame by frame (same timing as before). */
export default function ScrabbleImages({ alt }: { alt: string }) {
  const [frame, setFrame] = React.useState(0);

  React.useEffect(() => {
    const duration = frame === 0 ? 4000 : frame === 6 ? 1000 : 100;
    const timeout = setTimeout(
      () => setFrame((f) => (f + 1) % SOURCES.length),
      duration,
    );
    return () => clearTimeout(timeout);
  }, [frame]);

  return (
    <div className="relative">
      {SOURCES.map((src, i) => (
        <Image
          key={i}
          src={src}
          alt={i === 0 ? alt : ""}
          aria-hidden={i !== 0}
          sizes="(min-width: 1024px) 40vw, 90vw"
          className={`h-auto w-full ${i > 0 ? "absolute inset-0" : ""} ${
            i === frame ? "opacity-100" : i === 0 ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}
