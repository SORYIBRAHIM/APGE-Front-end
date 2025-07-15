import React, { useState } from 'react';
import { User, Calendar, Clock, TrendingUp, Download, Mail, FileText, Users, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

const EmployeeDashboard = () => {
     const [currentEmployeeId, setCurrentEmployeeId] = useState('EMP001');

     // Employee data
     const employees = {
          'EMP001': {
               name: 'Marie Dubois',
               department: 'Ressources Humaines',
               schedule: '09:00 - 17:00',
               stats: { present: 22, late: 3, absent: 1, avgTime: '8h15' }
          },
          'EMP002': {
               name: 'Jean Martin',
               department: 'Informatique',
               schedule: '08:30 - 16:30',
               stats: { present: 24, late: 1, absent: 0, avgTime: '8h30' }
          },
          'EMP003': {
               name: 'Sophie Bernard',
               department: 'Marketing',
               schedule: '09:30 - 17:30',
               stats: { present: 20, late: 5, absent: 2, avgTime: '7h45' }
          },
          'EMP004': {
               name: 'Pierre Durand',
               department: 'Ventes',
               schedule: '08:00 - 16:00',
               stats: { present: 25, late: 0, absent: 0, avgTime: '8h45' }
          }
     };

     const pointageHistory = {
          'EMP001': [
               { date: '2025-06-30', status: 'retard', obs: 'Retard 15min' },
               { date: '2025-06-29', status: 'present', obs: '' },
               { date: '2025-06-28', status: 'present', obs: '' },
               { date: '2025-06-27', status: 'absent', obs: 'Congé maladie' },
               { date: '2025-06-26', status: 'retard', obs: 'Retard 10min' },
               { date: '2025-06-25', status: 'present', obs: '' },
               { date: '2025-06-24', status: 'present', obs: '' }
          ],
          'EMP002': [
               { date: '2025-06-30', status: 'present', obs: '' },
               { date: '2025-06-29', status: 'present', obs: '' },
               { date: '2025-06-28', status: 'present', obs: '' },
               { date: '2025-06-27', status: 'present', obs: '' },
               { date: '2025-06-26', status: 'retard', obs: 'Retard 5min' },
               { date: '2025-06-25', status: 'present', obs: '' },
               { date: '2025-06-24', status: 'present', obs: '' }
          ],
          'EMP003': [
               { date: '2025-06-30', status: 'absent', obs: 'Formation externe' },
               { date: '2025-06-29', status: 'retard', obs: 'Retard 20min' },
               { date: '2025-06-28', status: 'present', obs: '' },
               { date: '2025-06-27', status: 'retard', obs: 'Retard 12min' },
               { date: '2025-06-26', status: 'present', obs: '' },
               { date: '2025-06-25', status: 'absent', obs: 'Congé personnel' },
               { date: '2025-06-24', status: 'retard', obs: 'Retard 8min' }
          ],
          'EMP004': [
               { date: '2025-06-30', status: 'present', obs: '' },
               { date: '2025-06-29', status: 'present', obs: '' },
               { date: '2025-06-28', status: 'present', obs: '' },
               { date: '2025-06-27', status: 'present', obs: '' },
               { date: '2025-06-26', status: 'present', obs: '' },
               { date: '2025-06-25', status: 'present', obs: '' },
               { date: '2025-06-24', status: 'present', obs: '' }
          ]
     };

     const currentEmployee = employees[currentEmployeeId];
     const history = pointageHistory[currentEmployeeId] || [];

     const getStatusIcon = (status) => {
          switch (status) {
               case 'present': return <CheckCircle className="w-4 h-4 text-emerald-500" />;
               case 'retard': return <AlertCircle className="w-4 h-4 text-amber-500" />;
               case 'absent': return <XCircle className="w-4 h-4 text-red-500" />;
               default: return null;
          }
     };

     const getStatusColor = (status) => {
          switch (status) {
               case 'present': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
               case 'retard': return 'bg-amber-50 text-amber-700 border-amber-200';
               case 'absent': return 'bg-red-50 text-red-700 border-red-200';
               default: return 'bg-gray-50 text-gray-700 border-gray-200';
          }
     };

     const exportToPDF = () => {
          // Simulate PDF export
          alert('📄 Fonctionnalité d\'export PDF en cours de développement');
     };

     const sendByEmail = () => {
          // Simulate email sending
          alert('📧 Fonctionnalité d\'envoi par email en cours de développement');
     };

     return (
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
               <div className="max-w-7xl mx-auto p-6">
                    {/* Header */}
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 mb-8 overflow-hidden">
                         <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 p-8">
                              <div className="flex items-center justify-between">
                                   <div className="flex items-center space-x-4">
                                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3">
                                             <Users className="w-8 h-8 text-white" />
                                        </div>
                                        <div>
                                             <h1 className="text-3xl font-bold text-white">Dashboard Employé</h1>
                                             <p className="text-slate-300 mt-1">Gestion des pointages et présences</p>
                                        </div>
                                   </div>
                              </div>

                              {/* Employee Selector */}
                              <div className="mt-8">
                                   <label className="block text-sm font-medium text-slate-300 mb-3">
                                        Sélectionner un employé
                                   </label>
                                   <select
                                        value={currentEmployeeId}
                                        onChange={(e) => setCurrentEmployeeId(e.target.value)}
                                        className="w-full max-w-md px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                                   >
                                        {Object.entries(employees).map(([id, employee]) => (
                                             <option key={id} value={id} className="text-slate-900">
                                                  {employee.name} ({id})
                                             </option>
                                        ))}
                                   </select>
                              </div>

                              {/* Employee Info */}
                              <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                   <div className="flex items-center space-x-4">
                                        <div className="bg-white/20 rounded-full p-3">
                                             <User className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                             <h2 className="text-2xl font-bold text-white">{currentEmployee.name}</h2>
                                             <div className="flex items-center space-x-6 mt-2 text-slate-300">
                                                  <span className="flex items-center space-x-1">
                                                       <span className="font-medium">ID:</span>
                                                       <span>{currentEmployeeId}</span>
                                                  </span>
                                                  <span className="flex items-center space-x-1">
                                                       <span className="font-medium">Département:</span>
                                                       <span>{currentEmployee.department}</span>
                                                  </span>
                                                  <span className="flex items-center space-x-1">
                                                       <Clock className="w-4 h-4" />
                                                       <span>{currentEmployee.schedule}</span>
                                                  </span>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>

                    {/* Statistics Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                         <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
                              <div className="flex items-center justify-between">
                                   <div>
                                        <p className="text-sm font-medium text-gray-600">Jours Présents</p>
                                        <p className="text-3xl font-bold text-emerald-600 mt-1">{currentEmployee.stats.present}</p>
                                        <p className="text-xs text-gray-500 mt-1">Ce mois</p>
                                   </div>
                                   <div className="bg-emerald-50 rounded-full p-3">
                                        <CheckCircle className="w-6 h-6 text-emerald-500" />
                                   </div>
                              </div>
                         </div>

                         <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
                              <div className="flex items-center justify-between">
                                   <div>
                                        <p className="text-sm font-medium text-gray-600">Retards</p>
                                        <p className="text-3xl font-bold text-amber-600 mt-1">{currentEmployee.stats.late}</p>
                                        <p className="text-xs text-gray-500 mt-1">Ce mois</p>
                                   </div>
                                   <div className="bg-amber-50 rounded-full p-3">
                                        <AlertCircle className="w-6 h-6 text-amber-500" />
                                   </div>
                              </div>
                         </div>

                         <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
                              <div className="flex items-center justify-between">
                                   <div>
                                        <p className="text-sm font-medium text-gray-600">Absences</p>
                                        <p className="text-3xl font-bold text-red-600 mt-1">{currentEmployee.stats.absent}</p>
                                        <p className="text-xs text-gray-500 mt-1">Ce mois</p>
                                   </div>
                                   <div className="bg-red-50 rounded-full p-3">
                                        <XCircle className="w-6 h-6 text-red-500" />
                                   </div>
                              </div>
                         </div>

                         <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
                              <div className="flex items-center justify-between">
                                   <div>
                                        <p className="text-sm font-medium text-gray-600">Temps Moyen</p>
                                        <p className="text-3xl font-bold text-blue-600 mt-1">{currentEmployee.stats.avgTime}</p>
                                        <p className="text-xs text-gray-500 mt-1">Par jour</p>
                                   </div>
                                   <div className="bg-blue-50 rounded-full p-3">
                                        <TrendingUp className="w-6 h-6 text-blue-500" />
                                   </div>
                              </div>
                         </div>
                    </div>

                    {/* History Section */}
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                         <div className="p-8">
                              <div className="flex items-center justify-between mb-6">
                                   <div className="flex items-center space-x-3">
                                        <div className="bg-slate-100 rounded-full p-2">
                                             <FileText className="w-5 h-5 text-slate-600" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-900">Historique des Pointages</h2>
                                   </div>
                                   <div className="flex space-x-3">
                                        <button
                                             onClick={exportToPDF}
                                             className="flex items-center space-x-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
                                        >
                                             <Download className="w-4 h-4" />
                                             <span>Export PDF</span>
                                        </button>
                                        <button
                                             onClick={sendByEmail}
                                             className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                             <Mail className="w-4 h-4" />
                                             <span>Envoyer par Email</span>
                                        </button>
                                   </div>
                              </div>

                              {/* Table */}
                              <div className="overflow-x-auto">
                                   <table className="w-full">
                                        <thead>
                                             <tr className="border-b border-gray-200">
                                                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Date</th>
                                                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Statut</th>
                                                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Observations</th>
                                             </tr>
                                        </thead>
                                        <tbody>
                                             {history.map((record, index) => (
                                                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                                       <td className="py-4 px-6">
                                                            <div className="flex items-center space-x-2">
                                                                 <Calendar className="w-4 h-4 text-gray-400" />
                                                                 <span className="font-medium text-gray-900">
                                                                      {new Date(record.date).toLocaleDateString('fr-FR')}
                                                                 </span>
                                                            </div>
                                                       </td>
                                                       <td className="py-4 px-6">
                                                            <div className="flex items-center space-x-2">
                                                                 {getStatusIcon(record.status)}
                                                                 <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(record.status)}`}>
                                                                      {record.status.toUpperCase()}
                                                                 </span>
                                                            </div>
                                                       </td>
                                                       <td className="py-4 px-6">
                                                            <span className="text-gray-600">{record.obs || '-'}</span>
                                                       </td>
                                                  </tr>
                                             ))}
                                        </tbody>
                                   </table>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default EmployeeDashboard;