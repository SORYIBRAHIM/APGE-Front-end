import { Routes, Route } from 'react-router-dom';
import QRScanner from './components/Pointages/QRScanner';
import Layout from './components/Layouts/layout';




const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Layout />}>
           
            <Route path="/emp" element={<QRScanner />} />
        </Route>

        

        
    </Routes>
);

export default AppRoutes;
