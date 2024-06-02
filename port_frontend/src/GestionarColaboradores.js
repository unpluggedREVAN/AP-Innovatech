import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import colaboradoresData from './colab_data.json'; // Datos de colaboradores
import projectData from './data.json'; // Datos de proyectos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faBriefcase, faChartBar, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './GestionarColaboradores.css';
import './Menu.css'; // Importar los estilos del menú y barra superior

const GestionarColaboradoresScreen = () => {
  const { proyectoId } = useParams();
  // sconst navigate = useNavigate();
  const location = useLocation();

  // Lista de los colaboradores disponibles
  const [colaboradoresLibres, setColaboradores] = useState([]);
  const [colaboradoresActuales, setColabActuales] = useState([]);
  const [proyecto, setProyecto] = useState({});

  useEffect(() => {
    const colabFecthData = async () => {
      // Simular fetch de datos
      const responseColab = colaboradoresData.filter(colab => colab.estado === 'libre');
      const responseProject = projectData.find(proj => proj._id === proyectoId);
      setColaboradores(responseColab);
      setColabActuales(responseProject.colaboradores);
      setProyecto(responseProject);
      console.log("ColabActuales:", responseProject.colaboradores);
    };
    colabFecthData();
  }, [proyectoId]);

  // Función para manejar la selección/deselección de colaboradores
  const toggleColaborador = (id) => {
    const esSeleccionado = colaboradoresActuales.includes(id);
    setColabActuales(prev =>
      esSeleccionado ? prev.filter(colabId => colabId !== id) : [...prev, id]
    );
  };

  // Función para manejar el guardado de cambios
  const handleGuardarCambios = async () => {
    console.log('Colaboradores seleccionados para el proyecto:', colaboradoresActuales);
    // Aquí se implementaría la lógica para actualizar la asignación de colaboradores en el backend
    // Simulación de cambio de estado de colaboradores
    setColabActuales([]);
  };

  const menuItems = [
    { name: 'Home', icon: faHome, path: '/main' },
    { name: 'Colaboradores', icon: faUsers, path: '/colaboradores' },
    { name: 'Reuniones', icon: faBriefcase, path: '/reuniones' },
    { name: 'Evaluación', icon: faChartBar, path: '/evaluacion' },
    { name: 'Cuenta', icon: faUserCircle, path: '/cuenta' },
  ];

  if (!proyecto) {
    return <p>Proyecto no encontrado.</p>;
  }

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
          <div className="gestionar-colaboradores-container">
            <h2 className="gestionar-colaboradores-titulo">Editar Colaboradores:</h2>
            <p className="gestionar-colaboradores-nota">Nota: Debes seleccionar de nuevo los colaboradores que quieres asignar al proyecto.</p>

            {colaboradoresLibres.map((colaborador) => (
              <button
                key={colaborador._id}
                className={`gestionar-colaboradores-colaborador-container ${colaboradoresActuales.includes(colaborador._id) ? 'selected' : ''}`}
                onClick={() => toggleColaborador(colaborador._id)}
              >
                {colaborador.nombreCompleto} - {colaborador.departamentoTrabajo}
              </button>
            ))}

            <button className="gestionar-colaboradores-boton-guardar" onClick={handleGuardarCambios}>
              Guardar Cambios
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default GestionarColaboradoresScreen;
