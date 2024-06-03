import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faBriefcase, faChartBar, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import styles from './Reportes.module.css';
import projectData from './data.json';

const ReportesScreen = () => {
  const location = useLocation();
  const [selectedProject, setSelectedProject] = useState(projectData[0]._id);

  const handleProjectChange = (event) => {
    setSelectedProject(event.target.value);
  };

  const menuItems = [
    { name: 'Home', icon: faHome, path: '/main' },
    { name: 'Colaboradores', icon: faUsers, path: '/colaboradores' },
    { name: 'Reuniones', icon: faBriefcase, path: '/reuniones' },
    { name: 'Evaluación', icon: faChartBar, path: '/evaluacion' },
    { name: 'Cuenta', icon: faUserCircle, path: '/cuenta' },
  ];

  return (
    <div className={styles.dashboard}>
      <aside className={styles.sidebar}>
        {menuItems.map(item => (
          <Link key={item.name} to={item.path} className={`${styles.menuItem} ${location.pathname === item.path ? styles.active : ''}`}>
            <FontAwesomeIcon icon={item.icon} className={styles.menuIcon} />
            {item.name}
          </Link>
        ))}
      </aside>

      <div className={styles.mainContent}>
        <nav className={styles.navbar}>
          <div className={styles.logoContainer}>
            <Link to="/main">
              <img 
                src={`${process.env.PUBLIC_URL}/logo_letra_nofondo.png`} 
                alt="InnovaTech Logo" 
                className={styles.logo}
              />
            </Link>
          </div>
          <div className={styles.userContainer}>
            <Link to="/cuenta" className={styles.accountInfoBtn}>
              <FontAwesomeIcon icon={faUserCircle} className={styles.menuIcon} />
            </Link>
          </div>
        </nav>
        <section className={styles.content}>
          <div className={styles.reportesContainer}>
            <div className={styles.reporteSection}>
              <h2 className={styles.header}>Reportes de Proyecto</h2>
              <select className={styles.picker} value={selectedProject} onChange={handleProjectChange}>
                {projectData.map((proyecto) => (
                  <option key={proyecto._id} value={proyecto._id}>
                    {proyecto.nombreProyecto}
                  </option>
                ))}
              </select>
              <button className={styles.button}>Generar Reporte PDF</button>
            </div>
            <div className={styles.reporteSection}>
              <h2 className={styles.header}>Reportes de Colaboradores</h2>
              <button className={styles.button}>Generar Reporte PDF</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ReportesScreen;
