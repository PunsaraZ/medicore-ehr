import React, { useState } from 'react';
import { 
  TestTube, 
  Search, 
  Plus, 
  AlertTriangle, 
  CheckCircle2, 
  X, 
  FileCheck, 
  Clock,
  Eye,
  Activity
} from 'lucide-react';

export default function LabReportsView({ 
  labReports, 
  patients, 
  doctors, 
  onAddLabReport 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [flagFilter, setFlagFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedLabForView, setSelectedLabForView] = useState(null);

  const [newLabForm, setNewLabForm] = useState({
    patientId: patients[0]?.id || '',
    testName: '',
    category: 'Cardiology',
    flag: 'Normal',
    resultSummary: ''
  });

  const filteredLabs = labReports.filter(lab => {
    const matchesSearch = 
      lab.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lab.testName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lab.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFlag = flagFilter === 'All' || lab.flag === flagFilter;
    return matchesSearch && matchesFlag;
  });

  const handleCreateLab = (e) => {
    e.preventDefault();
    const patientObj = patients.find(p => p.id === newLabForm.patientId);
    if (!patientObj || !newLabForm.testName) return;

    const created = {
      id: `LAB-${Math.floor(500 + Math.random() * 100)}`,
      patientId: patientObj.id,
      patientName: patientObj.name,
      testName: newLabForm.testName,
      category: newLabForm.category,
      date: new Date().toISOString().split('T')[0],
      resultSummary: newLabForm.resultSummary || 'Test panel completed. Findings normal within reference range.',
      flag: newLabForm.flag,
      doctorName: patientObj.attendingDoctor || 'Dr. Sarah Jenkins'
    };

    onAddLabReport(created);
    setShowAddModal(false);
    setNewLabForm({
      patientId: patients[0]?.id || '',
      testName: '',
      category: 'Cardiology',
      flag: 'Normal',
      resultSummary: ''
    });
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <TestTube className="w-6 h-6 text-purple-500" /> Diagnostic Pathology & Imaging
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Order blood panels, radiology imaging & review diagnostic report flags
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-purple-500/20 flex items-center gap-1.5 transition-transform hover:scale-105"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>+ Order Lab Test</span>
        </button>
      </div>

      {/* Main Container */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        
        {/* Search & Flag Filter Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by Patient, Test Name, or Lab ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 border border-transparent focus:border-purple-500/50"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
            {['All', 'Critical', 'Abnormal', 'Normal'].map(flg => (
              <button
                key={flg}
                onClick={() => setFlagFilter(flg)}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  flagFilter === flg ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-400 shadow-xs' : 'text-slate-500'
                }`}
              >
                {flg}
              </button>
            ))}
          </div>
        </div>

        {/* Lab Reports Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Lab ID & Date</th>
                <th className="py-3.5 px-4">Patient Name</th>
                <th className="py-3.5 px-4">Test Name & Category</th>
                <th className="py-3.5 px-4">Result Summary</th>
                <th className="py-3.5 px-4">Flag Status</th>
                <th className="py-3.5 px-4 text-right">View Report</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredLabs.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-10 text-center text-slate-400">
                    No lab diagnostic records match the filters.
                  </td>
                </tr>
              ) : (
                filteredLabs.map(lab => (
                  <tr key={lab.id} className="hover:bg-purple-50/30 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <span className="font-mono font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950 px-2 py-0.5 rounded-md border border-purple-500/20">
                        {lab.id}
                      </span>
                      <div className="text-[10px] text-slate-400 mt-1">{lab.date}</div>
                    </td>

                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-slate-100">
                      {lab.patientName}
                      <div className="text-[10px] font-normal text-slate-400">{lab.patientId}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 dark:text-slate-100">{lab.testName}</div>
                      <div className="text-[10px] font-semibold text-purple-600 dark:text-purple-400">{lab.category}</div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300 max-w-xs truncate">
                      {lab.resultSummary}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        lab.flag === 'Critical'
                          ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400 border border-rose-500/20 animate-pulse'
                          : lab.flag === 'Abnormal'
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400 border border-amber-500/20'
                          : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 border border-emerald-500/20'
                      }`}>
                        {lab.flag === 'Critical' && <AlertTriangle className="w-3 h-3" />}
                        {lab.flag}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedLabForView(lab)}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-purple-600 hover:text-white text-slate-700 dark:text-slate-300 font-bold transition-all inline-flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" /> View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* MODAL 1: ORDER NEW LAB TEST */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <TestTube className="w-5 h-5 text-purple-500" /> Order Diagnostic Pathology Test
              </h3>
              <button onClick={() => setShowAddModal(false)} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLab} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Select Patient *</label>
                <select
                  value={newLabForm.patientId}
                  onChange={(e) => setNewLabForm({ ...newLabForm, patientId: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700"
                >
                  {patients.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.id})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Test Panel Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Complete Blood Count (CBC) with Differential"
                  value={newLabForm.testName}
                  onChange={(e) => setNewLabForm({ ...newLabForm, testName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Category</label>
                  <select
                    value={newLabForm.category}
                    onChange={(e) => setNewLabForm({ ...newLabForm, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700"
                  >
                    <option value="Cardiology">Cardiology</option>
                    <option value="Hematology">Hematology</option>
                    <option value="Radiology">Radiology</option>
                    <option value="Endocrinology">Endocrinology</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Result Flag Status</label>
                  <select
                    value={newLabForm.flag}
                    onChange={(e) => setNewLabForm({ ...newLabForm, flag: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700"
                  >
                    <option value="Normal">Normal</option>
                    <option value="Abnormal">Abnormal</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Lab Findings Summary</label>
                <textarea
                  rows="3"
                  placeholder="Describe test observations, reference ranges and clinical interpretations..."
                  value={newLabForm.resultSummary}
                  onChange={(e) => setNewLabForm({ ...newLabForm, resultSummary: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold"
                >
                  Submit Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: LAB REPORT DETAILS */}
      {selectedLabForView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{selectedLabForView.testName}</h3>
                <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold">{selectedLabForView.category} • {selectedLabForView.id}</p>
              </div>
              <button onClick={() => setSelectedLabForView(null)} className="p-1 rounded-lg text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold">Patient:</span>
                <span className="font-bold text-slate-900 dark:text-white">{selectedLabForView.patientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold">Ordered By:</span>
                <span className="font-bold text-slate-900 dark:text-white">{selectedLabForView.doctorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold">Date Completed:</span>
                <span className="text-slate-700 dark:text-slate-300">{selectedLabForView.date}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-2 text-xs">
              <h4 className="font-bold text-slate-900 dark:text-white">Diagnostic Observations:</h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedLabForView.resultSummary}
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedLabForView(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs"
              >
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
