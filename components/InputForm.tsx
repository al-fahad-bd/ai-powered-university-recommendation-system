import React, { useState } from 'react';
import { StudentProfile, DegreeLevel } from '../types';
import { COUNTRIES, DEGREE_LEVELS } from '../constants';
import { Button } from './Button';
import { Search, Globe, GraduationCap, DollarSign, BookOpen, Award } from 'lucide-react';

interface InputFormProps {
  onSubmit: (profile: StudentProfile) => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<StudentProfile>({
    gpa: '',
    ielts: '',
    country: COUNTRIES[0],
    budget: '',
    subject: '',
    level: DegreeLevel.UNDERGRADUATE
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-slate-100">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-indigo-100 p-2 rounded-lg">
          <Search className="w-6 h-6 text-indigo-600" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">Find Your Match</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Degree Level */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <GraduationCap className="w-4 h-4" /> Degree Level
          </label>
          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
          >
            {DEGREE_LEVELS.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        {/* Subject */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <BookOpen className="w-4 h-4" /> Subject of Interest
          </label>
          <input
            type="text"
            name="subject"
            required
            placeholder="e.g. Computer Science, Law"
            value={formData.subject}
            onChange={handleChange}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>

        {/* Country */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <Globe className="w-4 h-4" /> Preferred Country
          </label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          >
            {COUNTRIES.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>

        {/* Budget */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <DollarSign className="w-4 h-4" /> Annual Budget (USD)
          </label>
          <input
            type="text"
            name="budget"
            required
            placeholder="e.g. 20000"
            value={formData.budget}
            onChange={handleChange}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>

        {/* GPA */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <Award className="w-4 h-4" /> GPA / Percentage
          </label>
          <input
            type="text"
            name="gpa"
            required
            placeholder="e.g. 3.5 or 85%"
            value={formData.gpa}
            onChange={handleChange}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>

        {/* IELTS */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <span className="font-bold text-xs border border-slate-400 rounded px-1">EN</span> IELTS Score
          </label>
          <input
            type="text"
            name="ielts"
            required
            placeholder="e.g. 7.0"
            value={formData.ielts}
            onChange={handleChange}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>
      </div>

      <div className="mt-8">
        <Button type="submit" className="w-full py-3 text-lg font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5" isLoading={isLoading}>
          {isLoading ? 'Analyzing & Scraping Data...' : 'Generate Recommendations'}
        </Button>
      </div>
    </form>
  );
};
