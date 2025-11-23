
import React, { useState } from 'react';
import { StudentProfile, DegreeLevel } from '../types';
import { COUNTRIES, DEGREE_LEVELS } from '../constants';
import { Button } from './Button';
import { Search, Globe, GraduationCap, DollarSign, BookOpen, Award, Briefcase, Calendar, FileText, ChevronDown } from 'lucide-react';

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
    level: DegreeLevel.UNDERGRADUATE,
    gradYear: '',
    researchExp: '',
    workExp: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputClasses = "w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-slate-900 placeholder-slate-400";
  const labelClasses = "text-sm font-medium text-slate-700 flex items-center gap-2";
  const selectClasses = `${inputClasses} appearance-none pr-10 pl-4 cursor-pointer`;

  return (
    <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-xl border border-white/50 relative z-10">
      <div className="flex items-center space-x-3 mb-6 border-b border-slate-100 pb-4">
        <div className="bg-indigo-100 p-2 rounded-lg border border-indigo-200">
          <Search className="w-6 h-6 text-indigo-600" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Find Your Match</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Degree Level */}
        <div className="space-y-2">
          <label className={labelClasses}>
            <GraduationCap className="w-4 h-4 text-indigo-500" /> Target Degree Level
          </label>
          <div className="relative">
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              className={selectClasses}
            >
              {DEGREE_LEVELS.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-slate-500">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Subject */}
        <div className="space-y-2">
          <label className={labelClasses}>
            <BookOpen className="w-4 h-4 text-indigo-500" /> Subject of Interest
          </label>
          <input
            type="text"
            name="subject"
            required
            placeholder="e.g. Computer Science, Law"
            value={formData.subject}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>

        {/* Country */}
        <div className="space-y-2">
          <label className={labelClasses}>
            <Globe className="w-4 h-4 text-indigo-500" /> Preferred Country
          </label>
          <div className="relative">
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className={selectClasses}
            >
              {COUNTRIES.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-slate-500">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Budget */}
        <div className="space-y-2">
          <label className={labelClasses}>
            <DollarSign className="w-4 h-4 text-indigo-500" /> Annual Budget (USD)
          </label>
          <input
            type="text"
            name="budget"
            required
            placeholder="e.g. 20000"
            value={formData.budget}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>

        {/* GPA */}
        <div className="space-y-2">
          <label className={labelClasses}>
            <Award className="w-4 h-4 text-indigo-500" /> GPA / Percentage
          </label>
          <input
            type="text"
            name="gpa"
            required
            placeholder="e.g. 3.5 or 85%"
            value={formData.gpa}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>

        {/* IELTS */}
        <div className="space-y-2">
          <label className={labelClasses}>
            <span className="font-bold text-xs border border-slate-300 rounded px-1 text-indigo-500">EN</span> IELTS Score
          </label>
          <input
            type="text"
            name="ielts"
            required
            placeholder="e.g. 7.0"
            value={formData.ielts}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>

        {/* Graduation Year */}
        <div className="space-y-2 md:col-span-2">
          <label className={labelClasses}>
            <Calendar className="w-4 h-4 text-indigo-500" /> Year of Graduation
          </label>
          <input
            type="text"
            name="gradYear"
            placeholder="e.g. 2023 (Helps identify study gaps)"
            value={formData.gradYear}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>

        {/* Research Experience */}
        <div className="space-y-2 md:col-span-2">
          <label className={labelClasses}>
            <FileText className="w-4 h-4 text-indigo-500" /> Research Work / Academic Projects
          </label>
          <textarea
            name="researchExp"
            rows={2}
            placeholder="E.g. Final year capstone on ML, Published paper on AI..."
            value={formData.researchExp}
            onChange={handleChange}
            className={`${inputClasses} resize-none`}
          />
        </div>

        {/* Work Experience */}
        <div className="space-y-2 md:col-span-2">
          <label className={labelClasses}>
            <Briefcase className="w-4 h-4 text-indigo-500" /> Professional Work Experience
          </label>
          <textarea
            name="workExp"
            rows={3}
            placeholder="E.g. 1 year as Flutter Developer, 6 months internship..."
            value={formData.workExp}
            onChange={handleChange}
            className={`${inputClasses} resize-none`}
          />
        </div>
      </div>

      <div className="mt-8">
        <Button type="submit" variant="primary" className="w-full py-3 text-lg font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transform hover:-translate-y-0.5" isLoading={isLoading}>
          {isLoading ? 'Analyzing Profile & Experience...' : 'Generate Recommendations'}
        </Button>
      </div>
    </form>
  );
};
