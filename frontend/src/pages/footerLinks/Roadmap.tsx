import { CheckCircle, Clock, Circle } from "lucide-react";
import { Link } from "react-router-dom";

export function Roadmap() {
  const roadmapItems = [
    {
      quarter: "Q1 2025",
      status: "completed",
      items: [
        "Launch beta version",
        "User authentication system",
        "Basic dashboard features",
        "Mobile responsive design"
      ]
    },
    {
      quarter: "Q2 2025",
      status: "in-progress",
      items: [
        "Advanced analytics dashboard",
        "Team collaboration features",
        "API documentation",
        "Third-party integrations"
      ]
    },
    {
      quarter: "Q3 2025",
      status: "planned",
      items: [
        "AI-powered insights",
        "Custom reporting tools",
        "Mobile applications (iOS & Android)",
        "Advanced security features"
      ]
    },
    {
      quarter: "Q4 2025",
      status: "planned",
      items: [
        "Enterprise features",
        "White-label solutions",
        "Advanced automation",
        "Global expansion"
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-6 h-6 text-green-400" />;
      case "in-progress":
        return <Clock className="w-6 h-6 text-cyan-400" />;
      default:
        return <Circle className="w-6 h-6 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "border-green-500/30 bg-green-500/5";
      case "in-progress":
        return "border-cyan-500/30 bg-cyan-500/5";
      default:
        return "border-gray-500/30 bg-gray-500/5";
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

      {/* Hero */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-sky-600 bg-clip-text text-transparent">
                Product Roadmap
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              See what we're building and what's coming next
            </p>
          </div>

          {/* Roadmap Timeline */}
          <div className="max-w-4xl mx-auto space-y-8">
            {roadmapItems.map((item, index) => (
              <div
                key={item.quarter}
                className={`p-8 border rounded-2xl backdrop-blur-xl ${getStatusColor(item.status)}`}
              >
                <div className="flex items-center mb-6">
                  {getStatusIcon(item.status)}
                  <h3 className="text-2xl font-bold text-white ml-3">{item.quarter}</h3>
                  <span className="ml-auto px-4 py-1 rounded-full text-sm font-semibold bg-cyan-500/10 text-cyan-400 capitalize">
                    {item.status.replace("-", " ")}
                  </span>
                </div>
                <ul className="space-y-3">
                  {item.items.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-300">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}