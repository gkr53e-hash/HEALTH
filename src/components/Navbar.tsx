import React, { useState } from 'react';
import { PhoneCall, CalendarCheck, Menu, X, Sparkles, User, ShieldCheck, Stethoscope, ChevronDown } from 'lucide-react';
import { UserProfile } from '../types/user';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  bookingCount: number;
  onOpenMyBookings: () => void;
  onOpenSOS: () => void;
  onOpenAI: () => void;
  currentUser: UserProfile | null;
  onOpenAuth: () => void;
  onOpenRoleDashboard: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  bookingCount,
  onOpenMyBookings,
  onOpenSOS,
  onOpenAI,
  currentUser,
  onOpenAuth,
  onOpenRoleDashboard,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'ai-care', label: 'AI Care', isAI: true },
    { id: 'search', label: 'Search' },
    { id: 'opd', label: 'OPD' },
    { id: 'lab-tests', label: 'Lab Tests' },
    { id: 'pharmacy', label: 'Pharmacy' },
    { id: 'emergency', label: 'Emergency' },
  ];

  const handleNavClick = (id: string, isAI?: boolean) => {
    setMobileMenuOpen(false);
    if (isAI) {
      onOpenAI();
    } else {
      onSelectTab(id);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer group select-none"
            onClick={() => onSelectTab('home')}
            aria-label="OneCare Special Home"
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-teal-600 to-cyan-700 shadow-md shadow-teal-700/20 text-white font-extrabold text-2xl tracking-tighter">
              <span className="relative z-10 flex items-center justify-center font-black">
                O
                <span className="absolute -bottom-0.5 right-1.5 w-2 h-2 rounded-full bg-cyan-300 ring-2 ring-teal-600 animate-pulse"></span>
              </span>
              <svg
                className="absolute inset-0 w-full h-full opacity-35 stroke-white fill-none"
                viewBox="0 0 44 44"
              >
                <path
                  d="M4 22h8l3-7 5 14 4-10 3 5 4-2h9"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 group-hover:text-teal-700 transition-colors">
                  OneCare <span className="text-teal-600">Special</span>
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-teal-50 text-teal-700 rounded-md border border-teal-200">
                  AI Care
                </span>
              </div>
              <span className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
                One Platform, Every Care
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id, link.isAI)}
                  className={`px-3.5 py-2 text-sm font-semibold rounded-full transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-teal-700 text-white shadow-sm shadow-teal-700/30'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Items */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Quick Demo Login Pill */}
            {!currentUser ? (
              <button
                onClick={onOpenAuth}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-black text-teal-800 bg-teal-50 border border-teal-300 rounded-full hover:bg-teal-100 transition-all shadow-xs cursor-pointer group"
                title="1-Click Demo Login as Patient, Doctor, Admin, or Lab"
              >
                <Sparkles className="w-3.5 h-3.5 text-teal-600 group-hover:rotate-12 transition-transform" />
                <span>Demo Login</span>
              </button>
            ) : (
              <div
                onClick={onOpenAuth}
                className="inline-flex items-center gap-2 p-1 pr-2.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer shadow-xs transition-colors"
                title="Click to view profile or switch demo role"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-full object-cover border border-slate-200"
                />
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-extrabold text-slate-900 leading-tight">
                    {currentUser.name.split(' ')[0]}
                  </div>
                  <div className="text-[10px] font-black uppercase text-teal-700 leading-none">
                    {currentUser.role}
                  </div>
                </div>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>
            )}

            {/* Role specific launcher button */}
            {currentUser && (currentUser.role === 'admin' || currentUser.role === 'doctor') && (
              <button
                onClick={onOpenRoleDashboard}
                className={`hidden md:inline-flex items-center gap-1 px-3 py-1.5 text-xs font-extrabold rounded-full text-white shadow-xs transition-transform active:scale-95 cursor-pointer ${
                  currentUser.role === 'admin' ? 'bg-red-600 hover:bg-red-700' : 'bg-cyan-700 hover:bg-cyan-800'
                }`}
              >
                {currentUser.role === 'admin' ? 'Command Center' : 'Doctor Room'}
              </button>
            )}

            {/* My Bookings Pill */}
            {bookingCount > 0 && (
              <button
                onClick={onOpenMyBookings}
                className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-teal-800 bg-teal-50 border border-teal-300 rounded-full hover:bg-teal-100 transition-all shadow-xs cursor-pointer"
                title="View your booked tests & appointments"
              >
                <CalendarCheck className="w-3.5 h-3.5 text-teal-700" />
                <span>Bookings</span>
                <span className="ml-0.5 px-1.5 py-0.2 bg-teal-700 text-white rounded-full text-[10px] font-bold">
                  {bookingCount}
                </span>
              </button>
            )}

            {/* 108 SOS Button */}
            <button
              onClick={onOpenSOS}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs sm:text-sm font-bold text-white bg-red-600 hover:bg-red-700 active:scale-95 transition-all rounded-full shadow-md shadow-red-500/25 cursor-pointer"
              aria-label="Call 108 SOS Emergency"
            >
              <PhoneCall className="w-3.5 h-3.5 fill-white" />
              <span className="tracking-wide font-black">108 SOS</span>
            </button>

            {/* Log In (if not logged in) */}
            {!currentUser && (
              <button
                onClick={onOpenAuth}
                className="hidden md:inline-flex text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 px-2.5 py-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Log in
              </button>
            )}

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id, link.isAI)}
                  className={`py-2.5 px-3 rounded-xl text-left text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-teal-700 text-white font-bold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            {/* Quick Demo Login button in mobile drawer */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-black text-teal-900 bg-teal-50 border border-teal-300 rounded-xl cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>
                {currentUser ? `Switch Role (${currentUser.name})` : 'Demo Login (Patient / Doctor / Admin)'}
              </span>
            </button>

            {bookingCount > 0 && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenMyBookings();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-bold text-teal-800 bg-teal-50 border border-teal-200 rounded-xl"
              >
                <CalendarCheck className="w-4 h-4 text-teal-700" />
                <span>My Bookings ({bookingCount})</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
