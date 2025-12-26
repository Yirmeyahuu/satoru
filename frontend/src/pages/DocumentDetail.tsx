import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader } from "lucide-react";
import { documentService } from "../api/documentService";
import { FlashcardViewer } from "../components/documents/FlashcardViewer";
import type { Document, Flashcard } from "../api/types";

export function DocumentDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [document, setDocument] = useState<Document | null>(null);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRegenerating, setIsRegenerating] = useState(false);

  useEffect(() => {
    const loadDocument = async () => {
      try {
        if (!id) return;
        const doc = await documentService.getDocument(Number(id));
        setDocument(doc);

        const cards = await documentService.getDocumentFlashcards(Number(id));
        setFlashcards(cards);
      } catch (err) {
        setError("Failed to load document");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadDocument();
  }, [id]);

  const handleRegenerate = async (count: number) => {
    if (!id) return;
    setIsRegenerating(true);
    try {
      const response = await documentService.regenerateFlashcards(Number(id), count);
      setFlashcards(response.flashcards);
    } catch (err) {
      setError("Failed to regenerate flashcards");
      console.error(err);
    } finally {
      setIsRegenerating(false);
    }
  };

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

      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">{document.title}</h1>
          <p className="text-gray-400 mt-2">Flashcard Study Mode</p>
        </div>

        {flashcards.length > 0 ? (
          <FlashcardViewer
            flashcards={flashcards}
            onRegenerate={handleRegenerate}
            isRegenerating={isRegenerating}
          />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">No flashcards available for this document</p>
          </div>
        )}
      </div>
    </div>
  );
}