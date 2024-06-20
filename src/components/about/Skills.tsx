"use client"

import React from "react";
import AboutSection from "./AboutSection";
import java from "../../images/languages/java.png"
import c from "../../images/languages/c.png"
import nodeJs from "../../images/languages/nodejs.png"
import typescript from "../../images/languages/typescript.png"
import python from "../../images/languages/python.png"
import ruby from "../../images/languages/ruby.png"
import spring from "../../images/frameworks/spring.png"
import springboot from "../../images/frameworks/springboot.png"
import dotnet from "../../images/frameworks/dotnet.webp"
import nextjs from "../../images/frameworks/nextjs.png"
import react from "../../images/frameworks/react.png"
import angular from "../../images/frameworks/angular.png"
import sql from "../../images/databases/sql.png"
import mysql from "../../images/databases/mysql.png"
import postgresql from "../../images/databases/postgresql.png"
import mssql from "../../images/databases/mssql.png"
import plsql from "../../images/databases/plsql.png"
import html from "../../images/web/html.png"
import css from "../../images/web/css.png"
import javascript from "../../images/web/javascript.png"
import bootstrap from "../../images/web/bootstrap.png"
import tailwind from "../../images/web/tailwind.png"


export default function Skills() {
    return (
        <div className="w-full h-full flex flex-col justify-between gap-3">
            <AboutSection title="Langages" images={[java, c, nodeJs, typescript, python, ruby]} wait={1000} />
            <AboutSection title="Frameworks" images={[spring, springboot, dotnet, nextjs, react, angular]} wait={2700} />
            <AboutSection title="Bases de données" images={[sql, mysql, postgresql, mssql, plsql]} wait={4400} />
            <AboutSection title="Technologies web" images={[html, css, javascript, bootstrap, tailwind]} wait={5900} />
        </div>
    )
}