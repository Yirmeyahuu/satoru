import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FileText, Clock, CheckCircle, AlertCircle, Loader2, Trash2 } from "lucide-react";
import { documentService } from "../../firebase/documentService";
import type { Document } from "../../firebase/documentService";
import { useAuth } from "../../contexts/AuthContext";

export function RecentUploads() {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    // Subscribe to real-time updates
    const unsubscribe = documentService.subscribeToUserDocuments((docs) => {
      setDocuments(docs);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [user]);

  const handleDelete = async (docId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!confirm("Are you sure you want to delete this document?")) {
      return;
    }

    try {
      setDeletingId(docId);
      await documentService.deleteDocument(docId);
      // Real-time listener will auto-update the list
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete document");
    } finally {
      setDeletingId(null);
    }
  };

  const getStatusIcon = (status: Document['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'processing':
        return <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
    }
  };

  const getStatusText = (status: Document['status']) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'processing':
        return 'Processing...';
      case 'failed':
        return 'Failed';
    }
  };

  const getStatusColor = (status: Document['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-400 bg-green-500/10 border-green-500/20';
      case 'processing':
        return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20';
      case 'failed':
        return 'text-red-400 bg-red-500/10 border-red-500/20';
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  if (loading) {
    return (
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">Recent Uploads</h2>
        </div>
        <div className="flex items-center justify-center h-48 sm:h-64">
          <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">Recent Uploads</h2>
        {documents.length > 0 && (
          <Link
            to="/documents"
            className="text-cyan-400 hover:text-cyan-300 text-xs sm:text-sm font-medium transition-colors"
          >
            View All →
          </Link>
        )}
      </div>

      {documents.length === 0 ? (
        <div className="text-center py-8 sm:py-12 lg:py-16">
          <FileText className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-gray-600 mx-auto mb-3 sm:mb-4" />
          <h3 className="text-base sm:text-lg font-semibold text-gray-400 mb-2">No documents yet</h3>
          <p className="text-xs sm:text-sm text-gray-500">
            Upload your first document to get started with AI-powered learning
          </p>
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {documents.slice(0, 5).map((doc) => (
            <Link
              key={doc.id}
              to={`/documents/${doc.id}`}
              className="block group relative"
            >
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:bg-gray-800 hover:border-cyan-500/30 transition-all">
                <div className="flex items-start justify-between gap-3 sm:gap-4">
                  <div className="flex-1 min-w-0">
                    {/* Title and Icon */}
                    <div className="flex items-start gap-2 sm:gap-3 mb-2">
                      <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm sm:text-base text-white truncate group-hover:text-cyan-400 transition-colors">
                          {doc.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-1 text-xs sm:text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                            {formatDate(doc.created_at)}
                          </span>
                          <span>•</span>
                          <span>{doc.pages} pages</span>
                          <span>•</span>
                          <span>{formatFileSize(doc.file_size)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className={`inline-flex items-center gap-1.5 px-2 sm:px-3 py-1 rounded-full border text-xs sm:text-sm font-medium ${getStatusColor(doc.status)}`}>
                      {getStatusIcon(doc.status)}
                      <span>{getStatusText(doc.status)}</span>
                    </div>
                  </div>

                  {/* Delete Button */}
                  {doc.status !== 'processing' && (
                    <button
                      onClick={(e) => handleDelete(doc.id, e)}
                      disabled={deletingId === doc.id}
                      className="flex-shrink-0 p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                      title="Delete document"
                    >
                      {deletingId === doc.id ? (
                        <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}