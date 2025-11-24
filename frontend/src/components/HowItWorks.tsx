import { UserPlus, Settings, Rocket, BarChart } from "lucide-react";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function HowItWorks() {
  const container = useRef(null);

  useGSAP(() => {
    // Animate header
    gsap.from(".hiw-header", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".hiw-header",
        start: "top 85%",
      }
    });

    // Animate each step
    gsap.from(".hiw-step", {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".hiw-steps",
        start: "top 75%",
      }
    });

    // Animate connector lines
    gsap.from(".hiw-connector", {
      scaleY: 0,
      stagger: 0.2,
      duration: 0.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".hiw-steps",
        start: "top 75%",
      }
    });

    // Animate bottom CTA
    gsap.from(".hiw-cta", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".hiw-cta",
        start: "top 90%",
      }
    });
  }, { scope: container });

  const steps = [
    {
      number: "01",
      icon: UserPlus,
      title: "Sign Up & Onboard",
      description: "Create your account in seconds. Our intelligent onboarding process adapts to your needs and gets you started instantly.",
    },
    {
      number: "02",
      icon: Settings,
      title: "Configure & Customize",
      description: "Tailor the platform to your workflow. Set up integrations, customize dashboards, and configure your preferences with ease.",
    },
    {
      number: "03",
      icon: Rocket,
      title: "Launch & Execute",
      description: "Deploy your solutions and watch them work. Our automation engine handles the heavy lifting while you focus on strategy.",
    },
    {
      number: "04",
      icon: BarChart,
      title: "Monitor & Optimize",
      description: "Track performance with real-time analytics. Gain insights and continuously improve your operations with data-driven decisions.",
    },
  ];

  return (
    <section ref={container} id="how-it-works" className="relative py-24 overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 grid-bg opacity-20"></div>
      
      {/* Central Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="hiw-header max-w-3xl mx-auto text-center mb-20">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-sm mb-6">
            <Settings className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300">The Process</span>
          </div>
          
          <h2 className="mb-6">
            <span className="block text-gray-100 mb-2">
              Simple Steps to
            </span>
            <span className="block bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Extraordinary Results
            </span>
          </h2>
          
          <p className="text-gray-400">
            Get up and running in minutes with our streamlined process designed for efficiency and ease of use.
          </p>
        </div>

        {/* Steps */}
        <div className="hiw-steps max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;
            
            return (
              <div key={index} className="hiw-step relative mb-16 last:mb-0">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hiw-connector hidden lg:block absolute left-1/2 top-32 w-0.5 h-16 bg-gradient-to-b from-cyan-500/50 to-purple-500/50 -translate-x-1/2 origin-top"></div>
                )}

                <div className={`flex flex-col lg:flex-row items-center gap-8 ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                  {/* Content */}
                  <div className={`flex-1 ${isEven ? 'lg:text-right' : 'lg:text-left'} text-center lg:text-inherit`}>
                    <div className="inline-block mb-4">
                      <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent opacity-40">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="mb-4 text-gray-100">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Icon Circle */}
                  <div className="relative flex-shrink-0">
                    <div className="w-32 h-32 rounded-full border-2 border-cyan-500/30 bg-black/50 backdrop-blur-sm flex items-center justify-center group hover:border-cyan-500/60 transition-all duration-300 hover:shadow-[0_0_40px_rgba(34,211,238,0.3)]">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/10 to-purple-500/10 group-hover:from-cyan-500/20 group-hover:to-purple-500/20 transition-all duration-300"></div>
                      <Icon className="w-12 h-12 text-cyan-400 relative z-10" />
                    </div>
                    
                    {/* Pulsing Ring */}
                    <div className="absolute inset-0 rounded-full border border-cyan-500/20 animate-ping-slow"></div>
                  </div>

                  {/* Spacer for alignment */}
                  <div className="flex-1 hidden lg:block"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="hiw-cta max-w-3xl mx-auto text-center mt-20">
          <div className="p-8 rounded-xl border border-cyan-500/20 bg-gradient-to-r from-cyan-950/30 to-purple-950/30 backdrop-blur-sm">
            <h3 className="mb-4 text-gray-100">
              Ready to Get Started?
            </h3>
            <p className="text-gray-400 mb-6">
              Join thousands of users who have transformed their workflows.
            </p>
            <button className="px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] transition-all duration-300">
              Start Free Trial
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}