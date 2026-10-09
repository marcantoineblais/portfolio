import type { StaticImageData } from "next/image";

import mssql from "../images/databases/mssql.png";
import mysql from "../images/databases/mysql.png";
import plsql from "../images/databases/plsql.png";
import postgresql from "../images/databases/postgresql.png";
import sql from "../images/databases/sql.png";
import angular from "../images/frameworks/angular.png";
import dotnet from "../images/frameworks/dotnet.webp";
import nextjs from "../images/frameworks/nextjs.png";
import react from "../images/frameworks/react.png";
import spring from "../images/frameworks/spring.png";
import springboot from "../images/frameworks/springboot.png";
import c from "../images/languages/c.png";
import java from "../images/languages/java.png";
import nodejs from "../images/languages/nodejs.png";
import python from "../images/languages/python.png";
import ruby from "../images/languages/ruby.png";
import typescript from "../images/languages/typescript.png";
import bootstrap from "../images/web/bootstrap.png";
import css from "../images/web/css.png";
import html from "../images/web/html.png";
import javascript from "../images/web/javascript.png";
import tailwind from "../images/web/tailwind.png";

export type Tech = { name: string; logo: StaticImageData };

export const TECH = {
  java: { name: "Java", logo: java },
  c: { name: "C", logo: c },
  nodejs: { name: "Node.js", logo: nodejs },
  typescript: { name: "TypeScript", logo: typescript },
  python: { name: "Python", logo: python },
  ruby: { name: "Ruby", logo: ruby },
  spring: { name: "Spring", logo: spring },
  springboot: { name: "Spring Boot", logo: springboot },
  dotnet: { name: ".NET", logo: dotnet },
  nextjs: { name: "Next.js", logo: nextjs },
  react: { name: "React", logo: react },
  angular: { name: "Angular", logo: angular },
  sql: { name: "SQL", logo: sql },
  mysql: { name: "MySQL", logo: mysql },
  postgresql: { name: "PostgreSQL", logo: postgresql },
  mssql: { name: "SQL Server", logo: mssql },
  plsql: { name: "PL/SQL", logo: plsql },
  html: { name: "HTML", logo: html },
  css: { name: "CSS", logo: css },
  javascript: { name: "JavaScript", logo: javascript },
  bootstrap: { name: "Bootstrap", logo: bootstrap },
  tailwind: { name: "Tailwind CSS", logo: tailwind },
} satisfies Record<string, Tech>;

export type TechKey = keyof typeof TECH;

export const SKILL_GROUPS: {
  key: "languages" | "frameworks" | "databases" | "web";
  items: TechKey[];
}[] = [
  {
    key: "languages",
    items: ["java", "c", "nodejs", "typescript", "python", "ruby"],
  },
  {
    key: "frameworks",
    items: ["spring", "springboot", "dotnet", "nextjs", "react", "angular"],
  },
  { key: "databases", items: ["sql", "mysql", "postgresql", "mssql", "plsql"] },
  { key: "web", items: ["html", "css", "javascript", "bootstrap", "tailwind"] },
];
