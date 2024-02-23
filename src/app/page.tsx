import About from "./components/About";
import Navbar from "./components/Navbar";
import Title from "./components/Title";

export default function Home() {
    return (
      <>
        <Navbar />
        <main className="container mx-auto px-3 flex flex-col items-center">
          <Title />
          <About />
        </main>
      </>
    );
}
