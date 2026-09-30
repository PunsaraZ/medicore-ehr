import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  UserPlus, 
  Eye, 
  Trash2, 
  FileText, 
  Heart, 
  Activity, 
  Clock, 
  X, 
  Check, 
  AlertTriangle,
  Stethoscope,
  Phone,
  Mail,
  User,
  Shield,
  Download,
  Grid,
  ListFilter
} from 'lucide-react';

export default function PatientsView({ 
  patients, 
  onAddPatient, 
  onDeletePatient, 
  onUpdatePatient,
  currentRole,
  searchQuery,
  setSearchQuery
}) {
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'grid'

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedPatientForView, setSelectedPatientForView] = useState(null);
  const [patientToDelete, setPatientToDelete] = useState(null);
  const [newNoteText, setNewNoteText] = useState('');

  // Add Patient Form state
  const [newPatientForm, setNewPatientForm] = useState({
    name: '',
    age: '',
    gender: 'Male',
    bloodGroup: 'O+',
    phone: '',
    email: '',
    diagnosis: '',
    department: 'Cardiology',
    status: 'Outpatient',
    room: 'N/A',
    attendingDoctor: 'Dr. Sarah Jenkins',
    allergies: 'None',
    emergencyContact: ''
  });

  // Filtering logic
  const filteredPatients = patients.filter((patient) => {
    const matchesSearch = 
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phone.includes(searchQuery);

    const matchesDept = selectedDept === 'All' || patient.department === selectedDept;
    const matchesGender = selectedGender === 'All' || patient.gender === selectedGender;
    const matchesStatus = selectedStatus === 'All' || patient.status === selectedStatus;

    return matchesSearch && matchesDept && matchesGender && matchesStatus;
  });

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!newPatientForm.name || !newPatientForm.age || !newPatientForm.diagnosis) return;

    const created = {
      ...newPatientForm,
      id: `PAT-${Math.floor(1000 + Math.random() * 9000)}`,
      age: parseInt(newPatientForm.age, 10),
      admissionDate: new Date().toISOString().split('T')[0],
      vitals: {
        bp: '120/80 mmHg',
        heartRate: '75 bpm',
        spO2: '98%',
        temp: '98.6 °F',
        weight: '70 kg'
      },
      historyNotes: [
        {
          date: new Date().toISOString().split('T')[0],
          note: `Patient registered & initial diagnosis recorded: ${newPatientForm.diagnosis}`,
          author: currentRole.name
        }
      ]
    };

    onAddPatient(created);
    setShowAddModal(false);
    setNewPatientForm({
      name: '',
      age: '',
      gender: 'Male',
      bloodGroup: 'O+',
      phone: '',
      email: '',
      diagnosis: '',
      department: 'Cardiology',
      status: 'Outpatient',
      room: 'N/A',
      attendingDoctor: 'Dr. Sarah Jenkins',
      allergies: 'None',
      emergencyContact: ''
    });
  };

  const handleAddNote = () => {
    if (!newNoteText.trim() || !selectedPatientForView) return;
    const updatedNotes = [
      {
        date: new Date().toISOString().split('T')[0],
        note: newNoteText.trim(),
        author: currentRole.name
      },
      ...(selectedPatientForView.historyNotes || [])
    ];

    const updatedPatient = { ...selectedPatientForView, historyNotes: updatedNotes };
    onUpdatePatient(updatedPatient);
    setSelectedPatientForView(updatedPatient);
    setNewNoteText('');
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      
      {/* Top Toolbar */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by Patient Name, ID, Disease or Phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all border border-transparent focus:border-cyan-500/50"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 font-medium border border-transparent focus:border-cyan-500 focus:outline-none"
          >
            <option value="All">All Departments</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Neurology">Neurology</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="Orthopedics">Orthopedics</option>
            <option value="Internal Medicine">Internal Medicine</option>
            <option value="General Surgery">General Surgery</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 font-medium border border-transparent focus:border-cyan-500 focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Admitted">Admitted</option>
            <option value="Outpatient">Outpatient</option>
            <option value="Discharged">Discharged</option>
          </select>

          {/* Toggle View Mode */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-semibold transition-colors ${viewMode === 'table' ? 'bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-400 shadow-xs' : 'text-slate-400'}`}
              title="Table View"
            >
              <ListFilter className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs font-semibold transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-400 shadow-xs' : 'text-slate-400'}`}
              title="Grid Cards View"
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>

          {/* Add New Patient Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-xs font-bold shadow-md shadow-cyan-500/20 transition-all hover:scale-105"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add New Patient</span>
          </button>
        </div>

      </div>

      {/* Patient Table View */}
      {viewMode === 'table' ? (
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/80 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-4">Patient Info</th>
                  <th className="py-3.5 px-4">Blood Group</th>
                  <th className="py-3.5 px-4">Diagnosis & Dept</th>
                  <th className="py-3.5 px-4">Status & Room</th>
                  <th className="py-3.5 px-4">Contact</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredPatients.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-12 text-center text-slate-400 text-xs">
                      No matching patient records found. Try adjusting your search query or filters.
                    </td>
                  </tr>
                ) : (
                  filteredPatients.map((patient) => (
                    <tr 
                      key={patient.id} 
                      className="hover:bg-cyan-50/30 dark:hover:bg-slate-800/50 transition-colors group"
                    >
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-500 text-white font-bold flex items-center justify-center flex-shrink-0 shadow-xs">
                            {patient.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
                              {patient.name}
                              <span className="text-[10px] font-normal text-slate-400">({patient.age} y/o, {patient.gender})</span>
                            </div>
                            <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400">{patient.id}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 font-bold text-xs border border-rose-500/20">
                          {patient.bloodGroup}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 dark:text-slate-100">{patient.diagnosis}</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">{patient.department} • {patient.attendingDoctor}</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          patient.status === 'Admitted' 
                            ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-500/20' 
                            : patient.status === 'Outpatient'
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-500/20'
                            : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-500/20'
                        }`}>
                          {patient.status} ({patient.room})
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 font-medium">
                        <div>{patient.phone}</div>
                        <div className="text-[10px] text-slate-400">{patient.email}</div>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedPatientForView(patient)}
                            className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold hover:bg-cyan-500 hover:text-white transition-all flex items-center gap-1"
                            title="View Medical Record"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>EMR History</span>
                          </button>

                          <button
                            onClick={() => setPatientToDelete(patient)}
                            className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 hover:bg-rose-600 hover:text-white transition-all"
                            title="Delete Patient Record"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Grid Cards View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPatients.map((patient) => (
            <div 
              key={patient.id} 
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-md">
                      {patient.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">{patient.name}</h4>
                      <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400">{patient.id} • {patient.age} yrs</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 font-bold text-xs">
                    {patient.bloodGroup}
                  </span>
                </div>

                <div className="space-y-2 text-xs mb-4">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                    <span className="block text-[10px] text-slate-400 uppercase font-semibold">Diagnosis</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">{patient.diagnosis}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>Department: <strong className="text-slate-800 dark:text-slate-200">{patient.department}</strong></span>
                    <span>Status: <strong className="text-cyan-600">{patient.status}</strong></span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">{patient.phone}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedPatientForView(patient)}
                    className="px-3 py-1.5 rounded-xl bg-cyan-50 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400 font-bold text-xs hover:bg-cyan-500 hover:text-white transition-colors"
                  >
                    View History
                  </button>
                  <button
                    onClick={() => setPatientToDelete(patient)}
                    className="p-1.5 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL 1: ADD NEW PATIENT FORM */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500 text-white flex items-center justify-center shadow-md">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Register New EMR Patient</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Fill in patient demographics and medical diagnostic summary</p>
                </div>
              </div>
              <button onClick={() => setShowAddModal(false)} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Patient Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jonathan Vance"
                    value={newPatientForm.name}
                    onChange={(e) => setNewPatientForm({ ...newPatientForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Age (Years) *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="120"
                    placeholder="e.g. 45"
                    value={newPatientForm.age}
                    onChange={(e) => setNewPatientForm({ ...newPatientForm, age: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Gender</label>
                  <select
                    value={newPatientForm.gender}
                    onChange={(e) => setNewPatientForm({ ...newPatientForm, gender: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Blood Group</label>
                  <select
                    value={newPatientForm.bloodGroup}
                    onChange={(e) => setNewPatientForm({ ...newPatientForm, bloodGroup: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
                  <input
                    type="text"
                    placeholder="(555) 000-0000"
                    value={newPatientForm.phone}
                    onChange={(e) => setNewPatientForm({ ...newPatientForm, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Department</label>
                  <select
                    value={newPatientForm.department}
                    onChange={(e) => setNewPatientForm({ ...newPatientForm, department: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="Cardiology">Cardiology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Internal Medicine">Internal Medicine</option>
                    <option value="General Surgery">General Surgery</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Initial Medical Diagnosis / Condition *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acute Coronary Syndrome, Type 2 Diabetes"
                  value={newPatientForm.diagnosis}
                  onChange={(e) => setNewPatientForm({ ...newPatientForm, diagnosis: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Known Allergies</label>
                  <input
                    type="text"
                    placeholder="e.g. Penicillin, Sulfa, Latex"
                    value={newPatientForm.allergies}
                    onChange={(e) => setNewPatientForm({ ...newPatientForm, allergies: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Emergency Contact</label>
                  <input
                    type="text"
                    placeholder="Name & Relationship (Phone)"
                    value={newPatientForm.emergencyContact}
                    onChange={(e) => setNewPatientForm({ ...newPatientForm, emergencyContact: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-md shadow-cyan-500/20 hover:scale-105 transition-transform"
                >
                  Save Patient Record
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* MODAL 2: VIEW PATIENT EMR HISTORY DRAWER */}
      {selectedPatientForView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 max-h-[92vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white font-bold flex items-center justify-center text-lg shadow-md">
                  {selectedPatientForView.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                    {selectedPatientForView.name}
                    <span className="text-xs font-bold text-cyan-500 bg-cyan-50 dark:bg-cyan-950 px-2 py-0.5 rounded-md border border-cyan-500/20">
                      {selectedPatientForView.id}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {selectedPatientForView.age} yrs • {selectedPatientForView.gender} • Blood Group: <strong className="text-rose-500">{selectedPatientForView.bloodGroup}</strong>
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedPatientForView(null)} 
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Vital Signs Telemetry Header */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Blood Pressure</span>
                <span className="block text-sm font-bold text-cyan-600 dark:text-cyan-400 mt-0.5">
                  {selectedPatientForView.vitals?.bp || '120/80 mmHg'}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Heart Rate</span>
                <span className="block text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                  {selectedPatientForView.vitals?.heartRate || '75 bpm'}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Oxygen (SpO2)</span>
                <span className="block text-sm font-bold text-blue-600 dark:text-blue-400 mt-0.5">
                  {selectedPatientForView.vitals?.spO2 || '98%'}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Body Temp</span>
                <span className="block text-sm font-bold text-amber-600 dark:text-amber-400 mt-0.5">
                  {selectedPatientForView.vitals?.temp || '98.6 °F'}
                </span>
              </div>
            </div>

            {/* Medical Overview Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mb-6">
              <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-sm">
                  <Stethoscope className="w-4 h-4 text-cyan-500" /> Diagnosis & Department
                </h4>
                <div className="font-semibold text-slate-800 dark:text-slate-200">{selectedPatientForView.diagnosis}</div>
                <div className="text-slate-500">Department: <strong className="text-slate-700 dark:text-slate-300">{selectedPatientForView.department}</strong></div>
                <div className="text-slate-500">Attending Physician: <strong className="text-slate-700 dark:text-slate-300">{selectedPatientForView.attendingDoctor}</strong></div>
                <div className="text-slate-500">Status & Room: <strong className="text-cyan-600">{selectedPatientForView.status} ({selectedPatientForView.room})</strong></div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-sm">
                  <Shield className="w-4 h-4 text-rose-500" /> Allergies & Emergency Contact
                </h4>
                <div>Allergies: <strong className="text-rose-600 dark:text-rose-400 font-bold">{selectedPatientForView.allergies}</strong></div>
                <div>Emergency Contact: <span className="text-slate-700 dark:text-slate-300 font-semibold">{selectedPatientForView.emergencyContact || 'None Listed'}</span></div>
                <div>Admission Date: <span className="text-slate-600">{selectedPatientForView.admissionDate}</span></div>
              </div>
            </div>

            {/* Clinical Notes Timeline */}
            <div className="space-y-3 mb-6">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-blue-500" /> Clinical History & Progress Notes
              </h4>

              {/* Add Note Form */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add a new clinical observation note..."
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <button
                  onClick={handleAddNote}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xs"
                >
                  + Add Note
                </button>
              </div>

              <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                {(selectedPatientForView.historyNotes || []).map((hn, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-100/70 dark:bg-slate-800/50 text-xs border border-slate-200/60 dark:border-slate-800">
                    <div className="flex items-center justify-between font-bold text-slate-900 dark:text-slate-100 mb-1">
                      <span>{hn.author}</span>
                      <span className="text-[10px] text-slate-400">{hn.date}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{hn.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">MediCore EHR HIPAA Certified Patient File</span>
              <button
                onClick={() => setSelectedPatientForView(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold"
              >
                Close EMR Record
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 3: DELETE PATIENT CONFIRMATION */}
      {patientToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-rose-500/30 p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600 mx-auto flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Delete Patient Record?</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Are you sure you want to delete EMR record for <strong className="text-slate-900 dark:text-white">{patientToDelete.name}</strong> ({patientToDelete.id})? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setPatientToDelete(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDeletePatient(patientToDelete.id);
                  setPatientToDelete(null);
                }}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-500/20"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
