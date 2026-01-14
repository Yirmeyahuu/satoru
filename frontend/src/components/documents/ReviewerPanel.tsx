import { BookOpen, Lightbulb, AlertTriangle, FileText, BookMarked, CheckCircle } from "lucide-react";
import type { Reviewer } from "../../api/documentService";
import { formatText, formatList } from "../../utils/textFormatter";

interface ReviewerPanelProps {
  reviewer: Reviewer;
}

export function ReviewerPanel({ reviewer }: ReviewerPanelProps) {
  const getSectionIcon = (title: string) => {
    const lowerTitle = title.toLowerCase();
    
    if (lowerTitle.includes('concept')) return <Lightbulb className="w-5 h-5" />;
    if (lowerTitle.includes('principle')) return <BookMarked className="w-5 h-5" />;
    if (lowerTitle.includes('issue') || lowerTitle.includes('problem')) return <AlertTriangle className="w-5 h-5" />;
    if (lowerTitle.includes('practice') || lowerTitle.includes('application')) return <CheckCircle className="w-5 h-5" />;
    if (lowerTitle.includes('example')) return <FileText className="w-5 h-5" />;
    if (lowerTitle.includes('detail')) return <FileText className="w-5 h-5" />;
    if (lowerTitle.includes('analysis')) return <Lightbulb className="w-5 h-5" />;
    
    return <FileText className="w-5 h-5" />;
  };

  const getSectionColor = (index: number) => {
    const colors = [
      { bg: 'from-blue-500/10 to-indigo-600/10', border: 'border-blue-500/30', text: 'text-blue-400', iconBg: 'bg-blue-500/20' },
      { bg: 'from-green-500/10 to-emerald-600/10', border: 'border-green-500/30', text: 'text-green-400', iconBg: 'bg-green-500/20' },
      { bg: 'from-purple-500/10 to-pink-600/10', border: 'border-purple-500/30', text: 'text-purple-400', iconBg: 'bg-purple-500/20' },
      { bg: 'from-amber-500/10 to-orange-600/10', border: 'border-amber-500/30', text: 'text-amber-400', iconBg: 'bg-amber-500/20' },
      { bg: 'from-rose-500/10 to-pink-600/10', border: 'border-rose-500/30', text: 'text-rose-400', iconBg: 'bg-rose-500/20' },
    ];
    
    return colors[index % colors.length];
  };

  return (
    <div className="space-y-6">
      {/* Document Title */}
      {reviewer.title && reviewer.title !== "Document Review" && (
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-sky-600 bg-clip-text text-transparent">
            {reviewer.title}
          </h3>
        </div>
      )}

      {/* Overview */}
      {reviewer.overview && (
        <div className="bg-gradient-to-r from-cyan-500/10 to-sky-600/10 border border-cyan-500/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <BookOpen className="w-5 h-5 text-cyan-400" />
            </div>
            <h3 className="text-xl font-semibold text-cyan-400">Overview</h3>
          </div>
          <div className="prose prose-invert max-w-none">
            {formatText(reviewer.overview)}
          </div>
        </div>
      )}

      {/* Review Sections */}
      {reviewer.sections && reviewer.sections.length > 0 && (
        <div className="space-y-6">
          {reviewer.sections
            .sort((a, b) => a.order - b.order)
            .map((section, index) => {
              const colorScheme = getSectionColor(index);
              
              return (
                <div 
                  key={index} 
                  className={`bg-gradient-to-r ${colorScheme.bg} border ${colorScheme.border} rounded-xl p-6`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 ${colorScheme.iconBg} rounded-lg`}>
                      <span className={colorScheme.text}>
                        {getSectionIcon(section.title)}
                      </span>
                    </div>
                    <h3 className={`text-xl font-semibold ${colorScheme.text}`}>
                      {section.title}
                    </h3>
                  </div>
                  <div className="prose prose-invert max-w-none">
                    {formatText(section.content)}
                  </div>
                </div>
              );
            })}
        </div>
      )}

      {/* Key Takeaways */}
      {reviewer.key_takeaways && reviewer.key_takeaways.length > 0 && (
        <div className="bg-gradient-to-r from-emerald-500/10 to-teal-600/10 border border-emerald-500/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-500/20 rounded-lg">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold text-emerald-400">Key Takeaways</h3>
          </div>
          {formatList(reviewer.key_takeaways)}
        </div>
      )}

      {/* No Content Available */}
      {!reviewer.overview && (!reviewer.sections || reviewer.sections.length === 0) && (
        <div className="text-center py-12 text-gray-400">
          <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg">No review content available for this document</p>
        </div>
      )}
    </div>
  );
}