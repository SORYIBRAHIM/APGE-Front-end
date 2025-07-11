// Layout.js

import { Outlet } from "react-router-dom";
import Sidebar from "../sideBar/sidebar";


function Layout() { 
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar/>
      <main style={{ flex: 1, backgroundColor: '#f8fafc' }}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;

