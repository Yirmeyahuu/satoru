import { BookOpen, Lightbulb, CheckCircle, FileText } from "lucide-react";
import type { Summary } from "../../api/documentService";
import { formatText, formatList } from "../../utils/textFormatter";

interface SummaryPanelProps {
  summary: Summary;
}

export function SummaryPanel({ summary }: SummaryPanelProps) {
  return (
    <div className="space-y-6">
      {/* Main Summary */}
      {summary.summary && (
        <div className="bg-gradient-to-r from-cyan-500/10 to-sky-600/10 border border-cyan-500/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <BookOpen className="w-5 h-5 text-cyan-400" />
            </div>
            <h3 className="text-xl font-semibold text-cyan-400">Overview</h3>
          </div>
          <div className="prose prose-invert max-w-none">
            {formatText(summary.summary)}
          </div>
        </div>
      )}

      {/* Key Points */}
      {summary.key_points && summary.key_points.length > 0 && (
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-600/10 border border-green-500/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-green-400">Key Points</h3>
          </div>
          {formatList(summary.key_points)}
        </div>
      )}

      {/* Insights */}
      {summary.insights && summary.insights.length > 0 && (
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-600/10 border border-purple-500/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Lightbulb className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-purple-400">Insights</h3>
          </div>
          {formatList(summary.insights)}
        </div>
      )}

      {/* Examples */}
      {summary.examples && summary.examples.length > 0 && (
        <div className="bg-gradient-to-r from-blue-500/10 to-indigo-600/10 border border-blue-500/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <FileText className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-blue-400">Examples</h3>
          </div>
          <div className="space-y-4">
            {summary.examples.map((example, index) => (
              <div key={index} className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                <div className="prose prose-invert max-w-none">
                  {formatText(typeof example === 'string' ? example : JSON.stringify(example))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Summary Available */}
      {!summary.summary && (!summary.key_points || summary.key_points.length === 0) && (
        <div className="text-center py-12 text-gray-400">
          <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg">No summary available for this document</p>
        </div>
      )}
    </div>
  );
}