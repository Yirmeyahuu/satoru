import { Zap, FileText, Brain, Clock, Download, Search } from "lucide-react";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function Features() {
  const container = useRef(null);

  useGSAP(() => {
    // Animate header
    gsap.fromTo(".features-header", 
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".features-header",
          start: "top 80%",
          toggleActions: "play none none none",
        }
      }
    );

    // Animate feature cards
    gsap.fromTo(".feature-card", 
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".features-grid",
          start: "top 75%",
          toggleActions: "play none none none",
        }
      }
    );

    // Animate bottom CTA
    gsap.fromTo(".features-cta", 
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".features-cta",
          start: "top 85%",
          toggleActions: "play none none none",
        }
      }
    );
  }, { scope: container });

  const features = [
    {
      icon: FileText,
      title: "Multi-Format Support",
      description: "Upload PDFs, Word documents, text files, and more. Satoru intelligently processes any document format you throw at it.",
      gradient: "from-cyan-400 to-blue-500",
      borderColor: "border-cyan-500/20",
      hoverBorder: "hover:border-cyan-500/40",
      hoverShadow: "hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]",
    },
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced natural language processing extracts key insights, themes, and important information automatically.",
      gradient: "from-purple-400 to-pink-500",
      borderColor: "border-purple-500/20",
      hoverBorder: "hover:border-purple-500/40",
      hoverShadow: "hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]",
    },
    {
      icon: Zap,
      title: "Instant Summaries",
      description: "Get comprehensive summaries in seconds. Skip the lengthy reading and get straight to the key points that matter.",
      gradient: "from-yellow-400 to-orange-500",
      borderColor: "border-yellow-500/20",
      hoverBorder: "hover:border-yellow-500/40",
      hoverShadow: "hover:shadow-[0_0_30px_rgba(234,179,8,0.2)]",
    },
    {
      icon: Search,
      title: "Smart Keyword Extraction",
      description: "Automatically identifies and highlights the most important terms, concepts, and entities in your documents.",
      gradient: "from-green-400 to-emerald-500",
      borderColor: "border-green-500/20",
      hoverBorder: "hover:border-green-500/40",
      hoverShadow: "hover:shadow-[0_0_30px_rgba(34,197,94,0.2)]",
    },
    {
      icon: Clock,
      title: "Save Hours of Time",
      description: "Reduce reading time by up to 80%. Focus on what matters while Satoru handles the heavy lifting.",
      gradient: "from-blue-400 to-cyan-500",
      borderColor: "border-blue-500/20",
      hoverBorder: "hover:border-blue-500/40",
      hoverShadow: "hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]",
    },
    {
      icon: Download,
      title: "Export & Share",
      description: "Download your summaries in multiple formats or share them directly with your team for collaboration.",
      gradient: "from-indigo-400 to-purple-500",
      borderColor: "border-indigo-500/20",
      hoverBorder: "hover:border-indigo-500/40",
      hoverShadow: "hover:shadow-[0_0_30px_rgba(99,102,241,0.2)]",
    },
  ];

  return (
    <section ref={container} id="features" className="relative py-24 overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 grid-bg opacity-20"></div>
      
      {/* Gradient Accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="features-header max-w-3xl mx-auto text-center mb-20">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm mb-6">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-300">Key Features</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="block text-gray-100 mb-2">
              Everything You Need to
            </span>
            <span className="block bg-gradient-to-r from-cyan-400 via-sky-500 to-sky-500 bg-clip-text text-transparent">
              Master Your Documents
            </span>
          </h2>
          
          <p className="text-gray-400 text-lg">
            Powerful AI-driven features designed to transform how you interact with documents and extract valuable insights.
          </p>
        </div>

        {/* Features Grid */}
        <div className="features-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`feature-card group relative p-8 rounded-xl border ${feature.borderColor} ${feature.hoverBorder} bg-black/50 backdrop-blur-sm transition-all duration-300 ${feature.hoverShadow}`}
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.gradient} bg-opacity-10 border ${feature.borderColor} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-7 h-7 text-cyan-400`} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-4 text-gray-100">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Gradient Background */}
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 -z-10`}></div>
              </div>
            );
          })}
        </div>

        {/* Bottom Statement */}
        <div className="features-cta max-w-4xl mx-auto text-center">
          <p className="text-gray-400 text-lg mb-6">
            Join thousands of users who are already saving time and extracting better insights from their documents.
          </p>
          <button className="px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-sky-600 text-white hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] transition-all duration-300">
            Get Started Free
          </button>
        </div>
      </div>
    </section>
  );
}