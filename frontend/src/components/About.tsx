import { Rocket, Users, Zap, Shield } from "lucide-react";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const container = useRef(null);

  useGSAP(() => {
    // Animate left column content
    gsap.from(".about-content", {
      opacity: 0,
      x: -50,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".about-content",
        start: "top 80%",
      }
    });

    // Animate stats
    gsap.from(".about-stat", {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".about-stats",
        start: "top 85%",
      }
    });

    // Animate value cards
    gsap.from(".value-card", {
      opacity: 0,
      scale: 0.9,
      stagger: 0.1,
      duration: 0.6,
      ease: "back.out(1.2)",
      scrollTrigger: {
        trigger: ".values-grid",
        start: "top 80%",
      }
    });
  }, { scope: container });

  const values = [
    {
      icon: Rocket,
      title: "Innovation First",
      description: "We push boundaries and explore new frontiers in technology.",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Built with and for a global community of forward-thinkers.",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Speed and performance are at the core of everything we do.",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security protecting your valuable data.",
    },
  ];

  return (
    <section ref={container} id="about" className="relative py-24 overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 grid-bg opacity-20"></div>
      
      {/* Gradient Accents */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Left Column - Content */}
          <div className="about-content">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm mb-6">
              <Rocket className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-300">About Us</span>
            </div>

            <h2 className="mb-6">
              <span className="block text-gray-100 mb-2">
                Pioneering the Future of
              </span>
              <span className="block bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                Digital Innovation
              </span>
            </h2>

            <p className="text-gray-400 mb-6 leading-relaxed">
              We're on a mission to revolutionize the way businesses operate in the digital age. Born from a vision to eliminate inefficiencies and unlock potential, our platform combines cutting-edge technology with intuitive design.
            </p>

            <p className="text-gray-400 mb-8 leading-relaxed">
              With a team of passionate innovators and a community of ambitious users, we're building the tools that power tomorrow's success stories today.
            </p>

            <div className="about-stats flex flex-wrap gap-4">
              <div className="about-stat px-6 py-3 rounded-lg border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-sm">
                <div className="text-cyan-400 mb-1">Founded</div>
                <div className="text-gray-300">2024</div>
              </div>
              <div className="about-stat px-6 py-3 rounded-lg border border-purple-500/30 bg-purple-500/5 backdrop-blur-sm">
                <div className="text-purple-400 mb-1">Team Size</div>
                <div className="text-gray-300">50+ Members</div>
              </div>
              <div className="about-stat px-6 py-3 rounded-lg border border-pink-500/30 bg-pink-500/5 backdrop-blur-sm">
                <div className="text-pink-400 mb-1">Global Reach</div>
                <div className="text-gray-300">40+ Countries</div>
              </div>
            </div>
          </div>

          {/* Right Column - Values Grid */}
          <div className="values-grid grid grid-cols-2 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="value-card group p-6 rounded-xl border border-cyan-500/20 bg-black/50 backdrop-blur-sm hover:border-cyan-500/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                >
                  <div className="mb-4">
                    <div className="inline-flex p-3 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all duration-300">
                      <Icon className="w-5 h-5 text-cyan-400" />
                    </div>
                  </div>
                  <h4 className="text-gray-100 mb-2">{value.title}</h4>
                  <p className="text-gray-500">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}