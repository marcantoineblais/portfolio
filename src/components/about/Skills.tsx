"use client";

import React from "react";
import AboutSection from "./AboutSection";
import java from "../../images/languages/java.png";
import c from "../../images/languages/c.png";
import nodeJs from "../../images/languages/nodejs.png";
import typescript from "../../images/languages/typescript.png";
import python from "../../images/languages/python.png";
import spring from "../../images/frameworks/spring.png";
import springboot from "../../images/frameworks/springboot.png";
import dotnet from "../../images/frameworks/dotnet.webp";
import nextjs from "../../images/frameworks/nextjs.png";
import react from "../../images/frameworks/react.png";
import mysql from "../../images/databases/mysql.png";
import postgresql from "../../images/databases/postgresql.png";
import mssql from "../../images/databases/mssql.png";
import plsql from "../../images/databases/plsql.png";
import html from "../../images/web/html.png";
import css from "../../images/web/css.png";
import javascript from "../../images/web/javascript.png";
import bootstrap from "../../images/web/bootstrap.png";
import tailwind from "../../images/web/tailwind.png";
import Image from "next/image";

type SkillsProps = {
  initialDelay?: number;
  stepDelay?: number;
};
export default function Skills({
  initialDelay = 1000,
  stepDelay = 200,
}: SkillsProps) {
  const languageImgs = [java, c, nodeJs, typescript, python];
  const frameworkImgs = [spring, springboot, dotnet, nextjs, react];
  const databaseImgs = [mysql, postgresql, mssql, plsql];
  const webTechImgs = [html, css, javascript, bootstrap, tailwind];
  const sections = [
    {
      title: "Langages",
      images: languageImgs,
    },
    {
      title: "Frameworks",
      images: frameworkImgs,
    },
    {
      title: "Bases de données",
      images: databaseImgs,
    },
    {
      title: "Technologies web",
      images: webTechImgs,
    },
  ];
  return (
    <div className="w-full h-full flex flex-col items-center gap-3 bg-secondary">
      {sections.map((section, index) => {
        const previousSections = sections.slice(0, index);
        const animationDelay = previousSections.reduce(
          (acc, curr) => acc + (curr.images.length * stepDelay),
          initialDelay
        );
        
        return (
          <AboutSection
            key={index}
            title={section.title}
            initialDelay={animationDelay}
          >
            {section.images.map((image, i) => (
              <Image
                key={i}
                src={image}
                alt="logo"
                className="h-full aspect-square object-contain"
                style={{ width: `${100 / (section.images.length + 1)}dvw` }}
                loading="eager"
              />
            ))}
          </AboutSection>
        );
      })}
    </div>
  );
}
