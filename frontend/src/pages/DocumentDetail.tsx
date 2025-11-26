import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { FlashcardViewer } from "../components/documents/FlashcardViewer";
import { SummaryPanel } from "../components/documents/SummaryPanel";
import { ArrowLeft, FileText, Calendar, Loader, Trash2 } from "lucide-react";
import { documentService } from "../api/documentService";
import type { Document, Flashcard, DocumentSummary } from "../api/types";

type TabType = "summary" | "flashcards" | "pdf";

export function DocumentDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [document, setDocument] = useState<Document | null>(null);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [summary, setSummary] = useState<DocumentSummary | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("summary");
  const [loading, setLoading] = useState(true);
  const [regeneratingFlashcards, setRegeneratingFlashcards] = useState(false);
  const [regeneratingSummary, setRegeneratingSummary] = useState(false);

  useEffect(() => {
    if (id) {
      fetchDocument();
    }
  }, [id]);

  const fetchDocument = async () => {
    try {
      setLoading(true);
      const doc = await documentService.getDocument(Number(id));
      setDocument(doc);

      // Fetch summary and flashcards
      if (doc.status === "completed") {
        const [summaryData, flashcardsData] = await Promise.all([
          documentService.getDocumentSummary(Number(id)).catch(() => null),
          documentService.getDocumentFlashcards(Number(id)).catch(() => []),
        ]);
        setSummary(summaryData);
        setFlashcards(flashcardsData);
      }
    } catch (error) {
      console.error("Failed to fetch document:", error);
      alert("Failed to load document");
      navigate("/documents");
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerateFlashcards = async (count: number) => {
    try {
      setRegeneratingFlashcards(true);
      const response = await documentService.regenerateFlashcards(Number(id), count);
      setFlashcards(response.flashcards);
    } catch (error) {
      console.error("Failed to regenerate flashcards:", error);
      alert("Failed to regenerate flashcards");
    } finally {
      setRegeneratingFlashcards(false);
    }
  };

  const handleRegenerateSummary = async () => {
    try {
      setRegeneratingSummary(true);
      const response = await documentService.regenerateSummary(Number(id));
      setSummary(response.summary);
    } catch (error) {
      console.error("Failed to regenerate summary:", error);
      alert("Failed to regenerate summary");
    } finally {
      setRegeneratingSummary(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this document?")) {
      return;
    }

    try {
      await documentService.deleteDocument(Number(id));
      navigate("/documents");
    } catch (error) {
      console.error("Failed to delete document:", error);
      alert("Failed to delete document");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Loader className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Loading document...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!document) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <p className="text-gray-400">Document not found</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Link
              to="/documents"
              className="inline-flex items-center space-x-2 text-gray-400 hover:text-cyan-400 transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Documents</span>
            </Link>

            <div className="flex items-start space-x-4">
              <div className="p-4 bg-gradient-to-r from-cyan-500/20 to-sky-600/20 rounded-xl border border-cyan-500/30">
                <FileText className="w-8 h-8 text-cyan-400" />
              </div>

              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2 text-white">
                  {document.title}
                </h1>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(document.uploaded_at)}</span>
                  </span>
                  <span>{document.pages} pages</span>
                  {flashcards.length > 0 && <span>{flashcards.length} flashcards</span>}
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleDelete}
            className="p-3 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        {/* Processing Status */}
        {document.status === "processing" && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 flex items-center space-x-3">
            <Loader className="w-5 h-5 text-yellow-400 animate-spin" />
            <div>
              <p className="text-yellow-400 font-medium">Processing Document</p>
              <p className="text-gray-400 text-sm">
                We're analyzing your document and generating flashcards. This may take a few minutes.
              </p>
            </div>
          </div>
        )}

        {/* Tabs */}
        {document.status === "completed" && (
          <>
            <div className="flex space-x-2 border-b border-cyan-500/20">
              <button
                onClick={() => setActiveTab("summary")}
                className={`px-6 py-3 font-medium transition-all duration-300 ${
                  activeTab === "summary"
                    ? "text-cyan-400 border-b-2 border-cyan-400"
                    : "text-gray-400 hover:text-cyan-400"
                }`}
              >
                Summary
              </button>
              <button
                onClick={() => setActiveTab("flashcards")}
                className={`px-6 py-3 font-medium transition-all duration-300 ${
                  activeTab === "flashcards"
                    ? "text-cyan-400 border-b-2 border-cyan-400"
                    : "text-gray-400 hover:text-cyan-400"
                }`}
              >
                Flashcards
              </button>
            </div>

            {/* Tab Content */}
            <div className="mt-6">
              {activeTab === "summary" && summary && (
                <SummaryPanel
                  summary={summary}
                  onRegenerate={handleRegenerateSummary}
                  isRegenerating={regeneratingSummary}
                />
              )}

              {activeTab === "flashcards" && (
                <FlashcardViewer
                  flashcards={flashcards}
                  onRegenerate={handleRegenerateFlashcards}
                  isRegenerating={regeneratingFlashcards}
                />
              )}
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}