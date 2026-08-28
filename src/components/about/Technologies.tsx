"use client";

import plsql from "../../images/databases/plsql.png";
import nextjs from "../../images/frameworks/nextjs.png";
import spring from "../../images/frameworks/spring.png";
import springboot from "../../images/frameworks/springboot.png";
import nodeJs from "../../images/languages/nodejs.png";
import typescript from "../../images/languages/typescript.png";
import css from "../../images/web/css.png";
import html from "../../images/web/html.png";
import javascript from "../../images/web/javascript.png";
import tailwind from "../../images/web/tailwind.png";
import AboutSection from "./AboutSection";

export default function Technologies() {
  return (
    <div className="w-full h-full flex flex-col justify-around gap-3">
      <AboutSection
        title="Catcam"
        images={[nodeJs, typescript, nextjs, html, css, javascript, tailwind]}
        wait={1000}
      />
      <AboutSection
        title="Scrabble Cheetah"
        images={[
          spring,
          springboot,
          nodeJs,
          typescript,
          nextjs,
          html,
          css,
          javascript,
          tailwind,
          plsql,
        ]}
        wait={2900}
      />
      <AboutSection
        title="Portfolio"
        images={[nodeJs, typescript, nextjs, html, css, javascript, tailwind]}
        wait={5400}
      />
    </div>
  );
}
