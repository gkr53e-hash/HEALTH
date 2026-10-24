import React, { useState } from 'react';
import {
  Sparkles,
  Crosshair,
  Pill,
  Clock,
  MapPin,
  Check,
  Plus,
  ShoppingBag,
  X,
  CheckCircle2,
  Upload,
} from 'lucide-react';
import { api, Pharmacy } from '../services/api';
import { BookingRequest } from '../types/lab';
import { formatCurrency } from '../utils/labBookingLogic';

interface PharmacyViewProps {
  onOpenAI: () => void;
  onOpenLocation: () => void;
  selectedLocationName: string;
  onBookingSuccess: (booking: BookingRequest) => void;
}

export const PharmacyView: React.FC<PharmacyViewProps> = ({
  onOpenAI,
  onOpenLocation,
  selectedLocationName,
  onBookingSuccess,
}) => {
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(null);
  const [selectedMeds, setSelectedMeds] = useState<{ name: string; price: number }[]>([
    { name: 'Paracetamol 650mg (Strip of 15)', price: 45 },
  ]);
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [prescriptionAttached, setPrescriptionAttached] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<any | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const pharmacies: Pharmacy[] = [
    {
      id: 'ph-1',
      name: 'Apollo Pharmacy',
      area: 'Bailey Road',
      deliveryTime: '~45 min delivery',
      rating: 4.8,
      topMedicines: [
        'Paracetamol 650mg (Strip of 15) - ₹45',
        'Azithromycin 500mg (Strip of 5) - ₹120',
        'Cetirizine 10mg (Strip of 10) - ₹35',
        'Pantoprazole 40mg (Strip of 10) - ₹85',
        'Vitamin C + Zinc Tablets - ₹110',
      ],
    },
    {
      id: 'ph-2',
      name: 'MedPlus',
      area: 'Kankarbagh',
      deliveryTime: '~45 min delivery',
      rating: 4.7,
      topMedicines: [
        'Metformin 500mg SR (Strip of 10) - ₹60',
        'Telmisartan 40mg (Strip of 15) - ₹95',
        'Atorvastatin 10mg (Strip of 10) - ₹80',
        'Amoxicillin Clavulanate 625mg - ₹185',
        'Multivitamin Gold Capsules - ₹220',
      ],
    },
    {
      id: 'ph-3',
      name: '1mg Store',
      area: 'Patliputra',
      deliveryTime: '~45 min delivery',
      rating: 4.9,
      topMedicines: [
        'Dolo 650 Tablets (Strip of 15) - ₹40',
        'Digestive Enzyme Syrup 200ml - ₹145',
        'Calcium + D3 Tablets (Strip of 15) - ₹160',
        'ORS Hydration Sachet (Pack of 5) - ₹50',
        'Antiseptic Solution 250ml - ₹90',
      ],
    },
    {
      id: 'ph-4',
      name: 'Netmeds Local',
      area: 'Rajendra Nagar',
      deliveryTime: '~45 min delivery',
      rating: 4.6,
      topMedicines: [
        'Thyronorm 50mcg (Bottle of 120) - ₹190',
        'Pain Relief Gel 30g - ₹75',
        'Steam Inhaler Vaporizer - ₹240',
        'Digital BP Monitor - ₹1250',
        'Pulse Oximeter Fingertip - ₹650',
      ],
    },
  ];

  const handleOrderClick = (ph: Pharmacy) => {
    setSelectedPharmacy(ph);
    setOrderConfirmed(null);
    setError('');
  };

  const handleConfirmOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim()) {
      setError('Please enter recipient name');
      return;
    }
    if (patientPhone.replace(/\D/g, '').length !== 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    if (!deliveryAddress.trim()) {
      setError('Please enter delivery address');
      return;
    }

    setSubmitting(true);
    const subtotal = selectedMeds.reduce((sum, m) => sum + m.price, 0);
    const deliveryFee = 25;
    const totalAmount = subtotal + deliveryFee;

    const newBooking: any = {
      id: `PHARM-${Math.floor(10000 + Math.random() * 90000)}`,
      type: 'pharmacy',
      labId: selectedPharmacy!.id,
      labName: selectedPharmacy!.name,
      labArea: selectedPharmacy!.area,
      labAddress: selectedPharmacy!.area,
      tests: selectedMeds.map((m, i) => ({
        testId: `med-${i}`,
        name: m.name,
        price: m.price,
        category: 'Pathology',
      })),
      mode: 'home',
      slotDate: 'Today',
      slotTime: selectedPharmacy!.deliveryTime,
      patientName: patientName.trim(),
      patientPhone: patientPhone.trim(),
      patientAge: '30',
      patientGender: 'Male',
      address: deliveryAddress.trim(),
      subtotal,
      collectionFee: deliveryFee,
      totalAmount,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };

    await api.createBooking(newBooking);

    setTimeout(() => {
      setSubmitting(false);
      setOrderConfirmed(newBooking);
      onBookingSuccess(newBooking);
    }, 400);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
        <div>
          <span className="text-xs font-black tracking-widest uppercase text-teal-700 block mb-2">
            PHARMACY
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Order medicines home delivered
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2 font-medium">
            Choose a nearby verified pharmacy and get delivery in under an hour.
          </p>
        </div>

        {/* Action Buttons top right */}
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={onOpenAI}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 hover:border-teal-500 hover:bg-teal-50/50 rounded-2xl text-xs sm:text-sm font-bold text-slate-800 transition-all shadow-xs cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span>Ask OneCare Special AI</span>
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

      {/* Pharmacy Cards Grid (Matching medhone-pharmacy.png) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {pharmacies.map((ph) => (
          <div
            key={ph.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-200"
          >
            <div>
              {/* Orange Pill Icon Box */}
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 mb-4">
                <Pill className="w-6 h-6 rotate-45" />
              </div>

              <h3 className="text-base font-extrabold text-slate-900">{ph.name}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{ph.area}</p>

              <div className="mt-3">
                <span className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-full text-[11px] font-semibold text-slate-600">
                  {ph.deliveryTime}
                </span>
              </div>
            </div>

            <div className="pt-6 flex justify-end">
              <button
                onClick={() => handleOrderClick(ph)}
                className="px-5 py-2 bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-bold rounded-xl text-xs sm:text-sm transition-all shadow-xs cursor-pointer"
              >
                Order
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pharmacy Order Modal */}
      {selectedPharmacy && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-200"
          onClick={() => setSelectedPharmacy(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPharmacy(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            {orderConfirmed ? (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-black text-slate-900">Medicine Order Dispatched!</h3>
                <p className="text-xs text-slate-500 mt-1 mb-4">
                  Order ID: <strong className="font-mono text-slate-800">{orderConfirmed.id}</strong>
                </p>
                <div className="bg-slate-50 rounded-2xl p-4 text-left text-xs space-y-2 mb-5">
                  <p><strong>Pharmacy:</strong> {selectedPharmacy.name} ({selectedPharmacy.area})</p>
                  <p><strong>Estimated Arrival:</strong> {selectedPharmacy.deliveryTime}</p>
                  <p><strong>Delivery Address:</strong> {orderConfirmed.address}</p>
                  <p><strong>Total (COD / UPI on Delivery):</strong> {formatCurrency(orderConfirmed.totalAmount)}</p>
                </div>
                <button
                  onClick={() => setSelectedPharmacy(null)}
                  className="w-full py-3 bg-teal-700 hover:bg-teal-800 text-white rounded-xl font-bold text-sm"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleConfirmOrder} className="space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Pill className="w-5 h-5 rotate-45" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">{selectedPharmacy.name}</h3>
                    <p className="text-xs text-slate-500">{selectedPharmacy.area} • {selectedPharmacy.deliveryTime}</p>
                  </div>
                </div>

                {/* Prescription upload */}
                <div className="p-3 bg-slate-50 rounded-2xl border border-dashed border-slate-300 text-center">
                  <Upload className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                  <p className="text-xs font-bold text-slate-700">
                    {prescriptionAttached ? 'Prescription Attached (prescription.jpg)' : 'Upload Doctor Prescription (Optional)'}
                  </p>
                  <button
                    type="button"
                    onClick={() => setPrescriptionAttached(!prescriptionAttached)}
                    className="mt-1 text-[11px] font-bold text-teal-700 hover:underline cursor-pointer"
                  >
                    {prescriptionAttached ? 'Remove file' : '+ Attach file or photo'}
                  </button>
                </div>

                {/* Selected medicines */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Medicines / Health Items</label>
                  <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                    {selectedPharmacy.topMedicines.map((item, idx) => {
                      const [name, priceStr] = item.split(' - ₹');
                      const price = parseInt(priceStr, 10) || 50;
                      const isAdded = selectedMeds.some((m) => m.name === name);
                      return (
                        <div
                          key={idx}
                          onClick={() => {
                            if (isAdded) {
                              setSelectedMeds((prev) => prev.filter((m) => m.name !== name));
                            } else {
                              setSelectedMeds((prev) => [...prev, { name, price }]);
                            }
                          }}
                          className={`p-2.5 rounded-xl border flex items-center justify-between text-xs cursor-pointer transition-colors ${
                            isAdded
                              ? 'border-teal-500 bg-teal-50/50 font-bold text-teal-900'
                              : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <span>{name}</span>
                          <span className="font-mono font-bold">₹{price}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Patient / Recipient Details */}
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Recipient Name"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:ring-2 focus:ring-teal-600"
                  />
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="10-digit Phone"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>

                <input
                  type="text"
                  required
                  placeholder="Delivery Address (House/Flat, Street, Area)"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:ring-2 focus:ring-teal-600"
                />

                {error && <p className="text-xs text-red-600 font-semibold">{error}</p>}

                <div className="pt-2 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 block">Total (incl. ₹25 express fee)</span>
                    <span className="text-lg font-black text-slate-900">
                      ₹{selectedMeds.reduce((s, m) => s + m.price, 0) + 25}
                    </span>
                  </div>
                  <button
                    type="submit"
                    disabled={submitting || selectedMeds.length === 0}
                    className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-sm transition-all shadow-md cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? 'Placing Order...' : 'Confirm Delivery'}
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
