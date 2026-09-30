import React, { useState } from 'react';
import { 
  CreditCard, 
  Plus, 
  Search, 
  FileText, 
  Printer, 
  CheckCircle2, 
  Clock, 
  X,
  DollarSign
} from 'lucide-react';

export default function BillingView({ 
  billing, 
  patients, 
  onAddInvoice 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedInvoiceForPrint, setSelectedInvoiceForPrint] = useState(null);

  const [newInvoiceForm, setNewInvoiceForm] = useState({
    patientId: patients[0]?.id || '',
    amount: '',
    status: 'Pending',
    description: 'Outpatient Medical Consultation & Diagnostic Fees'
  });

  const filteredInvoices = billing.filter(inv =>
    inv.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inv.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateInvoice = (e) => {
    e.preventDefault();
    const patientObj = patients.find(p => p.id === newInvoiceForm.patientId);
    if (!patientObj || !newInvoiceForm.amount) return;

    const created = {
      id: `INV-${Math.floor(4000 + Math.random() * 100)}`,
      patientId: patientObj.id,
      patientName: patientObj.name,
      date: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
      amount: parseFloat(newInvoiceForm.amount),
      status: newInvoiceForm.status,
      breakdown: [
        { item: newInvoiceForm.description, cost: parseFloat(newInvoiceForm.amount) }
      ]
    };

    onAddInvoice(created);
    setShowAddModal(false);
    setNewInvoiceForm({
      patientId: patients[0]?.id || '',
      amount: '',
      status: 'Pending',
      description: 'Outpatient Medical Consultation & Diagnostic Fees'
    });
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-blue-600" /> Patient Billing & Financial Claims
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Itemized hospital invoices, insurance claims submission & printable statements
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition-transform hover:scale-105"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>+ Generate Invoice</span>
        </button>
      </div>

      {/* Main Container */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        
        {/* Search Input */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by Patient Name or Invoice ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-transparent focus:border-blue-500/50"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Invoice ID & Date</th>
                <th className="py-3.5 px-4">Patient Name</th>
                <th className="py-3.5 px-4">Total Amount</th>
                <th className="py-3.5 px-4">Due Date</th>
                <th className="py-3.5 px-4">Payment Status</th>
                <th className="py-3.5 px-4 text-right">Statement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-10 text-center text-slate-400">
                    No billing records found.
                  </td>
                </tr>
              ) : (
                filteredInvoices.map(inv => (
                  <tr key={inv.id} className="hover:bg-blue-50/30 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <span className="font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded-md border border-blue-500/20">
                        {inv.id}
                      </span>
                      <div className="text-[10px] text-slate-400 mt-1">{inv.date}</div>
                    </td>

                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-slate-100">
                      {inv.patientName}
                      <div className="text-[10px] font-normal text-slate-400">{inv.patientId}</div>
                    </td>

                    <td className="py-3.5 px-4 font-black text-slate-900 dark:text-white text-sm">
                      ${inv.amount.toFixed(2)}
                    </td>

                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                      {inv.dueDate}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        inv.status === 'Paid'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400'
                          : inv.status === 'Claimed'
                          ? 'bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-400'
                          : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400'
                      }`}>
                        {inv.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedInvoiceForPrint(inv)}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-700 dark:text-slate-300 font-bold transition-all inline-flex items-center gap-1"
                      >
                        <Printer className="w-3.5 h-3.5" /> View Statement
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* MODAL 1: CREATE INVOICE */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-blue-600" /> Create Patient Invoice
              </h3>
              <button onClick={() => setShowAddModal(false)} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateInvoice} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Select Patient *</label>
                <select
                  value={newInvoiceForm.patientId}
                  onChange={(e) => setNewInvoiceForm({ ...newInvoiceForm, patientId: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700"
                >
                  {patients.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.id})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Line Item Description *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cardiology Outpatient Consultation & ECG Panel"
                  value={newInvoiceForm.description}
                  onChange={(e) => setNewInvoiceForm({ ...newInvoiceForm, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Total Amount ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="250.00"
                    value={newInvoiceForm.amount}
                    onChange={(e) => setNewInvoiceForm({ ...newInvoiceForm, amount: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Payment Status</label>
                  <select
                    value={newInvoiceForm.status}
                    onChange={(e) => setNewInvoiceForm({ ...newInvoiceForm, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Claimed">Insurance Claimed</option>
                  </select>
                </div>
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
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold"
                >
                  Generate Statement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: INVOICE PREVIEW */}
      {selectedInvoiceForPrint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-8 space-y-6">
            
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4 flex justify-between items-start">
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">MediCore Health Billing Statement</h3>
                <p className="text-xs text-slate-400">Tax ID: #98-204192 | NPI #104928104</p>
              </div>
              <span className="font-mono font-bold text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-md">
                {selectedInvoiceForPrint.id}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="block text-slate-400 font-bold uppercase text-[10px]">Billed To</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm">{selectedInvoiceForPrint.patientName}</span>
                <span className="block text-slate-500">ID: {selectedInvoiceForPrint.patientId}</span>
              </div>
              <div>
                <span className="block text-slate-400 font-bold uppercase text-[10px]">Dates</span>
                <span className="block text-slate-700 dark:text-slate-300">Issued: {selectedInvoiceForPrint.date}</span>
                <span className="block text-slate-700 dark:text-slate-300">Due: {selectedInvoiceForPrint.dueDate}</span>
              </div>
            </div>

            <div className="space-y-2 border-t border-b border-slate-100 dark:border-slate-800 py-4 text-xs">
              <span className="block font-bold text-slate-900 dark:text-white mb-2">Itemized Charges:</span>
              {selectedInvoiceForPrint.breakdown.map((item, idx) => (
                <div key={idx} className="flex justify-between text-slate-700 dark:text-slate-300">
                  <span>{item.item}</span>
                  <span className="font-bold">${item.cost.toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center text-sm font-black text-slate-900 dark:text-white">
              <span>Total Payable:</span>
              <span className="text-xl text-blue-600 dark:text-blue-400">${selectedInvoiceForPrint.amount.toFixed(2)}</span>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                onClick={() => setSelectedInvoiceForPrint(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs"
              >
                Close Statement
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
