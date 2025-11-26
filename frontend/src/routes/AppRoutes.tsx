import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { Problem } from '../components/Problem';
import { About } from '../components/About';
import { HowItWorks } from '../components/HowItWorks';
import { Features } from '../components/Features';
import { Footer } from '../components/Footer';
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';
import { Dashboard } from '../pages/Dashboard';
import { Documents } from '../pages/Documents';
import { DocumentDetail } from '../pages/DocumentDetail';

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
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/documents/:id" element={<DocumentDetail />} />
        {/* TODO: Add more routes */}
        {/* <Route path="/profile" element={<Profile />} /> */}
      </Routes>
    </Router>
  );
}