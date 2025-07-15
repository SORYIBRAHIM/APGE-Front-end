import React, { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Composant principal pour générer des QR codes d'employés
 * Permet de saisir les informations d'un employé et de générer un QR code correspondant
 */
const QRCodeGenerator = () => {
     // ========== STATE MANAGEMENT ==========

     /**
      * État pour stocker les données du formulaire
      * Utilise un objet pour faciliter la gestion des champs multiples
      */
     const [formData, setFormData] = useState({
          Prenom: '',
          Nom: '',
          ID: '',
          Telephone: '',
          Email: '',
          Departement: '',
          Role: '',
          Genre: ''
     });

     /**
      * État pour le contenu du QR code
      * Séparé de formData pour optimiser les re-rendus
      */
     const [qrValue, setQrValue] = useState('Aucune valeur');

     /**
      * État pour suivre si les bibliothèques sont chargées
      * Évite les appels multiples et améliore les performances
      */
     const [isQRiousLoaded, setIsQRiousLoaded] = useState(false);

     // ========== REFS ==========

     /**
      * Référence vers l'élément canvas pour le QR code
      * Utilisé par QRious pour dessiner le QR code
      */
     const canvasRef = useRef(null);

     /**
      * Référence vers l'instance QRious
      * Évite de recréer l'instance à chaque render
      */
     const qrRef = useRef(null);

     // ========== CHARGEMENT DES BIBLIOTHÈQUES ==========

     /**
      * Charge dynamiquement la bibliothèque QRious
      * Utilise useCallback pour éviter les re-créations inutiles
      */
     const loadQRious = useCallback(() => {
          // Vérifier si la bibliothèque est déjà chargée
          if (typeof window !== 'undefined' && window.QRious) {
               setIsQRiousLoaded(true);
               return;
          }

          // Vérifier si un script est déjà en cours de chargement
          if (document.querySelector('script[src*="qrious"]')) {
               return;
          }

          // Créer et configurer le script
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrious/4.0.2/qrious.min.js';
          script.async = true;
          script.onload = () => setIsQRiousLoaded(true);
          script.onerror = () => console.error('Erreur lors du chargement de QRious');

          document.head.appendChild(script);
     }, []);

     /**
      * Charge dynamiquement jsPDF pour l'export PDF
      * Retourne une Promise pour une meilleure gestion asynchrone
      */
     const loadJsPDF = useCallback(() => {
          return new Promise((resolve, reject) => {
               // Vérifier si déjà chargé
               if (typeof window !== 'undefined' && window.jsPDF) {
                    resolve(window.jsPDF);
                    return;
               }

               // Vérifier si un script est déjà en cours de chargement
               const existingScript = document.querySelector('script[src*="jspdf"]');
               if (existingScript) {
                    existingScript.onload = () => resolve(window.jsPDF);
                    return;
               }

               // Créer et configurer le script
               const script = document.createElement('script');
               script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js';
               script.async = true;
               script.onload = () => resolve(window.jsPDF);
               script.onerror = () => reject(new Error('Erreur lors du chargement de jsPDF'));

               document.head.appendChild(script);
          });
     }, []);

     // ========== INITIALISATION DU QR CODE ==========

     /**
      * Initialise l'instance QRious une fois la bibliothèque chargée
      * Utilise useEffect avec des dépendances optimisées
      */
     useEffect(() => {
          if (isQRiousLoaded && canvasRef.current && !qrRef.current) {
               try {
                    qrRef.current = new window.QRious({
                         element: canvasRef.current,
                         size: 220,
                         value: qrValue,
                         background: '#ffffff',
                         foreground: '#2c3e50',
                         level: 'M' // Niveau de correction d'erreur moyen
                    });
               } catch (error) {
                    console.error('Erreur lors de l\'initialisation du QR code:', error);
               }
          }
     }, [isQRiousLoaded, qrValue]);

     /**
      * Met à jour le QR code quand les données changent
      * Optimisé pour éviter les mises à jour inutiles
      */
     useEffect(() => {
          if (qrRef.current && qrValue) {
               try {
                    qrRef.current.set({ value: qrValue });
               } catch (error) {
                    console.error('Erreur lors de la mise à jour du QR code:', error);
               }
          }
     }, [qrValue]);

     /**
      * Charge QRious au montage du composant
      * Effet unique pour éviter les chargements multiples
      */
     useEffect(() => {
          loadQRious();
     }, [loadQRious]);

     // ========== GESTION DES DONNÉES ==========

     /**
      * Génère le contenu du QR code à partir des données du formulaire
      * Filtre les champs vides et formate les données
      */
     const generateQRContent = useCallback((data) => {
          const validEntries = Object.entries(data)
               .filter(([key, value]) => value && value.trim() !== '')
               .map(([key, value]) => `${key}: ${value.trim()}`);

          return validEntries.length > 0 ? validEntries.join('\n') : 'Aucune valeur';
     }, []);

     /**
      * Gestionnaire de changement pour les champs du formulaire
      * Optimisé avec useCallback pour éviter les re-rendus inutiles
      */
     const handleInputChange = useCallback((e) => {
          const { name, value } = e.target;

          // Mise à jour du state avec le pattern fonctionnel
          setFormData(prevData => {
               const newData = { ...prevData, [name]: value };
               // Mettre à jour le QR code de manière asynchrone
               setTimeout(() => setQrValue(generateQRContent(newData)), 0);
               return newData;
          });
     }, [generateQRContent]);

     // ========== EXPORT PDF ==========

     /**
      * Exporte le QR code et les informations en PDF
      * Gestion d'erreur robuste et chargement asynchrone
      */
     const exportToPDF = useCallback(async () => {
          try {
               // Charger jsPDF si nécessaire
               const jsPDF = await loadJsPDF();

               // Vérifier que le canvas existe
               if (!canvasRef.current) {
                    throw new Error('QR code non disponible');
               }

               // Créer le document PDF
               const doc = new jsPDF.jsPDF();

               // Obtenir l'image du QR code
               const qrCodeImage = canvasRef.current.toDataURL("image/png");

               // Configuration du PDF
               doc.setFontSize(20);
               doc.text('QR Code - Informations Employé', 20, 20);

               // Ajouter le QR code
               doc.addImage(qrCodeImage, 'PNG', 20, 30, 60, 60);

               // Ajouter les informations textuelles
               doc.setFontSize(12);
               let yPosition = 100;

               // Parcourir les données et les ajouter au PDF
               Object.entries(formData).forEach(([key, value]) => {
                    if (value && value.trim()) {
                         doc.text(`${key}: ${value}`, 20, yPosition);
                         yPosition += 10;
                    }
               });

               // Sauvegarder le PDF
               doc.save(`qrcode-employee-${formData.ID || 'nouveau'}.pdf`);

          } catch (error) {
               console.error('Erreur lors de l\'export PDF:', error);
               alert('Erreur lors de l\'export PDF. Veuillez réessayer.');
          }
     }, [formData, loadJsPDF]);

     // ========== CONFIGURATION DES CHAMPS ==========

     /**
      * Configuration des départements disponibles
      * Centralisé pour faciliter la maintenance
      */
     const departements = [
          { value: '', label: 'Sélectionnez un département' },
          { value: 'Informatique', label: 'Informatique' },
          { value: 'Ressources Humaines', label: 'Ressources Humaines' },
          { value: 'Comptabilité', label: 'Comptabilité' },
          { value: 'Marketing', label: 'Marketing' },
          { value: 'Ventes', label: 'Ventes' },
          { value: 'Production', label: 'Production' },
     ];

     /**
      * Configuration des rôles disponibles
      * Centralisé pour faciliter la maintenance
      */
     const roles = [
          { value: '', label: 'Sélectionnez un rôle' },
          { value: 'Employé', label: 'Employé' },
          { value: 'Manager', label: 'Manager' },
          { value: 'Admin', label: 'Admin' },
          { value: 'Directeur', label: 'Directeur' },
          { value: 'Stagiaire', label: 'Stagiaire' },
     ];

     // ========== COMPOSANTS DE RENDU ==========

     /**
      * Composant pour un champ de saisie
      * Réutilisable et optimisé
      */
     const InputField = ({ label, name, type = 'text', placeholder, className = '' }) => (
          <div className={`space-y-2 ${className}`}>
               <label className="text-sm font-medium text-gray-700">{label}</label>
               <input
                    type={type}
                    name={name}
                    value={formData[name] || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-400"
                    placeholder={placeholder}
               />
          </div>
     );

     /**
      * Composant pour un champ de sélection
      * Réutilisable et optimisé
      */
     const SelectField = ({ label, name, options, className = '' }) => (
          <div className={`space-y-2 ${className}`}>
               <label className="text-sm font-medium text-gray-700">{label}</label>
               <select
                    name={name}
                    value={formData[name] || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-400"
               >
                    {options.map(option => (
                         <option key={option.value} value={option.value}>
                              {option.label}
                         </option>
                    ))}
               </select>
          </div>
     );

     // ========== RENDU PRINCIPAL ==========

     return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
               <div className="max-w-7xl mx-auto">
                    {/* En-tête de l'application */}
                    <header className="text-center mb-8">
                         <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                              Générateur de QR Code
                         </h1>
                         <p className="text-gray-600">Créez des QR codes pour vos employés en quelques clics</p>
                    </header>

                    <div className="grid lg:grid-cols-2 gap-8">
                         {/* ========== SECTION FORMULAIRE ========== */}
                         <section className="bg-white rounded-2xl shadow-xl p-8 transform transition-all hover:shadow-2xl">
                              {/* En-tête du formulaire */}
                              <div className="flex items-center mb-6">
                                   <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                   </div>
                                   <h2 className="text-2xl font-bold text-gray-800">Informations Employé</h2>
                              </div>

                              {/* Formulaire principal */}
                              <div className="space-y-6">
                                   {/* Nom et prénom sur la même ligne */}
                                   <div className="grid md:grid-cols-2 gap-4">
                                        <InputField
                                             label="Prénom"
                                             name="Prenom"
                                             placeholder="Entrez le prénom"
                                        />
                                        <InputField
                                             label="Nom"
                                             name="Nom"
                                             placeholder="Entrez le nom"
                                        />
                                   </div>

                                   {/* Champs individuels */}
                                   <InputField
                                        label="ID Employé"
                                        name="ID"
                                        placeholder="Entrez l'ID unique"
                                   />

                                   <InputField
                                        label="Téléphone"
                                        name="Telephone"
                                        type="tel"
                                        placeholder="+212 6XX XXX XXX"
                                   />

                                   <InputField
                                        label="Email"
                                        name="Email"
                                        type="email"
                                        placeholder="exemple@entreprise.com"
                                   />

                                   {/* Champs de sélection */}
                                   <SelectField
                                        label="Département"
                                        name="Departement"
                                        options={departements}
                                   />

                                   <SelectField
                                        label="Rôle"
                                        name="Role"
                                        options={roles}
                                   />

                                   {/* Sélection du genre */}
                                   <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Genre</label>
                                        <div className="flex space-x-6">
                                             {['Masculin', 'Féminin'].map(genre => (
                                                  <label key={genre} className="flex items-center cursor-pointer hover:text-blue-600 transition-colors">
                                                       <input
                                                            type="radio"
                                                            name="Genre"
                                                            value={genre}
                                                            checked={formData.Genre === genre}
                                                            onChange={handleInputChange}
                                                            className="mr-2 text-blue-600 focus:ring-blue-500"
                                                       />
                                                       <span className="text-gray-700">{genre}</span>
                                                  </label>
                                             ))}
                                        </div>
                                   </div>
                              </div>
                         </section>

                         {/* ========== SECTION QR CODE ========== */}
                         <section className="bg-white rounded-2xl shadow-xl p-8 transform transition-all hover:shadow-2xl">
                              {/* En-tête du QR code */}
                              <div className="flex items-center mb-6">
                                   <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mr-4">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h4M4 8h4m4 0V4m0 0h4m0 0v4M8 16h4" />
                                        </svg>
                                   </div>
                                   <h2 className="text-2xl font-bold text-gray-800">QR Code Généré</h2>
                              </div>

                              {/* Contenu du QR code */}
                              <div className="flex flex-col items-center space-y-6">
                                   {/* Container du QR code */}
                                   <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-inner">
                                        <canvas
                                             ref={canvasRef}
                                             className="border-2 border-gray-200 rounded-lg shadow-sm"
                                        />
                                   </div>

                                   {/* Statut de chargement */}
                                   {!isQRiousLoaded && (
                                        <div className="text-center">
                                             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                                             <p className="text-gray-500">Chargement du générateur QR...</p>
                                        </div>
                                   )}

                                   {/* Informations et bouton d'export */}
                                   <div className="text-center">
                                        <p className="text-gray-600 mb-4">
                                             Scannez ce code QR pour accéder aux informations de l'employé
                                        </p>
                                        <button
                                             onClick={exportToPDF}
                                             disabled={!isQRiousLoaded}
                                             className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-medium rounded-lg hover:from-red-600 hover:to-pink-700 transform transition-all hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                        >
                                             <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                             </svg>
                                             {isQRiousLoaded ? 'Exporter en PDF' : 'Chargement...'}
                                        </button>
                                   </div>
                              </div>
                         </section>
                    </div>
               </div>
          </div>
     );
};

export default QRCodeGenerator;