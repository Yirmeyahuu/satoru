import { Download, Image, FileText, Palette } from "lucide-react";
import { Link } from "react-router-dom";

export function PressKit() {
  const assets = [
    {
      category: "Logos",
      icon: Image,
      items: [
        { name: "Primary Logo (PNG)", size: "2.4 MB" },
        { name: "Primary Logo (SVG)", size: "1.8 MB" },
        { name: "Logo White (PNG)", size: "2.1 MB" },
        { name: "Logo Black (PNG)", size: "2.0 MB" },
        { name: "Icon Only (PNG)", size: "1.2 MB" }
      ]
    },
    {
      category: "Brand Guidelines",
      icon: Palette,
      items: [
        { name: "Complete Brand Guidelines", size: "5.2 MB" },
        { name: "Color Palette", size: "0.8 MB" },
        { name: "Typography Guide", size: "1.1 MB" }
      ]
    },
    {
      category: "Press Materials",
      icon: FileText,
      items: [
        { name: "Company Overview", size: "0.5 MB" },
        { name: "Product Screenshots", size: "8.3 MB" },
        { name: "Executive Bios", size: "0.3 MB" },
        { name: "Press Release Template", size: "0.2 MB" }
      ]
    }
  ];

  const brandColors = [
    { name: "Primary Cyan", hex: "#06B6D4", rgb: "6, 182, 212" },
    { name: "Secondary Sky", hex: "#0284C7", rgb: "2, 132, 199" },
    { name: "Dark Background", hex: "#000000", rgb: "0, 0, 0" },
    { name: "Light Gray", hex: "#9CA3AF", rgb: "156, 163, 175" }
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

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-sky-600 bg-clip-text text-transparent">
                Press Kit
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Download our brand assets, logos, and media resources. 
              For press inquiries, contact us at press@satoru.com
            </p>
          </div>

          {/* Download All Button */}
          <div className="text-center mb-16">
            <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-sky-600 text-white rounded-lg hover:from-cyan-600 hover:to-sky-700 transition-all font-semibold inline-flex items-center space-x-2">
              <Download className="w-5 h-5" />
              <span>Download Complete Press Kit</span>
            </button>
          </div>

          {/* Assets Grid */}
          <div className="max-w-5xl mx-auto space-y-12 mb-20">
            {assets.map((section) => {
              const Icon = section.icon;
              return (
                <div key={section.category}>
                  <div className="flex items-center space-x-3 mb-6">
                    <Icon className="w-8 h-8 text-cyan-400" />
                    <h2 className="text-3xl font-bold text-white">{section.category}</h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {section.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-xl hover:border-cyan-500/40 transition-all group"
                      >
                        <div>
                          <h3 className="text-white font-semibold mb-1">{item.name}</h3>
                          <p className="text-gray-500 text-sm">{item.size}</p>
                        </div>
                        <button className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-all">
                          <Download className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Brand Colors */}
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">Brand Colors</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {brandColors.map((color) => (
                <div
                  key={color.name}
                  className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-xl overflow-hidden"
                >
                  <div
                    className="h-32 w-full"
                    style={{ backgroundColor: color.hex }}
                  ></div>
                  <div className="p-4">
                    <h3 className="text-white font-semibold mb-2">{color.name}</h3>
                    <p className="text-gray-400 text-sm mb-1">HEX: {color.hex}</p>
                    <p className="text-gray-400 text-sm">RGB: {color.rgb}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Usage Guidelines */}
      <section className="py-20 border-t border-cyan-500/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">Usage Guidelines</h2>
            <div className="space-y-4 text-gray-400">
              <p>
                Please follow these guidelines when using Satoru brand assets:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Do not modify or distort the logo in any way</li>
                <li>Maintain adequate clear space around the logo</li>
                <li>Use approved color variations only</li>
                <li>Do not use the logo as part of your own branding</li>
                <li>Ensure proper contrast for logo visibility</li>
              </ul>
              <p className="pt-4">
                For questions about brand usage, please contact us at{" "}
                <a href="mailto:brand@satoru.com" className="text-cyan-400 hover:text-cyan-300">
                  brand@satoru.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}