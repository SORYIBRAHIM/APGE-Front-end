import React, { useState } from 'react';

const Sidebar = () => {
     const [activeSection, setActiveSection] = useState('overview');
     const [isOpen, setIsOpen] = useState(true); // Pour menu mobile

     // Navigation des sections
     const navItems = [
          { id: 'overview', icon: '📊', label: 'Vue d\'ensemble', path: '/dashboard' },
          { id: 'planning', icon: '⏰', label: 'Planification des heures', path: '/Planification' },
          { id: 'edit-pointage', icon: '✏️', label: 'Modifier pointage', path: '/Modification' },
          { id: 'absences', icon: '❌', label: 'Gestion des absences', path: '/absences' },
          { id: 'pointages', icon: '📋', label: 'Liste des pointages', path: '/pointages' },
          { id: 'employees', icon: '👥', label: 'Gestion employés', path: '/employes' }
     ];

     return (
          <>
               {/* Bouton toggle pour mobile */}
               <button style={styles.toggleButton} onClick={() => setIsOpen(!isOpen)}>
                    ☰
               </button>

               <aside style={{ ...styles.sidebar, ...(isOpen ? styles.open : styles.closed) }}>
                    {/* En-tête */}
                    <div style={styles.header}>
                         <h2 style={styles.title}>🏢 Admin RH</h2>
                         <p style={styles.subtitle}>Gestion des employés</p>
                    </div>

                    {/* Navigation */}
                    <nav style={styles.nav}>
                         <ul style={styles.list}>
                              {navItems.map((item) => (
                                   <li key={item.id}>
                                        <a
                                             href={item.path}
                                             style={{
                                                  ...styles.link,
                                                  ...(activeSection === item.id ? styles.activeLink : {})
                                             }}
                                             onClick={() => setActiveSection(item.id)}
                                        >
                                             <span style={styles.icon}>{item.icon}</span>
                                             <span>{item.label}</span>
                                        </a>
                                   </li>
                              ))}
                         </ul>
                    </nav>

                    {/* Footer utilisateur */}
                    <div style={styles.footer}>
                         <div style={styles.userInfo}>
                              <div style={styles.avatar}><span>A</span></div>
                              <div>
                                   <p style={styles.userName}>Administrateur</p>
                                   <p style={styles.userStatus}>En ligne</p>
                              </div>
                         </div>
                    </div>
               </aside>
          </>
     );
};

// CSS-in-JS (styles intégrés)
const styles = {
     sidebar: {
          width: '260px',
          height: '100vh',
          background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #1e40af 100%)',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          left: 0,
          transition: 'transform 0.3s ease',
          zIndex: 999
     },
     open: {
          transform: 'translateX(0)'
     },
     closed: {
          transform: 'translateX(-100%)'
     },
     toggleButton: {
          display: 'block',
          position: 'fixed',
          top: 15,
          left: 15,
          backgroundColor: '#1e3a8a',
          color: '#fff',
          border: 'none',
          padding: '10px 15px',
          borderRadius: '5px',
          fontSize: '20px',
          zIndex: 1000,
          cursor: 'pointer'
     },
     header: {
          padding: '20px',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
     },
     title: {
          fontSize: '22px',
          margin: 0,
          background: 'linear-gradient(45deg, #ffffff, #e0f2fe)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
     },
     subtitle: {
          fontSize: '14px',
          color: 'rgba(255, 255, 255, 0.8)'
     },
     nav: {
          flex: 1,
          padding: '20px',
          overflowY: 'auto'
     },
     list: {
          listStyle: 'none',
          padding: 0,
          margin: 0
     },
     link: {
          display: 'flex',
          alignItems: 'center',
          padding: '12px 16px',
          borderRadius: '10px',
          color: 'rgba(255, 255, 255, 0.8)',
          textDecoration: 'none',
          transition: 'background 0.2s ease'
     },
     activeLink: {
          backgroundColor: 'rgba(255,255,255,0.2)',
          color: '#fff',
          fontWeight: 'bold'
     },
     icon: {
          marginRight: '12px',
          fontSize: '18px'
     },
     footer: {
          padding: '20px',
          borderTop: '1px solid rgba(255,255,255,0.1)'
     },
     userInfo: {
          display: 'flex',
          alignItems: 'center'
     },
     avatar: {
          width: '40px',
          height: '40px',
          background: '#e0f2fe',
          color: '#1e40af',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: '12px',
          fontWeight: 'bold'
     },
     userName: {
          margin: 0,
          fontSize: '14px',
          fontWeight: 600
     },
     userStatus: {
          margin: 0,
          fontSize: '12px',
          color: 'rgba(255, 255, 255, 0.7)'
     }
};

export default Sidebar;
