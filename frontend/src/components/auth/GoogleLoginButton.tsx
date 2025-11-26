import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { authService } from "../../api/authService";

export function GoogleLoginButton() {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      setError("No credential received from Google");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await authService.googleAuth(credentialResponse.credential);
      
      console.log("Google sign in successful!", response);
      
      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Google sign in error:", err);
      setError(err.response?.data?.error || "Failed to sign in with Google");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError("Google sign in failed. Please try again.");
    console.error("Google sign in failed");
  };

  return (
    <div>
      <div className="flex justify-center">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          theme="filled_black"
          size="large"
          width="100%"
          text="continue_with"
          shape="rectangular"
          logo_alignment="left"
        />
      </div>
      
      {error && (
        <div className="mt-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm text-center">
          {error}
        </div>
      )}
      
      {loading && (
        <div className="mt-3 text-center text-cyan-400 text-sm">
          Signing in...
        </div>
      )}
    </div>
  );
}