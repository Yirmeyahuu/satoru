import { Zap, Lock, Layers, Globe, Code, TrendingUp } from "lucide-react";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function Features() {
  const container = useRef(null);

  useGSAP(() => {
    // Animate header
    gsap.from(".features-header", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".features-header",
        start: "top 85%",
      }
    });

    // Animate feature cards
    gsap.from(".feature-card", {
      opacity: 0,
      y: 50,
      stagger: 0.15,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".features-grid",
        start: "top 80%",
      }
    });

    // Animate bottom CTA
    gsap.from(".features-cta", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".features-cta",
        start: "top 90%",
      }
    });
  }, { scope: container });

  const features = [
    {
      icon: Zap,
      title: "Lightning Performance",
      description: "Blazing-fast speeds with optimized infrastructure. Experience sub-second response times that keep your operations running smoothly.",
      gradient: "from-yellow-400 to-orange-500",
      borderColor: "border-yellow-500/20",
      hoverBorder: "hover:border-yellow-500/40",
      hoverShadow: "hover:shadow-[0_0_30px_rgba(234,179,8,0.2)]",
    },
    {
      icon: Lock,
      title: "Military-Grade Security",
      description: "Enterprise-level encryption and security protocols. Your data is protected with the same standards used by government agencies.",
      gradient: "from-green-400 to-emerald-500",
      borderColor: "border-green-500/20",
      hoverBorder: "hover:border-green-500/40",
      hoverShadow: "hover:shadow-[0_0_30px_rgba(34,197,94,0.2)]",
    },
    {
      icon: Layers,
      title: "Seamless Integration",
      description: "Connect with your existing tools effortlessly. Our API-first approach ensures compatibility with hundreds of platforms.",
      gradient: "from-blue-400 to-cyan-500",
      borderColor: "border-blue-500/20",
      hoverBorder: "hover:border-blue-500/40",
      hoverShadow: "hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]",
    },
    {
      icon: Globe,
      title: "Global Infrastructure",
      description: "Distributed servers across 6 continents. Deliver consistent performance to your users anywhere in the world.",
      gradient: "from-purple-400 to-pink-500",
      borderColor: "border-purple-500/20",
      hoverBorder: "hover:border-purple-500/40",
      hoverShadow: "hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]",
    },
    {
      icon: Code,
      title: "Developer Friendly",
      description: "Clean APIs and comprehensive documentation. Build custom solutions with our flexible and well-documented SDK.",
      gradient: "from-cyan-400 to-teal-500",
      borderColor: "border-cyan-500/20",
      hoverBorder: "hover:border-cyan-500/40",
      hoverShadow: "hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]",
    },
    {
      icon: TrendingUp,
      title: "Smart Analytics",
      description: "Real-time insights and predictive analytics. Make data-driven decisions with powerful visualization and reporting tools.",
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
            <span className="text-cyan-300">The Solution</span>
          </div>
          
          <h2 className="mb-6">
            <span className="block text-gray-100 mb-2">
              Powerful Features for
            </span>
            <span className="block bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Limitless Possibilities
            </span>
          </h2>
          
          <p className="text-gray-400">
            Every feature is designed to solve real problems and deliver measurable results. Experience the perfect blend of power and simplicity.
          </p>
        </div>

        {/* Features Grid */}
        <div className="features-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
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
                    <Icon className={`w-7 h-7 bg-gradient-to-br ${feature.gradient} bg-clip-text text-transparent`} style={{
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="mb-4 text-gray-100">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Gradient Background */}
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 -z-10`}></div>

                {/* Corner Accent */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${feature.gradient} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-300 rounded-full`}></div>
              </div>
            );
          })}
        </div>

        {/* Bottom Statement */}
        <div className="features-cta max-w-4xl mx-auto text-center mt-20">
          <p className="text-gray-400 mb-6">
            And this is just the beginning. We're constantly innovating and adding new capabilities to help you stay ahead.
          </p>
          <button className="px-8 py-4 rounded-lg border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm">
            Explore All Features
          </button>
        </div>
      </div>
    </section>
  );
}