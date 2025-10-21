"use client";

import Link from "next/link";
import React from "react";

export default function Contact() {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const textRef = React.useRef<HTMLParagraphElement | null>(null);
  const contactRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    setTimeout(() => {
      container.classList.remove("opacity-0");
    }, 1000);
  }, []);

  React.useEffect(() => {
    const resize = () => {
      if (!textRef.current || !contactRef.current) return;

      const text = textRef.current;
      const contact = contactRef.current;
      const width = contact.clientWidth;

      text.style.width = width + "px";
    };

    window.addEventListener("resize", resize);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="h-full flex justify-center items-start">
      <div
        ref={containerRef}
        className="py-5 px-3 flex flex-col items-center content-center gap-7 opacity-0 duration-1000 text-sm sm:text-lg"
      >
        <p ref={textRef}>
          Pour toutes demandes d&apos;informations concernant vos projets et mes
          disponibilités, veuillez me rejoindre en utilisant l&apos;une des
          options ci-dessous.
        </p>

        <div className="py-7 px-3 flex flex-col gap-5 shadow bg-white/50 shadow-gray-500/25 rounded">
          <h3 className="text-xl sm:text-3xl underline underline-offset-4">
            Marc-Antoine Blais
          </h3>
          <div ref={contactRef} className="flex justify-between gap-3">
            <div className="pr-3 flex flex-col border-r border-r-gray-500">
              <span>Téléphone</span>
              <span>Courriel</span>
              <span>Github</span>
              <span>LinkedIn</span>
            </div>

            <div className="flex flex-col items-end">
              <span>514-296-1923</span>
              <a
                className="hover:text-gray-500 duration-200"
                href="mailto://blaisma@live.fr"
              >
                blaisma@live.fr
              </a>
              <Link
                className="hover:text-gray-500 duration-200"
                href={"https://github.com/marcantoineblais"}
                target="_blank"
              >
                https://github.com/marcantoineblais
              </Link>
              <Link
                className="hover:text-gray-500 duration-200"
                href={"https://linkedin.com/in/marcantoineblais"}
                target="_blank"
              >
                https://linkedin.com/in/marcantoineblais
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
