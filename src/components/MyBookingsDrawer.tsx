import React from 'react';
import { X, Calendar, Clock, MapPin, CheckCircle, FileText, Download, AlertTriangle, ArrowRight, Home } from 'lucide-react';
import { BookingRequest } from '../types/lab';
import { formatCurrency } from '../utils/labBookingLogic';

interface MyBookingsDrawerProps {
  bookings: BookingRequest[];
  isOpen: boolean;
  onClose: () => void;
  onCancelBooking: (id: string) => void;
}

export const MyBookingsDrawer: React.FC<MyBookingsDrawerProps> = ({
  bookings,
  isOpen,
  onClose,
  onCancelBooking,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-black text-slate-900">My Lab Bookings</h2>
            <p className="text-xs text-slate-500">Track sample collection & reports</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {bookings.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-900">No bookings yet</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1 mb-6">
                You haven't scheduled any lab tests yet. Choose from certified partner labs to book a home sample collection or centre visit.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl text-xs transition-all cursor-pointer shadow-xs"
              >
                Explore Lab Tests
              </button>
            </div>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3 relative overflow-hidden"
              >
                {/* Status bar */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-slate-400">
                    {booking.id}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold ${
                      booking.status === 'Cancelled'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : booking.status === 'Completed'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-teal-50 text-teal-800 border border-teal-200'
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{booking.labName}</h4>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                    <span className="flex items-center gap-1 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-teal-600" />
                      {booking.slotDate}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-teal-600" />
                      {booking.slotTime}
                    </span>
                  </div>
                </div>

                {/* Mode & Patient */}
                <div className="p-2.5 bg-slate-50 rounded-xl text-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-600 font-medium">
                    <span className="flex items-center gap-1">
                      <Home className="w-3.5 h-3.5 text-slate-400" />
                      {booking.mode === 'home' ? 'Home Sample Collection' : 'Centre Visit'}
                    </span>
                    <span className="font-bold text-slate-900">
                      {formatCurrency(booking.totalAmount)}
                    </span>
                  </div>
                  <p className="text-slate-500 text-[11px] truncate">
                    Patient: {booking.patientName} ({booking.patientPhone})
                  </p>
                  <p className="text-slate-500 text-[11px] truncate">
                    Address: {booking.address}
                  </p>
                </div>

                {/* Tests List */}
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400">
                    Booked Tests ({booking.tests.length})
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {booking.tests.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[11px] rounded-md font-medium"
                      >
                        {t.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                {booking.status !== 'Cancelled' && (
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => {
                        const sampleReport = `MEDHONE DIAGNOSTIC REPORT\nPatient: ${booking.patientName}\nLab: ${booking.labName}\nTests: ${booking.tests.map((t) => t.name).join(', ')}\nStatus: Verified by Pathologist.`;
                        const blob = new Blob([sampleReport], { type: 'text/plain' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `${booking.id}-acknowledgement.txt`;
                        a.click();
                      }}
                      className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 hover:text-teal-900 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Receipt</span>
                    </button>

                    <button
                      onClick={() => onCancelBooking(booking.id)}
                      className="text-xs font-semibold text-rose-600 hover:text-rose-800 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
