import React, { useState,  useRef } from 'react';
import { QrCode, Camera,  Clock, Shield, CheckCircle, AlertCircle, Scan } from 'lucide-react';

const QRLoginComponent = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [employeeId, setEmployeeId] = useState('');
  const [scannedData, setScannedData] = useState(null);
  const [alert, setAlert] = useState({ type: '', message: '', show: false });

  const videoRef = useRef(null);

  // Mock employee data for demonstration
  const employees = {
    'emp001': { name: 'Jean Dupont', department: 'Informatique', avatar: '👨‍💻' },
    'emp002': { name: 'Marie Martin', department: 'RH', avatar: '👩‍💼' },
    'emp003': { name: 'Pierre Durand', department: 'Comptabilité', avatar: '👨‍💼' },
    'emp004': { name: 'Sophie Lefevre', department: 'Marketing', avatar: '👩‍🎨' }
  };

  const showAlert = (type, message) => {
    setAlert({ type, message, show: true });
    setTimeout(() => setAlert({ type: '', message: '', show: false }), 4000);
  };

  // Simulate QR code scanning
  const simulateQRScan = (employeeCode) => {
    if (employees[employeeCode]) {
      setEmployeeId(employeeCode);
      setScannedData(employees[employeeCode]);
      showAlert('success', `Connexion réussie! Bienvenue ${employees[employeeCode].name}`);
      setIsScanning(false);
    } else {
      showAlert('danger', 'Code QR non reconnu. Veuillez réessayer.');
    }
  };

  const startScanning = () => {
    setIsScanning(true);
    showAlert('info', 'Scanner activé. Placez le QR code devant la caméra.');

    // Simulate camera access and scanning
    if (videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        })
        .catch(err => {
          console.error('Camera access error:', err);
          showAlert('danger', 'Impossible d\'accéder à la caméra.');
          setIsScanning(false);
        });
    }
  };

  const stopScanning = () => {
    setIsScanning(false);
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const redirectToAttendance = () => {
    if (employeeId) {
      showAlert('info', 'Redirection vers les pointages...');
      // In a real app, this would redirect to attendance page
      console.log(`Redirecting to attendance for employee: ${employeeId}`);
    } else {
      showAlert('danger', 'Veuillez scanner un QR code d\'abord.');
    }
  };

  const AlertComponent = ({ type, message, show }) => {
    if (!show) return null;

    const alertStyles = {
      info: 'bg-blue-50 border-blue-200 text-blue-800',
      success: 'bg-green-50 border-green-200 text-green-800',
      danger: 'bg-red-50 border-red-200 text-red-800'
    };

    const AlertIcon = type === 'success' ? CheckCircle : type === 'danger' ? AlertCircle : Scan;

    return (
      <div className={`border rounded-lg p-4 mb-4 ${alertStyles[type]} animate-in slide-in-from-top-2 duration-300`}>
        <div className="flex items-center justify-center">
          <AlertIcon className="w-5 h-5 mr-2" />
          <span className="font-medium">{message}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header Card */}
        <div className="bg-white rounded-t-2xl shadow-xl border border-slate-200 p-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Connexion Sécurisée</h1>
          <p className="text-slate-600">Scannez votre QR code personnel pour accéder à vos pointages</p>
        </div>

        {/* Scanner Card */}
        <div className="bg-white shadow-xl border-x border-slate-200 p-6">
          <div className="relative">
            {/* QR Scanner Area */}
            <div className="w-full h-72 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center relative overflow-hidden">
              {isScanning ? (
                <div className="relative w-full h-full">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover rounded-xl"
                    autoPlay
                    playsInline
                    muted
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 border-2 border-white rounded-xl relative">
                      <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-green-400 rounded-tl-lg animate-pulse"></div>
                      <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-green-400 rounded-tr-lg animate-pulse"></div>
                      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-green-400 rounded-bl-lg animate-pulse"></div>
                      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-green-400 rounded-br-lg animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <QrCode className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-500 font-medium">Zone de scan QR Code</p>
                  <p className="text-sm text-slate-400 mt-2">Cliquez sur "Démarrer le scan" pour commencer</p>
                </div>
              )}
            </div>

            {/* Scan Controls */}
            <div className="mt-6 flex gap-3">
              {!isScanning ? (
                <button
                  onClick={startScanning}
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 font-medium shadow-lg"
                >
                  <Camera className="w-5 h-5 inline mr-2" />
                  Démarrer le scan
                </button>
              ) : (
                <button
                  onClick={stopScanning}
                  className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 text-white py-3 px-4 rounded-lg hover:from-red-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 font-medium shadow-lg"
                >
                  Arrêter le scan
                </button>
              )}
            </div>

            {/* Demo Buttons */}
            <div className="mt-4 p-4 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-600 mb-3 text-center">Démo - Simuler un scan:</p>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(employees).map(([id, employee]) => (
                  <button
                    key={id}
                    onClick={() => simulateQRScan(id)}
                    className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-sm"
                  >
                    {employee.avatar} {employee.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* User Info Card */}
        {scannedData && (
          <div className="bg-white shadow-xl border-x border-slate-200 p-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center text-white text-xl">
                {scannedData.avatar}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900">{scannedData.name}</h3>
                <p className="text-sm text-slate-600">{scannedData.department}</p>
              </div>
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        )}

        {/* Alert Messages */}
        <div className="bg-white shadow-xl border-x border-slate-200 px-6">
          <AlertComponent type={alert.type} message={alert.message} show={alert.show} />
        </div>

        {/* Footer Card */}
        <div className="bg-white rounded-b-2xl shadow-xl border border-slate-200 p-6">
          <button
            onClick={redirectToAttendance}
            disabled={!employeeId}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg ${employeeId
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700'
                : 'bg-slate-200 text-slate-500 cursor-not-allowed'
              }`}
          >
            <Clock className="w-5 h-5 inline mr-2" />
            Voir les Pointages
          </button>

          <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-slate-500">
            <Shield className="w-4 h-4" />
            <span>Connexion sécurisée par QR Code</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRLoginComponent;