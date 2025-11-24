import { Building2, ShoppingBag, GraduationCap, Briefcase, HeartPulse, Palette } from "lucide-react";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function UseCases() {
  const container = useRef(null);

  useGSAP(() => {
    // Animate header
    gsap.from(".usecases-header", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".usecases-header",
        start: "top 85%",
      }
    });

    // Animate use case cards
    gsap.from(".usecase-card", {
      opacity: 0,
      y: 50,
      stagger: 0.12,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".usecases-grid",
        start: "top 80%",
      }
    });

    // Animate bottom CTA
    gsap.from(".usecases-cta", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".usecases-cta",
        start: "top 90%",
      }
    });
  }, { scope: container });

  const useCases = [
    {
      icon: Building2,
      title: "Enterprise",
      description: "Scale your operations with enterprise-grade tools designed for large organizations.",
      stats: "500+ Companies",
      color: "cyan",
    },
    {
      icon: ShoppingBag,
      title: "E-Commerce",
      description: "Streamline your online store operations and deliver exceptional customer experiences.",
      stats: "10K+ Stores",
      color: "purple",
    },
    {
      icon: GraduationCap,
      title: "Education",
      description: "Empower learning institutions with tools that enhance teaching and student engagement.",
      stats: "200+ Schools",
      color: "blue",
    },
    {
      icon: Briefcase,
      title: "Startups",
      description: "Launch faster and iterate quicker with tools built for agile teams and rapid growth.",
      stats: "3K+ Startups",
      color: "green",
    },
    {
      icon: HeartPulse,
      title: "Healthcare",
      description: "Secure, compliant solutions that improve patient care and operational efficiency.",
      stats: "150+ Clinics",
      color: "red",
    },
    {
      icon: Palette,
      title: "Creative Agencies",
      description: "Manage projects and collaborate seamlessly with tools designed for creative workflows.",
      stats: "800+ Agencies",
      color: "pink",
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, any> = {
      cyan: {
        border: "border-cyan-500/20",
        hoverBorder: "hover:border-cyan-500/40",
        text: "text-cyan-400",
        gradient: "from-cyan-400 to-cyan-600",
        bg: "bg-cyan-500/10",
        hoverShadow: "hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]",
      },
      purple: {
        border: "border-purple-500/20",
        hoverBorder: "hover:border-purple-500/40",
        text: "text-purple-400",
        gradient: "from-purple-400 to-purple-600",
        bg: "bg-purple-500/10",
        hoverShadow: "hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]",
      },
      blue: {
        border: "border-blue-500/20",
        hoverBorder: "hover:border-blue-500/40",
        text: "text-blue-400",
        gradient: "from-blue-400 to-blue-600",
        bg: "bg-blue-500/10",
        hoverShadow: "hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]",
      },
      green: {
        border: "border-green-500/20",
        hoverBorder: "hover:border-green-500/40",
        text: "text-green-400",
        gradient: "from-green-400 to-green-600",
        bg: "bg-green-500/10",
        hoverShadow: "hover:shadow-[0_0_30px_rgba(34,197,94,0.2)]",
      },
      red: {
        border: "border-red-500/20",
        hoverBorder: "hover:border-red-500/40",
        text: "text-red-400",
        gradient: "from-red-400 to-red-600",
        bg: "bg-red-500/10",
        hoverShadow: "hover:shadow-[0_0_30px_rgba(239,68,68,0.2)]",
      },
      pink: {
        border: "border-pink-500/20",
        hoverBorder: "hover:border-pink-500/40",
        text: "text-pink-400",
        gradient: "from-pink-400 to-pink-600",
        bg: "bg-pink-500/10",
        hoverShadow: "hover:shadow-[0_0_30px_rgba(236,72,153,0.2)]",
      },
    };
    return colorMap[color] || colorMap.cyan;
  };

  return (
    <section ref={container} id="use-cases" className="relative py-24 overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 grid-bg opacity-20"></div>
      
      {/* Gradient Accents */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="usecases-header max-w-3xl mx-auto text-center mb-20">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-sm mb-6">
            <Briefcase className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300">The Audience</span>
          </div>
          
          <h2 className="mb-6">
            <span className="block text-gray-100 mb-2">
              Built for Every
            </span>
            <span className="block bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Industry & Team Size
            </span>
          </h2>
          
          <p className="text-gray-400">
            From startups to enterprises, our platform adapts to your unique needs and scales with your growth.
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="usecases-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            const colors = getColorClasses(useCase.color);
            
            return (
              <div
                key={index}
                className={`usecase-card group relative p-8 rounded-xl border ${colors.border} ${colors.hoverBorder} bg-black/50 backdrop-blur-sm transition-all duration-300 ${colors.hoverShadow}`}
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className={`inline-flex p-4 rounded-xl ${colors.bg} border ${colors.border} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-7 h-7 ${colors.text}`} />
                  </div>
                </div>

                {/* Content */}
                <h3 className={`mb-3 text-gray-100 group-hover:${colors.text} transition-colors`}>
                  {useCase.title}
                </h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                  {useCase.description}
                </p>

                {/* Stats Badge */}
                <div className={`inline-flex items-center px-4 py-2 rounded-full border ${colors.border} ${colors.bg} backdrop-blur-sm`}>
                  <span className={`${colors.text} text-sm`}>{useCase.stats}</span>
                </div>

                {/* Hover Effect */}
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 -z-10`}></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="usecases-cta max-w-4xl mx-auto text-center mt-20">
          <div className="p-8 rounded-xl border border-cyan-500/20 bg-gradient-to-r from-cyan-950/30 via-purple-950/30 to-pink-950/30 backdrop-blur-sm">
            <h3 className="mb-4 text-gray-100">
              Don't See Your Industry?
            </h3>
            <p className="text-gray-400 mb-6">
              Our flexible platform works for virtually any use case. Let's discuss how we can help you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] transition-all duration-300">
                Schedule a Demo
              </button>
              <button className="px-8 py-4 rounded-lg border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}