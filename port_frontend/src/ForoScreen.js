import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faBriefcase, faChartBar, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './ForoScreen.css';
import './Menu.css'; 
import forosData from './data_foros.json'; // Datos de prueba

const ForoScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    setPublicaciones(forosData);
  }, []);

  const handleAbrirPublicacion = (publicacion) => {
    navigate(`/publicacion-detalles/${publicacion._id}`);
  };

  const handleCrearPublicacion = () => {
    navigate('/crear-publicacion');
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
          <div className="foro-container">
            <h2 className="header">Publicaciones</h2>
            <div className="publicaciones-list">
              {publicaciones.map((publicacion) => (
                <div key={publicacion._id} className="publicacion-card">
                  <h3 className="publicacion-title">{publicacion.titulo}</h3>
                  <p className="publicacion-tipo">Tipo: {publicacion.tipo}</p>
                  <button
                    className="abrir-button"
                    onClick={() => handleAbrirPublicacion(publicacion)}
                  >
                    Abrir publicación
                  </button>
                </div>
              ))}
            </div>
            <button className="crear-button" onClick={handleCrearPublicacion}>
              Crear Publicación
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ForoScreen;
