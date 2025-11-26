import { FileText, Calendar, Eye, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { documentService } from "../../api/documentService";
import type { DocumentListItem } from "../../api/types";

export const RecentUploads = forwardRef<{ refresh: () => Promise<void> }>((props, ref) => {
  const [documents, setDocuments] = useState<DocumentListItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRecentDocuments = async () => {
    try {
      setLoading(true);
      const docs = await documentService.getAllDocuments();
      // Get only the 3 most recent documents
      setDocuments(docs.slice(0, 3));
    } catch (error) {
      console.error("Failed to fetch documents:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentDocuments();
  }, []);

  // Expose refresh method to parent
  useImperativeHandle(ref, () => ({
    refresh: fetchRecentDocuments
  }));

  const getStatusColor = (status: DocumentListItem["status"]) => {
    switch (status) {
      case "completed":
        return "text-green-400";
      case "processing":
        return "text-yellow-400";
      case "failed":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const getStatusText = (status: DocumentListItem["status"]) => {
    switch (status) {
      case "completed":
        return "Ready";
      case "processing":
        return "Processing";
      case "failed":
        return "Failed";
      default:
        return "Unknown";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Today";
    if (diffDays === 2) return "Yesterday";
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 lg:p-8">
        <h2 className="text-xl lg:text-2xl font-semibold mb-6">Recent Uploads</h2>
        <div className="text-center py-12">
          <Loader className="w-12 h-12 lg:w-16 lg:h-16 text-cyan-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading documents...</p>
        </div>
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 lg:p-8">
        <h2 className="text-xl lg:text-2xl font-semibold mb-6">Recent Uploads</h2>
        <div className="text-center py-12">
          <FileText className="w-12 h-12 lg:w-16 lg:h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No documents uploaded yet</p>
          <p className="text-gray-500 text-sm mt-2">
            Upload your first document to get started
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl lg:text-2xl font-semibold">Recent Uploads</h2>
        <Link
          to="/documents"
          className="text-cyan-400 hover:text-cyan-300 transition-colors text-xs lg:text-sm font-medium"
        >
          View All →
        </Link>
      </div>

      <div className="space-y-3 lg:space-y-4">
        {documents.map((doc) => (
          <Link
            key={doc.id}
            to={`/documents/${doc.id}`}
            className="block group bg-black/30 border border-cyan-500/20 rounded-xl p-3 lg:p-4 hover:bg-cyan-500/5 hover:border-cyan-500/40 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start space-x-3 lg:space-x-4 flex-1 min-w-0">
                {/* File Icon */}
                <div className="flex-shrink-0 bg-gradient-to-r from-cyan-500/20 to-sky-600/20 p-2 lg:p-3 rounded-lg border border-cyan-500/30 group-hover:scale-105 transition-transform duration-300">
                  <FileText className="w-5 h-5 lg:w-6 lg:h-6 text-cyan-400" />
                </div>

                {/* Document Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm lg:text-base text-white font-medium mb-1 truncate group-hover:text-cyan-400 transition-colors">
                    {doc.title}
                  </h3>
                  <div className="flex items-center flex-wrap gap-2 lg:gap-4 text-xs lg:text-sm text-gray-400">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3 lg:w-4 lg:h-4" />
                      <span>{formatDate(doc.uploaded_at)}</span>
                    </span>
                    <span>{doc.pages} pages</span>
                    {doc.flashcard_count > 0 && (
                      <span>{doc.flashcard_count} flashcards</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Status and Actions */}
              <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 lg:gap-4">
                <div className="flex items-center space-x-2">
                  {doc.status === "processing" && (
                    <Loader className="w-3 h-3 lg:w-4 lg:h-4 text-yellow-400 animate-spin" />
                  )}
                  <span className={`text-xs lg:text-sm font-medium whitespace-nowrap ${getStatusColor(doc.status)}`}>
                    {getStatusText(doc.status)}
                  </span>
                </div>
                {doc.status === "completed" && (
                  <div className="p-1.5 lg:p-2 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                    <Eye className="w-4 h-4 lg:w-5 lg:h-5" />
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
});

RecentUploads.displayName = 'RecentUploads';
