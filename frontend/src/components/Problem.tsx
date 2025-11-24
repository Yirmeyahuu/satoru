import { AlertCircle, TrendingDown, Clock, DollarSign } from "lucide-react";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function Problem() {
  const container = useRef(null);

  useGSAP(() => {
    // Animate header
    gsap.from(".problem-header", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".problem-header",
        start: "top 85%",
      }
    });

    // Animate problem cards
    gsap.from(".problem-card", {
      opacity: 0,
      y: 50,
      stagger: 0.15,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".problem-grid",
        start: "top 80%",
      }
    });

    // Animate bottom statement
    gsap.from(".problem-cta", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".problem-cta",
        start: "top 90%",
      }
    });
  }, { scope: container });

  const problems = [
    {
      icon: TrendingDown,
      title: "Inefficient Workflows",
      description: "Traditional methods are costing you valuable time and resources, creating bottlenecks that slow down your entire operation.",
    },
    {
      icon: Clock,
      title: "Time-Consuming Processes",
      description: "Manual tasks eat away at your productivity, leaving your team overwhelmed and unable to focus on what truly matters.",
    },
    {
      icon: DollarSign,
      title: "Rising Operational Costs",
      description: "Legacy systems drain your budget while failing to deliver the performance and scalability your business demands.",
    },
  ];

  return (
    <section ref={container} id="problem" className="relative py-24 overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 grid-bg opacity-20"></div>
      
      {/* Gradient Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="problem-header max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-red-500/30 bg-red-500/10 backdrop-blur-sm mb-6">
            <AlertCircle className="w-4 h-4 text-red-400" />
            <span className="text-red-300">The Challenge</span>
          </div>
          
          <h2 className="mb-6">
            <span className="block text-gray-100 mb-2">
              The Problems Holding
            </span>
            <span className="block bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
              Your Business Back
            </span>
          </h2>
          
          <p className="text-gray-400">
            In today's fast-paced digital landscape, outdated systems and inefficient processes are more than just inconveniences—they're roadblocks to growth and success.
          </p>
        </div>

        {/* Problem Cards */}
        <div className="problem-grid grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <div
                key={index}
                className="problem-card group relative p-8 rounded-xl border border-red-500/20 bg-black/50 backdrop-blur-sm hover:border-red-500/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.2)]"
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className="inline-flex p-3 rounded-lg bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all duration-300">
                    <Icon className="w-6 h-6 text-red-400" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="mb-3 text-gray-100 group-hover:text-red-300 transition-colors">
                  {problem.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {problem.description}
                </p>

                {/* Hover Gradient */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-red-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </div>
            );
          })}
        </div>

        {/* Bottom Statement */}
        <div className="problem-cta max-w-3xl mx-auto text-center mt-16">
          <div className="p-6 rounded-xl border border-red-500/20 bg-gradient-to-r from-red-950/30 to-orange-950/30 backdrop-blur-sm">
            <p className="text-gray-300">
              These challenges compound over time, creating friction at every level of your organization.{" "}
              <span className="text-red-400">But it doesn't have to be this way.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}