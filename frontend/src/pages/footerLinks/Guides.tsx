import { BookOpen, Video, FileText, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";

export function Guides() {
  const guideCategories = [
    {
      title: "Getting Started",
      icon: Lightbulb,
      color: "from-yellow-500 to-orange-600",
      guides: [
        { title: "Your First Project", duration: "10 min", type: "Tutorial" },
        { title: "Understanding the Dashboard", duration: "8 min", type: "Tutorial" },
        { title: "Basic Workflow", duration: "12 min", type: "Tutorial" }
      ]
    },
    {
      title: "Advanced Features",
      icon: BookOpen,
      color: "from-purple-500 to-pink-600",
      guides: [
        { title: "Custom Integrations", duration: "20 min", type: "Guide" },
        { title: "Automation Workflows", duration: "15 min", type: "Guide" },
        { title: "Advanced Analytics", duration: "18 min", type: "Guide" }
      ]
    },
    {
      title: "Video Tutorials",
      icon: Video,
      color: "from-red-500 to-pink-600",
      guides: [
        { title: "Complete Walkthrough", duration: "25 min", type: "Video" },
        { title: "Tips and Tricks", duration: "12 min", type: "Video" },
        { title: "Common Mistakes", duration: "10 min", type: "Video" }
      ]
    },
    {
      title: "Best Practices",
      icon: FileText,
      color: "from-green-500 to-emerald-600",
      guides: [
        { title: "Security Guidelines", duration: "15 min", type: "Article" },
        { title: "Performance Optimization", duration: "20 min", type: "Article" },
        { title: "Team Collaboration", duration: "12 min", type: "Article" }
      ]
    }
  ];

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

      {/* Hero */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-sky-600 bg-clip-text text-transparent">
                Guides & Tutorials
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Learn how to make the most of Satoru with our comprehensive guides and tutorials
            </p>
          </div>

          {/* Guide Categories */}
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {guideCategories.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.title}
                  className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-500/40 transition-all"
                >
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${category.color}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">{category.title}</h2>
                  </div>

                  <div className="space-y-4">
                    {category.guides.map((guide, index) => (
                      <a
                        key={index}
                        href="#"
                        className="block p-4 bg-black/40 border border-cyan-500/10 rounded-xl hover:border-cyan-500/30 transition-all group"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-white font-semibold mb-1 group-hover:text-cyan-400 transition-colors">
                              {guide.title}
                            </h3>
                            <div className="flex items-center space-x-3 text-sm text-gray-500">
                              <span className="px-2 py-0.5 bg-cyan-500/10 text-cyan-400 rounded">
                                {guide.type}
                              </span>
                              <span>{guide.duration}</span>
                            </div>
                          </div>
                          <svg
                            className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}