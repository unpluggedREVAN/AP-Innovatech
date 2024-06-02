import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faBriefcase, faChartBar, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './CrearReunion.css';
import './Menu.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import projectData from './data.json'; // Datos de prueba del proyecto
import {useProject} from './contexts/proyectoContext'
import { useReunion } from './contexts/reunionContext';

const CrearReunionScreen = () => {
  const location = useLocation();
  const [tema, setTema] = useState('');
  const [medio, setMedio] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);
  const [proyectos, setProyectos] = useState([]);

  const {getAllProjects, projects} = useProject();
  const {createMeeting} = useReunion();

  const handleGuardarReunion = async () => {
    const data = {
      tema : tema,
      medio : medio,
      fecha : fecha,
      colaboradoresSolicitados : [],
      proyecto : proyectoSeleccionado
    }
    createMeeting(data);
    console.log('Reunión Guardada', { fecha, tema, medio, proyecto: proyectoSeleccionado });
    alert(`Reunión Guardada\nTema: ${tema}\nMedio: ${medio}\nFecha: ${fecha.toLocaleDateString()}\nProyecto: ${proyectoSeleccionado}`);
  };

  useEffect(() => {
    if(projects != []) {
      console.log(projects)
      setProyectos(projects)
    }
  }, [projects])

  useEffect(() => {
    getAllProjects();
  }, []);

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
          <div className="crear-reunion-container">
            <h2 className="header">Crear Nueva Reunión</h2>
            <form className="crear-reunion-form">
              <label className="label">Tema de la Reunión:</label>
              <input
                className="input"
                type="text"
                value={tema}
                onChange={(e) => setTema(e.target.value)}
                placeholder="Ingresa el tema de la reunión"
              />

              <label className="label">Medio de Comunicación:</label>
              <input
                className="input"
                type="text"
                value={medio}
                onChange={(e) => setMedio(e.target.value)}
                placeholder="Ejemplo: Zoom, Google Meet, etc."
              />

              <label className="label">Fecha de la Reunión:</label>
              <DatePicker
                selected={fecha}
                onChange={(date) => setFecha(date)}
                dateFormat="yyyy-MM-dd"
                className="date-picker-input"
              />

              <label className="label">Proyecto Asociado:</label>
              {proyectos.map((proyecto) => (
                <div
                  key={proyecto._id}
                  className={`proyecto-container ${proyectoSeleccionado === proyecto._id ? 'proyecto-seleccionado' : ''}`}
                  onClick={() => setProyectoSeleccionado(proyecto._id)}
                >
                  <span className="proyecto-texto">{proyecto.nombre}</span>
                </div>
              ))}

              <button type="button" className="boton-guardar" onClick={handleGuardarReunion}>
                Guardar Reunión
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CrearReunionScreen;
