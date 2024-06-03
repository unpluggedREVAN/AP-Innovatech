import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faBriefcase, faChartBar, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import styles from './Reuniones.module.css';
import reunionesData from './data_reuniones.json'; // Datos de prueba de las reuniones
import { useReunion } from './contexts/reunionContext';

const ReunionesScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [reuniones, setReuniones] = useState([]);

  const {infoAllMeetings, meetings} = useReunion();

  useEffect(() => {
    if(meetings != []) {
      setReuniones(meetings);
    }
  }, [meetings])

  useEffect(() => {
    infoAllMeetings();
  }, []);

  const handleDetallesReunion = (reunionId) => {
    navigate(`/reunion-detalles/${reunionId}`);
  };

  const handleCrearNuevaReunion = () => {
    navigate('/crear-reunion');
  };

  const handleIrForos = () => {
    navigate('/foro');
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
          <div className={styles.reunionesContainer}>
            <h2 className={styles.header}>Reuniones disponibles</h2>
            <div className={styles.reunionesList}>
              {reuniones.map((reunion) => (
                <div key={reunion._id} className={styles.reunionCard}>
                  <h3 className={styles.reunionTitle}>Tema: {reunion.tema}</h3>
                  <p className={styles.reunionInfo}>Fecha: {reunion.fecha}</p>
                  <p className={styles.reunionInfo}>Medio: {reunion.medio}</p>
                  <button
                    className={styles.reunionesOptionsButton}
                    onClick={() => handleDetallesReunion(reunion._id)}
                  >
                    Detalles de la reunión
                  </button>
                </div>
              ))}
            </div>
            <button className={styles.createReunionButton} onClick={handleCrearNuevaReunion}>
              Crear nueva reunión
            </button>
            <button className={styles.goToForumButton} onClick={handleIrForos}>
              Ir al foro
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ReunionesScreen;
