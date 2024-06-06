import React from 'react';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faBriefcase, faChartBar, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './PublicacionDetails.css';
import './Menu.css'; 
import forosData from './data_foros.json'; // Datos de prueba

const PublicacionDetailsScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { publicacionId } = useParams();
  const publicacion = forosData.find(p => p._id === publicacionId);

  if (!publicacion) {
    return <div>Publicación no encontrada</div>;
  }

  const handleCrearMensaje = () => {
    navigate(`/crear-mensaje-publicacion/${publicacionId}`);
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
          <div className="publicacion-details-container">
            <h2 className="title">Tema: {publicacion.titulo}</h2>
            <p className="detail">Tipo: {publicacion.tipo}</p>
            <p className="detail">Mensajes:</p>
            {publicacion.mensajes.map((mensaje, index) => (
              <p key={index} className="mensaje">
                {mensaje.mensaje} - {mensaje._id}
              </p>
            ))}
            <button className="crear-mensaje-button" onClick={handleCrearMensaje}>
              Crear Mensaje
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PublicacionDetailsScreen;
