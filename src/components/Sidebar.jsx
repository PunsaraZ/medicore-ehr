import React from 'react';
import { 
  Activity, 
  LayoutDashboard, 
  Users, 
  Calendar, 
  FileText, 
  TestTube, 
  CreditCard, 
  Settings, 
  Shield, 
  Sun, 
  Moon, 
  ChevronLeft, 
  ChevronRight,
  UserCheck,
  LogOut
} from 'lucide-react';

export default function Sidebar({ 
  currentTab, 
  setCurrentTab, 
  collapsed, 
  setCollapsed, 
  currentRole, 
  onOpenRoleModal, 
  darkMode, 
  setDarkMode 
}) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'patients', label: 'Patient Management', icon: Users, badge: 'Live' },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'prescriptions', label: 'Prescriptions', icon: FileText },
    { id: 'labs', label: 'Lab Reports', icon: TestTube, badge: 'New' },
    { id: 'billing', label: 'Billing & Invoices', icon: CreditCard },
    { id: 'settings', label: 'System Settings', icon: Settings }
  ];

  return (
    <aside className={`fixed top-0 left-0 bottom-0 z-30 flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
      
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20 flex-shrink-0">
            <Activity className="w-6 h-6 animate-pulse" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-extrabold text-lg text-slate-900 dark:text-white tracking-tight leading-none">
                MediCore <span className="text-cyan-500 font-normal">EHR</span>
              </span>
              <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase mt-0.5">
                Enterprise Health
              </span>
            </div>
          )}
        </div>

        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      {/* Role Indicator Banner */}
      {!collapsed && (
        <div className="mx-3 my-3 p-3 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <img 
              src={currentRole.avatar} 
              alt={currentRole.name} 
              className="w-8 h-8 rounded-full object-cover ring-2 ring-cyan-500/30 flex-shrink-0"
            />
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                {currentRole.name}
              </div>
              <div className="text-[11px] font-medium text-cyan-600 dark:text-cyan-400 flex items-center gap-1">
                <Shield className="w-3 h-3 inline" /> {currentRole.badge}
              </div>
            </div>
          </div>
          <button 
            onClick={onOpenRoleModal}
            className="p-1.5 rounded-lg bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 shadow-xs border border-slate-200 dark:border-slate-700 text-xs font-medium transition-colors"
            title="Switch Role"
          >
            <UserCheck className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20 font-semibold' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
              {!collapsed && (
                <span className="truncate flex-1 text-left">{item.label}</span>
              )}
              {!collapsed && item.badge && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                  isActive ? 'bg-white/20 text-white' : 'bg-cyan-100 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Footer Actions */}
      <div className="p-3 border-t border-slate-200/80 dark:border-slate-800 space-y-2">
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-xs font-medium"
        >
          <div className="flex items-center gap-2">
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
            {!collapsed && <span>{darkMode ? 'Light Theme' : 'Dark Medical Mode'}</span>}
          </div>
          {!collapsed && (
            <div className={`w-8 h-4 rounded-full transition-colors relative ${darkMode ? 'bg-cyan-500' : 'bg-slate-300'}`}>
              <div className={`w-3 h-3 rounded-full bg-white absolute top-0.5 transition-transform ${darkMode ? 'translate-x-4' : 'translate-x-0.5'}`} />
            </div>
          )}
        </button>

        {/* Quick Role Switch (If collapsed) */}
        {collapsed && (
          <button
            onClick={onOpenRoleModal}
            className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex justify-center"
            title="Switch User Role"
          >
            <UserCheck className="w-5 h-5 text-cyan-500" />
          </button>
        )}
      </div>

    </aside>
  );
}
