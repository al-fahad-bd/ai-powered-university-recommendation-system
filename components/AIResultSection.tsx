
import React, { useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { AIRecommendationResult } from '../types';
import { Sparkles, MapPin, DollarSign, Percent, ExternalLink, GraduationCap, School } from 'lucide-react';
import { GENERIC_UNIVERSITY_IMAGES } from '../constants';

interface Props {
  result: AIRecommendationResult;
}

// Interface for parsed data
interface ParsedUniversity {
  name: string;
  location: string;
  tuition: string;
  acceptance: string;
  website: string;
  description: string;
  image: string;
}

const UniversityCardImage: React.FC<{ src: string; alt: string; location: string }> = ({ src, alt, location }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="h-48 overflow-hidden relative bg-slate-800">
      {!imgError ? (
        <img 
          src={src} 
          alt={alt} 
          onError={() => setImgError(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-600">
           <School className="w-16 h-16 opacity-20" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-80" />
      <div className="absolute bottom-4 left-4 right-4">
        <h3 className="text-xl font-bold text-white leading-tight drop-shadow-md">{alt}</h3>
        <div className="flex items-center text-slate-200 text-xs mt-1 font-medium">
          <MapPin className="w-3 h-3 mr-1" /> {location}
        </div>
      </div>
    </div>
  );
};

export const AIResultSection: React.FC<Props> = ({ result }) => {
  
  // Logic to parse the markdown string into structured objects
  const { universities, summary } = useMemo(() => {
    const rawText = result.markdownText;
    const parts = rawText.split('---').map(p => p.trim()).filter(p => p.length > 0);
    
    const parsedUnis: ParsedUniversity[] = [];
    let parsedSummary = '';

    parts.forEach((part, index) => {
      // Check if it's the summary section
      if (part.toLowerCase().startsWith('### summary') || part.toLowerCase().startsWith('summary')) {
        parsedSummary = part.replace(/^###\s*Summary/i, '').trim();
        return;
      }

      // Basic extraction using regex
      const nameMatch = part.match(/^###\s*(.+)$/m);
      if (nameMatch) {
        const name = nameMatch[1].trim();
        const locationMatch = part.match(/\*\*Location:\*\*\s*(.+)$/m);
        const tuitionMatch = part.match(/\*\*Tuition:\*\*\s*(.+)$/m);
        const acceptanceMatch = part.match(/\*\*Acceptance Rate:\*\*\s*(.+)$/m);
        const websiteMatch = part.match(/\*\*Website:\*\*\s*(https?:\/\/[^\s]+)/m) || part.match(/\[Website\]\((https?:\/\/[^\s]+)\)/m);
        
        // Remove the metadata lines from the description body for cleaner text
        let description = part.replace(/^###\s*.+$/m, '')
                              .replace(/\*\*Location:\*\*.*$/m, '')
                              .replace(/\*\*Tuition:\*\*.*$/m, '')
                              .replace(/\*\*Acceptance Rate:\*\*.*$/m, '')
                              .replace(/\*\*Website:\*\*.*$/m, '')
                              .replace(/\*\*Why it's a match:\*\*/i, '') // Remove header
                              .trim();

        // Assign a consistent random image based on the index
        const imageIndex = index % GENERIC_UNIVERSITY_IMAGES.length;

        parsedUnis.push({
          name,
          location: locationMatch ? locationMatch[1].trim() : 'Unknown Location',
          tuition: tuitionMatch ? tuitionMatch[1].trim() : 'Not specified',
          acceptance: acceptanceMatch ? acceptanceMatch[1].trim() : 'N/A',
          website: websiteMatch ? websiteMatch[1] : '',
          description,
          image: GENERIC_UNIVERSITY_IMAGES[imageIndex]
        });
      } else {
        // If format doesn't match expected structure, treat as summary/intro text if it's the first part
        if (index === 0 && parts.length === 1) {
            parsedSummary = part;
        }
      }
    });

    return { universities: parsedUnis, summary: parsedSummary };
  }, [result.markdownText]);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 to-indigo-800 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden border border-indigo-700/50">
        <div className="absolute top-0 right-0 p-12 bg-white/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="flex items-center gap-4 relative z-10">
          <div className="bg-white/10 p-3 rounded-xl backdrop-blur-md border border-white/20">
            <Sparkles className="w-8 h-8 text-indigo-200" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">Recommended for You</h2>
            <p className="text-indigo-200 text-sm md:text-base max-w-2xl">
              Analysis based on your GPA, IELTS, budget, and professional background using real-time data.
            </p>
          </div>
        </div>
      </div>

      {/* University Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {universities.map((uni, idx) => (
          <div 
            key={idx} 
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 flex flex-col h-full"
          >
            {/* Card Image Header with Error Handling */}
            <UniversityCardImage src={uni.image} alt={uni.name} location={uni.location} />

            {/* Key Data Box */}
            <div className="grid grid-cols-2 border-b border-slate-100 bg-slate-50/50">
              <div className="p-3 border-r border-slate-100 flex items-center gap-2 justify-center">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                <div className="text-xs">
                  <p className="text-slate-400 font-medium uppercase tracking-wider text-[10px]">Tuition</p>
                  <p className="text-slate-700 font-semibold">{uni.tuition}</p>
                </div>
              </div>
              <div className="p-3 flex items-center gap-2 justify-center">
                <Percent className="w-4 h-4 text-indigo-600" />
                <div className="text-xs">
                  <p className="text-slate-400 font-medium uppercase tracking-wider text-[10px]">Acceptance</p>
                  <p className="text-slate-700 font-semibold">{uni.acceptance}</p>
                </div>
              </div>
            </div>

            {/* Description Body */}
            <div className="p-6 flex-1 flex flex-col">
              <div className="prose prose-sm prose-slate mb-6 line-clamp-4 text-slate-600">
                <ReactMarkdown>{uni.description}</ReactMarkdown>
              </div>

              <div className="mt-auto pt-4 border-t border-slate-100">
                 {uni.website ? (
                    <a 
                      href={uni.website}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full py-2.5 bg-slate-900 hover:bg-indigo-600 text-white rounded-lg font-medium transition-colors text-sm shadow-lg shadow-slate-200 group-hover:shadow-indigo-200"
                    >
                      Visit Official Website <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                 ) : (
                    <button disabled className="flex items-center justify-center w-full py-2.5 bg-slate-100 text-slate-400 rounded-lg font-medium text-sm cursor-not-allowed">
                      Website Not Available
                    </button>
                 )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Section */}
      {summary && (
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 md:p-8">
           <h3 className="flex items-center text-lg font-bold text-indigo-900 mb-4">
              <GraduationCap className="w-5 h-5 mr-2" /> Counselor's Advice
           </h3>
           <div className="prose prose-indigo text-indigo-800/80 max-w-none">
             <ReactMarkdown>{summary}</ReactMarkdown>
           </div>
        </div>
      )}

      {/* Sources Footer */}
      {result.sources.length > 0 && (
        <div className="pt-6 border-t border-slate-200">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Data Sources verified by Google
          </p>
          <div className="flex flex-wrap gap-2">
            {result.sources.map((source, idx) => (
              <a 
                key={idx} 
                href={source.uri} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-500 text-xs hover:text-indigo-600 hover:border-indigo-200 transition-colors"
              >
                {source.title}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
