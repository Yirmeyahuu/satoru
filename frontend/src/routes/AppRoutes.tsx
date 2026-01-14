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
import { Profile } from '../pages/Profile';
import { Pricing } from '../pages/footerLinks/Pricing';
import { Security } from '../pages/footerLinks/Security';
import { Roadmap } from '../pages/footerLinks/Roadmap';
import { Blog } from '../pages/footerLinks/Blog';
import { Careers } from '../pages/footerLinks/Careers';
import { PressKit } from '../pages/footerLinks/PressKit';
import { Documentation } from '../pages/footerLinks/Documentation';
import { APIReference } from '../pages/footerLinks/APIReference';
import { Guides } from '../pages/footerLinks/Guides';
import { Support } from '../pages/footerLinks/Support';
import { Privacy } from '../pages/footerLinks/Privacy';
import { Terms } from '../pages/footerLinks/Terms';
import { CookiePolicy } from '../pages/footerLinks/CookiePolicy';
import { Licenses } from '../pages/footerLinks/Licenses';



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
        <Route path="/pricing" element={<PublicRoute><Pricing /></PublicRoute>} />
        <Route path="/security" element={<PublicRoute><Security /></PublicRoute>} />
        <Route path="/roadmap" element={<PublicRoute><Roadmap /></PublicRoute>} />
        <Route path="/blog" element={<PublicRoute><Blog /></PublicRoute>} />
        <Route path="/careers" element={<PublicRoute><Careers /></PublicRoute>} />
        <Route path="/press-kit" element={<PublicRoute><PressKit /></PublicRoute>} />
        <Route path="/documentation" element={<PublicRoute><Documentation /></PublicRoute>} />
        <Route path="/api-reference" element={<PublicRoute><APIReference /></PublicRoute>} />
        <Route path="/guides" element={<PublicRoute><Guides /></PublicRoute>} />
        <Route path="/support" element={<PublicRoute><Support /></PublicRoute>} />
        <Route path="/privacy" element={<PublicRoute><Privacy /></PublicRoute>} />
        <Route path="/terms" element={<PublicRoute><Terms /></PublicRoute>} />
        <Route path="/cookie-policy" element={<PublicRoute><CookiePolicy /></PublicRoute>} />
        <Route path="/licenses" element={<PublicRoute><Licenses /></PublicRoute>} />
        
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
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}