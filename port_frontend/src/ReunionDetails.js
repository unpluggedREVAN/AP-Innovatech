import React from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faBriefcase, faChartBar, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import styles from './ReunionDetails.module.css';
import reunionesData from './data_reuniones.json'; // Datos de prueba de las reuniones
import {useReunion} from './contexts/reunionContext'

const ReunionDetailsScreen = () => {
  const { reunionId } = useParams();
  const location = useLocation();
  const [reunion, setReunion] = useState([]);
  const navigate = useNavigate();

  const {infoMeeting, meeting} = useReunion();


  useEffect(() => {
    if(meeting != null) {
      setReunion([meeting]);
    }
  }, [meeting])

  useEffect(() => {
    infoMeeting(reunionId);
  }, [])

  const handleEliminarReunion = () => {
    // Aquí puedes agregar la lógica para eliminar la reunión
    console.log(`Reunión con ID ${reunionId} eliminada`);
    alert(`Reunión con ID ${reunionId} eliminada`);
    navigate('/reuniones'); // Navegar a la lista de reuniones después de eliminar
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
        <section className="content">
          <div className="reunion-details-container">
            {reunion.map((reu) => (
              <div> 
                <h2 className='title'>Tema: {reu.tema}</h2>
                <p className='detail'>Fecha: {reu.fecha}</p>
                <p className='detail'>Medio: {reu.medio}</p>
                <p className='detail'>Proyecto: {reu.proyecto.nombre}</p>
              </div>
            ))

            }
          </div>
        </section>
      </div>
    </div>
  );
};

export default ReunionDetailsScreen;
