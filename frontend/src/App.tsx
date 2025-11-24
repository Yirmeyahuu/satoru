import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Problem } from "./components/Problem";
import { About } from "./components/About";
import { HowItWorks } from "./components/HowItWorks";
import { Features } from "./components/Features";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <About />
        <HowItWorks />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
