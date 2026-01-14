import { Shield, Lock, Eye, FileText } from "lucide-react";
import { Link } from "react-router-dom";

export function Privacy() {
  const sections = [
    {
      title: "Information We Collect",
      icon: FileText,
      content: [
        "Personal information you provide when creating an account (name, email address, password)",
        "Usage data including pages visited, features used, and time spent on the platform",
        "Device information such as IP address, browser type, and operating system",
        "Cookies and similar tracking technologies for analytics and user experience improvement"
      ]
    },
    {
      title: "How We Use Your Information",
      icon: Eye,
      content: [
        "To provide, maintain, and improve our services",
        "To communicate with you about updates, security alerts, and support",
        "To personalize your experience and provide relevant content",
        "To analyze usage patterns and optimize platform performance",
        "To detect, prevent, and address technical issues and security threats"
      ]
    },
    {
      title: "Data Protection & Security",
      icon: Lock,
      content: [
        "All data is encrypted in transit using TLS/SSL protocols",
        "Passwords are hashed using industry-standard encryption algorithms",
        "We implement regular security audits and vulnerability assessments",
        "Access to personal data is restricted to authorized personnel only",
        "We comply with GDPR, CCPA, and other applicable data protection regulations"
      ]
    },
    {
      title: "Your Rights",
      icon: Shield,
      content: [
        "Access and download your personal data at any time",
        "Request correction of inaccurate or incomplete data",
        "Request deletion of your account and associated data",
        "Opt-out of marketing communications",
        "Object to processing of your personal data for specific purposes"
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
                  Privacy Policy
                </span>
              </h1>
              <p className="text-xl text-gray-400">
                Last updated: January 14, 2026
              </p>
            </div>

            {/* Introduction */}
            <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 mb-8">
              <p className="text-gray-400 leading-relaxed mb-4">
                At Satoru, we take your privacy seriously. This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you use our platform.
              </p>
              <p className="text-gray-400 leading-relaxed">
                By using Satoru, you agree to the collection and use of information in accordance with 
                this policy. If you do not agree with our policies and practices, please do not use our services.
              </p>
            </div>

            {/* Policy Sections */}
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
                    <ul className="space-y-3">
                      {section.content.map((item, index) => (
                        <li key={index} className="flex items-start text-gray-400">
                          <div className="w-2 h-2 rounded-full bg-cyan-400 mr-3 mt-2 flex-shrink-0"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            {/* Data Retention */}
            <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 mt-8">
              <h2 className="text-2xl font-bold text-white mb-4">Data Retention</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                We retain your personal information only for as long as necessary to fulfill the purposes 
                outlined in this Privacy Policy, unless a longer retention period is required by law.
              </p>
              <p className="text-gray-400 leading-relaxed">
                When you delete your account, we will delete your personal data within 30 days, except 
                where we are required to retain it for legal or regulatory purposes.
              </p>
            </div>

            {/* Third-Party Services */}
            <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 mt-8">
              <h2 className="text-2xl font-bold text-white mb-4">Third-Party Services</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                We may use third-party service providers to help us operate our platform and provide 
                services to you. These providers have access to your personal information only to perform 
                specific tasks on our behalf and are obligated not to disclose or use it for other purposes.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Third-party services we use include: Google Analytics, Stripe for payments, and AWS for 
                cloud infrastructure.
              </p>
            </div>

            {/* Contact */}
            <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 mt-8">
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy, please contact us:
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