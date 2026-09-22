import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Divider from "./components/Divider";
import About from "./components/About";
import WhatIDo from "./components/WhatIDo";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Divider />
        <About />
        <WhatIDo />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </div>
  );
}
