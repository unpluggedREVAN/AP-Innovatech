import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faBriefcase, faChartBar, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './ReunionDetails.css';
import './Menu.css'; 
import reunionesData from './data_reuniones.json'; // Datos de prueba de las reuniones
import {useReunion} from './contexts/reunionContext'

const ReunionDetailsScreen = () => {
  const { reunionId } = useParams();
  const location = useLocation();
  const [reunion, setReunion] = useState([]);

  const {infoMeeting, meeting} = useReunion();


  useEffect(() => {
    if(meeting != null) {
      setReunion([meeting]);
    }
  }, [meeting])

  useEffect(() => {
    infoMeeting(reunionId);
  }, [])

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
