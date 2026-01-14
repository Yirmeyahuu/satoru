import { FileText, Code, Package } from "lucide-react";
import { Link } from "react-router-dom";

export function Licenses() {
  const licenses = [
    {
      name: "React",
      version: "18.2.0",
      license: "MIT",
      author: "Facebook, Inc.",
      description: "A JavaScript library for building user interfaces"
    },
    {
      name: "TypeScript",
      version: "5.0.0",
      license: "Apache-2.0",
      author: "Microsoft Corporation",
      description: "TypeScript is a superset of JavaScript that compiles to clean JavaScript output"
    },
    {
      name: "Tailwind CSS",
      version: "3.4.0",
      license: "MIT",
      author: "Tailwind Labs",
      description: "A utility-first CSS framework for rapid UI development"
    },
    {
      name: "Firebase",
      version: "10.7.0",
      license: "Apache-2.0",
      author: "Google LLC",
      description: "Firebase SDK for JavaScript"
    },
    {
      name: "React Router",
      version: "6.20.0",
      license: "MIT",
      author: "React Training",
      description: "Declarative routing for React applications"
    },
    {
      name: "Lucide React",
      version: "0.294.0",
      license: "ISC",
      author: "Lucide Contributors",
      description: "Beautiful & consistent icon toolkit made by the community"
    },
    {
      name: "Vite",
      version: "5.0.0",
      license: "MIT",
      author: "Evan You",
      description: "Next generation frontend tooling"
    },
    {
      name: "React Hook Form",
      version: "7.48.0",
      license: "MIT",
      author: "Bill Luo",
      description: "Performant, flexible and extensible forms with easy-to-use validation"
    }
  ];

  const getLicenseColor = (license: string) => {
    switch (license) {
      case "MIT":
        return "text-green-400 bg-green-500/10 border-green-500/30";
      case "Apache-2.0":
        return "text-blue-400 bg-blue-500/10 border-blue-500/30";
      case "ISC":
        return "text-purple-400 bg-purple-500/10 border-purple-500/30";
      default:
        return "text-gray-400 bg-gray-500/10 border-gray-500/30";
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
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-cyan-400 to-sky-600 bg-clip-text text-transparent">
                  Open Source Licenses
                </span>
              </h1>
              <p className="text-xl text-gray-400">
                Satoru is built with amazing open source software
              </p>
            </div>

            {/* Introduction */}
            <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 mb-12">
              <div className="flex items-center space-x-3 mb-4">
                <Code className="w-8 h-8 text-cyan-400" />
                <h2 className="text-2xl font-bold text-white">Acknowledgments</h2>
              </div>
              <p className="text-gray-400 leading-relaxed mb-4">
                We are grateful to the open source community for their contributions. This page lists 
                all third-party libraries and their respective licenses used in Satoru.
              </p>
              <p className="text-gray-400 leading-relaxed">
                All trademarks and copyrights belong to their respective owners. We comply with all 
                license requirements and give full credit to the original authors.
              </p>
            </div>

            {/* License Stats */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6 text-center">
                <Package className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">{licenses.length}+</div>
                <div className="text-gray-400">Dependencies</div>
              </div>
              <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6 text-center">
                <FileText className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">3</div>
                <div className="text-gray-400">License Types</div>
              </div>
              <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6 text-center">
                <Code className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">100%</div>
                <div className="text-gray-400">Open Source</div>
              </div>
            </div>

            {/* Licenses List */}
            <div className="space-y-4">
              {licenses.map((pkg, index) => (
                <div
                  key={index}
                  className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/40 transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
                        <span className="px-2 py-0.5 bg-cyan-500/10 text-cyan-400 text-sm rounded">
                          v{pkg.version}
                        </span>
                      </div>
                      <p className="text-gray-400 mb-2">{pkg.description}</p>
                      <p className="text-gray-500 text-sm">by {pkg.author}</p>
                    </div>
                    <div className={`px-4 py-2 rounded-lg border font-mono text-sm font-semibold whitespace-nowrap ${getLicenseColor(pkg.license)}`}>
                      {pkg.license}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* License Types */}
            <div className="mt-12 bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">License Information</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">MIT License</h3>
                  <p className="text-gray-400 text-sm">
                    A permissive license that allows commercial use, modification, distribution, and private use. 
                    Requires preservation of copyright and license notices.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Apache License 2.0</h3>
                  <p className="text-gray-400 text-sm">
                    A permissive license that also provides an express grant of patent rights. Requires preservation 
                    of copyright and license notices, and stating significant changes.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">ISC License</h3>
                  <p className="text-gray-400 text-sm">
                    A permissive license functionally equivalent to the MIT license. Allows commercial use, 
                    modification, distribution, and private use.
                  </p>
                </div>
              </div>
            </div>

            {/* Full License Text CTA */}
            <div className="mt-8 bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold text-white mb-4">Need Full License Texts?</h3>
              <p className="text-gray-400 mb-6">
                Full license texts for all dependencies are available in our source code repository.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-sky-600 text-white rounded-lg hover:from-cyan-600 hover:to-sky-700 transition-all font-semibold"
              >
                <Code className="w-5 h-5" />
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}