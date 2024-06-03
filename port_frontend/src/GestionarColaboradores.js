import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import colaboradoresData from './colab_data.json'; // Datos de colaboradores
import projectData from './data.json'; // Datos de proyectos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faBriefcase, faChartBar, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './GestionarColaboradores.css';
import './Menu.css'; 
import { useUser } from './contexts/userContext';
import { useProject } from './contexts/proyectoContext';
import {useAuth} from './contexts/authContext';

const GestionarColaboradoresScreen = () => {
  const { proyectoId } = useParams();
  // sconst navigate = useNavigate();
  const location = useLocation();

  // Lista de los colaboradores disponibles
  const [colaboradoresLibres, setColaboradores] = useState([]);
  const [colaboradoresActuales, setColabActuales] = useState([]);
  const [proyecto, setProyecto] = useState({});

  const {infoAllUsers, colabs, changeStatusUser} = useUser();
  const {getProject, project, editProject} = useProject();
  const {id} = useAuth();

  useEffect(() => {
    if (project != []){
      setProyecto(project)
      project.colaboradores.forEach((colab) => {
        if(!colaboradoresActuales.includes(colab._id)){
          setColabActuales([...colaboradoresActuales, colab._id])
        }
      })
    }
  }, [project])

  useEffect(() => {
    if(colabs != []) {
      setColaboradores(colabs)
    }
  }, [colabs])
  useEffect(() => {
    infoAllUsers(id);
    getProject(proyectoId);
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
    //console.log('Colaboradores seleccionados para el proyecto:', colaboradoresActuales);
    //Cambiar el estado de todos los usuario
    console.log("Colaboradores libres: ", colaboradoresLibres)
    console.log("Colaboradores elegidos: ", colaboradoresActuales)
    //Colaboradores disponibles
    colaboradoresLibres.forEach((idColab) => {
      console.log("Colaborador: ", idColab._id)
      changeStatusUser(idColab._id, 0);
    })
    //Colaboradores en el proyecto
    colaboradoresActuales.forEach((idColab) => {
      console.log("Colaborador: ", idColab)
      changeStatusUser(idColab, 1)
    })

    //Editar los colaboradores del proyecto
    editProject(proyectoId, {colaboradores : colaboradoresActuales})
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
