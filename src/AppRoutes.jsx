import { Routes, Route } from 'react-router-dom';
import QRScanner from './components/Pointages/QRScanner';
import Layout from './components/Employes/layout';
import Planification from './components/Planification/Planification_H';
import Gestion_Employés from './components/Gestion_Employés/Gestion_Employées';
import Modification from './components/Modification/Modification';





const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Layout />}>
           
            <Route path="/emp" element={<QRScanner />} />
            <Route path="/Planification" element={<Planification />} />
            <Route path="/emp" element={<Modification />} />
            <Route path="/emp" element={<Gestion_Employés />} />
           


        </Route>

        

        
    </Routes>
);

export default AppRoutes;
