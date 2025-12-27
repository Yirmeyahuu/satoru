import { useState } from "react";
import { RotateCcw } from "lucide-react";
import type { Flashcard } from "../../api/types";

interface FlashcardCardProps {
  flashcard: Flashcard;
}

export function FlashcardCard({ flashcard }: FlashcardCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "hard":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="relative w-full h-96 perspective">
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-3d cursor-pointer ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front Side - Question */}
        <div className="absolute inset-0 backface-hidden">
          <div className="h-full bg-gradient-to-br from-cyan-500/10 to-sky-500/10 backdrop-blur-xl border-2 border-cyan-500/30 rounded-2xl p-8 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(flashcard.difficulty)}`}>
                {flashcard.difficulty}
              </span>
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <RotateCcw className="w-4 h-4" />
                <span>Click to flip</span>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="text-cyan-400 text-sm font-medium mb-4">QUESTION</div>
                <p className="text-white text-xl md:text-2xl font-medium leading-relaxed">
                  {flashcard.question}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Back Side - Answer */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <div className="h-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border-2 border-purple-500/30 rounded-2xl p-8 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(flashcard.difficulty)}`}>
                {flashcard.difficulty}
              </span>
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <RotateCcw className="w-4 h-4" />
                <span>Click to flip</span>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="text-purple-400 text-sm font-medium mb-4">ANSWER</div>
                <p className="text-white text-lg md:text-xl leading-relaxed">
                  {flashcard.answer}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add CSS for 3D flip animation */}
      <style>{`
        .perspective {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}