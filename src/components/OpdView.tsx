import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Crosshair,
  Search,
  Star,
  MapPin,
  Video,
  Stethoscope,
  Calendar,
  Clock,
  X,
  CheckCircle2,
  User,
  Phone,
  ShieldCheck,
  Building,
} from 'lucide-react';
import { api, Doctor } from '../services/api';
import { BookingRequest } from '../types/lab';

interface OpdViewProps {
  onOpenAI: () => void;
  onOpenLocation: () => void;
  selectedLocationName: string;
  onBookingSuccess: (booking: BookingRequest) => void;
}

export const OpdView: React.FC<OpdViewProps> = ({
  onOpenAI,
  onOpenLocation,
  selectedLocationName,
  onBookingSuccess,
}) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [searchName, setSearchName] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [loading, setLoading] = useState(true);

  // Doctor booking modal state
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [consultMode, setConsultMode] = useState<'video' | 'clinic'>('video');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [slotDate, setSlotDate] = useState('Tomorrow');
  const [slotTime, setSlotTime] = useState('04:30 PM - 05:00 PM');
  const [bookingConfirmed, setBookingConfirmed] = useState<any | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const specialties = [
    'All',
    'General Physician',
    'Cardiologist',
    'Pediatrician',
    'Orthopedic Surgeon',
    'Gynecologist',
    'Neurologist',
    'Dermatologist',
    'ENT Specialist',
  ];

  const fetchDoctors = async () => {
    setLoading(true);
    const data = await api.getDoctors({
      specialty: selectedSpecialty === 'All' ? undefined : selectedSpecialty,
      search: searchName.trim() || undefined,
    });
    if (data) {
      setDoctors(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDoctors();
  }, [selectedSpecialty]);

  const handleApplyFilter = (e: React.FormEvent) => {
    e.preventDefault();
    fetchDoctors();
  };

  const handleBookDoctor = (doc: Doctor, mode: 'video' | 'clinic') => {
    setSelectedDoctor(doc);
    setConsultMode(mode);
    setBookingConfirmed(null);
    setError('');
  };

  const handleConfirmConsultation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim()) {
      setError('Please enter patient name');
      return;
    }
    if (patientPhone.replace(/\D/g, '').length !== 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    setSubmitting(true);
    const newBooking: any = {
      id: `OPD-${Math.floor(10000 + Math.random() * 90000)}`,
      type: 'doctor',
      labId: selectedDoctor!.id,
      labName: selectedDoctor!.name,
      labArea: selectedDoctor!.location,
      labAddress: consultMode === 'video' ? 'Online Tele-Consult (OneCare Special Video)' : selectedDoctor!.location,
      tests: [
        {
          testId: `doc-${selectedDoctor!.id}`,
          name: `${selectedDoctor!.specialty} (${consultMode === 'video' ? 'Video Call' : 'Clinic Visit'})`,
          price: selectedDoctor!.fee,
          category: 'Cardiology',
        },
      ],
      mode: consultMode === 'video' ? 'home' : 'centre',
      slotDate,
      slotTime,
      patientName: patientName.trim(),
      patientPhone: patientPhone.trim(),
      patientAge: '30',
      patientGender: 'Male',
      address: consultMode === 'video' ? 'Secure HD Video Link will be sent via SMS/WhatsApp' : selectedDoctor!.location,
      subtotal: selectedDoctor!.fee,
      collectionFee: 0,
      totalAmount: selectedDoctor!.fee,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };

    // Save to backend
    await api.createBooking(newBooking);

    setTimeout(() => {
      setSubmitting(false);
      setBookingConfirmed(newBooking);
      onBookingSuccess(newBooking);
    }, 400);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
        <div>
          <span className="text-xs font-black tracking-widest uppercase text-teal-700 block mb-2">
            PRIMARY CARE
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Book OPD consultation
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2 font-medium">
            Choose a specialist for a video call or clinic visit.
          </p>
        </div>

        {/* Action Buttons top right */}
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={onOpenAI}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 hover:border-teal-500 hover:bg-teal-50/50 rounded-2xl text-xs sm:text-sm font-bold text-slate-800 transition-all shadow-xs cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span>Not sure? Ask OneCare Special AI</span>
          </button>

          <button
            onClick={onOpenLocation}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 hover:border-slate-300 rounded-2xl text-xs sm:text-sm font-bold text-slate-800 transition-all shadow-xs cursor-pointer"
          >
            <Crosshair className="w-4 h-4 text-slate-600" />
            <span>{selectedLocationName}</span>
          </button>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <form
        onSubmit={handleApplyFilter}
        className="bg-white rounded-3xl border border-slate-200 p-5 mb-8 shadow-xs"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-7">
            <label className="text-xs font-bold text-slate-700 block mb-1">Search doctor</label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Name..."
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm font-medium outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>
          </div>

          <div className="md:col-span-3">
            <label className="text-xs font-bold text-slate-700 block mb-1">Specialization</label>
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-teal-600"
            >
              {specialties.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2 pt-5">
            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-bold transition-all shadow-xs cursor-pointer"
            >
              Apply
            </button>
          </div>
        </div>
      </form>

      {/* Doctor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-200"
          >
            <div>
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={doc.avatar}
                  alt={doc.name}
                  className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-slate-100 shadow-xs"
                />
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">{doc.name}</h3>
                  <p className="text-xs font-semibold text-teal-700 mt-0.5">{doc.specialty}</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-1 font-medium">
                    <span className="flex items-center gap-1 font-bold text-slate-800">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      {doc.rating}
                    </span>
                    <span>•</span>
                    <span>{doc.experience}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{doc.location}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-lg font-black text-slate-900">₹ {doc.fee}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleBookDoctor(doc, 'video')}
                  className="px-3.5 py-2 text-xs font-bold text-slate-800 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Video className="w-3.5 h-3.5 text-teal-600" />
                  <span>Video</span>
                </button>
                <button
                  onClick={() => handleBookDoctor(doc, 'clinic')}
                  className="px-3.5 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Stethoscope className="w-3.5 h-3.5" />
                  <span>Clinic</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Doctor Booking Modal */}
      {selectedDoctor && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-200"
          onClick={() => setSelectedDoctor(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedDoctor(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            {bookingConfirmed ? (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-black text-slate-900">Consultation Scheduled!</h3>
                <p className="text-xs text-slate-500 mt-1 mb-4">
                  Appointment ID: <strong className="font-mono text-slate-800">{bookingConfirmed.id}</strong>
                </p>
                <div className="bg-slate-50 rounded-2xl p-4 text-left text-xs space-y-2 mb-5">
                  <p><strong>Doctor:</strong> {selectedDoctor.name} ({selectedDoctor.specialty})</p>
                  <p><strong>Date & Time:</strong> {bookingConfirmed.slotDate} • {bookingConfirmed.slotTime}</p>
                  <p><strong>Mode:</strong> {consultMode === 'video' ? 'Secure Tele-Consult Video Call' : 'In-Clinic Visit'}</p>
                  <p><strong>Fee:</strong> ₹{selectedDoctor.fee}</p>
                </div>
                <button
                  onClick={() => setSelectedDoctor(null)}
                  className="w-full py-3 bg-teal-700 hover:bg-teal-800 text-white rounded-xl font-bold text-sm"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleConfirmConsultation} className="space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <img
                    src={selectedDoctor.avatar}
                    alt={selectedDoctor.name}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">{selectedDoctor.name}</h3>
                    <p className="text-xs text-teal-700 font-semibold">{selectedDoctor.specialty}</p>
                  </div>
                </div>

                {/* Mode toggle */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Consultation Mode</label>
                  <div className="flex rounded-xl p-1 bg-slate-100 border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setConsultMode('video')}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                        consultMode === 'video' ? 'bg-teal-700 text-white shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      Video Consultation
                    </button>
                    <button
                      type="button"
                      onClick={() => setConsultMode('clinic')}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                        consultMode === 'clinic' ? 'bg-teal-700 text-white shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      In-Clinic Visit
                    </button>
                  </div>
                </div>

                {/* Patient inputs */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Patient Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Full name"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="10-digit mobile number"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>

                {error && <p className="text-xs text-red-600 font-semibold">{error}</p>}

                <div className="pt-2 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 block">Consultation Fee</span>
                    <span className="text-lg font-black text-slate-900">₹ {selectedDoctor.fee}</span>
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl text-sm transition-all shadow-md cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? 'Confirming...' : 'Confirm Appointment'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
