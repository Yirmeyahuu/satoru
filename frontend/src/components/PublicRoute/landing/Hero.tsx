import { ArrowRight, Sparkles } from "lucide-react";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useNavigate } from "react-router-dom";

export function Hero() {
  const container = useRef(null);
  const navigate = useNavigate(); 

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.8 } });

    tl.from(".hero-badge", {
      opacity: 0,
      scale: 0.8,
      delay: 0.3
    })
    .from(".hero-title", {
      opacity: 0,
      y: 30,
    }, "-=0.4")
    .from(".hero-subtitle", {
      opacity: 0,
      y: 20,
    }, "-=0.5")
    .from(".hero-cta", {
      opacity: 0,
      y: 20,
    }, "-=0.4")
    .from(".hero-stat", {
      opacity: 0,
      y: 20,
      stagger: 0.15
    }, "-=0.3");

  }, { scope: container });

  return (
    <section ref={container} id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 grid-bg opacity-30"></div>
      
      {/* Gradient Particles */}
      <div className="absolute inset-0">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
      </div>

      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent"></div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl">
          {/* Badge */}
          <div className="hero-badge inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm mb-8 cursor-default">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-300">COS Devs</span>
          </div>

          {/* Headline */}
          <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-semibold mb-8 max-w-4xl cursor-default">
            Distilling complexity into pure clarity
          </h1>

          {/* Subheadline */}
          <p className="hero-subtitle text-gray-400 text-lg md:text-lg lg:text-lg max-w-2xl mb-10 leading-relaxed cursor-default">
            A web application designed to intelligently summarize and extract key information from uploaded documents, providing users with quick, distilled insights.
          </p>

          {/* CTA Buttons */}
          <div className="hero-cta flex flex-col sm:flex-row gap-4 mb-16">
            <button
              onClick={() => navigate("/signin")}
              className="group px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-sky-600 text-white hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] transition-all duration-300 flex items-center space-x-2 cursor-pointer"
            >
              <span>Upload Your First Document</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#how-it-works"
              className="px-8 py-4 rounded-lg border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm cursor-pointer flex items-center justify-center"
            >
              See How It Works
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  );
}