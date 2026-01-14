import { FileText, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

export function Terms() {
  const sections = [
    {
      title: "Acceptance of Terms",
      icon: CheckCircle,
      content: "By accessing and using Satoru, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services."
    },
    {
      title: "User Accounts",
      icon: FileText,
      points: [
        "You must be at least 18 years old to create an account",
        "You are responsible for maintaining the confidentiality of your account credentials",
        "You must provide accurate and complete information during registration",
        "You are responsible for all activities that occur under your account",
        "You must notify us immediately of any unauthorized use of your account"
      ]
    },
    {
      title: "Acceptable Use",
      icon: CheckCircle,
      points: [
        "Use the platform only for lawful purposes",
        "Do not interfere with or disrupt the platform's operation",
        "Do not attempt to gain unauthorized access to any part of the platform",
        "Do not upload malicious code, viruses, or harmful content",
        "Do not use the platform to harass, abuse, or harm others",
        "Do not violate any applicable laws or regulations"
      ]
    },
    {
      title: "Prohibited Activities",
      icon: XCircle,
      points: [
        "Reverse engineering or attempting to extract source code",
        "Using automated systems to access the platform without permission",
        "Selling, renting, or leasing access to the platform",
        "Removing or modifying any proprietary notices",
        "Impersonating others or providing false information",
        "Using the platform for commercial purposes without authorization"
      ]
    },
    {
      title: "Intellectual Property",
      icon: FileText,
      content: "All content, features, and functionality of Satoru are owned by us and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws. You may not copy, modify, distribute, or create derivative works without our express written permission."
    },
    {
      title: "Payment Terms",
      icon: CheckCircle,
      points: [
        "Subscription fees are billed in advance on a monthly or annual basis",
        "All fees are non-refundable except as required by law or stated in our refund policy",
        "We reserve the right to change our pricing with 30 days notice",
        "You authorize us to charge your payment method for all fees",
        "Failure to pay may result in account suspension or termination"
      ]
    },
    {
      title: "Service Modifications",
      icon: AlertTriangle,
      content: "We reserve the right to modify, suspend, or discontinue any part of our services at any time without prior notice. We are not liable for any modification, suspension, or discontinuation of the services."
    },
    {
      title: "Limitation of Liability",
      icon: AlertTriangle,
      content: "To the maximum extent permitted by law, Satoru shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or other intangible losses resulting from your use of our services."
    },
    {
      title: "Termination",
      icon: XCircle,
      points: [
        "You may terminate your account at any time through account settings",
        "We may suspend or terminate your account for violation of these terms",
        "Upon termination, your right to use the platform ceases immediately",
        "We may delete your data after account termination as per our data retention policy",
        "Provisions that should survive termination will remain in effect"
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
                  Terms of Service
                </span>
              </h1>
              <p className="text-xl text-gray-400">
                Last updated: January 14, 2026
              </p>
            </div>

            {/* Introduction */}
            <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 mb-8">
              <p className="text-gray-400 leading-relaxed">
                These Terms of Service govern your use of Satoru and the services we provide. 
                Please read these terms carefully before using our platform. By using our services, 
                you agree to be bound by these terms.
              </p>
            </div>

            {/* Terms Sections */}
            <div className="space-y-8">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <div
                    key={section.title}
                    className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8"
                  >
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="p-3 bg-cyan-500/10 rounded-lg">
                        <Icon className="w-6 h-6 text-cyan-400" />
                      </div>
                      <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                    </div>
                    
                    {section.content && (
                      <p className="text-gray-400 leading-relaxed">{section.content}</p>
                    )}
                    
                    {section.points && (
                      <ul className="space-y-3">
                        {section.points.map((point, index) => (
                          <li key={index} className="flex items-start text-gray-400">
                            <div className="w-2 h-2 rounded-full bg-cyan-400 mr-3 mt-2 flex-shrink-0"></div>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Governing Law */}
            <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 mt-8">
              <h2 className="text-2xl font-bold text-white mb-4">Governing Law</h2>
              <p className="text-gray-400 leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the 
                Philippines, without regard to its conflict of law provisions. Any disputes arising 
                from these terms will be subject to the exclusive jurisdiction of the courts in 
                Bacolod City, Philippines.
              </p>
            </div>

            {/* Changes to Terms */}
            <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 mt-8">
              <h2 className="text-2xl font-bold text-white mb-4">Changes to Terms</h2>
              <p className="text-gray-400 leading-relaxed">
                We reserve the right to modify these Terms at any time. We will notify users of 
                any material changes via email or through the platform. Your continued use of 
                Satoru after such modifications constitutes acceptance of the updated Terms.
              </p>
            </div>

            {/* Contact */}
            <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 mt-8">
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                If you have any questions about these Terms, please contact us:
              </p>
              <div className="space-y-2 text-gray-400">
                <p>Email: <a href="mailto:legal@satoru.com" className="text-cyan-400 hover:text-cyan-300">legal@satoru.com</a></p>
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