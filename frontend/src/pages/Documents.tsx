import { useState, useEffect } from "react";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { DocumentGrid } from "../components/documents/DocumentGrid";
import { DocumentFilters } from "../components/documents/DocumentFilters";
import { UploadButton } from "../components/dashboard/UploadButton";
import { documentService, type Document } from "../firebase/documentService";
import { useAuth } from "../contexts/AuthContext";
import { Upload } from "lucide-react";

export function Documents() {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    if (!user) return;

    // Subscribe to real-time updates from Firestore
    const unsubscribe = documentService.subscribeToUserDocuments((docs) => {
      setDocuments(docs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    filterAndSortDocuments();
  }, [documents, searchTerm, sortBy]);

  const filterAndSortDocuments = () => {
    let filtered = [...documents];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((doc) =>
        doc.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return b.created_at.getTime() - a.created_at.getTime();
        case "oldest":
          return a.created_at.getTime() - b.created_at.getTime();
        case "name":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    setFilteredDocuments(filtered);
  };

  const handleFileSelect = async (file: File) => {
    try {
      setUploading(true);
      await documentService.uploadDocument(file);
      // Real-time listener will update the list
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload document. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this document?")) {
      return;
    }

    try {
      await documentService.deleteDocument(id);
      // Real-time listener will update the list
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete document. Please try again.");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              <span className="bg-gradient-to-r from-cyan-400 to-sky-600 bg-clip-text text-transparent">
                My Documents
              </span>
            </h1>
            <p className="text-gray-400">
              Manage your uploaded documents and flashcards
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-cyan-400">
              {documents.length}
            </div>
            <div className="text-sm text-gray-400">Total Documents</div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="relative">
          <UploadButton onFileSelect={handleFileSelect} />
          {uploading && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <Upload className="w-12 h-12 text-cyan-400 animate-bounce mx-auto mb-4" />
                <p className="text-cyan-400 font-medium">Uploading and processing...</p>
                <p className="text-gray-400 text-sm mt-2">This may take a few moments</p>
              </div>
            </div>
          )}
        </div>

        {/* Filters */}
        <DocumentFilters
          onSearchChange={setSearchTerm}
          onSortChange={setSortBy}
        />

        {/* Documents Grid */}
        <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6">
          <DocumentGrid
            documents={filteredDocuments}
            onDelete={handleDelete}
            loading={loading}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}