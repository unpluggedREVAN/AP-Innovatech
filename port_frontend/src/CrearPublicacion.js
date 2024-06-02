import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faBriefcase, faChartBar, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './CrearPublicacion.css';
import './Menu.css'; // Importar los estilos del menú y barra superior
import projectData from './data.json'; // Datos simulados de proyectos

const CrearPublicacionScreen = () => {
  const [tema, setTema] = useState('');
  const [tipo, setTipo] = useState('');
  const [proyectos, setProyectos] = useState([]);
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setProyectos(projectData); // Utiliza los datos simulados del archivo data.json
  }, []);

  const handleCrearPublicacion = () => {
    console.log('Crear Publicación:', tema, tipo, proyectoSeleccionado);
    // Aquí se puede implementar la lógica para enviar la publicación al backend
    alert('Publicación creada: ' + tema);
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
          <div className="crear-publicacion-container">
            <h2 className="titulo">Crear Nueva Publicación</h2>
            <input
              className="input"
              value={tema}
              onChange={(e) => setTema(e.target.value)}
              placeholder="Tema de la publicación"
            />
            <input
              className="input"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              placeholder="Tipo de publicación (técnico, diseño, general...)"
            />
            <h3 className="label">Proyecto Asociado:</h3>
            {proyectos.map((proyecto) => (
              <div
                key={proyecto._id}
                className={`proyecto-container ${proyectoSeleccionado === proyecto._id ? 'proyecto-seleccionado' : ''}`}
                onClick={() => setProyectoSeleccionado(proyecto._id)}
              >
                <p className="proyecto-texto">{proyecto.nombreProyecto}</p>
              </div>
            ))}
            <button className="boton" onClick={handleCrearPublicacion}>
              Crear Publicación
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CrearPublicacionScreen;
