import fs from "node:fs";
import path from "node:path";

import { setRequestLocale } from "next-intl/server";

import About from "../../components/About";
import Contact from "../../components/Contact";
import Experience from "../../components/Experience";
import Footer from "../../components/Footer";
import Hero from "../../components/Hero";
import Navbar from "../../components/Navbar";
import Projects from "../../components/projects/Projects";
import ScrollEffects from "../../components/ScrollEffects";
import Skills from "../../components/Skills";

/**
 * Drop your resume in /public as `cv-fr.pdf` / `cv-en.pdf` (or a single `cv.pdf`)
 * and the download buttons appear automatically.
 */
function findResume(locale: string): string | undefined {
  for (const file of [`cv-${locale}.pdf`, "cv.pdf"]) {
    if (fs.existsSync(path.join(process.cwd(), "public", file)))
      return `/${file}`;
  }
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const resume = findResume(locale);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        {/* Content slides over the sticky hero (parallax) */}
        <div className="relative z-10 overflow-x-clip">
          <About resumeHref={resume} />
          <Projects />
          <Skills />
          <Experience />
          <Contact />
          <Footer resumeHref={resume} />
        </div>
      </main>
      <ScrollEffects />
    </>
  );
}
