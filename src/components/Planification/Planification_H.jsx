import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Clock, Building, Save, X, Check, AlertCircle } from 'lucide-react';


const DepartmentPlanningSystem = () => {
     const [departments, setDepartments] = useState({});
     const [departmentActions, setDepartmentActions] = useState([]);
     const [selectedDepartment, setSelectedDepartment] = useState('');
     const [showModal, setShowModal] = useState(false);
     const [modalType, setModalType] = useState('');
     const [currentDepartment, setCurrentDepartment] = useState({
          name: '',
          schedule: {
               morningStart: '08:00',
               morningEnd: '12:00',
               breakStart: '12:00',
               breakEnd: '13:30',
               afternoonStart: '13:30',
               afternoonEnd: '17:30'
          }
     });
     const [formErrors, setFormErrors] = useState({});

     // Initialiser les données au chargement
     useEffect(() => {
          const initialDepartments = {
               'Ressources Humaines': {
                    schedule: {
                         morningStart: '08:00',
                         morningEnd: '12:00',
                         breakStart: '12:00',
                         breakEnd: '13:30',
                         afternoonStart: '13:30',
                         afternoonEnd: '17:30'
                    }
               },
               'Informatique': {
                    schedule: {
                         morningStart: '09:00',
                         morningEnd: '12:30',
                         breakStart: '12:30',
                         breakEnd: '14:00',
                         afternoonStart: '14:00',
                         afternoonEnd: '18:00'
                    }
               }
          };

          setDepartments(initialDepartments);
          setDepartmentActions([
               '[15/07/2025 14:30:00] Création du département : Ressources Humaines',
               '[15/07/2025 14:25:00] Création du département : Informatique'
          ]);
     }, []);

     const openModal = (type, department = null) => {
          setModalType(type);
          setFormErrors({});

          if (type === 'create') {
               setCurrentDepartment({
                    name: '',
                    schedule: {
                         morningStart: '08:00',
                         morningEnd: '12:00',
                         breakStart: '12:00',
                         breakEnd: '13:30',
                         afternoonStart: '13:30',
                         afternoonEnd: '17:30'
                    }
               });
          } else if (type === 'modify' && selectedDepartment) {
               setCurrentDepartment({
                    name: selectedDepartment,
                    schedule: departments[selectedDepartment]?.schedule || {
                         morningStart: '08:00',
                         morningEnd: '12:00',
                         breakStart: '12:00',
                         breakEnd: '13:30',
                         afternoonStart: '13:30',
                         afternoonEnd: '17:30'
                    }
               });
          } else if (type === 'delete' && selectedDepartment) {
               setCurrentDepartment({
                    name: selectedDepartment,
                    schedule: departments[selectedDepartment]?.schedule || {}
               });
          }

          setShowModal(true);
     };

     const closeModal = () => {
          setShowModal(false);
          setFormErrors({});
     };

     const addAction = (action) => {
          const timestamp = new Date().toLocaleString('fr-FR');
          const newAction = `[${timestamp}] ${action}`;
          setDepartmentActions(prev => [newAction, ...prev.slice(0, 9)]);
     };

     const handleSubmit = (e) => {
          e.preventDefault();
          setFormErrors({});

          if (modalType === 'create') {
               if (!currentDepartment.name.trim()) {
                    setFormErrors({ name: 'Le nom du département ne peut pas être vide.' });
                    return;
               }
               if (departments[currentDepartment.name]) {
                    setFormErrors({ name: 'Ce département existe déjà.' });
                    return;
               }

               setDepartments(prev => ({
                    ...prev,
                    [currentDepartment.name]: { schedule: currentDepartment.schedule }
               }));
               addAction(`Création du département : ${currentDepartment.name}`);
               setSelectedDepartment(currentDepartment.name);

          } else if (modalType === 'modify') {
               const oldName = selectedDepartment;
               const newName = currentDepartment.name.trim();

               if (!newName) {
                    setFormErrors({ name: 'Le nom du département ne peut pas être vide.' });
                    return;
               }
               if (newName !== oldName && departments[newName]) {
                    setFormErrors({ name: 'Un département avec ce nouveau nom existe déjà.' });
                    return;
               }

               setDepartments(prev => {
                    const updated = { ...prev };
                    if (newName !== oldName) {
                         updated[newName] = updated[oldName];
                         delete updated[oldName];
                    }
                    updated[newName] = { schedule: currentDepartment.schedule };
                    return updated;
               });

               if (newName !== oldName) {
                    addAction(`Modification du département : Renommé de "${oldName}" en "${newName}" et planification mise à jour.`);
                    setSelectedDepartment(newName);
               } else {
                    addAction(`Modification du département : Planification de "${oldName}" mise à jour.`);
               }

          } else if (modalType === 'delete') {
               setDepartments(prev => {
                    const updated = { ...prev };
                    delete updated[selectedDepartment];
                    return updated;
               });
               addAction(`Suppression du département : ${selectedDepartment}`);
               setSelectedDepartment('');
          }

          closeModal();
     };

     const updateSchedule = (field, value) => {
          if (selectedDepartment) {
               setDepartments(prev => ({
                    ...prev,
                    [selectedDepartment]: {
                         ...prev[selectedDepartment],
                         schedule: {
                              ...prev[selectedDepartment].schedule,
                              [field]: value
                         }
                    }
               }));
          }
     };

     const saveSchedule = () => {
          if (selectedDepartment) {
               addAction(`Planification du département "${selectedDepartment}" mise à jour.`);
          }
     };

     const getModalTitle = () => {
          switch (modalType) {
               case 'create': return 'Créer un nouveau département';
               case 'modify': return 'Modifier un département';
               case 'delete': return 'Supprimer un département';
               default: return '';
          }
     };

     const getModalIcon = () => {
          switch (modalType) {
               case 'create': return <Plus className="w-6 h-6" />;
               case 'modify': return <Edit className="w-6 h-6" />;
               case 'delete': return <Trash2 className="w-6 h-6" />;
               default: return null;
          }
     };

     return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
               <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                         <div className="flex justify-between items-center">
                              <div className="flex items-center space-x-3">
                                   <div className="bg-blue-600 p-3 rounded-lg">
                                        <Clock className="w-8 h-8 text-white" />
                                   </div>
                                   <div>
                                        <h1 className="text-3xl font-bold text-gray-900">Planification des heures</h1>
                                        <p className="text-gray-600">Gérez les horaires de travail par département</p>
                                   </div>
                              </div>
                              <div className="flex space-x-3">
                                   <button
                                        onClick={() => openModal('create')}
                                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                                   >
                                        <Plus className="w-5 h-5" />
                                        <span>Créer</span>
                                   </button>
                                   <button
                                        onClick={() => openModal('modify')}
                                        disabled={!selectedDepartment}
                                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                                   >
                                        <Edit className="w-5 h-5" />
                                        <span>Modifier</span>
                                   </button>
                                   <button
                                        onClick={() => openModal('delete')}
                                        disabled={!selectedDepartment}
                                        className="bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                                   >
                                        <Trash2 className="w-5 h-5" />
                                        <span>Supprimer</span>
                                   </button>
                              </div>
                         </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                         {/* Sélection du département */}
                         <div className="lg:col-span-1">
                              <div className="bg-white rounded-xl shadow-lg p-6">
                                   <h2 className="text-xl font-semibold mb-4 flex items-center">
                                        <Building className="w-6 h-6 mr-2 text-blue-600" />
                                        Départements
                                   </h2>
                                   <select
                                        value={selectedDepartment}
                                        onChange={(e) => setSelectedDepartment(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                   >
                                        <option value="">-- Sélectionner un département --</option>
                                        {Object.keys(departments).map(dept => (
                                             <option key={dept} value={dept}>{dept}</option>
                                        ))}
                                   </select>

                                   {/* Liste des départements */}
                                   <div className="mt-4 space-y-2">
                                        {Object.keys(departments).map(dept => (
                                             <div
                                                  key={dept}
                                                  onClick={() => setSelectedDepartment(dept)}
                                                  className={`p-3 rounded-lg cursor-pointer transition-colors ${selectedDepartment === dept
                                                            ? 'bg-blue-100 border-2 border-blue-500'
                                                            : 'bg-gray-50 hover:bg-gray-100'
                                                       }`}
                                             >
                                                  <div className="flex items-center justify-between">
                                                       <span className="font-medium text-gray-900">{dept}</span>
                                                       <div className="text-sm text-gray-500">
                                                            {departments[dept].schedule.morningStart} - {departments[dept].schedule.afternoonEnd}
                                                       </div>
                                                  </div>
                                             </div>
                                        ))}
                                   </div>
                              </div>
                         </div>

                         {/* Planification */}
                         <div className="lg:col-span-2">
                              <div className="bg-white rounded-xl shadow-lg p-6">
                                   <h2 className="text-xl font-semibold mb-4">
                                        Planification {selectedDepartment && `- ${selectedDepartment}`}
                                   </h2>

                                   {selectedDepartment ? (
                                        <div className="space-y-6">
                                             {/* Horaires de travail */}
                                             <div className="bg-gray-50 rounded-lg p-4">
                                                  <h3 className="font-semibold text-gray-900 mb-4">Horaires de travail</h3>
                                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                       <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                 Début Matin
                                                            </label>
                                                            <input
                                                                 type="time"
                                                                 value={departments[selectedDepartment]?.schedule.morningStart || ''}
                                                                 onChange={(e) => updateSchedule('morningStart', e.target.value)}
                                                                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                            />
                                                       </div>
                                                       <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                 Fin Matin
                                                            </label>
                                                            <input
                                                                 type="time"
                                                                 value={departments[selectedDepartment]?.schedule.morningEnd || ''}
                                                                 onChange={(e) => updateSchedule('morningEnd', e.target.value)}
                                                                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                            />
                                                       </div>
                                                       <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                 Début Pause
                                                            </label>
                                                            <input
                                                                 type="time"
                                                                 value={departments[selectedDepartment]?.schedule.breakStart || ''}
                                                                 onChange={(e) => updateSchedule('breakStart', e.target.value)}
                                                                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                            />
                                                       </div>
                                                       <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                 Fin Pause
                                                            </label>
                                                            <input
                                                                 type="time"
                                                                 value={departments[selectedDepartment]?.schedule.breakEnd || ''}
                                                                 onChange={(e) => updateSchedule('breakEnd', e.target.value)}
                                                                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                            />
                                                       </div>
                                                       <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                 Début Après-midi
                                                            </label>
                                                            <input
                                                                 type="time"
                                                                 value={departments[selectedDepartment]?.schedule.afternoonStart || ''}
                                                                 onChange={(e) => updateSchedule('afternoonStart', e.target.value)}
                                                                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                            />
                                                       </div>
                                                       <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                 Fin Après-midi
                                                            </label>
                                                            <input
                                                                 type="time"
                                                                 value={departments[selectedDepartment]?.schedule.afternoonEnd || ''}
                                                                 onChange={(e) => updateSchedule('afternoonEnd', e.target.value)}
                                                                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                            />
                                                       </div>
                                                  </div>
                                                  <p className="text-sm text-gray-500 mt-3">
                                                       Ces heures définissent les limites pour les pointages. Passer ces heures vous serez considéré en retard.
                                                  </p>
                                             </div>

                                             <button
                                                  onClick={saveSchedule}
                                                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                                             >
                                                  <Save className="w-5 h-5" />
                                                  <span>Enregistrer la planification</span>
                                             </button>
                                        </div>
                                   ) : (
                                        <div className="text-center py-12">
                                             <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                             <p className="text-gray-500">
                                                  Veuillez sélectionner un département pour afficher et modifier sa planification.
                                             </p>
                                        </div>
                                   )}
                              </div>
                         </div>
                    </div>

                    {/* Historique des actions */}
                    <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
                         <h2 className="text-xl font-semibold mb-4">Historique des actions</h2>
                         <div className="space-y-2 max-h-64 overflow-y-auto">
                              {departmentActions.length === 0 ? (
                                   <p className="text-gray-500 text-center py-4">
                                        Aucune action enregistrée pour le moment.
                                   </p>
                              ) : (
                                   departmentActions.map((action, index) => (
                                        <div
                                             key={index}
                                             className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700"
                                        >
                                             {action}
                                        </div>
                                   ))
                              )}
                         </div>
                    </div>
               </div>

               {/* Modal */}
               {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                         <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                              <div className="p-6">
                                   <div className="flex justify-between items-center mb-4">
                                        <div className="flex items-center space-x-3">
                                             <div className={`p-2 rounded-lg ${modalType === 'create' ? 'bg-green-100 text-green-600' :
                                                       modalType === 'modify' ? 'bg-blue-100 text-blue-600' :
                                                            'bg-red-100 text-red-600'
                                                  }`}>
                                                  {getModalIcon()}
                                             </div>
                                             <h2 className="text-xl font-semibold">{getModalTitle()}</h2>
                                        </div>
                                        <button
                                             onClick={closeModal}
                                             className="text-gray-400 hover:text-gray-600"
                                        >
                                             <X className="w-6 h-6" />
                                        </button>
                                   </div>

                                   <div className="space-y-4">
                                        <div>
                                             <label className="block text-sm font-medium text-gray-700 mb-1">
                                                  Nom du département
                                             </label>
                                             <input
                                                  type="text"
                                                  value={currentDepartment.name}
                                                  onChange={(e) => setCurrentDepartment(prev => ({ ...prev, name: e.target.value }))}
                                                  disabled={modalType === 'delete'}
                                                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${formErrors.name ? 'border-red-500' : 'border-gray-300'
                                                       } ${modalType === 'delete' ? 'bg-gray-100' : ''}`}
                                                  placeholder="Entrez le nom du département"
                                             />
                                             {formErrors.name && (
                                                  <p className="text-red-500 text-sm mt-1 flex items-center">
                                                       <AlertCircle className="w-4 h-4 mr-1" />
                                                       {formErrors.name}
                                                  </p>
                                             )}
                                        </div>

                                        {modalType === 'delete' && (
                                             <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                                  <p className="text-red-800">
                                                       Êtes-vous sûr de vouloir supprimer le département <strong>{currentDepartment.name}</strong> ?
                                                       Cette action est irréversible.
                                                  </p>
                                             </div>
                                        )}

                                        {modalType !== 'delete' && (
                                             <div className="bg-gray-50 rounded-lg p-4">
                                                  <h3 className="font-semibold text-gray-900 mb-3">Heures de travail par défaut</h3>
                                                  <div className="grid grid-cols-2 gap-3">
                                                       <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                 Début Matin
                                                            </label>
                                                            <input
                                                                 type="time"
                                                                 value={currentDepartment.schedule.morningStart}
                                                                 onChange={(e) => setCurrentDepartment(prev => ({
                                                                      ...prev,
                                                                      schedule: { ...prev.schedule, morningStart: e.target.value }
                                                                 }))}
                                                                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                            />
                                                       </div>
                                                       <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                 Fin Matin
                                                            </label>
                                                            <input
                                                                 type="time"
                                                                 value={currentDepartment.schedule.morningEnd}
                                                                 onChange={(e) => setCurrentDepartment(prev => ({
                                                                      ...prev,
                                                                      schedule: { ...prev.schedule, morningEnd: e.target.value }
                                                                 }))}
                                                                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                            />
                                                       </div>
                                                       <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                 Début Pause
                                                            </label>
                                                            <input
                                                                 type="time"
                                                                 value={currentDepartment.schedule.breakStart}
                                                                 onChange={(e) => setCurrentDepartment(prev => ({
                                                                      ...prev,
                                                                      schedule: { ...prev.schedule, breakStart: e.target.value }
                                                                 }))}
                                                                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                            />
                                                       </div>
                                                       <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                 Fin Pause
                                                            </label>
                                                            <input
                                                                 type="time"
                                                                 value={currentDepartment.schedule.breakEnd}
                                                                 onChange={(e) => setCurrentDepartment(prev => ({
                                                                      ...prev,
                                                                      schedule: { ...prev.schedule, breakEnd: e.target.value }
                                                                 }))}
                                                                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                            />
                                                       </div>
                                                       <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                 Début Après-midi
                                                            </label>
                                                            <input
                                                                 type="time"
                                                                 value={currentDepartment.schedule.afternoonStart}
                                                                 onChange={(e) => setCurrentDepartment(prev => ({
                                                                      ...prev,
                                                                      schedule: { ...prev.schedule, afternoonStart: e.target.value }
                                                                 }))}
                                                                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                            />
                                                       </div>
                                                       <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                 Fin Après-midi
                                                            </label>
                                                            <input
                                                                 type="time"
                                                                 value={currentDepartment.schedule.afternoonEnd}
                                                                 onChange={(e) => setCurrentDepartment(prev => ({
                                                                      ...prev,
                                                                      schedule: { ...prev.schedule, afternoonEnd: e.target.value }
                                                                 }))}
                                                                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                            />
                                                       </div>
                                                  </div>
                                             </div>
                                        )}
                                   </div>

                                   <div className="flex justify-end space-x-3 mt-6">
                                        <button
                                             onClick={closeModal}
                                             className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                                        >
                                             Annuler
                                        </button>
                                        <button
                                             onClick={handleSubmit}
                                             className={`px-6 py-2 rounded-lg text-white transition-colors flex items-center space-x-2 ${modalType === 'create' ? 'bg-green-600 hover:bg-green-700' :
                                                       modalType === 'modify' ? 'bg-blue-600 hover:bg-blue-700' :
                                                            'bg-red-600 hover:bg-red-700'
                                                  }`}
                                        >
                                             <Check className="w-5 h-5" />
                                             <span>
                                                  {modalType === 'create' ? 'Créer' :
                                                       modalType === 'modify' ? 'Modifier' :
                                                            'Supprimer'}
                                             </span>
                                        </button>
                                   </div>
                              </div>
                         </div>
                    </div>
               )}
          </div>
     );
};

export default DepartmentPlanningSystem;