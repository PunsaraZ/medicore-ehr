import React from 'react';
import { ROLES } from '../data/mockData';
import { Stethoscope, UserCheck, ShieldAlert, Check, Activity, ArrowRight, X } from 'lucide-react';

export default function LoginModal({ isOpen, onClose, currentRole, onSelectRole }) {
  if (!isOpen) return null;

  const roleOptions = [
    {
      role: ROLES.DOCTOR,
      icon: Stethoscope,
      color: 'from-cyan-500 to-blue-600',
      badgeBg: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30',
      description: 'Access patient EMR, issue digital prescriptions, order diagnostics & manage clinical consultations.'
    },
    {
      role: ROLES.RECEPTIONIST,
      icon: UserCheck,
      color: 'from-blue-600 to-indigo-600',
      badgeBg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30',
      description: 'Handle patient intake, schedule doctor appointments, manage front-desk triage & view billing.'
    },
    {
      role: ROLES.ADMIN,
      icon: ShieldAlert,
      color: 'from-purple-600 to-indigo-700',
      badgeBg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30',
      description: 'Full EHR system controls, patient record deletion, security audits, HIPAA logs & billing management.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 overflow-hidden">
        
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-5 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30">
              <Activity className="w-7 h-7 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                MediCore EHR Access Switcher
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Select your staff role to test interactive permissions & features
              </p>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Role Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {roleOptions.map(({ role, icon: Icon, color, badgeBg, description }) => {
            const isSelected = currentRole.id === role.id;

            return (
              <div
                key={role.id}
                onClick={() => {
                  onSelectRole(role);
                  if (onClose) onClose();
                }}
                className={`group relative p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between hover:scale-[1.03] active:scale-[0.98] ${
                  isSelected
                    ? 'border-cyan-500 bg-cyan-50/40 dark:bg-cyan-950/30 shadow-xl shadow-cyan-500/10 ring-2 ring-cyan-500/40'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/50 hover:border-cyan-400 hover:shadow-lg'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${color} flex items-center justify-center text-white shadow-md`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    {isSelected ? (
                      <span className="w-6 h-6 rounded-full bg-cyan-500 text-white flex items-center justify-center">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </span>
                    ) : (
                      <span className="text-[11px] font-semibold text-slate-400 group-hover:text-cyan-500 flex items-center gap-1 transition-colors">
                        Select <ArrowRight className="w-3 h-3" />
                      </span>
                    )}
                  </div>

                  <div className="space-y-1 mb-3">
                    <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${badgeBg}`}>
                      {role.badge}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {role.name}
                    </h3>
                    <p className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                      {role.title}
                    </p>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                    {description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Granted Permissions
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {role.permissions.slice(0, 3).map((perm) => (
                      <span
                        key={perm}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700/80 text-slate-600 dark:text-slate-300 font-medium"
                      >
                        {perm.replace('_', ' ')}
                      </span>
                    ))}
                    {role.permissions.length > 3 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-cyan-100 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400 font-bold">
                        +{role.permissions.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>🔒 MediCore EHR 256-bit Simulated Session</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:opacity-90 transition-opacity"
          >
            Continue to Dashboard
          </button>
        </div>

      </div>
    </div>
  );
}
