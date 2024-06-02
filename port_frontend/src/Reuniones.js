import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUsers,
  faBriefcase,
  faChartBar,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import './Reuniones.css';
import './Menu.css'; // Importar los estilos del menú y barra superior
import dataReuniones from './data_reuniones.json';

const ReunionesScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [reuniones, setReuniones] = useState([]);

  useEffect(() => {
    // Simulamos la carga de datos con el JSON
    setReuniones(dataReuniones);
  }, []);

  const handleDetallesReunion = (reunion) => {
    navigate(`/reunion-details/${reunion._id}`, { state: { reunion } });
  };

  const handleCrearNuevaReunion = () => {
    navigate('/crear-reunion');
  };

  const handleIrForos = () => {
    navigate('/foros');
  };

  const menuItems = [
    { name: 'Home', icon: faHome, path: '/main' },
    { name: 'Colaboradores', icon: faUsers, path: '/colaboradores' },
    { name: 'Reuniones', icon: faBriefcase, path: '/reuniones' },
    { name: 'Evaluación', icon: faChartBar, path: '/evaluacion' },
    { name: 'Cuenta', icon: faUserCircle, path: '/cuenta' },
  ];

  return (
    <div className="dashboard">
      <aside className="sidebar">
        {menuItems.map(item => (
          <Link key={item.name} to={item.path} className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}>
            <FontAwesomeIcon icon={item.icon} className="menu-icon" />
            {item.name}
          </Link>
        ))}
      </aside>
      
      <div className="main-content">
        <nav className="navbar">
          <div className="logo-container">
            <Link to="/main">
              <img 
                src={`${process.env.PUBLIC_URL}/logo_letra_nofondo.png`} 
                alt="InnovaTech Logo" 
                className="logo"
              />
            </Link>
          </div>
          <div className="user-container">
            <Link to="/cuenta" className="account-info-btn">
              <FontAwesomeIcon icon={faUserCircle} className="menu-icon" />
            </Link>
          </div>
        </nav>
        <section className="content">
          <div className="reuniones-container">
            <h2 className="header">Reuniones disponibles</h2>
            <div className="reuniones-scroll">
              {reuniones.map((reunion) => (
                <div key={reunion._id} className="reunion-card">
                  <p className="reunion-title">Tema: {reunion.tema}</p>
                  <p className="reunion-content">Fecha: {reunion.fecha}</p>
                  <p className="reunion-content">Medio: {reunion.medio}</p>
                  <button
                    className="options-button"
                    onClick={() => handleDetallesReunion(reunion)}
                  >
                    Detalles de la reunión
                  </button>
                </div>
              ))}
            </div>
            <button className="button" onClick={handleCrearNuevaReunion}>
              Crear nueva reunión
            </button>
            <button className="button" onClick={handleIrForos}>
              Ir al foro
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ReunionesScreen;
