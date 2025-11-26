import { FileText, Calendar, Trash2, Eye, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import type { DocumentListItem } from "../../api/types";

interface DocumentCardProps {
  document: DocumentListItem;
  onDelete?: (id: number) => void;
}

export function DocumentCard({ document, onDelete }: DocumentCardProps) {
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

  return (
    <div className="group bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-4 hover:bg-cyan-500/5 hover:border-cyan-500/40 transition-all duration-300">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start space-x-4 flex-1 min-w-0">
          {/* File Icon */}
          <div className="flex-shrink-0 bg-gradient-to-r from-cyan-500/20 to-sky-600/20 p-3 rounded-lg border border-cyan-500/30 group-hover:scale-105 transition-transform duration-300">
            <FileText className="w-6 h-6 text-cyan-400" />
          </div>

          {/* Document Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-medium mb-1 truncate group-hover:text-cyan-400 transition-colors">
              {document.title}
            </h3>
            <div className="flex items-center flex-wrap gap-3 text-sm text-gray-400">
              <span className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(document.uploaded_at)}</span>
              </span>
              <span>{document.pages} pages</span>
              {document.flashcard_count > 0 && (
                <span>{document.flashcard_count} flashcards</span>
              )}
            </div>
          </div>
        </div>

        {/* Status and Actions */}
        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2">
          <div className="flex items-center space-x-2">
            {document.status === "processing" && (
              <Loader className="w-4 h-4 text-yellow-400 animate-spin" />
            )}
            <span className={`text-sm font-medium whitespace-nowrap ${getStatusColor(document.status)}`}>
              {getStatusText(document.status)}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            {document.status === "completed" && (
              <Link
                to={`/documents/${document.id}`}
                className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-colors"
              >
                <Eye className="w-4 h-4" />
              </Link>
            )}
            
            {onDelete && (
              <button
                onClick={() => onDelete(document.id)}
                className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}