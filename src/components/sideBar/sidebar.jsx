import React, { useState } from 'react';

const Sidebar = () => {
     const [activeSection, setActiveSection] = useState('overview');

     const showSection = (section) => {
          setActiveSection(section);
     };

     const navItems = [
          {
               id: 'overview',
               icon: '📊',
               label: 'Vue d\'ensemble',
               path: '/dashboard',
               onClick: () => showSection('overview')
          },
          {
               id: 'planning',
               icon: '⏰',
               label: 'Planification des heures',
               path: '/planification',
               onClick: () => showSection('planning')
          },
          {
               id: 'edit-pointage',
               icon: '✏️',
               label: 'Modifier pointage',
               path: '/modifier-pointage',
               onClick: () => showSection('edit-pointage')
          },
          {
               id: 'absences',
               icon: '❌',
               label: 'Gestion des absences',
               path: '/absences',
               onClick: () => showSection('absences')
          },
          {
               id: 'pointages',
               icon: '📋',
               label: 'Liste des pointages',
               path: '/pointages',
               onClick: () => showSection('pointages')
          },
          {
               id: 'employees',
               icon: '👥',
               label: 'Gestion employés',
               path: '/emp',
               onClick: () => showSection('employees')
          }
     ];

     return (
          <div style={styles.sidebar}>
               {/* Header */}
               <div style={styles.header}>
                    <div style={styles.headerContent}>
                         <h2 style={styles.title}>
                              🏢 Admin RH
                         </h2>
                         <p style={styles.subtitle}>Gestion des employés</p>
                    </div>
               </div>

               {/* Navigation */}
               <nav style={styles.nav}>
                    <ul style={styles.navList}>
                         {navItems.map((item) => (
                              <li key={item.id} style={styles.navItem}>
                                   <a
                                        href={item.path || '#'}
                                        style={{
                                             ...styles.navLink,
                                             ...(activeSection === item.id ? styles.navLinkActive : {}),
                                        }}
                                        onClick={(e) => {
                                             if (!item.path) {
                                                  e.preventDefault();
                                             }
                                             item.onClick();
                                        }}
                                        onMouseEnter={(e) => {
                                             if (activeSection !== item.id) {
                                                  Object.assign(e.target.style, styles.navLinkHover);
                                             }
                                        }}
                                        onMouseLeave={(e) => {
                                             if (activeSection !== item.id) {
                                                  Object.assign(e.target.style, styles.navLink);
                                             }
                                        }}
                                   >
                                        <span style={styles.navIcon}>{item.icon}</span>
                                        <span style={styles.navLabel}>{item.label}</span>
                                        {activeSection === item.id && (
                                             <div style={styles.activeIndicator}></div>
                                        )}
                                   </a>
                              </li>
                         ))}
                    </ul>
               </nav>

               {/* Footer */}
               <div style={styles.footer}>
                    <div style={styles.userInfo}>
                         <div style={styles.userAvatar}>
                              <span style={styles.userInitial}>A</span>
                         </div>
                         <div style={styles.userDetails}>
                              <p style={styles.userName}>Administrateur</p>
                              <p style={styles.userStatus}>En ligne</p>
                         </div>
                    </div>
               </div>
          </div>
     );
};

const styles = {
     sidebar: {
          width: '280px',
          background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #1e40af 100%)',
          color: 'white',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          position: 'relative',
          overflow: 'hidden'
     },
     header: {
          padding: '24px 20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          position: 'relative'
     },
     headerContent: {
          position: 'relative',
          zIndex: 2
     },
     title: {
          fontSize: '24px',
          fontWeight: 'bold',
          marginBottom: '8px',
          background: 'linear-gradient(45deg, #ffffff, #e0f2fe)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
     },
     subtitle: {
          fontSize: '14px',
          color: 'rgba(255, 255, 255, 0.8)',
          fontWeight: '500'
     },
     nav: {
          flex: 1,
          padding: '24px 16px',
          overflowY: 'auto'
     },
     navList: {
          listStyle: 'none',
          padding: 0,
          margin: 0
     },
     navItem: {
          marginBottom: '8px'
     },
     navLink: {
          display: 'flex',
          alignItems: 'center',
          padding: '16px 20px',
          textDecoration: 'none',
          color: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '12px',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
          fontSize: '14px',
          fontWeight: '500',

     },
     navLinkHover: {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          color: 'white',
          transform: 'translateX(4px)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
     },
     navLinkActive: {
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          color: 'white',
          transform: 'translateX(4px)',
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
     },
     navIcon: {
          fontSize: '20px',
          marginRight: '16px',
          transition: 'transform 0.3s ease'
     },
     navLabel: {
          fontWeight: '500',
          flex: 1
     },
     activeIndicator: {
          position: 'absolute',
          right: 0,
          top: 0,
          height: '100%',
          width: '4px',
          background: 'linear-gradient(to bottom, #ffffff, #e0f2fe)',
          borderRadius: '2px 0 0 2px'
     },
     footer: {
          padding: '20px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)'
     },
     userInfo: {
          display: 'flex',
          alignItems: 'center',
          padding: '12px 16px',
          borderRadius: '12px',
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
     },
     userAvatar: {
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #ffffff, #e0f2fe)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: '12px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
     },
     userInitial: {
          color: '#1e40af',
          fontSize: '16px',
          fontWeight: 'bold'
     },
     userDetails: {
          flex: 1
     },
     userName: {
          fontSize: '14px',
          fontWeight: '600',
          color: 'white',
          margin: '0 0 4px 0'
     },
     userStatus: {
          fontSize: '12px',
          color: 'rgba(255, 255, 255, 0.7)',
          margin: 0
     }
};

export default Sidebar;