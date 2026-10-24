import React from 'react';
import { CheckCircle2, Calendar, Clock, MapPin, Download, Share2, ArrowRight, ShieldCheck, PhoneCall } from 'lucide-react';
import { BookingRequest } from '../types/lab';
import { formatCurrency } from '../utils/labBookingLogic';

interface BookingSuccessModalProps {
  booking: BookingRequest;
  onClose: () => void;
  onViewMyBookings: () => void;
}

export const BookingSuccessModal: React.FC<BookingSuccessModalProps> = ({
  booking,
  onClose,
  onViewMyBookings,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 text-center relative max-h-[90vh] overflow-y-auto">
        {/* Animated Check */}
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 ring-8 ring-emerald-50">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-black uppercase tracking-wider rounded-full border border-emerald-200">
          Booking Confirmed
        </span>

        <h2 className="text-2xl font-black text-slate-900 mt-2 mb-1">
          {booking.mode === 'home' ? 'Sample Collection Scheduled!' : 'Centre Visit Booked!'}
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          Booking ID: <strong className="text-slate-800 font-mono">{booking.id}</strong>
        </p>

        {/* Appointment Card */}
        <div className="bg-slate-50 rounded-2xl p-4 text-left border border-slate-200 space-y-3 mb-6">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Laboratory
              </span>
              <p className="text-sm font-black text-slate-900">{booking.labName}</p>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-teal-100 text-teal-800">
              {booking.mode === 'home' ? 'Home Collection' : 'Centre Visit'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-slate-400 block font-medium">Date</span>
              <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-teal-600" />
                {booking.slotDate}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Time Slot</span>
              <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-teal-600" />
                {booking.slotTime}
              </span>
            </div>
          </div>

          <div className="text-xs pt-2 border-t border-slate-200">
            <span className="text-slate-400 block font-medium">Patient</span>
            <p className="font-bold text-slate-800">
              {booking.patientName} ({booking.patientAge} yrs, {booking.patientGender}) • {booking.patientPhone}
            </p>
          </div>

          <div className="text-xs pt-1">
            <span className="text-slate-400 block font-medium">
              {booking.mode === 'home' ? 'Sample Collection Address' : 'Centre Address'}
            </span>
            <p className="font-medium text-slate-700 flex items-start gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span>{booking.address}</span>
            </p>
          </div>

          <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600">Total Paid (Post-Sample)</span>
            <span className="text-base font-black text-teal-700">
              {formatCurrency(booking.totalAmount)}
            </span>
          </div>
        </div>

        {/* Preparation Guide Box */}
        <div className="bg-amber-50 rounded-2xl p-3.5 text-left border border-amber-200 mb-6 text-xs text-amber-900">
          <div className="flex items-center gap-1.5 font-bold mb-1 text-amber-800">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span>Important Guidelines</span>
          </div>
          <ul className="list-disc list-inside space-y-1 text-[11px] text-amber-800">
            <li>Keep 8-10 hours fasting if your tests include Sugar or Lipid profiles.</li>
            <li>Drink sufficient water to stay well hydrated before blood draw.</li>
            <li>Our phlebotomist is vaccinated and uses sealed vacuum collection vacutainers.</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={onViewMyBookings}
            className="w-full sm:flex-1 py-3 px-4 bg-teal-700 hover:bg-teal-800 active:scale-98 text-white rounded-xl font-bold text-sm shadow-md shadow-teal-700/25 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>View in My Bookings</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="w-full sm:w-auto py-3 px-5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-bold text-sm transition-all cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
