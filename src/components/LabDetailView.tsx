import React, { useState } from 'react';
import { ArrowLeft, FlaskConical, MapPin, Star, Plus, Check, Clock, Droplets, Info } from 'lucide-react';
import { LabPartner, LabTest } from '../types/lab';
import { formatCurrency } from '../utils/labBookingLogic';

interface LabDetailViewProps {
  lab: LabPartner;
  tests: LabTest[];
  onBack: () => void;
  onOpenBooking: (lab: LabPartner, preselectedTestIds?: string[]) => void;
}

export const LabDetailView: React.FC<LabDetailViewProps> = ({
  lab,
  tests,
  onBack,
  onOpenBooking,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTestIds, setSelectedTestIds] = useState<string[]>([]);
  const [searchFilter, setSearchFilter] = useState('');

  const testMap = new Map(tests.map((t) => [t.id, t]));
  const labTests = lab.allTestIds.map((id) => testMap.get(id)).filter(Boolean) as LabTest[];

  const filteredTests = labTests.filter((test) => {
    if (selectedCategory !== 'all' && test.category.toLowerCase() !== selectedCategory.toLowerCase()) {
      return false;
    }
    if (searchFilter) {
      const q = searchFilter.toLowerCase();
      return (
        test.name.toLowerCase().includes(q) ||
        test.category.toLowerCase().includes(q) ||
        test.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const toggleTest = (id: string) => {
    setSelectedTestIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedCount = selectedTestIds.length;
  const selectedTotal = selectedTestIds.reduce((sum, id) => {
    const t = testMap.get(id);
    return sum + (t ? t.price : 0);
  }, 0);

  const categories = ['all', 'Pathology', 'Cardiology', 'Radiology', 'Health Packages'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-900 mb-6 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
        aria-label="Back to labs"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </button>

      {/* Main Lab Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 mb-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0 text-teal-700 shadow-xs">
              <FlaskConical className="w-9 h-9 sm:w-11 sm:h-11" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-3 py-0.5 text-xs font-bold bg-teal-50 text-teal-800 rounded-full border border-teal-200">
                  Diagnostic Lab
                </span>
                {lab.badge && (
                  <span className="px-2.5 py-0.5 text-xs font-semibold bg-slate-100 text-slate-700 rounded-full">
                    {lab.badge}
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {lab.name}
              </h1>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-slate-500 font-medium">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>
                    {lab.area}, {lab.city}
                  </span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1 font-bold text-slate-800">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span>{lab.rating.toFixed(1)}</span>
                  <span className="text-slate-400 font-normal">({lab.reviewsCount} reviews)</span>
                </div>
                <span>•</span>
                <span className="text-emerald-700 font-semibold">
                  Open today: {lab.openingHours}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={() => onOpenBooking(lab, selectedTestIds)}
              className="px-6 py-3 text-sm font-bold text-white bg-teal-700 hover:bg-teal-800 active:scale-98 rounded-full shadow-md shadow-teal-700/25 transition-all cursor-pointer text-center"
            >
              Book tests here
            </button>
          </div>
        </div>

        {/* Test Catalogue & Pricing Section */}
        <div className="pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-teal-700 block mb-1">
                TEST CATALOGUE & PRICING
              </span>
              <p className="text-xs text-slate-500 font-medium">
                Select tests below to include in your booking or view preparation requirements.
              </p>
            </div>

            {/* Quick Category Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    selectedCategory.toLowerCase() === cat.toLowerCase()
                      ? 'bg-teal-700 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat === 'all' ? 'All Tests' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Test Grid (2 Columns like reference) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredTests.map((test) => {
              const isSelected = selectedTestIds.includes(test.id);
              return (
                <div
                  key={test.id}
                  onClick={() => toggleTest(test.id)}
                  className={`border rounded-2xl p-4 transition-all cursor-pointer flex items-center justify-between gap-4 group ${
                    isSelected
                      ? 'border-teal-500 bg-teal-50/40 ring-1 ring-teal-500'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-teal-800 transition-colors">
                        {test.name}
                      </h4>
                    </div>
                    <div className="flex items-center gap-2.5 mt-1 text-xs text-slate-500">
                      <span className="font-extrabold tracking-wider text-[10px] uppercase text-slate-400">
                        {test.category}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {test.reportTime}
                      </span>
                      {test.fastingHours ? (
                        <>
                          <span>•</span>
                          <span className="text-amber-700 font-medium">
                            {test.fastingHours}h Fasting
                          </span>
                        </>
                      ) : null}
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-1 font-normal">
                      {test.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <span className="text-base sm:text-lg font-black text-teal-700 block">
                        {formatCurrency(test.price)}
                      </span>
                      {test.originalPrice && (
                        <span className="text-xs text-slate-400 line-through">
                          {formatCurrency(test.originalPrice)}
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleTest(test.id);
                      }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-teal-700 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 group-hover:bg-teal-100 group-hover:text-teal-800'
                      }`}
                      aria-label={isSelected ? 'Remove test' : 'Add test'}
                    >
                      {isSelected ? <Check className="w-4 h-4 stroke-[3]" /> : <Plus className="w-4 h-4 stroke-[2.5]" />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar if tests are selected */}
      {selectedCount > 0 && (
        <div className="fixed bottom-4 left-4 right-4 max-w-4xl mx-auto z-40 bg-slate-900 text-white rounded-2xl p-4 shadow-2xl flex items-center justify-between gap-4 border border-slate-800 animate-in slide-in-from-bottom duration-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-xs font-black bg-teal-500 text-slate-950 rounded-md">
                {selectedCount} {selectedCount === 1 ? 'test' : 'tests'} selected
              </span>
              <span className="text-lg font-black text-white">
                {formatCurrency(selectedTotal)}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Certified report delivered directly to your MedHOne app & WhatsApp
            </p>
          </div>
          <button
            onClick={() => onOpenBooking(lab, selectedTestIds)}
            className="px-6 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold rounded-xl text-sm transition-all cursor-pointer shadow-md"
          >
            Continue Booking
          </button>
        </div>
      )}
    </div>
  );
};
