import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Stethoscope, 
  Plus, 
  CheckCircle2, 
  XCircle, 
  PlayCircle, 
  Filter, 
  Check, 
  X,
  AlertCircle,
  CalendarCheck
} from 'lucide-react';

export default function AppointmentsView({ 
  appointments, 
  doctors, 
  patients, 
  onAddAppointment, 
  onUpdateAppointmentStatus,
  showBookingModal,
  setShowBookingModal
}) {
  const [selectedDoctorId, setSelectedDoctorId] = useState(doctors[0]?.id || '');
  const [selectedDate, setSelectedDate] = useState('2026-09-22');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('09:00 AM');
  const [selectedPatientId, setSelectedPatientId] = useState(patients[0]?.id || '');
  const [appointmentType, setAppointmentType] = useState('Routine Checkup');
  const [visitNotes, setVisitNotes] = useState('');

  const [statusFilter, setStatusFilter] = useState('All');

  const availableSlots = [
    '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', 
    '10:30 AM', '11:15 AM', '01:30 PM', '02:00 PM', 
    '03:00 PM', '03:45 PM', '04:30 PM'
  ];

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const doctorObj = doctors.find(d => d.id === selectedDoctorId);
    const patientObj = patients.find(p => p.id === selectedPatientId);

    if (!doctorObj || !patientObj) return;

    const newAppointment = {
      id: `APT-${Math.floor(900 + Math.random() * 100)}`,
      patientId: patientObj.id,
      patientName: patientObj.name,
      doctorId: doctorObj.id,
      doctorName: doctorObj.name,
      specialty: doctorObj.specialty,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      type: appointmentType,
      status: 'Scheduled',
      notes: visitNotes || `${appointmentType} consultation scheduled.`
    };

    onAddAppointment(newAppointment);
    setShowBookingModal(false);
    setVisitNotes('');
  };

  const filteredAppointments = appointments.filter(apt => {
    if (statusFilter === 'All') return true;
    return apt.status === statusFilter;
  });

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      
      {/* Top Banner & Booking Trigger */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md mb-2">
            <CalendarCheck className="w-3 h-3 mr-1" /> Slot Management Engine
          </span>
          <h2 className="text-xl font-black">Outpatient & Triage Appointment Scheduling</h2>
          <p className="text-xs opacity-90 mt-1 max-w-xl">
            Book consultations with available specialists, pick optimal time slots, and monitor real-time queue statuses.
          </p>
        </div>

        <button
          onClick={() => setShowBookingModal(true)}
          className="px-5 py-2.5 rounded-xl bg-white text-cyan-600 hover:bg-cyan-50 font-bold text-xs shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Book New Appointment</span>
        </button>
      </div>

      {/* Doctor Slot Picker Visual Matrix */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Stethoscope className="w-5 h-5 text-cyan-500" /> Specialist Roster & Available Slots
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {doctors.map(doc => {
            const isSelected = selectedDoctorId === doc.id;
            return (
              <div
                key={doc.id}
                onClick={() => setSelectedDoctorId(doc.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                  isSelected
                    ? 'border-cyan-500 bg-cyan-50/40 dark:bg-cyan-950/30 ring-2 ring-cyan-500/30 shadow-md'
                    : 'border-slate-200 dark:border-slate-800 hover:border-cyan-300'
                }`}
              >
                <img src={doc.avatar} alt={doc.name} className="w-12 h-12 rounded-xl object-cover ring-2 ring-cyan-500/30" />
                <div className="flex-1 overflow-hidden">
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs truncate">{doc.name}</h4>
                  <p className="text-[11px] font-semibold text-cyan-600 dark:text-cyan-400">{doc.specialty}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${
                      doc.status === 'Available' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950' : 'bg-amber-100 text-amber-600'
                    }`}>
                      {doc.status}
                    </span>
                    <span className="text-[10px] text-slate-400">{doc.room}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Appointment Management Table & Queue */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        
        {/* Table Header & Filter Tabs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" /> Appointment Queue & Live Statuses
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Manage patient intake, consultation progress & completion</p>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
            {['All', 'Scheduled', 'In Progress', 'Completed', 'Cancelled'].map(st => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  statusFilter === st ? 'bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-400 shadow-xs' : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Appointments Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Time & Date</th>
                <th className="py-3 px-4">Patient Name</th>
                <th className="py-3 px-4">Assigned Doctor</th>
                <th className="py-3 px-4">Visit Type</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-10 text-center text-slate-400">
                    No appointments found for filter standard.
                  </td>
                </tr>
              ) : (
                filteredAppointments.map(apt => (
                  <tr key={apt.id} className="hover:bg-cyan-50/30 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 rounded-lg bg-cyan-50 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400 font-mono">
                          {apt.timeSlot}
                        </span>
                        <span className="text-[11px] text-slate-400 font-normal">{apt.date}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 dark:text-slate-100">{apt.patientName}</div>
                      <div className="text-[10px] text-slate-400">{apt.patientId}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 dark:text-slate-100">{apt.doctorName}</div>
                      <div className="text-[10px] text-cyan-600 dark:text-cyan-400 font-semibold">{apt.specialty}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                        {apt.type}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        apt.status === 'In Progress'
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400 border border-amber-500/20 animate-pulse'
                          : apt.status === 'Completed'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 border border-emerald-500/20'
                          : apt.status === 'Cancelled'
                          ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400 border border-rose-500/20'
                          : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400 border border-blue-500/20'
                      }`}>
                        {apt.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {apt.status === 'Scheduled' && (
                          <button
                            onClick={() => onUpdateAppointmentStatus(apt.id, 'In Progress')}
                            className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-bold text-[11px] transition-colors flex items-center gap-1"
                          >
                            <PlayCircle className="w-3.5 h-3.5" /> Start
                          </button>
                        )}
                        {(apt.status === 'Scheduled' || apt.status === 'In Progress') && (
                          <button
                            onClick={() => onUpdateAppointmentStatus(apt.id, 'Completed')}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] transition-colors flex items-center gap-1"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" /> Complete
                          </button>
                        )}
                        {apt.status !== 'Cancelled' && apt.status !== 'Completed' && (
                          <button
                            onClick={() => onUpdateAppointmentStatus(apt.id, 'Cancelled')}
                            className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors"
                            title="Cancel Appointment"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* MODAL: BOOK APPOINTMENT MODAL */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                  <CalendarIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Schedule New Appointment</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Select doctor, patient & preferred time slot</p>
                </div>
              </div>
              <button onClick={() => setShowBookingModal(false)} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Select Patient *</label>
                <select
                  value={selectedPatientId}
                  onChange={(e) => setSelectedPatientId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  {patients.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.id}) - {p.diagnosis}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Select Attending Specialist *</label>
                <select
                  value={selectedDoctorId}
                  onChange={(e) => setSelectedDoctorId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  {doctors.map(d => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.specialty}) - {d.status}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Appointment Date *</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Visit Type</label>
                  <select
                    value={appointmentType}
                    onChange={(e) => setAppointmentType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="Routine Checkup">Routine Checkup</option>
                    <option value="Follow-Up">Follow-Up</option>
                    <option value="Emergency Triage">Emergency Triage</option>
                    <option value="In-Person Consultation">In-Person Consultation</option>
                  </select>
                </div>
              </div>

              {/* Time Slot Selector Grid */}
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Pick Time Slot *</label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {availableSlots.map(slot => {
                    const isSelected = selectedTimeSlot === slot;
                    return (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`py-2 rounded-xl font-bold text-xs border transition-all ${
                          isSelected
                            ? 'bg-cyan-500 text-white border-cyan-500 shadow-md'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-cyan-400'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Consultation Reason / Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Follow-up on chest discomfort symptoms"
                  value={visitNotes}
                  onChange={(e) => setVisitNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-md shadow-cyan-500/20 hover:scale-105 transition-transform"
                >
                  Confirm Slot Booking
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
