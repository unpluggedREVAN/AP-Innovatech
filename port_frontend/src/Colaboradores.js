import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faBriefcase, faChartBar, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './Colaboradores.css';
import './Menu.css'; // Se importan los estilos del menú
import {useUser} from './contexts/userContext.js'

const ColaboradoresScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [colaboradores, setColaboradores] = useState([]);

  const {infoAllUsers, colabs} = useUser();

  useEffect(() => {
    // simulación de la carga de datos con json
    infoAllUsers();
    setColaboradores(data);
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
            <div className="colaboradores-list">
              {colaboradores.map((colaborador) => (
                <div key={colaborador._id} className="colaborador-card">
                  <h3 className="colaborador-name">{colaborador.nombreCompleto}</h3>
                  <p className="colaborador-info">Cédula: {colaborador.cedula}</p>
                  <p className="colaborador-info">Estado: {colaborador.estadoString}</p>
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
