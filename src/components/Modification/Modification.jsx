import React, { useState, useEffect } from 'react';
import { Search, Clock, Save, User, Calendar, ChevronRight, CheckCircle, AlertCircle, Info } from 'lucide-react';

const AttendanceEditor = () => {
     // Mock data for users
     const users = [
          { id: 'emp001', name: 'Jean Dupont', department: 'Informatique' },
          { id: 'emp002', name: 'Marie Martin', department: 'Ressources Humaines' },
          { id: 'emp003', name: 'Pierre Durand', department: 'Comptabilité' },
          { id: 'emp004', name: 'Sophie Lefevre', department: 'Informatique' }
     ];

     // Mock attendance records
     const [attendanceRecords, setAttendanceRecords] = useState([
          { userId: 'emp001', date: '2025-06-28', punchIn: '08:00', punchOut: '17:00', status: 'Présent' },
          { userId: 'emp001', date: '2025-06-29', punchIn: '08:05', punchOut: '17:10', status: 'Présent' },
          { userId: 'emp002', date: '2025-06-28', punchIn: '08:30', punchOut: '17:30', status: 'Présent' },
          { userId: 'emp002', date: '2025-06-29', punchIn: '09:00', punchOut: '17:00', status: 'En retard' },
          { userId: 'emp003', date: '2025-06-28', punchIn: '09:00', punchOut: '18:00', status: 'Présent' },
          { userId: 'emp003', date: '2025-06-29', punchIn: '', punchOut: '', status: 'Absent' },
          { userId: 'emp004', date: '2025-06-30', punchIn: '07:55', punchOut: '16:58', status: 'Présent' }
     ]);

     // Form state
     const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
     const [selectedDate, setSelectedDate] = useState('');
     const [formData, setFormData] = useState({
          employeeName: '',
          date: '',
          entryTime: '',
          exitTime: '',
          status: 'Présent'
     });
     const [showDetails, setShowDetails] = useState(false);
     const [alert, setAlert] = useState({ type: '', message: '', show: false });

     // Initialize date to today
     useEffect(() => {
          const today = new Date();
          const yyyy = today.getFullYear();
          const mm = String(today.getMonth() + 1).padStart(2, '0');
          const dd = String(today.getDate()).padStart(2, '0');
          setSelectedDate(`${yyyy}-${mm}-${dd}`);
     }, []);

     const showAlert = (type, message) => {
          setAlert({ type, message, show: true });
          setTimeout(() => setAlert({ type: '', message: '', show: false }), 5000);
     };

     const loadAttendanceForEdit = () => {
          setAlert({ type: '', message: '', show: false });
          setShowDetails(false);

          if (!selectedEmployeeId || !selectedDate) {
               showAlert('info', 'Veuillez sélectionner un employé et une date.');
               return;
          }

          const record = attendanceRecords.find(rec =>
               rec.userId === selectedEmployeeId && rec.date === selectedDate
          );

          if (record) {
               const employeeName = users.find(user => user.id === selectedEmployeeId)?.name;
               setFormData({
                    employeeName: employeeName || '',
                    date: selectedDate,
                    entryTime: record.punchIn,
                    exitTime: record.punchOut,
                    status: record.status
               });
               setShowDetails(true);
               showAlert('info', 'Détails du pointage chargés. Vous pouvez maintenant les modifier.');
          } else {
               showAlert('danger', 'Pointage non trouvé pour l\'employé et la date sélectionnés.');
               setFormData({
                    employeeName: '',
                    date: '',
                    entryTime: '',
                    exitTime: '',
                    status: 'Présent'
               });
          }
     };

     const handleSubmit = (e) => {
          e.preventDefault();
          setAlert({ type: '', message: '', show: false });

          if (!selectedEmployeeId || !selectedDate) {
               showAlert('danger', 'Erreur: Employé ou date non sélectionnés.');
               return;
          }

          const recordIndex = attendanceRecords.findIndex(rec =>
               rec.userId === selectedEmployeeId && rec.date === selectedDate
          );

          if (recordIndex !== -1) {
               const updatedRecords = [...attendanceRecords];
               updatedRecords[recordIndex] = {
                    ...updatedRecords[recordIndex],
                    punchIn: formData.entryTime,
                    punchOut: formData.exitTime,
                    status: formData.status
               };
               setAttendanceRecords(updatedRecords);
               showAlert('success', 'Les modifications ont été enregistrées avec succès!');
          } else {
               const newRecord = {
                    userId: selectedEmployeeId,
                    date: selectedDate,
                    punchIn: formData.entryTime,
                    punchOut: formData.exitTime,
                    status: formData.status
               };
               setAttendanceRecords([...attendanceRecords, newRecord]);
               showAlert('success', 'Nouveau pointage créé et enregistré avec succès!');
          }
     };

     const AlertComponent = ({ type, message, show }) => {
          if (!show) return null;

          const alertStyles = {
               info: 'bg-blue-50 border-blue-200 text-blue-800',
               success: 'bg-green-50 border-green-200 text-green-800',
               danger: 'bg-red-50 border-red-200 text-red-800'
          };

          const AlertIcon = type === 'success' ? CheckCircle : type === 'danger' ? AlertCircle : Info;

          return (
               <div className={`border rounded-lg p-4 mb-4 ${alertStyles[type]} animate-in slide-in-from-top-2 duration-300`}>
                    <div className="flex items-center">
                         <AlertIcon className="w-5 h-5 mr-2" />
                         <span className="font-medium">{message}</span>
                    </div>
               </div>
          );
     };

     return (
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
               {/* Header */}
               <div className="bg-white shadow-sm border-b border-slate-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                         <div className="flex items-center justify-between h-16">
                              <div className="flex items-center space-x-3">
                                   <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                        <Clock className="w-5 h-5 text-white" />
                                   </div>
                                   <h1 className="text-xl font-bold text-slate-900">Gestion des Pointages</h1>
                              </div>
                         </div>
                    </div>
               </div>

               {/* Main Content */}
               <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Page Title */}
                    <div className="mb-8">
                         <h2 className="text-3xl font-bold text-slate-900 mb-2">Modifier un pointage</h2>
                         <p className="text-slate-600">Recherchez et modifiez les détails de pointage des employés</p>
                    </div>

                    {/* Search Card */}
                    <div className="bg-white rounded-xl shadow-lg border border-slate-200 mb-6 overflow-hidden">
                         <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-slate-200">
                              <div className="flex items-center">
                                   <Search className="w-5 h-5 text-blue-600 mr-2" />
                                   <h3 className="text-lg font-semibold text-slate-900">Rechercher un pointage</h3>
                              </div>
                         </div>
                         <div className="p-6">
                              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                                   <div className="md:col-span-5">
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                             <User className="w-4 h-4 inline mr-1" />
                                             Sélectionner un employé
                                        </label>
                                        <select
                                             value={selectedEmployeeId}
                                             onChange={(e) => setSelectedEmployeeId(e.target.value)}
                                             className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        >
                                             <option value="">-- Sélectionner un employé --</option>
                                             {users.map(user => (
                                                  <option key={user.id} value={user.id}>
                                                       {user.name} ({user.department})
                                                  </option>
                                             ))}
                                        </select>
                                   </div>
                                   <div className="md:col-span-4">
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                             <Calendar className="w-4 h-4 inline mr-1" />
                                             Date du pointage
                                        </label>
                                        <input
                                             type="date"
                                             value={selectedDate}
                                             onChange={(e) => setSelectedDate(e.target.value)}
                                             className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        />
                                   </div>
                                   <div className="md:col-span-3 flex items-end">
                                        <button
                                             onClick={loadAttendanceForEdit}
                                             className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium shadow-lg"
                                        >
                                             <ChevronRight className="w-4 h-4 inline mr-1" />
                                             Charger
                                        </button>
                                   </div>
                              </div>
                         </div>
                    </div>

                    {/* Alert Messages */}
                    <AlertComponent type={alert.type} message={alert.message} show={alert.show} />

                    {/* Attendance Details Card */}
                    {showDetails && (
                         <div className="bg-white rounded-xl shadow-lg border border-slate-200 mb-6 overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
                              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-4 border-b border-slate-200">
                                   <div className="flex items-center">
                                        <Clock className="w-5 h-5 text-emerald-600 mr-2" />
                                        <h3 className="text-lg font-semibold text-slate-900">Détails du pointage à modifier</h3>
                                   </div>
                              </div>
                              <div className="p-6">
                                   <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                             <div>
                                                  <label className="block text-sm font-medium text-slate-700 mb-2">
                                                       Employé
                                                  </label>
                                                  <input
                                                       type="text"
                                                       value={formData.employeeName}
                                                       readOnly
                                                       className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-600"
                                                  />
                                             </div>
                                             <div>
                                                  <label className="block text-sm font-medium text-slate-700 mb-2">
                                                       Date
                                                  </label>
                                                  <input
                                                       type="text"
                                                       value={formData.date}
                                                       readOnly
                                                       className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-600"
                                                  />
                                             </div>
                                             <div>
                                                  <label className="block text-sm font-medium text-slate-700 mb-2">
                                                       Heure d'entrée
                                                  </label>
                                                  <input
                                                       type="time"
                                                       value={formData.entryTime}
                                                       onChange={(e) => setFormData({ ...formData, entryTime: e.target.value })}
                                                       className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                                                  />
                                             </div>
                                             <div>
                                                  <label className="block text-sm font-medium text-slate-700 mb-2">
                                                       Heure de sortie
                                                  </label>
                                                  <input
                                                       type="time"
                                                       value={formData.exitTime}
                                                       onChange={(e) => setFormData({ ...formData, exitTime: e.target.value })}
                                                       className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                                                  />
                                             </div>
                                             <div className="md:col-span-2">
                                                  <label className="block text-sm font-medium text-slate-700 mb-2">
                                                       Statut
                                                  </label>
                                                  <select
                                                       value={formData.status}
                                                       onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                                       className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                                                  >
                                                       <option value="Présent">Présent</option>
                                                       <option value="Absent">Absent</option>
                                                       <option value="En retard">En retard</option>
                                                  </select>
                                             </div>
                                        </div>
                                        <div className="flex justify-end">
                                             <button
                                                  type="submit"
                                                  className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 transform hover:scale-105 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 font-medium shadow-lg"
                                             >
                                                  <Save className="w-4 h-4 inline mr-2" />
                                                  Enregistrer les modifications
                                             </button>
                                        </div>
                                   </form>
                              </div>
                         </div>
                    )}
               </div>
          </div>
     );
};

export default AttendanceEditor;