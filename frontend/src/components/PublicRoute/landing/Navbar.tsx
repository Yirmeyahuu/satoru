import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";


export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "#hero" },
    { name: "Problem", href: "#problem" },
    { name: "About", href: "#about" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Features", href: "#features" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-cyan-500/20 bg-black/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
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
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-sky-600 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
            <Link
              to="/signin"
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-sky-600 text-white hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all duration-300 cursor-pointer"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-cyan-400 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-cyan-500/20 bg-black/90 backdrop-blur-md">
          <div className="space-y-1 px-4 py-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <Link
              to="/signin"
              className="w-full mt-4 px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-sky-600 text-white hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all duration-300 text-center block"
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}