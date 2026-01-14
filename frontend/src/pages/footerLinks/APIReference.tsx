import { Copy, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export function APIReference() {
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);

  const endpoints = [
    {
      method: "GET",
      path: "/api/v1/users",
      description: "Get all users",
      code: `curl -X GET "https://api.satoru.com/v1/users" \\
  -H "Authorization: Bearer YOUR_API_KEY"`
    },
    {
      method: "POST",
      path: "/api/v1/users",
      description: "Create a new user",
      code: `curl -X POST "https://api.satoru.com/v1/users" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"name": "John Doe", "email": "john@example.com"}'`
    },
    {
      method: "GET",
      path: "/api/v1/projects",
      description: "Get all projects",
      code: `curl -X GET "https://api.satoru.com/v1/projects" \\
  -H "Authorization: Bearer YOUR_API_KEY"`
    },
    {
      method: "PUT",
      path: "/api/v1/users/:id",
      description: "Update a user",
      code: `curl -X PUT "https://api.satoru.com/v1/users/123" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"name": "Jane Doe"}'`
    },
    {
      method: "DELETE",
      path: "/api/v1/users/:id",
      description: "Delete a user",
      code: `curl -X DELETE "https://api.satoru.com/v1/users/123" \\
  -H "Authorization: Bearer YOUR_API_KEY"`
    }
  ];

  const copyToClipboard = (code: string, path: string) => {
    navigator.clipboard.writeText(code);
    setCopiedEndpoint(path);
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return "text-green-400 bg-green-500/10 border-green-500/30";
      case "POST":
        return "text-blue-400 bg-blue-500/10 border-blue-500/30";
      case "PUT":
        return "text-orange-400 bg-orange-500/10 border-orange-500/30";
      case "DELETE":
        return "text-red-400 bg-red-500/10 border-red-500/30";
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
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-sky-600 bg-clip-text text-transparent">
                API Reference
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Complete reference for the Satoru REST API. Build powerful integrations with our platform.
            </p>
          </div>

          {/* API Info */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Getting Started</h2>
              <p className="text-gray-400 mb-6">
                Base URL: <code className="px-2 py-1 bg-cyan-500/10 text-cyan-400 rounded">https://api.satoru.com/v1</code>
              </p>
              <p className="text-gray-400">
                All API requests require authentication using an API key. Include your API key in the Authorization header.
              </p>
            </div>
          </div>

          {/* Endpoints */}
          <div className="max-w-4xl mx-auto space-y-6">
            {endpoints.map((endpoint) => (
              <div
                key={endpoint.path}
                className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 hover:border-cyan-500/40 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-lg border font-mono text-sm font-semibold ${getMethodColor(endpoint.method)}`}>
                      {endpoint.method}
                    </span>
                    <code className="text-cyan-400 font-mono">{endpoint.path}</code>
                  </div>
                </div>
                
                <p className="text-gray-400 mb-4">{endpoint.description}</p>
                
                <div className="relative">
                  <pre className="bg-black/60 border border-cyan-500/20 rounded-lg p-4 overflow-x-auto">
                    <code className="text-gray-300 text-sm font-mono">{endpoint.code}</code>
                  </pre>
                  <button
                    onClick={() => copyToClipboard(endpoint.code, endpoint.path)}
                    className="absolute top-2 right-2 p-2 bg-cyan-500/10 hover:bg-cyan-500/20 rounded-lg transition-colors"
                  >
                    {copiedEndpoint === endpoint.path ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-cyan-400" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}