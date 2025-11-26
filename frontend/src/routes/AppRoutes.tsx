import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { Problem } from '../components/Problem';
import { About } from '../components/About';
import { HowItWorks } from '../components/HowItWorks';
import { Features } from '../components/Features';
import { Footer } from '../components/Footer';
import { SignIn } from '../pages/SignIn';

function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <About />
        <HowItWorks />
        <Features />
      </main>
      <Footer />
    </>
  );
}

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        {/* TODO: Add more routes */}
        {/* <Route path="/signup" element={<SignUp />} /> */}
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </Router>
  );
}