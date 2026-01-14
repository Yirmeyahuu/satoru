import { Briefcase, MapPin, Clock, Heart, Users, Zap, Coffee } from "lucide-react";
import { Link } from "react-router-dom";

export function Careers() {
  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health insurance and wellness programs"
    },
    {
      icon: Clock,
      title: "Flexible Hours",
      description: "Work when you're most productive with flexible scheduling"
    },
    {
      icon: Users,
      title: "Remote First",
      description: "Work from anywhere in the world"
    },
    {
      icon: Zap,
      title: "Growth Opportunities",
      description: "Continuous learning and career development programs"
    },
    {
      icon: Coffee,
      title: "Great Culture",
      description: "Fun, collaborative environment with amazing people"
    },
    {
      icon: Briefcase,
      title: "Competitive Salary",
      description: "Industry-leading compensation and equity packages"
    }
  ];

  const openings = [
    {
      title: "Senior Full Stack Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Build and scale our platform with cutting-edge technologies"
    },
    {
      title: "Product Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      description: "Create beautiful, intuitive experiences for our users"
    },
    {
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Maintain and optimize our cloud infrastructure"
    },
    {
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Remote",
      type: "Full-time",
      description: "Help our customers achieve their goals with Satoru"
    },
    {
      title: "Content Marketing Manager",
      department: "Marketing",
      location: "Remote",
      type: "Full-time",
      description: "Create compelling content that tells our story"
    },
    {
      title: "Sales Development Representative",
      department: "Sales",
      location: "Remote",
      type: "Full-time",
      description: "Connect with potential customers and grow our business"
    }
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
                Join Our Team
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Help us build the future of digital collaboration. We're looking for talented, 
              passionate people to join our growing team.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-12 text-white">Why Work With Us?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={benefit.title}
                    className="p-6 bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl hover:border-cyan-500/40 transition-all"
                  >
                    <Icon className="w-12 h-12 text-cyan-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                    <p className="text-gray-400">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Open Positions */}
          <div>
            <h2 className="text-4xl font-bold text-center mb-12 text-white">Open Positions</h2>
            <div className="max-w-4xl mx-auto space-y-4">
              {openings.map((job, index) => (
                <div
                  key={index}
                  className="p-6 bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl hover:border-cyan-500/40 transition-all group"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-gray-400 mb-4">{job.description}</p>
                      <div className="flex flex-wrap gap-3">
                        <div className="flex items-center space-x-2 text-cyan-400">
                          <Briefcase className="w-4 h-4" />
                          <span className="text-sm">{job.department}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-cyan-400">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{job.location}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-cyan-400">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{job.type}</span>
                        </div>
                      </div>
                    </div>
                    <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-sky-600 text-white rounded-lg hover:from-cyan-600 hover:to-sky-700 transition-all font-semibold whitespace-nowrap">
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-cyan-500/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Don't See a Perfect Fit?</h2>
            <p className="text-xl text-gray-400 mb-8">
              We're always looking for talented people. Send us your resume and let's talk!
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-sky-600 text-white rounded-lg hover:from-cyan-600 hover:to-sky-700 transition-all font-semibold">
              Send Us Your Resume
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}