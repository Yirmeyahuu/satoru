import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader } from "lucide-react";
import { documentService } from "../api/documentService";  // Changed from firebase to api
import { FlashcardViewer } from "../components/documents/FlashcardViewer";
import { SummaryPanel } from "../components/documents/SummaryPanel";
import { ReviewerPanel } from "../components/documents/ReviewerPanel";
import type { Document, Flashcard, Summary, Reviewer } from "../api/documentService";  // Changed from firebase to api

export function DocumentDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [document, setDocument] = useState<Document | null>(null);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [reviewer, setReviewer] = useState<Reviewer | null>(null);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDocument = async () => {
      try {
        if (!id) {
          console.error("No document ID provided");
          return;
        }
        
        console.log("Loading document with ID:", id);
        
        // Load document
        const doc = await documentService.getDocument(id);
        console.log("Document loaded:", doc);
        setDocument(doc);
        
        // Load summary
        console.log("Loading summary for document:", id);
        const summaryData = await documentService.getDocumentSummary(id);
        console.log("Summary loaded:", summaryData);
        
        if (summaryData) {
          setSummary(summaryData);
        } else {
          console.warn("No summary data found for document:", id);
        }

        // Load reviewer
        console.log("Loading reviewer for document:", id);
        const reviewerData = await documentService.getDocumentReviewer(id);
        console.log("Reviewer loaded:", reviewerData);
        
        if (reviewerData) {
          setReviewer(reviewerData);
        } else {
          console.warn("No reviewer data found for document:", id);
        }

        // Load flashcards
        console.log("Loading flashcards for document:", id);
        const cards = await documentService.getDocumentFlashcards(id);
        console.log("Flashcards loaded:", cards);
        setFlashcards(cards);
      } catch (err) {
        console.error("Error loading document:", err);
        setError("Failed to load document");
      } finally {
        setLoading(false);
      }
    };

    loadDocument();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 text-cyan-400 animate-spin" />
      </div>
    );
  }

  if (error || !document) {
    return (
      <div className="min-h-screen p-6">
        <button
          onClick={() => navigate("/documents")}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <div className="text-center py-12">
          <p className="text-red-400">{error || "Document not found"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <button
        onClick={() => navigate("/documents")}
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">{document.title}</h1>
          <p className="text-gray-400 mt-2">{document.pages} pages</p>
        </div>

        {/* Summary Section */}
        {summary ? (
          <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">Summary</h2>
            <SummaryPanel summary={summary} />
          </div>
        ) : (
          <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">Summary</h2>
            <p className="text-gray-400">No summary available for this document</p>
          </div>
        )}

        {/* Reviewer Section */}
        {reviewer ? (
          <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">Document Review</h2>
            <ReviewerPanel reviewer={reviewer} />
          </div>
        ) : (
          <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">Document Review</h2>
            <p className="text-gray-400">No review available for this document</p>
          </div>
        )}

        {/* Flashcards Section */}
        <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-4 text-cyan-400">Flashcards</h2>
          {flashcards.length > 0 ? (
            <FlashcardViewer flashcards={flashcards} />
          ) : (
            <p className="text-gray-400">No flashcards available for this document</p>
          )}
        </div>
      </div>
    </div>
  );
}