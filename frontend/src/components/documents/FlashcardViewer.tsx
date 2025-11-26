import { useState } from "react";
import { ChevronLeft, ChevronRight, Shuffle, RotateCw } from "lucide-react";
import { FlashcardCard } from "./FlashcardCard";
import type { Flashcard } from "../../api/types";

interface FlashcardViewerProps {
  flashcards: Flashcard[];
  onRegenerate?: (count: number) => void;
  isRegenerating?: boolean;
}

export function FlashcardViewer({ flashcards, onRegenerate, isRegenerating }: FlashcardViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardCount, setCardCount] = useState(flashcards.length);

  const currentCard = flashcards[currentIndex];

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleShuffle = () => {
    const randomIndex = Math.floor(Math.random() * flashcards.length);
    setCurrentIndex(randomIndex);
  };

  const handleRegenerate = () => {
    if (onRegenerate) {
      onRegenerate(cardCount);
      setCurrentIndex(0);
    }
  };

  if (flashcards.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No flashcards available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-4">
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-400">
            Card <span className="text-cyan-400 font-medium">{currentIndex + 1}</span> of{" "}
            <span className="text-cyan-400 font-medium">{flashcards.length}</span>
          </div>
          <button
            onClick={handleShuffle}
            className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-colors"
            title="Shuffle"
          >
            <Shuffle className="w-5 h-5" />
          </button>
        </div>

        {/* Regenerate Controls */}
        <div className="flex items-center space-x-3">
          <label className="text-sm text-gray-400">Cards:</label>
          <input
            type="number"
            min="10"
            max="40"
            value={cardCount}
            onChange={(e) => setCardCount(Number(e.target.value))}
            className="w-20 px-3 py-2 bg-black/50 border border-cyan-500/30 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500"
          />
          <button
            onClick={handleRegenerate}
            disabled={isRegenerating}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-sky-600 text-white text-sm font-medium hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RotateCw className={`w-4 h-4 ${isRegenerating ? 'animate-spin' : ''}`} />
            <span>{isRegenerating ? 'Regenerating...' : 'Regenerate'}</span>
          </button>
        </div>
      </div>

      {/* Flashcard */}
      <FlashcardCard flashcard={currentCard} />

      {/* Navigation */}
      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="p-3 rounded-lg bg-black/40 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Progress Dots */}
        <div className="flex items-center space-x-2">
          {flashcards.slice(0, 5).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? "w-8 bg-cyan-400"
                  : "w-2 bg-cyan-500/30 hover:bg-cyan-500/50"
              }`}
            />
          ))}
          {flashcards.length > 5 && (
            <span className="text-gray-500 text-sm">...</span>
          )}
        </div>

        <button
          onClick={handleNext}
          disabled={currentIndex === flashcards.length - 1}
          className="p-3 rounded-lg bg-black/40 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Keyboard Shortcuts Hint */}
      <div className="text-center text-gray-500 text-sm">
        <p>Use arrow keys to navigate • Click card to flip</p>
      </div>
    </div>
  );
}