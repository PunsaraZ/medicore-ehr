import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Printer, 
  CheckCircle2, 
  X, 
  Pill, 
  Stethoscope, 
  User, 
  Calendar,
  AlertCircle
} from 'lucide-react';

export default function PrescriptionsView({ 
  prescriptions, 
  patients, 
  doctors, 
  onAddPrescription,
  currentRole
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRxForPrint, setSelectedRxForPrint] = useState(null);

  const [newRxForm, setNewRxForm] = useState({
    patientId: patients[0]?.id || '',
    medication: '',
    dosage: '',
    frequency: 'Once Daily',
    duration: '30 days',
    refills: 2
  });

  const filteredRx = prescriptions.filter(rx => 
    rx.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rx.medication.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rx.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateRx = (e) => {
    e.preventDefault();
    const patientObj = patients.find(p => p.id === newRxForm.patientId);
    if (!patientObj || !newRxForm.medication) return;

    const created = {
      id: `RX-${Math.floor(7700 + Math.random() * 300)}`,
      patientId: patientObj.id,
      patientName: patientObj.name,
      doctorName: currentRole.name || 'Dr. Sarah Jenkins',
      medication: newRxForm.medication,
      dosage: newRxForm.dosage || '1 tablet daily',
      frequency: newRxForm.frequency,
      duration: newRxForm.duration,
      date: new Date().toISOString().split('T')[0],
      status: 'Active',
      refills: parseInt(newRxForm.refills, 10)
    };

    onAddPrescription(created);
    setShowAddModal(false);
    setNewRxForm({
      patientId: patients[0]?.id || '',
      medication: '',
      dosage: '',
      frequency: 'Once Daily',
      duration: '30 days',
      refills: 2
    });
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Pill className="w-6 h-6 text-emerald-500" /> Digital E-Prescribing System
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Issue pharmaceutical orders, manage active refills & print verified medical prescriptions
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs shadow-md shadow-emerald-500/20 flex items-center gap-1.5 transition-transform hover:scale-105"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>+ Issue New Prescription</span>
        </button>
      </div>

      {/* Table Container */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by Patient, Medication or Rx ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all border border-transparent focus:border-emerald-500/50"
          />
        </div>

        {/* Prescriptions Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Rx Code & Date</th>
                <th className="py-3.5 px-4">Patient Name</th>
                <th className="py-3.5 px-4">Medication & Dosage</th>
                <th className="py-3.5 px-4">Frequency & Duration</th>
                <th className="py-3.5 px-4">Prescribing Doctor</th>
                <th className="py-3.5 px-4 text-right">Preview / Print</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredRx.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-10 text-center text-slate-400">
                    No prescriptions found.
                  </td>
                </tr>
              ) : (
                filteredRx.map(rx => (
                  <tr key={rx.id} className="hover:bg-emerald-50/30 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-500/20">
                        {rx.id}
                      </span>
                      <div className="text-[10px] text-slate-400 mt-1">{rx.date}</div>
                    </td>

                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-slate-100">
                      {rx.patientName}
                      <div className="text-[10px] font-normal text-slate-400">{rx.patientId}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 dark:text-slate-100">{rx.medication}</div>
                      <div className="text-[11px] text-slate-500">{rx.dosage}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">{rx.frequency}</span>
                      <div className="text-[10px] text-slate-400">{rx.duration} ({rx.refills} Refills left)</div>
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200">
                      {rx.doctorName}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedRxForPrint(rx)}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-500 hover:text-white text-slate-700 dark:text-slate-300 font-bold transition-all flex items-center gap-1.5 ml-auto"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print Rx</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* MODAL 1: ISSUE NEW PRESCRIPTION */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Pill className="w-5 h-5 text-emerald-500" /> Issue Digital Prescription
              </h3>
              <button onClick={() => setShowAddModal(false)} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRx} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Select Patient *</label>
                <select
                  value={newRxForm.patientId}
                  onChange={(e) => setNewRxForm({ ...newRxForm, patientId: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700"
                >
                  {patients.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.id})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Medication Name & Strength *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Amoxicillin 500mg"
                  value={newRxForm.medication}
                  onChange={(e) => setNewRxForm({ ...newRxForm, medication: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Dosage Instructions</label>
                <input
                  type="text"
                  placeholder="e.g. 1 capsule 3 times daily after food"
                  value={newRxForm.dosage}
                  onChange={(e) => setNewRxForm({ ...newRxForm, dosage: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Frequency</label>
                  <select
                    value={newRxForm.frequency}
                    onChange={(e) => setNewRxForm({ ...newRxForm, frequency: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700"
                  >
                    <option value="Once Daily">Once Daily</option>
                    <option value="Twice Daily">Twice Daily</option>
                    <option value="Three Times Daily">Three Times Daily</option>
                    <option value="PRN (As Needed)">PRN (As Needed)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Refills Allowed</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={newRxForm.refills}
                    onChange={(e) => setNewRxForm({ ...newRxForm, refills: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700"
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
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold"
                >
                  Confirm & Issue Rx
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: PRINTABLE PRESCRIPTION PREVIEW */}
      {selectedRxForPrint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-8 space-y-6">
            
            {/* Header */}
            <div className="border-b-2 border-slate-900 dark:border-white pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">MediCore Hospital E-Prescription</h3>
                <p className="text-xs text-slate-500">254 Medical Center Blvd, Suite 100 • Phone: (555) 100-EHR</p>
              </div>
              <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">Rx</span>
            </div>

            {/* Patient & Doctor Details */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase">Patient Information</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm">{selectedRxForPrint.patientName}</span>
                <span className="block text-slate-500">MRN: {selectedRxForPrint.patientId}</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase">Prescribing Physician</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm">{selectedRxForPrint.doctorName}</span>
                <span className="block text-slate-500">Date: {selectedRxForPrint.date}</span>
              </div>
            </div>

            {/* Prescribed Drug Info Box */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-500/30 space-y-2">
              <div className="text-base font-extrabold text-emerald-900 dark:text-emerald-200 flex items-center justify-between">
                <span>{selectedRxForPrint.medication}</span>
                <span className="text-xs bg-emerald-500 text-white px-2 py-0.5 rounded-full font-bold">Official Rx</span>
              </div>
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Instructions: {selectedRxForPrint.dosage}
              </div>
              <div className="text-xs text-slate-500 flex justify-between pt-2 border-t border-emerald-500/20">
                <span>Frequency: {selectedRxForPrint.frequency}</span>
                <span>Refills: {selectedRxForPrint.refills}</span>
              </div>
            </div>

            {/* Doctor Signature Mock */}
            <div className="pt-4 border-t border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-between text-xs">
              <div>
                <div className="font-serif italic text-lg text-slate-800 dark:text-slate-200 font-bold">
                  {selectedRxForPrint.doctorName}
                </div>
                <span className="text-[10px] text-slate-400 block border-t border-slate-400 pt-0.5 mt-0.5">
                  Verified Digital Signature & License #MD-90821
                </span>
              </div>
              <button
                onClick={() => {
                  window.print();
                  setSelectedRxForPrint(null);
                }}
                className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold"
              >
                Print Document
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
