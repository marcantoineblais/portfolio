"use client";

import Image from "next/image";
import React from "react";

import dark from "../../images/catcam/catcam-dark.png";
import light from "../../images/catcam/catcam-light.png";

/** Cross-fades between the light and dark themes of the app. */
export default function CatcamImages({ alt }: { alt: string }) {
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => setIsDark((d) => !d), 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <Image
        src={light}
        alt={alt}
        sizes="(min-width: 1024px) 40vw, 90vw"
        className="h-auto w-full"
        priority={false}
      />
      <Image
        src={dark}
        alt=""
        aria-hidden="true"
        sizes="(min-width: 1024px) 40vw, 90vw"
        className={`absolute inset-0 h-full w-full bg-neutral-900 object-contain transition-opacity duration-1000 ${
          isDark ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
