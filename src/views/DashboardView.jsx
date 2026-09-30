import React from 'react';
import { 
  Users, 
  Calendar, 
  UserCheck, 
  AlertTriangle, 
  TrendingUp, 
  ArrowUpRight, 
  Activity, 
  Clock, 
  CheckCircle2, 
  TestTube, 
  FileText, 
  ChevronRight,
  ShieldAlert,
  HeartPulse,
  Award
} from 'lucide-react';

export default function DashboardView({ 
  patients, 
  appointments, 
  doctors, 
  activities, 
  onNavigate, 
  onViewPatient,
  onOpenAddPatient,
  onOpenAddAppointment
}) {
  const totalPatients = patients.length;
  const todayAppointments = appointments.filter(a => a.date === '2026-09-22');
  const activeDoctors = doctors.filter(d => d.status === 'Available' || d.status === 'In Consultation');
  const criticalAlerts = patients.filter(p => p.vitals?.spO2?.includes('93') || p.status === 'Admitted' && p.diagnosis.includes('Acute'));

  // Department distribution stats
  const departments = [
    { name: 'Cardiology', count: patients.filter(p => p.department === 'Cardiology').length, color: 'bg-cyan-500' },
    { name: 'Neurology', count: patients.filter(p => p.department === 'Neurology').length, color: 'bg-blue-600' },
    { name: 'Pediatrics', count: patients.filter(p => p.department === 'Pediatrics').length, color: 'bg-emerald-500' },
    { name: 'Orthopedics', count: patients.filter(p => p.department === 'Orthopedics').length, color: 'bg-purple-500' },
    { name: 'Internal Med', count: patients.filter(p => p.department === 'Internal Medicine').length, color: 'bg-amber-500' }
  ];

  const maxDeptCount = Math.max(...departments.map(d => d.count), 1);

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      
      {/* Metric Cards Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Total Patients */}
        <div 
          onClick={() => onNavigate('patients')}
          className="group relative p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-bl-full transition-transform group-hover:scale-110 pointer-events-none" />
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center border border-cyan-500/20 shadow-sm">
              <Users className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-500/20">
              <TrendingUp className="w-3 h-3" /> +12%
            </span>
          </div>
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Active Patients</span>
            <div className="text-3xl font-black text-slate-900 dark:text-white flex items-baseline gap-2">
              {totalPatients}
              <span className="text-xs font-normal text-slate-400">EMR Records</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-cyan-600 dark:text-cyan-400 font-semibold group-hover:translate-x-1 transition-transform">
            <span>Manage Directory</span>
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        {/* Card 2: Today's Appointments */}
        <div 
          onClick={() => onNavigate('appointments')}
          className="group relative p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-bl-full transition-transform group-hover:scale-110 pointer-events-none" />
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-500/20 shadow-sm">
              <Calendar className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-full border border-blue-500/20">
              Today
            </span>
          </div>
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Today's Appointments</span>
            <div className="text-3xl font-black text-slate-900 dark:text-white flex items-baseline gap-2">
              {todayAppointments.length}
              <span className="text-xs font-normal text-slate-400">Booked Slots</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-blue-600 dark:text-blue-400 font-semibold group-hover:translate-x-1 transition-transform">
            <span>View Schedule</span>
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        {/* Card 3: Active Doctors */}
        <div 
          onClick={() => onNavigate('appointments')}
          className="group relative p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-bl-full transition-transform group-hover:scale-110 pointer-events-none" />
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20 shadow-sm">
              <UserCheck className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/20">
              On Duty
            </span>
          </div>
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Physicians</span>
            <div className="text-3xl font-black text-slate-900 dark:text-white flex items-baseline gap-2">
              {activeDoctors.length} <span className="text-sm font-semibold text-slate-400">/ {doctors.length}</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-400 font-semibold group-hover:translate-x-1 transition-transform">
            <span>Doctor Directory</span>
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        {/* Card 4: Critical Alerts */}
        <div 
          onClick={() => onNavigate('patients')}
          className="group relative p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 rounded-bl-full transition-transform group-hover:scale-110 pointer-events-none" />
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center border border-rose-500/20 shadow-sm animate-pulse">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded-full border border-rose-500/20">
              Urgent
            </span>
          </div>
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Critical Triage Cases</span>
            <div className="text-3xl font-black text-rose-600 dark:text-rose-400 flex items-baseline gap-2">
              {criticalAlerts.length}
              <span className="text-xs font-normal text-slate-400">Requires Review</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-rose-600 dark:text-rose-400 font-semibold group-hover:translate-x-1 transition-transform">
            <span>Review Triage Patients</span>
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

      </div>

      {/* Emergency Triage Alert Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-cyan-500/10 border border-rose-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-500/30 flex-shrink-0 animate-bounce">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              Emergency ER Department Status: Active Monitoring
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              2 ICU Beds occupied. 1 Acute Laparoscopic Appendectomy scheduled in OR 2. All triage physicians on standby.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onOpenAddPatient}
            className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-500/20 transition-all hover:scale-105"
          >
            + Admit Emergency Patient
          </button>
          <button
            onClick={onOpenAddAppointment}
            className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition-all"
          >
            Emergency Slot Booking
          </button>
        </div>
      </div>

      {/* Main Charts & Activity Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart 1: Admissions by Department */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <HeartPulse className="w-5 h-5 text-cyan-500" /> Patient Admissions by Specialty
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Live distribution of admitted and outpatient EMR records
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              Q3 Telemetry
            </span>
          </div>

          {/* Bar Chart Mockup */}
          <div className="space-y-4 mb-4">
            {departments.map((dept) => {
              const percentage = Math.round((dept.count / maxDeptCount) * 100);
              return (
                <div key={dept.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <span>{dept.name}</span>
                    <span className="font-bold text-slate-900 dark:text-white">{dept.count} Patients ({percentage}%)</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden p-0.5">
                    <div 
                      className={`h-full rounded-full ${dept.color} transition-all duration-700 ease-out`} 
                      style={{ width: `${Math.max(percentage, 8)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Summary Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <span className="block text-[11px] font-medium text-slate-400">Admitted ICU</span>
              <span className="text-base font-bold text-slate-900 dark:text-white">4 Cases</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <span className="block text-[11px] font-medium text-slate-400">Outpatient Visits</span>
              <span className="text-base font-bold text-slate-900 dark:text-white">5 Records</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <span className="block text-[11px] font-medium text-slate-400">Discharged Today</span>
              <span className="text-base font-bold text-slate-900 dark:text-white">1 Patient</span>
            </div>
          </div>
        </div>

        {/* Activity Feed Sidebar */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-cyan-500" /> Audit Log & Activity
              </h3>
              <span className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950 px-2 py-0.5 rounded-full">
                Real-Time
              </span>
            </div>

            <div className="space-y-4">
              {activities.map((act) => (
                <div key={act.id} className="flex gap-3 text-xs">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    {act.type === 'alert' && <AlertTriangle className="w-4 h-4 text-rose-500" />}
                    {act.type === 'lab' && <TestTube className="w-4 h-4 text-purple-500" />}
                    {act.type === 'appointment' && <Calendar className="w-4 h-4 text-blue-500" />}
                    {act.type === 'prescription' && <FileText className="w-4 h-4 text-emerald-500" />}
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-slate-100">{act.title}</span>
                      <span className="text-[10px] text-slate-400">{act.timestamp}</span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 leading-snug">
                      {act.description}
                    </p>
                    <span className="text-[10px] font-medium text-cyan-600 dark:text-cyan-400 block">
                      By {act.user}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigate('settings')}
            className="mt-4 w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-1"
          >
            View HIPAA Security Audit Log <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Today's Appointments & On-Duty Doctors Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Today's Appointments Quick List */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-500" /> Today's Appointment Queue
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Scheduled consultations for September 22, 2026
              </p>
            </div>
            <button
              onClick={() => onNavigate('appointments')}
              className="text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
            >
              Full Calendar <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {todayAppointments.slice(0, 4).map((apt) => (
              <div 
                key={apt.id}
                className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-cyan-500/40 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between text-xs transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-bold text-xs text-center border border-cyan-500/20">
                    {apt.timeSlot}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                      {apt.patientName}
                    </h4>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                      {apt.specialty} • {apt.doctorName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    apt.status === 'In Progress' 
                      ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-500/20 animate-pulse'
                      : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                  }`}>
                    {apt.status}
                  </span>
                  <button
                    onClick={() => {
                      const p = patients.find(pat => pat.id === apt.patientId);
                      if (p) onViewPatient(p);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 font-semibold text-slate-700 dark:text-slate-200 hover:bg-cyan-50 hover:text-cyan-600 transition-colors"
                  >
                    View EMR
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* On-Duty Physicians List */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" /> On-Duty Specialists
            </h3>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Hospital Roster</span>
          </div>

          <div className="space-y-3">
            {doctors.slice(0, 4).map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/30 text-xs">
                <div className="flex items-center gap-2.5">
                  <img src={doc.avatar} alt={doc.name} className="w-9 h-9 rounded-xl object-cover ring-2 ring-slate-200 dark:ring-slate-700" />
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{doc.name}</h4>
                    <p className="text-[11px] text-cyan-600 dark:text-cyan-400">{doc.specialty} • {doc.room}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  doc.status === 'Available' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400' : 'bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400'
                }`}>
                  {doc.status}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
