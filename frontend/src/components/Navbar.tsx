import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Menu, X, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#hero" className="flex items-center space-x-2">
              <img 
                src="/SaturoLogo.png" 
                alt="Satoru Logo" 
                className="h-8 w-8 object-contain"
              />
              <span className="text-white cursor-pointer text-xl font-semibold">
                Satoru
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/#features" className="text-gray-300 hover:text-white transition-colors">
              Features
            </Link>
            <Link to="/#how-it-works" className="text-gray-300 hover:text-white transition-colors">
              How It Works
            </Link>
            <Link to="/#about" className="text-gray-300 hover:text-white transition-colors">
              About
            </Link>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Dashboard
                </Link>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-gray-300">
                    <User className="w-5 h-5" />
                    <span className="text-sm">{user.displayName || user.email}</span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-cyan-500 to-sky-600 text-white px-6 py-2 rounded-lg hover:from-cyan-600 hover:to-sky-700 transition-all shadow-lg shadow-cyan-500/50"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-white"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-black border-t border-gray-800">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link
              to="/#features"
              className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-900 rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Features
            </Link>
            <Link
              to="/#how-it-works"
              className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-900 rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              How It Works
            </Link>
            <Link
              to="/#about"
              className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-900 rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-900 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <div className="px-3 py-2 text-gray-400 text-sm">
                  {user.displayName || user.email}
                </div>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-900 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="block px-3 py-2 bg-gradient-to-r from-cyan-500 to-sky-600 text-white rounded-lg text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}