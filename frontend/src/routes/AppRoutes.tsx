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
import { ProtectedRoute } from '../components/ProtectedRoute';

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
        
        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/documents"
          element={
            <ProtectedRoute>
              <Documents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/documents/:id"
          element={
            <ProtectedRoute>
              <DocumentDetail />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}