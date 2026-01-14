import { DocumentCard } from "./DocumentCard";
import { Loader, FileText } from "lucide-react";
import type { Document } from "../../api/types";

interface DocumentGridProps {
  documents: Document[];
  onDelete?: (id: string) => void;  // Changed from number to string
  loading?: boolean;
}

export function DocumentGrid({ documents, onDelete, loading }: DocumentGridProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader className="w-8 h-8 text-cyan-400 animate-spin" />
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-400 mb-2">No documents yet</h3>
        <p className="text-gray-500">Upload your first document to get started</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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