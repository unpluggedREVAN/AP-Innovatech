import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faBriefcase, faChartBar, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './Menu.css'; // Se importan los estilos del menú
import {useUser} from './contexts/userContext.js'
import {useAuth} from './contexts/authContext.js' 
import styles from './Colaboradores.module.css';

const ColaboradoresScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [colaboradores, setColaboradores] = useState([]);

  const {infoAllUsers, colabs} = useUser();
  const {id} = useAuth();

  useEffect(() => {
    // simulación de la carga de datos con json
    infoAllUsers(id);
  }, []);

  useEffect(() => {
    if(colabs != []) {
      colabs.forEach(function(colab, index){
        if(colab.estado == 0){
          colab.estadoString = "Libre";
        }
        else{
          colab.estadoString = "Ocupado";
        }
      });
      setColaboradores(colabs)
    }
  }, [colabs])
  
  const handleMoreInfoPress = (colaborador) => {
    navigate(`/colaborador-detalles/${colaborador}`, { state: { colaborador } });
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
          <div className={styles.colaboradoresContainer}>
            <h2 className={styles.header}>Colaboradores</h2>
            <div className={styles.colaboradoresList}>
              {colaboradores.map((colaborador) => (
                <div key={colaborador._id} className={styles.colaboradorCard}>
                  <h3 className={styles.colaboradorName}>{colaborador.nombreCompleto}</h3>
                  <p className={styles.colaboradorInfo}>Cédula: {colaborador.cedula}</p>
                  <p className={styles.colaboradorInfo}>Estado: {colaborador.estadoString}</p>
                  <button
                    className={styles.moreInfoButton}
                    onClick={() => handleMoreInfoPress(colaborador._id)}
                  >
                    Más información
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ColaboradoresScreen;
