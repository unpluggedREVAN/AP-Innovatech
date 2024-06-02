import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faBriefcase, faChartBar, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './Home.css';
import './Menu.css'; 
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
          <div className="home-container">
            <h2 className="header">Proyectos disponibles</h2>
            <div className="proyectos-list">
              {proyectos.map((proyecto) => (
                <div key={proyecto._id} className="proyecto-card">
                  <h3 className="proyecto-title">Proyecto {proyecto._id}: {proyecto.nombreProyecto}</h3>
                  <p className="proyecto-description">{proyecto.descripcion}</p>
                  <button
                    className="home-options-button"
                    onClick={() => handleOptionsPress(proyecto._id)}
                  >
                    Gestionar proyecto
                  </button>
                </div>
              ))}
            </div>
            <button className="create-project-button" onClick={handleCrearNuevoProyecto}>
              Crear nuevo proyecto
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomeScreen;
