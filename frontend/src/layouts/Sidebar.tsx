import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, FileText, User, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { authService } from "../api/authService";

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Documents",
      href: "/documents",
      icon: FileText,
    },
    {
      name: "Profile & Settings",
      href: "/profile",
      icon: User,
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await authService.logout();
      navigate("/signin");
    } catch (error) {
      console.error("Logout error:", error);
      // Still redirect even if API call fails
      navigate("/signin");
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-cyan-500/20">
        <div className="flex items-center justify-between p-4">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <img 
              src="/SaturoLogo.png" 
              alt="Satoru Logo" 
              className="h-8 w-8 object-contain"
            />
            <span className="text-white text-xl font-semibold">
              Satoru
            </span>
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar - Desktop & Mobile */}
      <aside
        className={`
          fixed top-0 h-screen w-64 bg-black/40 backdrop-blur-xl border-r border-cyan-500/20 flex flex-col z-50 transition-transform duration-300
          lg:translate-x-0
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo Section - Desktop only */}
        <div className="hidden lg:block p-6 border-b border-cyan-500/20">
          <Link to="/dashboard" className="flex items-center space-x-3 group">
            <img 
              src="/SaturoLogo.png" 
              alt="Satoru Logo" 
              className="h-10 w-10 object-contain group-hover:scale-110 transition-transform duration-300"
            />
            <span className="text-white text-2xl font-semibold">
              Satoru
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={closeMobileMenu}
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300
                  ${active 
                    ? 'bg-gradient-to-r from-cyan-500/20 to-sky-600/20 text-cyan-400 border border-cyan-500/30' 
                    : 'text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-cyan-500/20">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center space-x-3 px-4 py-3 rounded-lg w-full text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">
              {isLoggingOut ? "Logging out..." : "Logout"}
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}