
import React, { useState } from 'react';
import { University } from '../types';
import { MapPin, DollarSign, ExternalLink, School } from 'lucide-react';

interface Props {
  university: University;
}

export const StaticUniversityCard: React.FC<Props> = ({ university }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300 flex flex-col h-full group">
      <div className="relative h-40 overflow-hidden bg-slate-100">
        {!imgError ? (
          <img 
            src={university.imageUrl} 
            alt={university.name} 
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-300">
            <School className="w-12 h-12" />
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-indigo-600 shadow-sm z-10">
          {university.ranking}
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">{university.name}</h3>
        
        <div className="flex items-center text-slate-500 text-sm mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          {university.location}
        </div>

        <div className="flex items-center text-slate-500 text-sm mb-4">
          <DollarSign className="w-4 h-4 mr-1" />
          {university.tuitionRange}
        </div>

        <p className="text-slate-600 text-sm mb-4 flex-1 line-clamp-3">
          {university.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {university.tags.map(tag => (
            <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full font-medium">
              {tag}
            </span>
          ))}
        </div>

        <a 
          href={university.website} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-full px-4 py-2 bg-slate-50 hover:bg-slate-100 text-indigo-600 font-medium text-sm rounded-lg border border-slate-200 transition-colors"
        >
          Visit Website <ExternalLink className="w-3 h-3 ml-2" />
        </a>
      </div>
    </div>
  );
};
