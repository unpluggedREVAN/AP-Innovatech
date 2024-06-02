import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faBriefcase, faChartBar, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './Colaboradores.css';
import './Menu.css'; 
import colabData from './colab_data.json'; // Datos de prueba de los colaboradores

const ColaboradoresScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [colaboradores, setColaboradores] = useState([]);

  useEffect(() => {
    setColaboradores(colabData);
  }, []);

  const handleMoreInfoPress = (colaboradorId) => {
    navigate(`/colaborador-detalles/${colaboradorId}`);
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
            <div className="colaboradores-list">
              {colaboradores.map((colaborador) => (
                <div key={colaborador._id} className="colaborador-card">
                  <h3 className="colaborador-name">{colaborador.nombreCompleto}</h3>
                  <p className="colaborador-info">Cédula: {colaborador.cedula}</p>
                  <p className="colaborador-info">Estado: {colaborador.estado}</p>
                  <button
                    className="colaboradores-more-info-button"
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
