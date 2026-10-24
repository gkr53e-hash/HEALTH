import React, { useState } from 'react';
import {
  Sparkles,
  Crosshair,
  PhoneCall,
  Building2,
  Ambulance,
  HeartPulse,
  Clock,
  ShieldCheck,
  CheckCircle2,
  X,
  MapPin,
  AlertTriangle,
} from 'lucide-react';
import { api, EmergencyHospital } from '../services/api';
import { BookingRequest } from '../types/lab';

interface EmergencyViewProps {
  onOpenAI: () => void;
  onOpenLocation: () => void;
  selectedLocationName: string;
  onBookingSuccess: (booking: BookingRequest) => void;
}

export const EmergencyView: React.FC<EmergencyViewProps> = ({
  onOpenAI,
  onOpenLocation,
  selectedLocationName,
  onBookingSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<'hospitals' | 'ambulances'>('hospitals');
  const [selectedHospital, setSelectedHospital] = useState<EmergencyHospital | null>(null);
  const [bedType, setBedType] = useState<'ICU' | 'Ventilator' | 'General' | 'NICU'>('ICU');
  const [dispatchAmbulance, setDispatchAmbulance] = useState(true);
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');
  const [reservationConfirmed, setReservationConfirmed] = useState<any | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const hospitals: EmergencyHospital[] = [
    {
      id: 'hosp-1',
      name: 'AIIMS Patna',
      area: 'Phulwari Sharif, Patna',
      distanceKm: 4.2,
      beds: { general: 22, icu: 6, nicu: 3, ventilator: 4, total: 35 },
      phone: '+91 612 2451000',
      traumaLevel: 'Level 1 Trauma Care',
    },
    {
      id: 'hosp-2',
      name: 'Paras HMRI Hospital',
      area: 'Bailey Road, Patna',
      distanceKm: 1.8,
      beds: { general: 18, icu: 5, nicu: 2, ventilator: 3, total: 28 },
      phone: '+91 612 7107777',
      traumaLevel: '24x7 Cardiac & Neuro Emergency',
    },
    {
      id: 'hosp-3',
      name: 'Ruban Memorial Hospital',
      area: 'Patliputra Colony',
      distanceKm: 2.6,
      beds: { general: 15, icu: 3, nicu: 1, ventilator: 2, total: 21 },
      phone: '+91 612 2271000',
      traumaLevel: 'Multispecialty Critical Care',
    },
    {
      id: 'hosp-4',
      name: 'Big Apollo Spectra',
      area: 'Kankarbagh, Patna',
      distanceKm: 3.4,
      beds: { general: 20, icu: 5, nicu: 2, ventilator: 3, total: 30 },
      phone: '+91 612 3500100',
      traumaLevel: 'Surgical Emergency & ICU',
    },
    {
      id: 'hosp-5',
      name: 'Medanta Superspeciality',
      area: 'Kankarbagh',
      distanceKm: 3.9,
      beds: { general: 22, icu: 6, nicu: 2, ventilator: 3, total: 33 },
      phone: '+91 612 3505000',
      traumaLevel: 'Comprehensive Heart & Stroke Unit',
    },
  ];

  const ambulanceTiers = [
    {
      tier: 'Basic Life Support (BLS)',
      eta: '< 8 mins',
      features: 'Trained EMT Paramedic, Oxygen Cylinder, Stretcher, First Aid & Vitals Kit',
      type: 'BLS',
    },
    {
      tier: 'Advanced Life Support (ALS)',
      eta: '< 10 mins',
      features: 'Defibrillator, Multi-para Monitor, Portable Transport Ventilator, IV Fluids',
      type: 'ALS',
    },
    {
      tier: 'ICU on Wheels',
      eta: '< 12 mins',
      features: 'Critical Care Doctor on-board, Invasive Arterial Line, Syringe Infusion Pumps',
      type: 'ICU',
    },
    {
      tier: 'Neonatal ICU (NICU)',
      eta: '< 14 mins',
      features: 'Warmed Baby Transport Incubator, Neonatal Pulse Ox & Resuscitation Suite',
      type: 'NICU',
    },
  ];

  const handleReserveClick = (hosp: EmergencyHospital) => {
    setSelectedHospital(hosp);
    setReservationConfirmed(null);
    setError('');
  };

  const handleConfirmReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim()) {
      setError('Please enter patient name');
      return;
    }
    if (patientPhone.replace(/\D/g, '').length !== 10) {
      setError('Please enter 10-digit emergency contact phone');
      return;
    }
    if (dispatchAmbulance && !pickupAddress.trim()) {
      setError('Please enter patient pickup address for ambulance dispatch');
      return;
    }

    setSubmitting(true);
    const newBooking: any = {
      id: `EMERG-${Math.floor(10000 + Math.random() * 90000)}`,
      type: 'emergency',
      labId: selectedHospital!.id,
      labName: selectedHospital!.name,
      labArea: selectedHospital!.area,
      labAddress: selectedHospital!.area,
      tests: [
        {
          testId: 'bed-res',
          name: `${bedType} Bed Hold + ${dispatchAmbulance ? 'Emergency Ambulance Dispatch' : 'Direct ER Arrival'}`,
          price: 0,
          category: 'Cardiology',
        },
      ],
      mode: dispatchAmbulance ? 'home' : 'centre',
      slotDate: 'Immediate',
      slotTime: '24x7 Priority Hold (30 mins reserve window)',
      patientName: patientName.trim(),
      patientPhone: patientPhone.trim(),
      patientAge: '45',
      patientGender: 'Male',
      address: dispatchAmbulance ? pickupAddress.trim() : selectedHospital!.area,
      subtotal: 0,
      collectionFee: 0,
      totalAmount: 0,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };

    await api.createBooking(newBooking);

    setTimeout(() => {
      setSubmitting(false);
      setReservationConfirmed(newBooking);
      onBookingSuccess(newBooking);
    }, 400);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
        <div>
          <span className="text-xs font-black tracking-widest uppercase text-red-600 block mb-2">
            EMERGENCY CARE
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Bed reservation & ambulance dispatch
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2 font-medium">
            Reserve a bed before the ambulance departs.
          </p>
        </div>

        {/* Big Call 108 Button */}
        <div className="flex items-center gap-3">
          <a
            href="tel:108"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-black text-base rounded-2xl shadow-lg shadow-red-600/30 transition-all cursor-pointer"
          >
            <PhoneCall className="w-5 h-5 fill-white" />
            <span>Call 108</span>
          </a>
        </div>
      </div>

      {/* Top action pills */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <button
          onClick={onOpenAI}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:border-teal-500 rounded-2xl text-xs sm:text-sm font-bold text-slate-800 shadow-xs cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-teal-600" />
          <span>Ask OneCare Special AI first</span>
        </button>

        <button
          onClick={onOpenLocation}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:border-slate-300 rounded-2xl text-xs sm:text-sm font-bold text-slate-800 shadow-xs cursor-pointer"
        >
          <Crosshair className="w-4 h-4 text-slate-600" />
          <span>{selectedLocationName}</span>
        </button>
      </div>

      {/* Tabs: Hospital & Bed | Ambulance */}
      <div className="inline-flex p-1 bg-slate-200/80 rounded-2xl mb-8">
        <button
          onClick={() => setActiveTab('hospitals')}
          className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'hospitals'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Hospital & Bed
        </button>
        <button
          onClick={() => setActiveTab('ambulances')}
          className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'ambulances'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Ambulance
        </button>
      </div>

      {/* Hospital Cards View */}
      {activeTab === 'hospitals' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hospitals.map((hosp) => (
            <div
              key={hosp.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-200"
            >
              <div>
                <div className="flex items-start gap-3.5 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600 shrink-0">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">{hosp.name}</h3>
                    <p className="text-xs text-slate-500">{hosp.area}</p>
                  </div>
                </div>

                {/* Bed numbers grid matching medhone-emergency.png */}
                <div className="grid grid-cols-4 gap-2 text-center py-3 border-y border-slate-100 my-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">General</span>
                    <span className="text-lg font-black text-slate-900">{hosp.beds.general}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">ICU</span>
                    <span className="text-lg font-black text-slate-900">{hosp.beds.icu}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">NICU</span>
                    <span className="text-lg font-black text-slate-900">{hosp.beds.nicu}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Ventilator</span>
                    <span className="text-lg font-black text-slate-900">{hosp.beds.ventilator}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-full">
                  {hosp.beds.total} beds
                </span>
                <button
                  onClick={() => handleReserveClick(hosp)}
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-red-600/25 cursor-pointer"
                >
                  Reserve
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Ambulance Dispatch View */}
      {activeTab === 'ambulances' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ambulanceTiers.map((amb, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs hover:border-red-300 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                      <Ambulance className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-extrabold text-slate-900">{amb.tier}</h4>
                      <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> Average ETA: {amb.eta}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-slate-600 mb-4">{amb.features}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">Government 108 Emergency Network</span>
                <button
                  onClick={() => handleReserveClick(hospitals[0])}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  Dispatch Ambulance
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bed Reservation Modal */}
      {selectedHospital && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-200"
          onClick={() => setSelectedHospital(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-red-100 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedHospital(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            {reservationConfirmed ? (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 ring-8 ring-red-50">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-black text-slate-900">Emergency Bed Reserved!</h3>
                <p className="text-xs text-slate-500 mt-1 mb-4">
                  Pass ID: <strong className="font-mono text-red-600">{reservationConfirmed.id}</strong>
                </p>
                <div className="bg-red-50/50 rounded-2xl p-4 text-left text-xs space-y-2 border border-red-200 mb-5">
                  <p><strong>Hospital:</strong> {selectedHospital.name} ({selectedHospital.area})</p>
                  <p><strong>Bed Reserved:</strong> {bedType} Bed (Priority 30-min window)</p>
                  <p><strong>Ambulance:</strong> {dispatchAmbulance ? 'Live GPS Dispatch Initiated' : 'Self ER Handover'}</p>
                  <p className="text-red-700 font-bold">Show Pass ID at Hospital Emergency Gate for zero-wait triage.</p>
                </div>
                <button
                  onClick={() => setSelectedHospital(null)}
                  className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-sm shadow-md shadow-red-600/30"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleConfirmReservation} className="space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">{selectedHospital.name}</h3>
                    <p className="text-xs text-slate-500">{selectedHospital.area} • {selectedHospital.traumaLevel}</p>
                  </div>
                </div>

                {/* Choose Bed Type */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Select Bed Type</label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {(['ICU', 'Ventilator', 'General', 'NICU'] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setBedType(t)}
                        className={`py-2 text-xs font-bold rounded-xl border text-center transition-all cursor-pointer ${
                          bedType === t
                            ? 'bg-red-600 text-white border-red-600 shadow-xs'
                            : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Ambulance toggle */}
                <label className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dispatchAmbulance}
                    onChange={(e) => setDispatchAmbulance(e.target.checked)}
                    className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                  />
                  <span>Dispatch nearest 108 Emergency Ambulance</span>
                </label>

                {/* Patient details */}
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Patient Name"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:ring-2 focus:ring-red-600"
                  />
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="Contact Phone"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>

                {dispatchAmbulance && (
                  <input
                    type="text"
                    required
                    placeholder="Patient Current Location / Pickup Address"
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:ring-2 focus:ring-red-600"
                  />
                )}

                {error && <p className="text-xs text-red-600 font-semibold">{error}</p>}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-red-600/30 cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? 'Reserving...' : 'Confirm Emergency Bed Reservation'}
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
