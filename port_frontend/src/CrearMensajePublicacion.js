import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faBriefcase, faChartBar, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './CrearMensajePublicacion.css';
import './Menu.css'; 

const CrearMensajePublicacionScreen = () => {
  const [mensaje, setMensaje] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const handleEnviarMensaje = () => {
    console.log('Mensaje enviado:', mensaje);
    // Aquí se puede implementar la lógica para enviar el mensaje al backend
    // Después de enviar el mensaje, redirige a la página anterior
    navigate(-1);
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
          <div className="crear-mensaje-container">
            <textarea
              className="text-input"
              placeholder="Escribe tu mensaje aquí..."
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              rows={10}
            />
            <button className="boton-enviar" onClick={handleEnviarMensaje}>
              Enviar Mensaje
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CrearMensajePublicacionScreen;
