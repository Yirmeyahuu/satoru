import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Chrome, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useToast } from "../../components/ToastProvider";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { showToast } = useToast();
  const { signInWithGoogle, signInWithEmail } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      setError("");
      setLoading(true);
      await signInWithGoogle();
      showToast("Signed in successfully!", "success");
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to sign in with Google");
      showToast("Failed to sign in with Google", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      showToast("Please fill in all fields", "error");
      return;
    }
    try {
      setError("");
      setLoading(true);
      await signInWithEmail(email, password);
      showToast("Signed in successfully!", "success");
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to sign in");
      showToast("Failed to sign in", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4 py-6 overflow-hidden">
      {/* Grid Background - Fixed to prevent scroll */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none" />

      {/* Gradient Particles - Fixed and contained to prevent scroll */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
      </div>

      <div className="relative z-10 w-full max-w-[400px] mx-auto">
        {/* Logo - Reduced spacing */}
        <div className="flex items-center justify-center space-x-2 mb-6">
          <img 
            src="/SaturoLogo.png" 
            alt="Satoru Logo" 
            className="h-8 w-8 object-contain"
          />
          <span className="text-white text-xl font-semibold">
            Satoru
          </span>
        </div>

        {/* Sign In Card - Reduced size and padding */}
        <div className="bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-sm border border-gray-800 rounded-xl p-5 sm:p-6 shadow-2xl">
          <h2 className="text-xl font-bold mb-4 text-center">Sign In</h2>

          {error && (
            <div className="mb-3 p-2.5 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-xs sm:text-sm">
              {error}
            </div>
          )}

          {/* Google Sign In - Reduced padding */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full bg-white text-black font-semibold py-2.5 px-4 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2 mb-4 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            <Chrome className="w-4 h-4" />
            <span>{loading ? "Signing in..." : "Continue with Google"}</span>
          </button>

          {/* Divider - Reduced spacing */}
          <div className="relative flex items-center my-4">
            <div className="flex-grow border-t border-gray-700"></div>
            <span className="flex-shrink mx-3 text-gray-500 text-xs">or</span>
            <div className="flex-grow border-t border-gray-700"></div>
          </div>

          {/* Email Sign In Form - Reduced spacing */}
          <form onSubmit={handleEmailSignIn} className="space-y-3">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2.5 pl-10 pr-10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  disabled={loading}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-sky-600 text-white font-semibold py-2.5 px-4 rounded-lg hover:from-cyan-600 hover:to-sky-700 transition-all shadow-lg shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed text-sm mt-4"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Sign Up Link - Reduced spacing */}
          <p className="text-center text-gray-400 text-xs sm:text-sm mt-4">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
            >
              Sign Up
            </Link>
          </p>
        </div>

        {/* Back to Home - Reduced spacing */}
        <div className="text-center mt-4">
          <Link
            to="/"
            className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}