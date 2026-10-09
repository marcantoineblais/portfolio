import { setRequestLocale } from "next-intl/server";

import About from "../../components/About";
import Contact from "../../components/Contact";
import Footer from "../../components/Footer";
import Hero from "../../components/Hero";
import Navbar from "../../components/Navbar";
import Projects from "../../components/projects/Projects";
import ScrollEffects from "../../components/ScrollEffects";
import Skills from "../../components/Skills";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

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
      <ScrollEffects />
    </>
  );
}
