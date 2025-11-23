import React, { useState, useRef } from 'react';
import { GraduationCap, School, Info, ChevronDown, ChevronUp, Banknote } from 'lucide-react';
import { InputForm } from './components/InputForm';
import { StaticUniversityCard } from './components/StaticUniversityCard';
import { AIResultSection } from './components/AIResultSection';
import { ParticleBackground } from './components/ParticleBackground';
import { FEATURED_UNIVERSITIES, TUITION_FREE_UNIVERSITIES } from './constants';
import { StudentProfile, AIRecommendationResult } from './types';
import { getUniversityRecommendations } from './services/geminiService';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState<AIRecommendationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [viewAllFeatured, setViewAllFeatured] = useState(false);
  const [viewAllTuitionFree, setViewAllTuitionFree] = useState(false);
  
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

  const visibleTuitionFree = viewAllTuitionFree
    ? TUITION_FREE_UNIVERSITIES
    : TUITION_FREE_UNIVERSITIES.slice(0, 4);

  return (
    <div className="min-h-screen relative flex flex-col overflow-x-hidden bg-slate-50">
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={(e: any) => scrollToTop(e)}>
            <div className="bg-slate-900 p-2 rounded-lg shadow-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">UniPath<span className="text-indigo-600">AI</span></span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#" onClick={scrollToTop} className="hover:text-indigo-600 transition-colors">Home</a>
            <a href="#featured" onClick={(e) => scrollToSection(e, 'featured')} className="hover:text-indigo-600 transition-colors">Top Rankings</a>
            <a href="#tuition-free" onClick={(e) => scrollToSection(e, 'tuition-free')} className="hover:text-indigo-600 transition-colors">Tuition Free</a>
            <a href="#search" onClick={(e) => scrollToSection(e, 'search')} className="text-indigo-600 bg-indigo-50 px-4 py-2 rounded-full hover:bg-indigo-100 transition-colors font-semibold">Find My Match</a>
          </div>
        </div>
      </nav>

      <main className="flex-1 relative">
        {/* Hero Section */}
        {/* Black background with Neon Blue Dash Particles (Dark Variant) */}
        <div className="relative pt-24 pb-32 md:py-40 overflow-hidden bg-black">
          <ParticleBackground variant="dark" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center">
            <h1 className="text-4xl md:text-7xl font-extrabold mb-8 tracking-tight text-white drop-shadow-sm animate-fade-in-up">
              Your Future <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Starts Here.</span>
            </h1>
            <p className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 font-light leading-relaxed animate-fade-in-up delay-100">
              Discover your dream university with our AI-powered recommendation engine. 
              We combine global rankings with real-time analysis to find your perfect fit.
            </p>
            <div className="flex flex-wrap justify-center gap-5 animate-fade-in-up delay-200">
               {/* Primary Button: White with Black Text */}
               <a 
                 href="#search" 
                 onClick={(e) => scrollToSection(e, 'search')}
                 className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-slate-200 transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transform hover:-translate-y-1 flex items-center gap-2"
               >
                 Get Started <ChevronDown className="w-4 h-4" />
               </a>
               {/* Secondary Button: Dark/Transparent with White Text */}
               <a 
                 href="#featured" 
                 onClick={(e) => scrollToSection(e, 'featured')}
                 className="bg-slate-900/50 backdrop-blur-sm text-white border border-slate-700 px-8 py-4 rounded-full font-semibold hover:bg-slate-800 transition-all duration-300 cursor-pointer"
               >
                 View Rankings
               </a>
            </div>
          </div>
        </div>

        {/* Search Form Section - Light Theme with Light Particles */}
        <section id="search" className="scroll-mt-16 relative bg-slate-50 py-24 overflow-hidden border-t border-slate-200">
             {/* Light Variant Particles */}
             <ParticleBackground variant="light" className="opacity-70" />
             
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                 <div className="lg:col-span-5">
                   <div className="sticky top-28 space-y-6">
                     <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200 text-sm font-semibold mb-4">
                          <School className="w-4 h-4" /> AI Powered
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
                          Let Intelligence Guide Your Application
                        </h2>
                        <p className="text-slate-600 text-lg leading-relaxed">
                          Fill out your academic profile. Our Gemini-powered AI scrapes the latest 2024-2025 data to find universities that match your GPA, budget, and professional experience.
                        </p>
                     </div>
                     
                     <div className="bg-white/80 backdrop-blur p-6 rounded-2xl border border-slate-200 hidden lg:block shadow-sm">
                        <h3 className="font-semibold text-slate-900 mb-2">How it works</h3>
                        <ul className="space-y-3 text-sm text-slate-600">
                          <li className="flex gap-2">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">1</span>
                            Enter your academic & work details
                          </li>
                          <li className="flex gap-2">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">2</span>
                            AI analyzes global university data
                          </li>
                          <li className="flex gap-2">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">3</span>
                            Get personalized, real-time recommendations
                          </li>
                        </ul>
                     </div>
                   </div>
                 </div>

                 <div className="lg:col-span-7 space-y-8" ref={resultsRef}>
                    <InputForm onSubmit={handleFormSubmit} isLoading={loading} />

                    {error && (
                      <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-200 flex items-start gap-3 animate-pulse">
                        <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <p>{error}</p>
                      </div>
                    )}

                    {aiResult ? (
                      <AIResultSection result={aiResult} />
                    ) : (
                      !loading && (
                        <div className="hidden lg:flex flex-col items-center justify-center p-12 text-center text-slate-400 border-2 border-dashed border-slate-300 rounded-2xl bg-white/50 backdrop-blur-sm">
                          <School className="w-12 h-12 mb-4 opacity-50" />
                          <p className="font-medium">Recommendations will appear here</p>
                        </div>
                      )
                    )}
                 </div>
               </div>
             </div>
        </section>

        {/* Content Section (Rankings) - Relative wrapper for particles */}
        <div className="relative overflow-hidden">
          {/* Light Variant Particles spanning the entire lists area */}
          <ParticleBackground variant="light" className="opacity-60" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24 relative z-20">
            
            {/* Featured Section */}
            <section id="featured" className="scroll-mt-28">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4 border-b border-slate-200 pb-4">
                <div>
                  <span className="text-indigo-600 font-semibold tracking-wide uppercase text-sm">World Class</span>
                  <h2 className="text-3xl font-bold text-slate-900 mt-1">Top Rated Universities</h2>
                </div>
                <button 
                  onClick={() => setViewAllFeatured(!viewAllFeatured)}
                  className="text-indigo-600 font-medium hover:text-indigo-700 hover:bg-indigo-50 px-4 py-2 rounded-lg transition-all flex items-center gap-2 group"
                >
                  {viewAllFeatured ? (
                    <>Show Less <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" /></>
                  ) : (
                    <>View all rankings <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" /></>
                  )}
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {visibleUniversities.map(uni => (
                  <StaticUniversityCard key={uni.id} university={uni} />
                ))}
              </div>
            </section>

            {/* Tuition Free Section */}
            <section id="tuition-free" className="scroll-mt-28">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4 border-b border-slate-200 pb-4">
                <div className="flex items-start gap-4">
                  <div className="bg-emerald-100 p-3 rounded-xl hidden sm:block">
                    <Banknote className="w-8 h-8 text-emerald-600" />
                  </div>
                  <div>
                    <span className="text-emerald-600 font-semibold tracking-wide uppercase text-sm">Budget Friendly</span>
                    <h2 className="text-3xl font-bold text-slate-900 mt-1">Tuition Free & Low Cost</h2>
                    <p className="text-slate-500 mt-1">High-quality education in Europe & beyond</p>
                  </div>
                </div>
                <button 
                  onClick={() => setViewAllTuitionFree(!viewAllTuitionFree)}
                  className="text-emerald-600 font-medium hover:text-emerald-700 hover:bg-emerald-50 px-4 py-2 rounded-lg transition-all flex items-center gap-2 group"
                >
                  {viewAllTuitionFree ? (
                    <>Show Less <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" /></>
                  ) : (
                    <>View full list <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" /></>
                  )}
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {visibleTuitionFree.map(uni => (
                  <StaticUniversityCard key={uni.id} university={uni} />
                ))}
              </div>
            </section>

          </div>
        </div>
      </main>

      {/* Footer - Dark background with Dark Variant Particles */}
      <footer className="bg-slate-900 text-slate-400 py-12 relative z-10 border-t border-slate-800 overflow-hidden">
        <ParticleBackground variant="dark" />
        <div className="max-w-7xl mx-auto px-4 text-center relative z-20">
          <div className="flex items-center justify-center gap-2 mb-4">
            <GraduationCap className="h-8 w-8 text-indigo-500" />
            <span className="font-bold text-2xl text-white">UniPath AI</span>
          </div>
          <p className="text-sm mb-8 max-w-md mx-auto">
            Empowering students worldwide to find their perfect educational path through data-driven insights and AI analysis.
          </p>
          <div className="flex justify-center gap-6 text-xs text-slate-600 uppercase tracking-widest">
             <a href="#" className="hover:text-indigo-400 transition-colors">Privacy</a>
             <a href="#" className="hover:text-indigo-400 transition-colors">Terms</a>
             <a href="#" className="hover:text-indigo-400 transition-colors">Contact</a>
          </div>
          <div className="mt-8 text-xs text-slate-700">
            &copy; {new Date().getFullYear()} UniPath AI. Powered by Google Gemini.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;