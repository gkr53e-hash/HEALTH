import React from 'react';
import { PhoneCall, AlertTriangle, X, ShieldAlert, HeartPulse, Ambulance } from 'lucide-react';

interface SosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SosModal: React.FC<SosModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const helplines = [
    { title: 'National Emergency Ambulance', number: '108', desc: 'Free 24x7 Ambulance Dispatch across India' },
    { title: 'Police Assistance', number: '112', desc: 'Unified Emergency Services Helpline' },
    { title: 'Women & Child Helpline', number: '1091', desc: 'Emergency response for women in distress' },
    { title: 'MedHOne Emergency Desk', number: '1800-208-1080', desc: 'Dedicated ICU bed & critical pathology helpline' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-rose-100 relative text-left"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 cursor-pointer"
          aria-label="Close emergency modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
            <Ambulance className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider bg-red-600 text-white rounded-md">
                Critical Care
              </span>
            </div>
            <h3 className="text-xl font-black text-slate-900">108 Emergency SOS</h3>
          </div>
        </div>

        <p className="text-xs text-slate-600 mb-5">
          If you or someone nearby is experiencing acute chest pain, severe trauma, stroke symptoms, or breathing distress, tap below to call immediately.
        </p>

        {/* Big Call 108 Button */}
        <a
          href="tel:108"
          className="w-full py-4 px-6 bg-red-600 hover:bg-red-700 active:scale-98 text-white rounded-2xl font-black text-base flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 transition-all cursor-pointer mb-5"
        >
          <PhoneCall className="w-5 h-5 fill-white" />
          <span>Call 108 Free Ambulance</span>
        </a>

        {/* Other Emergency Numbers */}
        <div className="space-y-2.5">
          <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400 block">
            Emergency Hotlines
          </span>
          {helplines.map((h, idx) => (
            <div
              key={idx}
              className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3"
            >
              <div>
                <p className="text-xs font-bold text-slate-900">{h.title}</p>
                <p className="text-[11px] text-slate-500 font-medium">{h.desc}</p>
              </div>
              <a
                href={`tel:${h.number.replace(/\D/g, '')}`}
                className="px-3 py-1.5 bg-white border border-slate-300 hover:border-red-500 hover:text-red-600 text-slate-800 text-xs font-bold rounded-lg transition-colors shrink-0"
              >
                {h.number}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
