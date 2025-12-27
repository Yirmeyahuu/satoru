import { Github, Twitter, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  const footerLinks = {
    product: [
      { name: "Features", href: "#features" },
      { name: "Pricing", href: "#" },
      { name: "Security", href: "#" },
      { name: "Roadmap", href: "#" },
    ],
    company: [
      { name: "About", href: "#about" },
      { name: "Blog", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Press Kit", href: "#" },
    ],
    resources: [
      { name: "Documentation", href: "#" },
      { name: "API Reference", href: "#" },
      { name: "Guides", href: "#" },
      { name: "Support", href: "#" },
    ],
    legal: [
      { name: "Privacy", href: "#" },
      { name: "Terms", href: "#" },
      { name: "Cookie Policy", href: "#" },
      { name: "Licenses", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  return (
    <footer className="relative border-t border-cyan-500/20 bg-black overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 grid-bg opacity-10"></div>
      
      {/* Gradient Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
            {/* Brand Column */}
            <div className="col-span-2">
              <a href="#hero" className="flex items-center space-x-2 mb-6">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-cyan-400 to-sky-600 p-0.5">
                  <div className="h-full w-full rounded-lg bg-black flex items-center justify-center">
                    <div className="h-5 w-5 rounded-full bg-gradient-to-br from-cyan-400 to-sky-600"></div>
                  </div>
                </div>
                <span className="bg-gradient-to-r from-cyan-400 to-sky-600 bg-clip-text text-transparent">
                  Satoru
                </span>
              </a>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Pioneering the future of digital innovation with cutting-edge technology and luminous design.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-400 hover:text-cyan-400 transition-colors">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span>Bacolod City, Negros Island, Philippines, 6100</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400 hover:text-cyan-400 transition-colors">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>(+63) 908 560 8811</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400 hover:text-cyan-400 transition-colors">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span>contact@cosdevs.com</span>
                </div>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="text-gray-100 mb-4">Product</h4>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-cyan-400 transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-gray-100 mb-4">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-cyan-400 transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h4 className="text-gray-100 mb-4">Resources</h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-cyan-400 transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="text-gray-100 mb-4">Legal</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-cyan-400 transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-cyan-500/20 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-gray-400">
              © {new Date().getFullYear()} Satoru. Developed by COS Devs.
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="p-2 rounded-lg border border-cyan-500/20 text-gray-400 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-cyan-500/10 transition-all duration-300"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
