import { DocumentCard } from "./DocumentCard";
import { FileText } from "lucide-react";
import type { DocumentListItem } from "../../api/types";

interface DocumentGridProps {
  documents: DocumentListItem[];
  onDelete?: (id: number) => void;
  loading?: boolean;
}

export function DocumentGrid({ documents, onDelete, loading }: DocumentGridProps) {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
        <p className="text-gray-400 mt-4">Loading documents...</p>
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <p className="text-gray-400">No documents uploaded yet</p>
        <p className="text-gray-500 text-sm mt-2">
          Upload your first document to get started
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {documents.map((document) => (
        <DocumentCard
          key={document.id}
          document={document}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}