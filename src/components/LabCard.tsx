import React from 'react';
import { FlaskConical, MapPin, Star, Home } from 'lucide-react';
import { LabPartner, LabTest } from '../types/lab';

interface LabCardProps {
  lab: LabPartner;
  testsMap: Map<string, LabTest>;
  onSelectLab: (lab: LabPartner) => void;
  onBookHomeCollection: (lab: LabPartner) => void;
  onBookCentreVisit: (lab: LabPartner) => void;
}

export const LabCard: React.FC<LabCardProps> = ({
  lab,
  testsMap,
  onSelectLab,
  onBookHomeCollection,
  onBookCentreVisit,
}) => {
  const displayedTests = lab.popularTestIds
    .map((id) => testsMap.get(id))
    .filter(Boolean) as LabTest[];

  const remainingCount = Math.max(0, lab.allTestIds.length - displayedTests.length);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-lg hover:border-slate-300 transition-all duration-200 group">
      <div>
        {/* Top Header: Icon, Name, Location, Rating, Home Badge */}
        <div className="flex items-start gap-4 mb-4">
          {/* Flask Icon Box */}
          <div
            onClick={() => onSelectLab(lab)}
            className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0 text-teal-700 cursor-pointer group-hover:scale-105 group-hover:bg-teal-100 transition-transform"
          >
            <FlaskConical className="w-7 h-7" />
          </div>

          <div className="flex-1 min-w-0">
            {/* Lab Name */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3
                onClick={() => onSelectLab(lab)}
                className="text-lg font-bold text-slate-900 hover:text-teal-700 transition-colors cursor-pointer truncate"
              >
                {lab.name}
              </h3>
              <span className="text-slate-400 text-xs font-semibold">®</span>
            </div>

            {/* Location & Rating & Home collection badge */}
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <div className="flex items-center text-xs text-slate-500 font-medium">
                <MapPin className="w-3.5 h-3.5 text-slate-400 mr-0.5 shrink-0" />
                <span>{lab.area}</span>
              </div>

              <div className="flex items-center text-xs font-bold text-slate-700">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 mr-1" />
                <span>{lab.rating.toFixed(1)}</span>
              </div>

              {lab.hasHomeCollection && (
                <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold rounded-full">
                  <Home className="w-3 h-3" />
                  <span>Home collection</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Test Pills */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {displayedTests.map((test) => (
            <span
              key={test.id}
              onClick={() => onSelectLab(lab)}
              className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-full hover:bg-slate-100 cursor-pointer transition-colors"
            >
              {test.name.split('(')[0].trim()}
            </span>
          ))}
          {remainingCount > 0 && (
            <span
              onClick={() => onSelectLab(lab)}
              className="px-2 py-1 text-xs font-bold text-slate-600 bg-slate-100 border border-slate-200 rounded-full hover:bg-slate-200 cursor-pointer transition-colors"
              title="Click to view all tests"
            >
              +{remainingCount}
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
        <button
          onClick={() => onBookCentreVisit(lab)}
          className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 hover:text-slate-900 active:scale-98 transition-all cursor-pointer"
        >
          Centre visit
        </button>
        <button
          onClick={() => onBookHomeCollection(lab)}
          className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 active:scale-98 rounded-xl shadow-xs transition-all cursor-pointer"
        >
          Home collection
        </button>
      </div>
    </div>
  );
};
