import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faBriefcase, faChartBar, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './Reuniones.css';
import './Menu.css'; 
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
            <div className="reuniones-list">
              {reuniones.map((reunion) => (
                <div key={reunion._id} className="reunion-card">
                  <h3 className="reunion-title">Tema: {reunion.tema}</h3>
                  <p className="reunion-info">Fecha: {reunion.fecha}</p>
                  <p className="reunion-info">Medio: {reunion.medio}</p>
                  <button
                    className="reuniones-options-button"
                    onClick={() => handleDetallesReunion(reunion._id)}
                  >
                    Detalles de la reunión
                  </button>
                </div>
              ))}
            </div>
            <button className="create-reunion-button" onClick={handleCrearNuevaReunion}>
              Crear nueva reunión
            </button>
            <button className="go-to-forum-button" onClick={handleIrForos}>
              Ir al foro
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ReunionesScreen;
