import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom'; // Eliminar useNavigate
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faBriefcase, faChartBar, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './ColaboradorDetails.css';
import './Menu.css'; 
import colabData from './colab_data.json'; // Datos de prueba de los colaboradores

const ColaboradorDetailsScreen = () => {
  const { colaboradorId } = useParams();
  const location = useLocation();

  const colaborador = colabData.find(colab => colab._id === colaboradorId);

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
          <div className="colaborador-details-container">
            {colaborador ? (
              <>
                <h2 className="title">{colaborador.nombreCompleto}</h2>
                <p className="detail">Cédula: {colaborador.cedula}</p>
                <p className="detail">Correo: {colaborador.correoElectronico}</p>
                <p className="detail">Departamento: {colaborador.departamentoTrabajo}</p>
                <p className="detail">Teléfono: {colaborador.telefono}</p>
                <p className="detail">Estado: {colaborador.estado}</p>
                <p className="detail">Proyecto Actual: {colaborador.proyectoActual || 'Ninguno'}</p>
              </>
            ) : (
              <p className="detail">Colaborador no encontrado.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ColaboradorDetailsScreen;
