import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ToastNotification from './components/ToastNotification';
import LoginModal from './components/LoginModal';

import DashboardView from './views/DashboardView';
import PatientsView from './views/PatientsView';
import AppointmentsView from './views/AppointmentsView';
import PrescriptionsView from './views/PrescriptionsView';
import LabReportsView from './views/LabReportsView';
import BillingView from './views/BillingView';
import SettingsView from './views/SettingsView';

import { 
  ROLES, 
  INITIAL_DOCTORS, 
  INITIAL_PATIENTS, 
  INITIAL_APPOINTMENTS, 
  INITIAL_PRESCRIPTIONS, 
  INITIAL_LAB_REPORTS, 
  INITIAL_BILLING, 
  INITIAL_ACTIVITIES 
} from './data/mockData';

export default function App() {
  // Navigation & UI State
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals & Feedback
  const [currentRole, setCurrentRole] = useState(ROLES.DOCTOR);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [toast, setToast] = useState(null);

  // EMR Data States
  const [patients, setPatients] = useState(() => {
    const saved = localStorage.getItem('medicore_patients');
    return saved ? JSON.parse(saved) : INITIAL_PATIENTS;
  });

  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('medicore_appointments');
    return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
  });

  const [doctors, setDoctors] = useState(INITIAL_DOCTORS);

  const [prescriptions, setPrescriptions] = useState(() => {
    const saved = localStorage.getItem('medicore_prescriptions');
    return saved ? JSON.parse(saved) : INITIAL_PRESCRIPTIONS;
  });

  const [labReports, setLabReports] = useState(() => {
    const saved = localStorage.getItem('medicore_labs');
    return saved ? JSON.parse(saved) : INITIAL_LAB_REPORTS;
  });

  const [billing, setBilling] = useState(() => {
    const saved = localStorage.getItem('medicore_billing');
    return saved ? JSON.parse(saved) : INITIAL_BILLING;
  });

  const [activities, setActivities] = useState(INITIAL_ACTIVITIES);

  // Dark Mode HTML class binding
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('medicore_patients', JSON.stringify(patients));
  }, [patients]);

  useEffect(() => {
    localStorage.setItem('medicore_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('medicore_prescriptions', JSON.stringify(prescriptions));
  }, [prescriptions]);

  useEffect(() => {
    localStorage.setItem('medicore_labs', JSON.stringify(labReports));
  }, [labReports]);

  useEffect(() => {
    localStorage.setItem('medicore_billing', JSON.stringify(billing));
  }, [billing]);

  // Toast Trigger Helper
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Critical Alerts computed from live patient state
  const criticalAlerts = patients
    .filter(p => p.status === 'Admitted' && (p.diagnosis.includes('Acute') || p.vitals?.spO2?.includes('93') || p.vitals?.bp?.startsWith('148')))
    .map(p => ({
      id: p.id,
      patientName: p.name,
      description: `${p.diagnosis} in ${p.room} — Vitals: BP ${p.vitals?.bp}, SpO2 ${p.vitals?.spO2}`,
      timestamp: '5 mins ago'
    }));

  // Patient CRUD Action Handlers
  const handleAddPatient = (newPatient) => {
    setPatients(prev => [newPatient, ...prev]);
    setActivities(prev => [
      {
        id: `ACT-${Date.now()}`,
        timestamp: 'Just now',
        title: 'New Patient Registered',
        description: `${newPatient.name} registered under ${newPatient.department}.`,
        type: 'alert',
        user: currentRole.name
      },
      ...prev
    ]);
    showToast(`Patient ${newPatient.name} added to EMR system!`, 'success');
  };

  const handleDeletePatient = (patientId) => {
    if (currentRole.id === 'receptionist') {
      showToast('Receptionist role lacks deletion privileges. Admin access required.', 'error');
      return;
    }

    const patient = patients.find(p => p.id === patientId);
    setPatients(prev => prev.filter(p => p.id !== patientId));
    showToast(`Patient record ${patient ? patient.name : patientId} deleted.`, 'warning');
  };

  const handleUpdatePatient = (updatedPatient) => {
    setPatients(prev => prev.map(p => p.id === updatedPatient.id ? updatedPatient : p));
    showToast(`Clinical history note added for ${updatedPatient.name}.`, 'info');
  };

  // Appointment CRUD Handlers
  const handleAddAppointment = (newApt) => {
    setAppointments(prev => [newApt, ...prev]);
    setActivities(prev => [
      {
        id: `ACT-${Date.now()}`,
        timestamp: 'Just now',
        title: 'Appointment Scheduled',
        description: `${newApt.patientName} booked slot with ${newApt.doctorName}.`,
        type: 'appointment',
        user: currentRole.name
      },
      ...prev
    ]);
    showToast(`Appointment scheduled for ${newApt.patientName}!`, 'success');
  };

  const handleUpdateAppointmentStatus = (aptId, newStatus) => {
    setAppointments(prev => prev.map(a => a.id === aptId ? { ...a, status: newStatus } : a));
    showToast(`Appointment status changed to ${newStatus}`, 'info');
  };

  // Prescriptions CRUD Handler
  const handleAddPrescription = (newRx) => {
    setPrescriptions(prev => [newRx, ...prev]);
    showToast(`E-Prescription issued for ${newRx.patientName}!`, 'success');
  };

  // Lab Reports Handler
  const handleAddLabReport = (newLab) => {
    setLabReports(prev => [newLab, ...prev]);
    showToast(`Diagnostic pathology test ordered for ${newLab.patientName}!`, 'info');
  };

  // Billing Handler
  const handleAddInvoice = (newInv) => {
    setBilling(prev => [newInv, ...prev]);
    showToast(`Invoice ${newInv.id} generated for ${newInv.patientName}!`, 'success');
  };

  // Reset Mock Data Handler
  const handleResetData = () => {
    localStorage.removeItem('medicore_patients');
    localStorage.removeItem('medicore_appointments');
    localStorage.removeItem('medicore_prescriptions');
    localStorage.removeItem('medicore_labs');
    localStorage.removeItem('medicore_billing');

    setPatients(INITIAL_PATIENTS);
    setAppointments(INITIAL_APPOINTMENTS);
    setPrescriptions(INITIAL_PRESCRIPTIONS);
    setLabReports(INITIAL_LAB_REPORTS);
    setBilling(INITIAL_BILLING);

    showToast('MediCore EHR database restored to default state.', 'info');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-300">
      
      {/* Toast Notification Container */}
      <ToastNotification toast={toast} onClose={() => setToast(null)} />

      {/* Role Selection Screen Modal */}
      <LoginModal 
        isOpen={showRoleModal} 
        onClose={() => setShowRoleModal(false)}
        currentRole={currentRole}
        onSelectRole={(role) => {
          setCurrentRole(role);
          showToast(`Switched access role to ${role.name} (${role.badge})`, 'info');
        }}
      />

      {/* Responsive Collapsible Sidebar Navigation */}
      <Sidebar 
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        currentRole={currentRole}
        onOpenRoleModal={() => setShowRoleModal(true)}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Top Header Navbar */}
      <Header 
        currentTab={currentTab}
        collapsed={collapsed}
        onOpenAddPatient={() => {
          setCurrentTab('patients');
        }}
        onOpenAddAppointment={() => {
          setCurrentTab('appointments');
          setShowBookingModal(true);
        }}
        criticalAlerts={criticalAlerts}
        currentRole={currentRole}
        onOpenRoleModal={() => setShowRoleModal(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Active View Container */}
      <main className={`flex-1 p-6 transition-all duration-300 ${collapsed ? 'ml-20' : 'ml-64'}`}>
        
        {currentTab === 'dashboard' && (
          <DashboardView 
            patients={patients}
            appointments={appointments}
            doctors={doctors}
            activities={activities}
            onNavigate={(tab) => setCurrentTab(tab)}
            onViewPatient={(patient) => {
              setCurrentTab('patients');
            }}
            onOpenAddPatient={() => setCurrentTab('patients')}
            onOpenAddAppointment={() => {
              setCurrentTab('appointments');
              setShowBookingModal(true);
            }}
          />
        )}

        {currentTab === 'patients' && (
          <PatientsView 
            patients={patients}
            onAddPatient={handleAddPatient}
            onDeletePatient={handleDeletePatient}
            onUpdatePatient={handleUpdatePatient}
            currentRole={currentRole}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}

        {currentTab === 'appointments' && (
          <AppointmentsView 
            appointments={appointments}
            doctors={doctors}
            patients={patients}
            onAddAppointment={handleAddAppointment}
            onUpdateAppointmentStatus={handleUpdateAppointmentStatus}
            showBookingModal={showBookingModal}
            setShowBookingModal={setShowBookingModal}
          />
        )}

        {currentTab === 'prescriptions' && (
          <PrescriptionsView 
            prescriptions={prescriptions}
            patients={patients}
            doctors={doctors}
            onAddPrescription={handleAddPrescription}
            currentRole={currentRole}
          />
        )}

        {currentTab === 'labs' && (
          <LabReportsView 
            labReports={labReports}
            patients={patients}
            doctors={doctors}
            onAddLabReport={handleAddLabReport}
          />
        )}

        {currentTab === 'billing' && (
          <BillingView 
            billing={billing}
            patients={patients}
            onAddInvoice={handleAddInvoice}
          />
        )}

        {currentTab === 'settings' && (
          <SettingsView 
            currentRole={currentRole}
            onResetData={handleResetData}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        )}

      </main>

    </div>
  );
}
