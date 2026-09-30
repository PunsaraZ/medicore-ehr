import React from 'react';
import { 
  Settings, 
  ShieldCheck, 
  Lock, 
  RefreshCw, 
  Check, 
  X, 
  Database, 
  Server,
  UserCheck,
  ShieldAlert
} from 'lucide-react';

export default function SettingsView({ 
  currentRole, 
  onResetData, 
  darkMode, 
  setDarkMode 
}) {
  const permissionsMatrix = [
    { name: 'View Patient EMR History', doctor: true, receptionist: true, admin: true },
    { name: 'Add / Register New Patient', doctor: true, receptionist: true, admin: true },
    { name: 'Edit Diagnosis & Vitals', doctor: true, receptionist: false, admin: true },
    { name: 'Delete Patient Records', doctor: false, receptionist: false, admin: true },
    { name: 'Issue E-Prescriptions', doctor: true, receptionist: false, admin: true },
    { name: 'Order Diagnostic Lab Panels', doctor: true, receptionist: false, admin: true },
    { name: 'Appointment Slot Management', doctor: true, receptionist: true, admin: true },
    { name: 'Manage Patient Invoicing', doctor: false, receptionist: true, admin: true },
    { name: 'System Security & HIPAA Audit', doctor: false, receptionist: false, admin: true }
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Settings className="w-6 h-6 text-slate-600 dark:text-slate-300" /> EHR System Administration & HIPAA Governance
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            System configuration, active role matrix, compliance telemetry & database controls
          </p>
        </div>
      </div>

      {/* HIPAA Compliance & Security Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase">
            <span>HIPAA Compliance Status</span>
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
            100% Certified
          </div>
          <p className="text-xs text-slate-500">
            256-Bit AES Data Encryption Active. Local Storage State Secured.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase">
            <span>Current Logged-in Staff Role</span>
            <UserCheck className="w-5 h-5 text-cyan-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {currentRole.name}
          </div>
          <p className="text-xs text-cyan-600 font-semibold">
            {currentRole.title} ({currentRole.badge})
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase">
            <span>System Data State</span>
            <Database className="w-5 h-5 text-purple-500" />
          </div>
          <button
            onClick={onResetData}
            className="w-full py-2.5 px-4 rounded-xl bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-600 hover:text-white text-rose-600 dark:text-rose-400 font-bold text-xs border border-rose-500/30 transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Reset EHR Mock Database
          </button>
        </div>

      </div>

      {/* Permissions Matrix */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-cyan-500" /> Role-Based Access Control (RBAC) Matrix
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Permissions breakdown per staff role</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Feature / Action</th>
                <th className="py-3 px-4 text-center">Doctor Role</th>
                <th className="py-3 px-4 text-center">Receptionist Role</th>
                <th className="py-3 px-4 text-center">Admin Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {permissionsMatrix.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-slate-100">{row.name}</td>
                  <td className="py-3 px-4 text-center">
                    {row.doctor ? (
                      <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center font-bold">✓</span>
                    ) : (
                      <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-500 mx-auto flex items-center justify-center font-bold">✕</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {row.receptionist ? (
                      <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center font-bold">✓</span>
                    ) : (
                      <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-500 mx-auto flex items-center justify-center font-bold">✕</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {row.admin ? (
                      <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center font-bold">✓</span>
                    ) : (
                      <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-500 mx-auto flex items-center justify-center font-bold">✕</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
