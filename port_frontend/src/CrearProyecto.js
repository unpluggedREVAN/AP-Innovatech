import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faBriefcase, faChartBar, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './CrearProyecto.css';
import './Menu.css'; // Importar los estilos del menú y barra superior
import colabData from './colab_data.json'; // Simulación de colaboradores disponibles

const CrearProyectoScreen = () => {
  const location = useLocation();
  const [colaboradoresDisponibles] = useState(colabData);
  const [nombreProyecto, setNombreProyecto] = useState('');
  const [recursosNecesarios, setRecursosNecesarios] = useState('');
  const [presupuesto, setPresupuesto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [colaboradoresSeleccionados, setColaboradoresSeleccionados] = useState([]);

  const handleCrearProyecto = async () => {
    const presupuestoParse = parseInt(presupuesto);
    console.log('Crear proyecto con los siguientes datos:', { nombreProyecto, recursosNecesarios, presupuestoParse, descripcion, fechaInicio, colaboradoresSeleccionados });
    
    // Simulación de solicitud POST a la API
    console.log("Proyecto creado con éxito");

    // Simulación de actualización del estado de los colaboradores seleccionados
    colaboradoresSeleccionados.forEach(async function(id) {
      console.log("Cambio el estado de:", id);
    });
  };

  const toggleColaborador = (id) => {
    setColaboradoresSeleccionados((prevSeleccionados) =>
      prevSeleccionados.includes(id)
        ? prevSeleccionados.filter((colaboradorId) => colaboradorId !== id)
        : [...prevSeleccionados, id]
    );
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
          <div className="crear-proyecto-container">
            <h2 className="header">Crear Nuevo Proyecto</h2>
            <form className="crear-proyecto-form">
              <label className="label">Nombre del Proyecto:</label>
              <input
                className="input-form"
                type="text"
                value={nombreProyecto}
                onChange={(e) => setNombreProyecto(e.target.value)}
                placeholder="Ingresa el nombre del proyecto"
              />

              <label className="label">Recursos Necesarios:</label>
              <input
                className="input-form"
                type="text"
                value={recursosNecesarios}
                onChange={(e) => setRecursosNecesarios(e.target.value)}
                placeholder="Ej: Servidores, licencias"
              />

              <label className="label">Presupuesto:</label>
              <input
                className="input-form"
                type="text"
                value={presupuesto}
                onChange={(e) => setPresupuesto(e.target.value)}
                placeholder="Ej: 15000"
                keyboardType="numeric"
              />

              <label className="label">Descripción:</label>
              <textarea
                className="input-form"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Descripción del proyecto"
              />

              <label className="label">Fecha de Inicio:</label>
              <input
                className="input-form"
                type="text"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                placeholder="YYYY-MM-DD"
              />

              <label className="label-tareas">Tareas: Las tareas se asignan desde las opciones de gestión de proyecto</label>

              <label className="label">Colaboradores:</label>
              {colaboradoresDisponibles.map((colaborador) => (
                <div
                  key={colaborador._id}
                  className={`colaborador-container ${colaboradoresSeleccionados.includes(colaborador._id) ? 'colaborador-seleccionado' : ''}`}
                  onClick={() => toggleColaborador(colaborador._id)}
                >
                  <span className="colaborador-texto">{colaborador.nombreCompleto} - {colaborador.departamentoTrabajo}</span>
                </div>
              ))}

              <button type="button" className="boton-crear" onClick={handleCrearProyecto}>
                Crear Proyecto
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CrearProyectoScreen;
