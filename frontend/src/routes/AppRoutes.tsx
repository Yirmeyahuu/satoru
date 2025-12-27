import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from '../components/PublicRoute/landing/Navbar';
import { Hero } from '../components/PublicRoute/landing/Hero';
import { Problem } from '../components/PublicRoute/landing/Problem';
import { About } from '../components/PublicRoute/landing/About';
import { HowItWorks } from '../components/PublicRoute/landing/HowItWorks';
import { Features } from '../components/PublicRoute/landing/Features';
import { Footer } from '../components/PublicRoute/landing/Footer';
import { SignIn } from '../components/PublicRoute/SignIn';
import { SignUp } from '../components/PublicRoute/SignUp';
import { Dashboard } from '../pages/Dashboard';
import { Documents } from '../pages/Documents';
import { DocumentDetail } from '../pages/DocumentDetail';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { PublicRoute } from '../components/PublicRoute';

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
        <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
        <Route path="/signin" element={<PublicRoute><SignIn /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} />
        
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