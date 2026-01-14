import { Calendar, User, ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "Getting Started with Satoru: A Complete Guide",
      excerpt: "Learn how to set up your account and get the most out of Satoru's powerful features in just 10 minutes.",
      author: "John Doe",
      date: "January 10, 2025",
      readTime: "5 min read",
      category: "Tutorial",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop"
    },
    {
      id: 2,
      title: "10 Productivity Tips for Remote Teams",
      excerpt: "Discover proven strategies to boost your team's productivity while working from anywhere in the world.",
      author: "Jane Smith",
      date: "January 8, 2025",
      readTime: "8 min read",
      category: "Productivity",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop"
    },
    {
      id: 3,
      title: "The Future of Digital Collaboration",
      excerpt: "Explore how AI and automation are reshaping the way teams work together in 2025 and beyond.",
      author: "Mike Johnson",
      date: "January 5, 2025",
      readTime: "6 min read",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop"
    },
    {
      id: 4,
      title: "Security Best Practices for SaaS Applications",
      excerpt: "Essential security measures every business should implement to protect their data and users.",
      author: "Sarah Williams",
      date: "January 3, 2025",
      readTime: "7 min read",
      category: "Security",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop"
    },
    {
      id: 5,
      title: "Building Scalable Applications: Lessons Learned",
      excerpt: "Key insights from our journey of scaling Satoru to serve thousands of users worldwide.",
      author: "John Doe",
      date: "December 28, 2024",
      readTime: "10 min read",
      category: "Engineering",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop"
    },
    {
      id: 6,
      title: "Customer Success Stories: How Teams Use Satoru",
      excerpt: "Real-world examples of how businesses are transforming their workflows with Satoru.",
      author: "Jane Smith",
      date: "December 25, 2024",
      readTime: "6 min read",
      category: "Case Study",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop"
    }
  ];

  const categories = ["All", "Tutorial", "Productivity", "Technology", "Security", "Engineering", "Case Study"];

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
      <section className="pt-32 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-sky-600 bg-clip-text text-transparent">
                Satoru Blog
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Insights, tutorials, and updates from the Satoru team
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-lg border border-cyan-500/20 bg-black/40 backdrop-blur-xl text-gray-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="group bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl overflow-hidden hover:border-cyan-500/40 transition-all"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-cyan-500/20 backdrop-blur-xl border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-semibold">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{post.date}</span>
                    </div>
                    <button className="flex items-center space-x-1 text-cyan-400 hover:text-cyan-300 transition-colors">
                      <span className="text-sm font-semibold">Read More</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-sky-600 text-white rounded-lg hover:from-cyan-600 hover:to-sky-700 transition-all font-semibold">
              Load More Articles
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}