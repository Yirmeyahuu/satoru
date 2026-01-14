import { Cookie, Settings, Eye, ToggleLeft } from "lucide-react";
import { Link } from "react-router-dom";

export function CookiePolicy() {
  const cookieTypes = [
    {
      title: "Essential Cookies",
      icon: Cookie,
      color: "from-green-500 to-emerald-600",
      description: "Required for the platform to function properly. These cannot be disabled.",
      examples: [
        "Authentication and session management",
        "Security and fraud prevention",
        "Load balancing and performance optimization",
        "User preferences and settings"
      ]
    },
    {
      title: "Analytics Cookies",
      icon: Eye,
      color: "from-blue-500 to-cyan-600",
      description: "Help us understand how users interact with our platform.",
      examples: [
        "Page views and navigation patterns",
        "Feature usage statistics",
        "Performance metrics",
        "Error tracking and debugging"
      ]
    },
    {
      title: "Functional Cookies",
      icon: Settings,
      color: "from-purple-500 to-pink-600",
      description: "Enable enhanced functionality and personalization.",
      examples: [
        "Language preferences",
        "Theme and display settings",
        "Recently viewed content",
        "Saved filters and preferences"
      ]
    },
    {
      title: "Marketing Cookies",
      icon: ToggleLeft,
      color: "from-orange-500 to-red-600",
      description: "Used to deliver relevant advertisements and track campaign effectiveness.",
      examples: [
        "Ad targeting and personalization",
        "Campaign performance tracking",
        "Conversion tracking",
        "Social media integration"
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
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-cyan-400 to-sky-600 bg-clip-text text-transparent">
                  Cookie Policy
                </span>
              </h1>
              <p className="text-xl text-gray-400">
                Last updated: January 14, 2026
              </p>
            </div>

            {/* Introduction */}
            <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">What Are Cookies?</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Cookies are small text files that are placed on your device when you visit our website. 
                They help us provide you with a better experience by remembering your preferences and 
                understanding how you use our platform.
              </p>
              <p className="text-gray-400 leading-relaxed">
                This Cookie Policy explains what cookies are, how we use them, and how you can control 
                your cookie preferences.
              </p>
            </div>

            {/* Cookie Types */}
            <div className="space-y-8 mb-8">
              {cookieTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <div
                    key={type.title}
                    className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`p-3 bg-gradient-to-br ${type.color} rounded-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">{type.title}</h3>
                    </div>
                    <p className="text-gray-400 mb-4">{type.description}</p>
                    <div className="bg-black/40 border border-cyan-500/10 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-3">Examples:</h4>
                      <ul className="space-y-2">
                        {type.examples.map((example, index) => (
                          <li key={index} className="flex items-start text-gray-400">
                            <div className="w-2 h-2 rounded-full bg-cyan-400 mr-3 mt-2 flex-shrink-0"></div>
                            <span>{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Third-Party Cookies */}
            <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Third-Party Cookies</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                We may use third-party services that set cookies on your device. These services include:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start text-gray-400">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 mr-3 mt-2 flex-shrink-0"></div>
                  <span><strong className="text-white">Google Analytics:</strong> To analyze website traffic and user behavior</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 mr-3 mt-2 flex-shrink-0"></div>
                  <span><strong className="text-white">Stripe:</strong> For secure payment processing</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 mr-3 mt-2 flex-shrink-0"></div>
                  <span><strong className="text-white">Social Media Platforms:</strong> For social sharing features</span>
                </li>
              </ul>
            </div>

            {/* Managing Cookies */}
            <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Managing Your Cookie Preferences</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                You can control and manage cookies in several ways:
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start text-gray-400">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 mr-3 mt-2 flex-shrink-0"></div>
                  <span><strong className="text-white">Browser Settings:</strong> Most browsers allow you to refuse or delete cookies through their settings</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 mr-3 mt-2 flex-shrink-0"></div>
                  <span><strong className="text-white">Cookie Banner:</strong> Accept or reject non-essential cookies through our cookie consent banner</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 mr-3 mt-2 flex-shrink-0"></div>
                  <span><strong className="text-white">Account Settings:</strong> Manage your preferences in your account settings</span>
                </li>
              </ul>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <p className="text-amber-400 text-sm">
                  <strong>Note:</strong> Disabling essential cookies may affect the functionality of our platform.
                </p>
              </div>
            </div>

            {/* Updates */}
            <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Updates to This Policy</h2>
              <p className="text-gray-400 leading-relaxed">
                We may update this Cookie Policy from time to time to reflect changes in our practices 
                or for legal, operational, or regulatory reasons. We will notify you of any material 
                changes by posting the updated policy on this page with a new "Last updated" date.
              </p>
            </div>

            {/* Contact */}
            <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                If you have questions about our use of cookies, please contact us:
              </p>
              <div className="space-y-2 text-gray-400">
                <p>Email: <a href="mailto:privacy@satoru.com" className="text-cyan-400 hover:text-cyan-300">privacy@satoru.com</a></p>
                <p>Phone: <a href="tel:+639085608811" className="text-cyan-400 hover:text-cyan-300">(+63) 908 560 8811</a></p>
                <p>Address: Bacolod City, Negros Island, Philippines, 6100</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}