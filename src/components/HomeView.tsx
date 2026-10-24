import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  PhoneCall,
  Activity,
  Video,
  FlaskConical,
  Ambulance,
  Building2,
  Clock,
  ShieldCheck,
  CheckCircle,
  FileText,
  MapPin,
  HeartPulse,
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (tab: string) => void;
  onOpenAI: () => void;
  onOpenSOS: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenAI,
  onOpenSOS,
}) => {
  const [activeStoryTab, setActiveStoryTab] = useState<'triage' | 'opd' | 'labs' | 'ambulance'>('triage');

  return (
    <div className="bg-[#030914] text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28 border-b border-slate-800">
        {/* Glow ambient backgrounds */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-950/80 border border-teal-500/30 text-teal-300 text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span>AI-powered healthcare • Patna & beyond</span>
              </div>

              {/* Brand Logo inside hero */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center font-black text-2xl text-white shadow-lg shadow-teal-500/20">
                  O
                </div>
                <div>
                  <div className="text-2xl font-black tracking-tight">
                    OneCare <span className="text-teal-400">Special</span>
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    One Platform, Every Care
                  </div>
                </div>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
                Two ecosystems.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-300 to-sky-400">
                  One AI care platform.
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
                From OPD consultation and AI prescription reading to home lab collection, pharmacy delivery, emergency bed reservation and ambulance dispatch — OneCare Special connects your entire treatment journey in real time.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  onClick={onOpenAI}
                  className="px-5 py-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-sm flex items-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-teal-600" />
                  <span>Ask OneCare Special AI</span>
                </button>

                <button
                  onClick={() => onNavigate('opd')}
                  className="px-5 py-3 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-sm flex items-center gap-2 transition-all shadow-lg shadow-teal-600/30 active:scale-98 cursor-pointer"
                >
                  <span>Book OPD Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('emergency')}
                  className="px-5 py-3 rounded-2xl border border-red-500/40 bg-red-950/20 hover:bg-red-900/30 text-red-300 font-extrabold text-sm flex items-center gap-2 transition-all active:scale-98 cursor-pointer"
                >
                  <Ambulance className="w-4 h-4 text-red-400" />
                  <span>Emergency Care</span>
                </button>
              </div>

              {/* Stats */}
              <div className="pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-4">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-teal-400">24×7</div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                    Emergency Desk
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-cyan-400">&lt; 12min</div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                    Ambulance ETA
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-teal-300">4 tier</div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                    Ambulance Types
                  </div>
                </div>
              </div>
            </div>

            {/* Right Graphic Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-slate-700/60 shadow-2xl bg-slate-900 group">
                <img
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800"
                  alt="Doctor consultation"
                  className="w-full h-96 sm:h-[430px] object-cover object-top opacity-85 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                {/* Floating tags */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700 text-teal-400 text-xs font-bold flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5" />
                    VIDEO OPD LIVE
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
                  <div className="p-3.5 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center">
                      <HeartPulse className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase text-slate-400">
                        Live beds available
                      </div>
                      <div className="text-xl font-black text-white">137</div>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate('lab-tests')}
                    className="px-4 py-3 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs transition-all shadow-md cursor-pointer flex items-center gap-1.5 shrink-0"
                  >
                    <FlaskConical className="w-4 h-4" />
                    <span>Book Tests</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Ecosystem Story Tabs */}
      <section className="py-16 sm:py-24 border-b border-slate-800 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto mb-10">
            <span className="text-xs font-black uppercase tracking-widest text-teal-400 mb-2 block">
              PATIENT JOURNEY
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              One seamless flow for every care need
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Watch how a patient goes from AI triage → video OPD → home lab tests → medicine delivery, and how one tap reserves an ICU bed with live ambulance tracking.
            </p>
          </div>

          {/* Interactive Navigation Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto mb-8">
            {[
              { id: 'triage', label: 'AI Triage', icon: Sparkles, tab: 'ai-care' },
              { id: 'opd', label: 'Video OPD', icon: Video, tab: 'opd' },
              { id: 'labs', label: 'Home Lab Tests', icon: FlaskConical, tab: 'lab-tests' },
              { id: 'ambulance', label: 'Live Ambulance', icon: Ambulance, tab: 'emergency' },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeStoryTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveStoryTab(item.id as any);
                    onNavigate(item.tab);
                  }}
                  className={`p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-2 ${
                    isActive
                      ? 'bg-teal-950/80 border-teal-500 text-teal-300 shadow-lg shadow-teal-500/10'
                      : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <Icon className="w-5 h-5 text-teal-400" />
                  <span className="text-xs font-bold">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Interactive Journey Preview Image */}
          <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden border border-slate-800 relative group shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200"
              alt="OneCare Special Ecosystem"
              className="w-full h-80 sm:h-[420px] object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent flex items-end p-8">
              <div className="text-left max-w-xl">
                <span className="text-xs font-extrabold text-teal-400 uppercase tracking-widest">
                  Integrated Clinical Workflow
                </span>
                <h3 className="text-2xl font-black text-white mt-1">
                  Connected care from home to hospital
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2">
                  No repeating medical history, no manual paperwork. Your digital prescription auto-routes lab orders and emergency bed holds across Patna's top hospitals.
                </p>
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => onNavigate('lab-tests')}
                    className="px-4 py-2 bg-teal-500 text-slate-950 rounded-xl font-bold text-xs"
                  >
                    Explore Lab Tests
                  </button>
                  <button
                    onClick={() => onNavigate('opd')}
                    className="px-4 py-2 bg-slate-800 text-white rounded-xl font-bold text-xs border border-slate-700"
                  >
                    Browse OPD Doctors
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dual Ecosystems Grid Section */}
      <section className="py-16 sm:py-24 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-teal-400 block mb-2">
              COMPLETE NETWORK
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              A dedicated ecosystem for every moment
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Primary care for planned journeys. Emergency care for critical moments. Both connected by one intelligent workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Primary Care Ecosystem */}
            <div className="bg-slate-900/60 rounded-3xl border border-slate-800 p-8 flex flex-col justify-between hover:border-teal-500/40 transition-colors">
              <div>
                <span className="px-3 py-1 bg-teal-950 text-teal-400 text-xs font-bold rounded-full border border-teal-800/80 inline-block mb-4">
                  Primary Care
                </span>
                <h3 className="text-2xl font-black text-white mb-2">
                  OPD → Rx → Tests → Pharmacy → Follow-up
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mb-6">
                  Book a video or clinic OPD. Our AI prescription reader auto-routes tests and medicines to the right partner — with home collection and delivery.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300 mb-6">
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>Book OPD (video / clinic)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>AI reads prescription</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FlaskConical className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>Lab test with home collection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>Medicine home delivery</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onNavigate('lab-tests')}
                className="w-full py-3 bg-teal-600 hover:bg-teal-500 text-white font-extrabold rounded-2xl text-xs sm:text-sm transition-all shadow-md cursor-pointer text-center"
              >
                Book Diagnostic Lab Tests
              </button>
            </div>

            {/* Emergency Care Ecosystem */}
            <div className="bg-slate-900/60 rounded-3xl border border-slate-800 p-8 flex flex-col justify-between hover:border-red-500/40 transition-colors">
              <div>
                <span className="px-3 py-1 bg-red-950 text-red-400 text-xs font-bold rounded-full border border-red-800/80 inline-block mb-4">
                  Emergency Care
                </span>
                <h3 className="text-2xl font-black text-white mb-2">
                  Bed reservation → Ambulance → Hospital transfer
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mb-6">
                  Reserve an ICU / NICU / general bed before the ambulance leaves. Choose Basic, ALS or ICU ambulance — track dispatch to arrival.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300 mb-6">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-red-400 shrink-0" />
                    <span>Select hospital & bed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ambulance className="w-4 h-4 text-red-400 shrink-0" />
                    <span>Pick ambulance tier</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-red-400 shrink-0" />
                    <span>Live pickup & transfer</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-red-400 shrink-0" />
                    <span>Priority handover at ER</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onNavigate('emergency')}
                className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-extrabold rounded-2xl text-xs sm:text-sm transition-all shadow-md shadow-red-600/30 cursor-pointer text-center"
              >
                Emergency Access (108 SOS)
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
