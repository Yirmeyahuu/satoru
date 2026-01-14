import { Book, Rocket, Code, Zap, Shield, Users, Settings, Database, Cloud, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export function Documentation() {
  const [searchQuery, setSearchQuery] = useState("");

  const bentoItems = [
    {
      title: "Getting Started",
      description: "Quick start guide to get you up and running in minutes",
      icon: Rocket,
      color: "from-cyan-500 to-blue-600",
      size: "large", // spans 2 columns
      href: "#getting-started"
    },
    {
      title: "API Reference",
      description: "Complete API documentation",
      icon: Code,
      color: "from-purple-500 to-pink-600",
      size: "small",
      href: "#api-reference"
    },
    {
      title: "Authentication",
      description: "Secure your application",
      icon: Shield,
      color: "from-green-500 to-emerald-600",
      size: "small",
      href: "#authentication"
    },
    {
      title: "Best Practices",
      description: "Learn from our expert recommendations and industry standards",
      icon: Zap,
      color: "from-orange-500 to-red-600",
      size: "medium",
      href: "#best-practices"
    },
    {
      title: "Team Collaboration",
      description: "Work together seamlessly",
      icon: Users,
      color: "from-blue-500 to-cyan-600",
      size: "small",
      href: "#collaboration"
    },
    {
      title: "Database Integration",
      description: "Connect and manage your data sources",
      icon: Database,
      color: "from-indigo-500 to-purple-600",
      size: "medium",
      href: "#database"
    },
    {
      title: "Configuration",
      description: "Customize settings",
      icon: Settings,
      color: "from-gray-500 to-slate-600",
      size: "small",
      href: "#configuration"
    },
    {
      title: "Cloud Deployment",
      description: "Deploy to production with confidence and scale effortlessly",
      icon: Cloud,
      color: "from-sky-500 to-blue-600",
      size: "large",
      href: "#deployment"
    }
  ];

  const quickLinks = [
    { name: "Installation", href: "#installation" },
    { name: "Core Concepts", href: "#concepts" },
    { name: "Tutorials", href: "#tutorials" },
    { name: "Troubleshooting", href: "#troubleshooting" },
    { name: "FAQ", href: "#faq" },
    { name: "Changelog", href: "#changelog" }
  ];

  const getSizeClasses = (size: string) => {
    switch (size) {
      case "large":
        return "md:col-span-2 md:row-span-2";
      case "medium":
        return "md:col-span-2";
      case "small":
      default:
        return "md:col-span-1";
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-cyan-500/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/SaturoLogo.png" alt="Satoru" className="h-8 w-8 object-contain" />
              <span className="text-white text-xl font-semibold">Satoru</span>
            </Link>
            <Link
              to="/login"
              className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-sky-600 text-white rounded-lg hover:from-cyan-600 hover:to-sky-700 transition-all"
            >
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-sky-600 bg-clip-text text-transparent">
                Documentation
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              Everything you need to build amazing applications with Satoru
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-black/40 backdrop-blur-xl border border-cyan-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {quickLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-2 rounded-lg border border-cyan-500/20 bg-black/40 backdrop-blur-xl text-gray-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Grid */}
      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
            {bentoItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.title}
                  href={item.href}
                  className={`group relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-black/40 backdrop-blur-xl hover:border-cyan-500/40 transition-all ${getSizeClasses(item.size)}`}
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  
                  {/* Content */}
                  <div className="relative h-full p-6 flex flex-col">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {item.description}
                    </p>

                    {/* Arrow indicator for hover */}
                    <div className="mt-auto">
                      <div className="inline-flex items-center text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-sm font-semibold mr-2">Learn more</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="py-20 border-t border-cyan-500/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-cyan-400 to-sky-600 bg-clip-text text-transparent">
              Popular Topics
            </span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Creating Your First Project", time: "5 min read" },
              { title: "Working with the Dashboard", time: "8 min read" },
              { title: "Setting Up Webhooks", time: "6 min read" },
              { title: "Managing Team Members", time: "4 min read" },
              { title: "Understanding Analytics", time: "7 min read" },
              { title: "Security Best Practices", time: "10 min read" }
            ].map((topic, index) => (
              <a
                key={index}
                href="#"
                className="p-6 bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-xl hover:border-cyan-500/40 transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <Book className="w-5 h-5 text-cyan-400" />
                  <span className="text-xs text-gray-500">{topic.time}</span>
                </div>
                <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                  {topic.title}
                </h3>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Need Help CTA */}
      <section className="py-20 border-t border-cyan-500/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Still Need Help?</h2>
            <p className="text-xl text-gray-400 mb-8">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/support"
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-sky-600 text-white rounded-lg hover:from-cyan-600 hover:to-sky-700 transition-all font-semibold"
              >
                Contact Support
              </Link>
              <a
                href="#"
                className="px-8 py-4 border border-cyan-500/30 text-cyan-400 rounded-lg hover:bg-cyan-500/10 transition-all font-semibold"
              >
                Join Community
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}