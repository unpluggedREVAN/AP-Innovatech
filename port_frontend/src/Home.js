import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faBriefcase, faChartBar, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import styles from './Home.module.css';
import projectData from './data.json'; // Datos de prueba

const HomeScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    setProyectos(projectData);
  }, []);

  const handleOptionsPress = (proyectoId) => {
    navigate(`/proyecto-detalles/${proyectoId}`);
  };

  const handleCrearNuevoProyecto = () => {
    navigate('/crear-proyecto');
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
          <div className={styles.homeContainer}>
            <h2 className={styles.header}>Proyectos disponibles</h2>
            <div className={styles.proyectosList}>
              {proyectos.map((proyecto) => (
                <div key={proyecto._id} className={styles.proyectoCard}>
                  <h3 className={styles.proyectoTitle}>Proyecto {proyecto._id}: {proyecto.nombreProyecto}</h3>
                  <p className={styles.proyectoDescription}>{proyecto.descripcion}</p>
                  <button
                    className={styles.homeOptionsButton}
                    onClick={() => handleOptionsPress(proyecto._id)}
                  >
                    Gestionar proyecto
                  </button>
                </div>
              ))}
            </div>
            <button className={styles.createProjectButton} onClick={handleCrearNuevoProyecto}>
              Crear nuevo proyecto
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomeScreen;
