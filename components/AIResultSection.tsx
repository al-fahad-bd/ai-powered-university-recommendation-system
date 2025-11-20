import React from 'react';
import ReactMarkdown from 'react-markdown';
import { AIRecommendationResult } from '../types';
import { Sparkles, Link2 } from 'lucide-react';

interface Props {
  result: AIRecommendationResult;
}

export const AIResultSection: React.FC<Props> = ({ result }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-indigo-100 overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 p-6 text-white">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
            <Sparkles className="w-6 h-6 text-yellow-300" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">AI Recommended Universities</h2>
            <p className="text-indigo-100 text-sm opacity-90">Based on your unique profile and real-time web data.</p>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8">
        <div className="prose prose-indigo max-w-none prose-headings:text-indigo-900 prose-h3:text-xl prose-a:text-blue-600 hover:prose-a:text-blue-500">
          <ReactMarkdown>
            {result.markdownText}
          </ReactMarkdown>
        </div>

        {result.sources.length > 0 && (
          <div className="mt-8 pt-6 border-t border-slate-200">
            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center">
              <Link2 className="w-4 h-4 mr-2" /> Verified Sources & Links
            </h4>
            <div className="flex flex-wrap gap-3">
              {result.sources.map((source, idx) => (
                <a 
                  key={idx} 
                  href={source.uri} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-medium border border-indigo-100 hover:bg-indigo-100 transition-colors truncate max-w-xs"
                >
                  {source.title}
                  <ExternalLinkIcon className="w-3 h-3 ml-1.5 opacity-50" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ExternalLinkIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);
