import { useState, useEffect } from "react";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { useAuth } from "../contexts/AuthContext";
import { User, Mail, Lock, Camera, Save, Loader } from "lucide-react";
import { authService } from "../firebase/authService";

export function Profile() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [profileImage, setProfileImage] = useState(
    user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || user?.email || "User")}&background=0891b2&color=fff&size=128`
  );
  const [tempImagePreview, setTempImagePreview] = useState<string | null>(null);
  const [tempImageData, setTempImageData] = useState<string | null>(null);

  // Update local state when user data changes
  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || "");
      setProfileImage(
        user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || user?.email || "User")}&background=0891b2&color=fff&size=128`
      );
    }
  }, [user]);

  // Compress image to fit Firestore limits
  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // Maximum dimensions
          const maxSize = 800;
          
          // Calculate new dimensions while maintaining aspect ratio
          if (width > height) {
            if (width > maxSize) {
              height = (height * maxSize) / width;
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width = (width * maxSize) / height;
              height = maxSize;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Failed to get canvas context'));
            return;
          }
          
          ctx.drawImage(img, 0, 0, width, height);
          
          // Compress to JPEG with quality 0.7 (adjust for size vs quality)
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
          
          // Check if still too large (Firestore limit ~1MB for base64)
          if (compressedBase64.length > 900000) {
            // Try again with lower quality
            const lowerQuality = canvas.toDataURL('image/jpeg', 0.5);
            resolve(lowerQuality);
          } else {
            resolve(compressedBase64);
          }
        };
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
  
    try {
      // Updates both displayName in Firebase Auth AND Firestore
      await authService.updateUserProfile({ 
        displayName,
        photoURL: tempImageData || profileImage 
      });
      
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      
      // Reloads page to refresh AuthContext with new data
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to update profile' });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!user?.email) {
      setMessage({ type: 'error', text: 'No email address found' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      await authService.sendPasswordResetEmail(user.email);
      setMessage({ 
        type: 'success', 
        text: 'Password reset email sent! Check your inbox.' 
      });
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to send reset email' });
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 10MB for initial upload)
      if (file.size > 10 * 1024 * 1024) {
        setMessage({ 
          type: 'error', 
          text: 'Image size must be less than 10MB' 
        });
        return;
      }

      // Validate file type - only JPG, JPEG, PNG allowed
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type.toLowerCase())) {
        setMessage({ 
          type: 'error', 
          text: 'Invalid file format. Only JPG, JPEG, and PNG files are allowed.' 
        });
        return;
      }

      // Additional validation: check file extension
      const fileName = file.name.toLowerCase();
      const validExtensions = ['.jpg', '.jpeg', '.png'];
      const hasValidExtension = validExtensions.some(ext => fileName.endsWith(ext));
      
      if (!hasValidExtension) {
        setMessage({ 
          type: 'error', 
          text: 'Invalid file extension. Only .jpg, .jpeg, and .png files are allowed.' 
        });
        return;
      }

      try {
        setLoading(true);
        // Compress image for storage
        const compressedImage = await compressImage(file);
        
        setTempImagePreview(compressedImage);
        setTempImageData(compressedImage);
        setMessage({ 
          type: 'success', 
          text: 'Image selected and compressed. Click "Save Changes" to update your profile.' 
        });
      } catch (error) {
        setMessage({ 
          type: 'error', 
          text: 'Failed to process image. Please try a different file.' 
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const cancelImageChange = () => {
    setTempImagePreview(null);
    setTempImageData(null);
    setMessage(null);
  };

  const displayImage = tempImagePreview || profileImage;

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            <span className="bg-gradient-to-r from-cyan-400 to-sky-600 bg-clip-text text-transparent">
              Profile Settings
            </span>
          </h1>
          <p className="text-gray-400">
            Manage your account information and preferences
          </p>
        </div>

        {message && (
          <div className={`p-4 rounded-xl border ${
            message.type === 'success' 
              ? 'bg-green-500/10 border-green-500/30 text-green-400' 
              : 'bg-red-500/10 border-red-500/30 text-red-400'
          }`}>
            {message.text}
          </div>
        )}

        <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <Camera className="w-5 h-5 text-cyan-400" />
            Profile Picture
          </h2>
          
          <div className="flex items-center gap-6">
            <div className="relative group">
              <img
                src={displayImage}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-cyan-500/30"
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || user?.email || "User")}&background=0891b2&color=fff&size=128`;
                }}
              />
              {tempImagePreview && (
                <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1">
                  <Save className="w-4 h-4 text-white" />
                </div>
              )}
              <label 
                htmlFor="profile-upload"
                className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <Camera className="w-8 h-8 text-white" />
              </label>
              <input
                id="profile-upload"
                type="file"
                accept="image/jpeg,image/jpg,image/png"
                onChange={handleImageChange}
                className="hidden"
                disabled={loading}
              />
            </div>
            
            <div className="flex-1">
              <h3 className="text-white font-medium mb-1">{user?.displayName || 'User'}</h3>
              <p className="text-gray-400 text-sm mb-3">{user?.email}</p>
              
              <div className="flex gap-2">
                <label 
                  htmlFor="profile-upload"
                  className={`inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-lg hover:bg-cyan-500/20 transition-colors cursor-pointer text-sm ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <Camera className="w-4 h-4" />
                  Change Picture
                </label>
                
                {tempImagePreview && (
                  <button
                    type="button"
                    onClick={cancelImageChange}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors text-sm"
                  >
                    Cancel
                  </button>
                )}
              </div>
              
              <p className="text-gray-500 text-xs mt-2">
                Max size: 10MB. Image will be compressed for storage. Formats: JPG, JPEG, PNG only
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleUpdateProfile} className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <User className="w-5 h-5 text-cyan-400" />
            Profile Information
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Display Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black/40 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="Enter your name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full pl-10 pr-4 py-3 bg-black/20 border border-gray-700 rounded-lg text-gray-400 cursor-not-allowed"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Email cannot be changed
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-sky-600 text-white rounded-lg hover:from-cyan-600 hover:to-sky-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>

        <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6">
          <h2 className="text-xl font-semibend text-white mb-6 flex items-center gap-2">
            <Lock className="w-5 h-5 text-cyan-400" />
            Security
          </h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-white font-medium mb-2">Reset Password</h3>
              <p className="text-gray-400 text-sm mb-4">
                We'll send you an email with instructions to reset your password.
              </p>
              <button
                type="button"
                onClick={handleResetPassword}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-3 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-lg hover:bg-amber-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    Send Reset Email
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}