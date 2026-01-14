import { Shield, Lock, Eye, Server, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export function Security() {
  const features = [
    {
      icon: Shield,
      title: "Enterprise-Grade Security",
      description: "Bank-level encryption and security protocols to protect your data"
    },
    {
      icon: Lock,
      title: "End-to-End Encryption",
      description: "All data is encrypted in transit and at rest using AES-256"
    },
    {
      icon: Eye,
      title: "Privacy First",
      description: "We never sell your data and comply with GDPR and CCPA"
    },
    {
      icon: Server,
      title: "Secure Infrastructure",
      description: "Hosted on secure cloud infrastructure with 99.9% uptime"
    }
  ];

  const certifications = [
    "SOC 2 Type II",
    "ISO 27001",
    "GDPR Compliant",
    "CCPA Compliant",
    "HIPAA Ready",
    "PCI DSS"
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
                Your Security is Our Priority
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Enterprise-grade security measures to keep your data safe and secure
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="p-8 bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl"
                >
                  <Icon className="w-12 h-12 text-cyan-400 mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              );
            })}
          </div>

          {/* Certifications */}
          <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Certifications & Compliance
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {certifications.map((cert) => (
                <div
                  key={cert}
                  className="flex items-center justify-center p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-lg"
                >
                  <CheckCircle className="w-5 h-5 text-cyan-400 mr-2" />
                  <span className="text-white font-semibold">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}