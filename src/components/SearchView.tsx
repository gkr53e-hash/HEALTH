import React, { useState } from 'react';
import { Search, Stethoscope, FlaskConical, Pill, Building2, ArrowRight } from 'lucide-react';
import { ALL_TESTS, CERTIFIED_LABS } from '../data/labData';
import { LabPartner, LabTest } from '../types/lab';

interface SearchViewProps {
  onSelectLab: (lab: LabPartner) => void;
  onNavigate: (tab: string) => void;
}

export const SearchView: React.FC<SearchViewProps> = ({ onSelectLab, onNavigate }) => {
  const [query, setQuery] = useState('');

  const q = query.toLowerCase().trim();

  const matchingTests = q
    ? ALL_TESTS.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q)
      )
    : ALL_TESTS.slice(0, 6);

  const matchingLabs = q
    ? CERTIFIED_LABS.filter(
        (l) => l.name.toLowerCase().includes(q) || l.area.toLowerCase().includes(q)
      )
    : CERTIFIED_LABS.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="max-w-2xl mx-auto text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Search OneCare Special
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          Find doctors, certified lab tests, pharmacies, and ICU beds across Patna.
        </p>

        <div className="relative mt-6">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search e.g. Thyroid, CBC, Cardiologist, AIIMS, Paracetamol..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-300 bg-white shadow-xs text-sm font-medium outline-none focus:ring-2 focus:ring-teal-600"
            autoFocus
          />
        </div>
      </div>

      <div className="space-y-8 max-w-4xl mx-auto">
        {/* Lab Tests */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <FlaskConical className="w-4 h-4 text-teal-600" />
              Diagnostic Lab Tests ({matchingTests.length})
            </span>
            <button
              onClick={() => onNavigate('lab-tests')}
              className="text-xs font-bold text-teal-700 hover:underline"
            >
              View all
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {matchingTests.map((test) => (
              <div
                key={test.id}
                onClick={() => {
                  onSelectLab(CERTIFIED_LABS[0]);
                }}
                className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-teal-400 transition-colors cursor-pointer flex items-center justify-between shadow-xs"
              >
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{test.name}</h4>
                  <span className="text-[11px] text-slate-500 uppercase tracking-wider">
                    {test.category} • {test.reportTime}
                  </span>
                </div>
                <span className="text-sm font-black text-teal-700">₹{test.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Labs */}
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-slate-500 block mb-3">
            Certified Labs ({matchingLabs.length})
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {matchingLabs.map((lab) => (
              <div
                key={lab.id}
                onClick={() => onSelectLab(lab)}
                className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-teal-400 transition-colors cursor-pointer"
              >
                <h4 className="font-bold text-sm text-slate-900">{lab.name}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{lab.area}</p>
                <span className="text-[11px] font-bold text-emerald-700 block mt-2">
                  ★ {lab.rating} • Home Collection
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Service shortcuts */}
        <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div
            onClick={() => onNavigate('opd')}
            className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200 flex items-center gap-3 cursor-pointer hover:bg-teal-50"
          >
            <Stethoscope className="w-6 h-6 text-teal-700" />
            <div>
              <p className="font-bold text-xs text-slate-900">OPD Specialists</p>
              <p className="text-[11px] text-slate-500">Video call or clinic visit</p>
            </div>
          </div>

          <div
            onClick={() => onNavigate('pharmacy')}
            className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 flex items-center gap-3 cursor-pointer hover:bg-amber-50"
          >
            <Pill className="w-6 h-6 text-amber-600" />
            <div>
              <p className="font-bold text-xs text-slate-900">Order Medicines</p>
              <p className="text-[11px] text-slate-500">~45 min home delivery</p>
            </div>
          </div>

          <div
            onClick={() => onNavigate('emergency')}
            className="p-4 rounded-2xl bg-red-50/60 border border-red-200 flex items-center gap-3 cursor-pointer hover:bg-red-50"
          >
            <Building2 className="w-6 h-6 text-red-600" />
            <div>
              <p className="font-bold text-xs text-slate-900">Emergency & ICU Beds</p>
              <p className="text-[11px] text-slate-500">Reserve before arrival</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
