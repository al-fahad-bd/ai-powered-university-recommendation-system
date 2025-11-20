import React, { useState, useRef } from 'react';
import { GraduationCap, School, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { InputForm } from './components/InputForm';
import { StaticUniversityCard } from './components/StaticUniversityCard';
import { AIResultSection } from './components/AIResultSection';
import { FEATURED_UNIVERSITIES } from './constants';
import { StudentProfile, AIRecommendationResult } from './types';
import { getUniversityRecommendations } from './services/geminiService';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState<AIRecommendationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [viewAllFeatured, setViewAllFeatured] = useState(false);
  
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleFormSubmit = async (profile: StudentProfile) => {
    setLoading(true);
    setError(null);
    try {
      const result = await getUniversityRecommendations(profile);
      setAiResult(result);
      // Smooth scroll to results after a short delay
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const visibleUniversities = viewAllFeatured 
    ? FEATURED_UNIVERSITIES 
    : FEATURED_UNIVERSITIES.slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={(e: any) => scrollToTop(e)}>
            <div className="bg-indigo-600 p-2 rounded-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">UniPath<span className="text-indigo-600">AI</span></span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#" onClick={scrollToTop} className="hover:text-indigo-600 transition-colors">Home</a>
            <a href="#featured" onClick={(e) => scrollToSection(e, 'featured')} className="hover:text-indigo-600 transition-colors">Top Universities</a>
            <a href="#search" onClick={(e) => scrollToSection(e, 'search')} className="text-indigo-600 bg-indigo-50 px-4 py-2 rounded-full">Find My Match</a>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-indigo-900 text-white py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Your Future Starts Here.
            </h1>
            <p className="text-lg md:text-xl text-indigo-200 max-w-2xl mx-auto mb-10">
              Discover your dream university with our AI-powered recommendation engine. 
              We combine static rankings with real-time web data to find your perfect fit.
            </p>
            <div className="flex justify-center gap-4">
               <a 
                 href="#search" 
                 onClick={(e) => scrollToSection(e, 'search')}
                 className="bg-white text-indigo-900 px-8 py-3 rounded-lg font-bold hover:bg-indigo-50 transition-colors cursor-pointer"
               >
                 Get Started
               </a>
               <a 
                 href="#featured" 
                 onClick={(e) => scrollToSection(e, 'featured')}
                 className="border border-indigo-400 text-indigo-100 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-800 transition-colors cursor-pointer"
               >
                 View Top Lists
               </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
          
          {/* Search Form Section */}
          <section id="search" className="scroll-mt-24">
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
               <div className="lg:col-span-5">
                 <div className="sticky top-24">
                   <h2 className="text-3xl font-bold text-slate-900 mb-4">
                     Let AI Guide You
                   </h2>
                   <p className="text-slate-600 mb-8">
                     Fill out your academic profile. Our Gemini-powered AI scrapes the latest 2024-2025 data to find universities that match your GPA, budget, and career goals.
                   </p>
                   <InputForm onSubmit={handleFormSubmit} isLoading={loading} />
                 </div>
               </div>

               <div className="lg:col-span-7 space-y-8" ref={resultsRef}>
                  {error && (
                    <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 flex items-start gap-3">
                      <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <p>{error}</p>
                    </div>
                  )}

                  {aiResult ? (
                    <AIResultSection result={aiResult} />
                  ) : (
                    <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                        <School className="w-8 h-8 text-slate-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900">Ready to Recommend</h3>
                      <p className="text-slate-500 max-w-sm mx-auto mt-2">
                        Your personalized AI recommendations will appear here after you submit the form.
                      </p>
                    </div>
                  )}
               </div>
             </div>
          </section>

          {/* Divider */}
          <div className="border-t border-slate-200"></div>

          {/* Static Featured Section */}
          <section id="featured" className="scroll-mt-24">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Top Rated Universities</h2>
                <p className="text-slate-600">Curated list of world-class institutions (General Recommendations)</p>
              </div>
              <button 
                onClick={() => setViewAllFeatured(!viewAllFeatured)}
                className="text-indigo-600 font-medium hover:text-indigo-700 hidden sm:flex items-center gap-1"
              >
                {viewAllFeatured ? (
                  <>Show Less <ChevronUp className="w-4 h-4" /></>
                ) : (
                  <>View all rankings <ChevronDown className="w-4 h-4" /></>
                )}
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {visibleUniversities.map(uni => (
                <StaticUniversityCard key={uni.id} university={uni} />
              ))}
            </div>

            {/* Mobile only button */}
            <div className="mt-6 sm:hidden text-center">
              <button 
                onClick={() => setViewAllFeatured(!viewAllFeatured)}
                className="text-indigo-600 font-medium hover:text-indigo-700 inline-flex items-center gap-1"
              >
                 {viewAllFeatured ? 'Show Less' : 'View all rankings'}
              </button>
            </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <GraduationCap className="h-6 w-6 text-indigo-500" />
            <span className="font-bold text-xl text-white">UniPath AI</span>
          </div>
          <p className="text-sm mb-6">Empowering students to find their perfect educational path.</p>
          <div className="text-xs text-slate-600">
            &copy; {new Date().getFullYear()} UniPath AI. Powered by Google Gemini.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;