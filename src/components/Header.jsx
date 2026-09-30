import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Plus, 
  UserPlus, 
  CalendarPlus, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  ChevronDown,
  Sparkles
} from 'lucide-react';

export default function Header({ 
  currentTab, 
  collapsed, 
  onOpenAddPatient, 
  onOpenAddAppointment, 
  criticalAlerts = [], 
  currentRole,
  onOpenRoleModal,
  searchQuery,
  setSearchQuery
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const titleMap = {
    dashboard: { title: 'Executive EHR Dashboard', subtitle: 'Real-time patient telemetry & department overview' },
    patients: { title: 'Patient Directory & EMR', subtitle: 'Manage electronic health records, admissions & clinical histories' },
    appointments: { title: 'Appointment Scheduling', subtitle: 'Book slots, assign physicians & manage triage flow' },
    prescriptions: { title: 'Digital Prescriptions Repository', subtitle: 'E-Prescribing, dosage tracking & pharmacy orders' },
    labs: { title: 'Diagnostic Lab Reports', subtitle: 'Lab telemetry, critical blood panels & imaging reviews' },
    billing: { title: 'Billing & Financial Claims', subtitle: 'Itemized hospital invoicing, insurance claims & receipts' },
    settings: { title: 'System Security & EHR Settings', subtitle: 'HIPAA compliance audit logs & role access controls' }
  };

  const activeHeader = titleMap[currentTab] || titleMap.dashboard;

  return (
    <header className={`sticky top-0 z-20 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-all duration-300 flex items-center justify-between px-6 ${collapsed ? 'ml-20' : 'ml-64'}`}>
      
      {/* Title & Breadcrumbs */}
      <div className="flex flex-col">
        <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          {activeHeader.title}
          <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-100 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
            <Sparkles className="w-3 h-3 mr-1" /> Live EMR
          </span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 hidden md:block">
          {activeHeader.subtitle}
        </p>
      </div>

      {/* Action Controls & Right Utilities */}
      <div className="flex items-center gap-3">
        
        {/* Search Input Bar */}
        <div className="relative hidden lg:block w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search patients, MRN, doctors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all border border-transparent focus:border-cyan-500/50"
          />
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenAddPatient}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-xs font-semibold shadow-sm shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>+ Patient</span>
          </button>

          <button
            onClick={onOpenAddAppointment}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-700 transition-all"
          >
            <CalendarPlus className="w-3.5 h-3.5 text-cyan-500" />
            <span>+ Appointment</span>
          </button>
        </div>

        {/* Critical Alerts Bell Notification Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="relative p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
            title="Notifications & Triage Alerts"
          >
            <Bell className="w-4 h-4" />
            {criticalAlerts.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center animate-bounce">
                {criticalAlerts.length}
              </span>
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-3 z-50 animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2 mb-2">
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-rose-500" /> Critical Triage Alerts
                </span>
                <span className="text-[10px] bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 font-bold px-2 py-0.5 rounded-full">
                  {criticalAlerts.length} Urgent
                </span>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {criticalAlerts.length === 0 ? (
                  <div className="py-6 text-center text-xs text-slate-400">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-1 opacity-60" />
                    No active critical alerts. All patients stable.
                  </div>
                ) : (
                  criticalAlerts.map((alert) => (
                    <div 
                      key={alert.id} 
                      className="p-2.5 rounded-xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/50 dark:border-rose-900/40 text-xs flex flex-col gap-1 hover:border-rose-300 transition-colors"
                    >
                      <div className="flex items-center justify-between font-bold text-rose-900 dark:text-rose-200">
                        <span>{alert.patientName}</span>
                        <span className="text-[10px] text-rose-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {alert.timestamp || 'Just now'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300">
                        {alert.description}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200/60 dark:border-slate-800"
          >
            <img
              src={currentRole.avatar}
              alt={currentRole.name}
              className="w-8 h-8 rounded-lg object-cover"
            />
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-none">
                {currentRole.name}
              </span>
              <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-medium">
                {currentRole.title}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-2 z-50 animate-fade-in text-xs">
              <div className="p-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                <div className="font-bold text-slate-900 dark:text-white">{currentRole.name}</div>
                <div className="text-[11px] text-slate-400">{currentRole.department}</div>
                <div className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Active On-Duty
                </div>
              </div>

              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  onOpenRoleModal();
                }}
                className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium transition-colors flex items-center justify-between"
              >
                <span>Switch Role / User</span>
                <span className="text-[10px] font-bold text-cyan-500 bg-cyan-50 dark:bg-cyan-950 px-2 py-0.5 rounded-md">Change</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
