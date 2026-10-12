import type { Section } from "../lib/sections";
import About from "./About";
import Contact from "./Contact";
import Footer from "./Footer";
import Hero from "./Hero";
import InitialScroll from "./InitialScroll";
import Navbar from "./Navbar";
import Projects from "./projects/Projects";
import ScrollEffects from "./ScrollEffects";
import Skills from "./Skills";

/** The one-page site, opened on `section` when the URL names one. */
export default function Home({ section }: { section: Section | null }) {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        {/* Content slides over the sticky hero (parallax) */}
        <div className="relative z-10 overflow-x-clip">
          <About />
          <Projects />
          <Skills />
          <Contact />
          <Footer />
        </div>
      </main>
      <InitialScroll section={section} />
      <ScrollEffects section={section} />
    </>
  );
}
