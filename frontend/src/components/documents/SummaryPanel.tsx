import { BookOpen, Lightbulb, Code2, RotateCw } from "lucide-react";
import type { DocumentSummary } from "../../api/types";

interface SummaryPanelProps {
  summary: DocumentSummary;
  onRegenerate?: () => void;
  isRegenerating?: boolean;
}

export function SummaryPanel({ summary, onRegenerate, isRegenerating }: SummaryPanelProps) {
  return (
    <div className="space-y-6">
      {/* Regenerate Button */}
      {onRegenerate && (
        <div className="flex justify-end">
          <button
            onClick={onRegenerate}
            disabled={isRegenerating}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-sky-600 text-white text-sm font-medium hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RotateCw className={`w-4 h-4 ${isRegenerating ? 'animate-spin' : ''}`} />
            <span>{isRegenerating ? 'Regenerating...' : 'Regenerate Summary'}</span>
          </button>
        </div>
      )}

      {/* Main Summary */}
      <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-cyan-500/20 rounded-lg">
            <BookOpen className="w-5 h-5 text-cyan-400" />
          </div>
          <h3 className="text-xl font-semibold text-white">Summary</h3>
        </div>
        <p className="text-gray-300 leading-relaxed whitespace-pre-line">
          {summary.content}
        </p>
      </div>

      {/* Key Points */}
      {summary.key_points && summary.key_points.length > 0 && (
        <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Lightbulb className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">Key Points</h3>
          </div>
          <ul className="space-y-3">
            {summary.key_points.map((point, index) => (
              <li key={index} className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </span>
                <span className="text-gray-300 flex-1">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Insights */}
      {summary.insights && summary.insights.length > 0 && (
        <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">Insights</h3>
          </div>
          <div className="space-y-3">
            {summary.insights.map((insight, index) => (
              <div key={index} className="p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-lg">
                <p className="text-gray-300">{insight}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Examples */}
      {summary.examples && summary.examples.length > 0 && (
        <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Code2 className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">Examples</h3>
          </div>
          <div className="space-y-4">
            {summary.examples.map((example, index) => (
              <div key={index} className="p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
                <h4 className="text-green-400 font-medium mb-2">{example.title}</h4>
                <p className="text-gray-300 mb-3">{example.description}</p>
                {example.code && (
                  <pre className="bg-black/50 p-4 rounded-lg overflow-x-auto">
                    <code className="text-cyan-300 text-sm">{example.code}</code>
                  </pre>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}