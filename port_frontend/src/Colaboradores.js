import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUsers,
  faBriefcase,
  faChartBar,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import './Colaboradores.css';
import './Menu.css'; // Se importan los estilos del menú
import data from './colab_data.json';

const ColaboradoresScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [colaboradores, setColaboradores] = useState([]);

  useEffect(() => {
    // simulación de la carga de datos con json
    setColaboradores(data);
  }, []);

  const handleMoreInfoPress = (colaborador) => {
    navigate(`/colaborador-details/${colaborador._id}`, { state: { colaborador } });
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
          <div className="colaboradores-container">
            <h2 className="header">Colaboradores</h2>
            <div className="colaboradores-scroll">
              {colaboradores.map((colaborador) => (
                <div key={colaborador._id} className="colaborador-card">
                  <p className="colaborador-info">Nombre: {colaborador.nombreCompleto}</p>
                  <p className="colaborador-info">Cédula: {colaborador.cedula}</p>
                  <p className="colaborador-info">Estado: {colaborador.estado}</p>
                  <button
                    className="more-info-button"
                    onClick={() => handleMoreInfoPress(colaborador)}
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