import { DashboardLayout } from "../layouts/DashboardLayout";
import { UploadButton } from "../components/dashboard/UploadButton";
import { RecentUploads } from "../components/dashboard/RecentUploads";
import { Sparkles, Upload as UploadIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { authService } from "../api/authService";
import { documentService } from "../api/documentService";
import { websocketService } from "../api/websocketService";
import type { User } from "../api/types";

export function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await authService.getUserProfile();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // WebSocket connection
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      websocketService.connect(user.id);
      
      // Subscribe to document updates
      const unsubscribe = websocketService.onDocumentUpdate((updatedDoc) => {
        console.log('Dashboard received document update:', updatedDoc);
        // Trigger refresh by changing key
        setRefreshKey(prev => prev + 1);
      });
      
      // Cleanup on unmount
      return () => {
        unsubscribe();
      };
    }
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const userName = user?.first_name || user?.email?.split("@")[0] || "there";

  const handleFileUpload = async (file: File) => {
    try {
      setUploading(true);
      setUploadSuccess(false);
      
      console.log("Uploading file:", file.name);
      await documentService.uploadDocument(file);
      
      console.log("Upload successful!");
      setUploadSuccess(true);
      
      // Trigger refresh after upload
      setTimeout(() => {
        setRefreshKey(prev => prev + 1);
      }, 500);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setUploadSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload document. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section with Animation */}
        <div className="relative overflow-hidden bg-gradient-to-r from-cyan-500/10 to-sky-600/10 border border-cyan-500/20 rounded-2xl p-8">
          <div className="relative z-10">
            <div className="flex items-center space-x-2 mb-2">
              <Sparkles className="w-6 h-6 text-cyan-400 animate-pulse" />
              <h1 className="text-3xl font-bold">
                <span className="bg-gradient-to-r from-cyan-400 to-sky-600 bg-clip-text text-transparent">
                  {getGreeting()}, {userName}!
                </span>
              </h1>
            </div>
            <p className="text-gray-400">
              Transform your documents into powerful learning materials with AI
            </p>
          </div>
          
          {/* Animated background effect */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-600/5 rounded-full blur-3xl"></div>
        </div>

        {/* Upload Section */}
        <div className="relative">
          <UploadButton onFileSelect={handleFileUpload} />
          
          {/* Upload Overlay */}
          {uploading && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
              <div className="text-center">
                <UploadIcon className="w-12 h-12 text-cyan-400 animate-bounce mx-auto mb-4" />
                <p className="text-cyan-400 font-medium">Uploading and processing...</p>
                <p className="text-gray-400 text-sm mt-2">This may take a few moments</p>
              </div>
            </div>
          )}
          
          {/* Success Message */}
          {uploadSuccess && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-green-400 font-medium">Document uploaded successfully!</p>
                <p className="text-gray-400 text-sm mt-2">Processing your document...</p>
              </div>
            </div>
          )}
        </div>

        {/* Recent Uploads */}
        <RecentUploads key={refreshKey} />
      </div>
    </DashboardLayout>
  );
}