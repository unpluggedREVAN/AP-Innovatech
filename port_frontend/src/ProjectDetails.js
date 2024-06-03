import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faBriefcase, faChartBar, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './ProjectDetails.css';
import './Menu.css'; 
import projectData from './data.json'; // Datos de prueba del proyecto
import {useProject} from './contexts/proyectoContext'

const ProjectDetailsScreen = () => {
  const { proyectoId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [proyecto, setProyecto] = useState({colaboradores: [] });
  const [tareasProject, setTareas] = useState([]);
  const [showContent, setShowContent] = useState(false);

  const {getProject, project, deleteProject } = useProject();

  useEffect(() => {
    if(project != null) {
      if(project.estadoProyecto == 0){
        project.estadoString = "En progreso"
      }
      else{
        project.estadoString = "Finalizado"
      }
      setProyecto(project);
    }
  }, [project])

  useEffect(() => {
    getProject(proyectoId);
    setTimeout(() => setShowContent(true), 1000);
  }, [proyectoId]);

  const handleEditTasks = () => {
    navigate(`/modificar-tareas/${proyectoId}`);
  };

  const handleManageCollaborators = () => {
    navigate(`/gestionar-colaboradores/${proyectoId}`);
  };

  const handleDeleteProject = () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este proyecto?")) {
      console.log('Eliminar proyecto');
      deleteProject(proyectoId)
      // Simulación de la solicitud de eliminación
      navigate('/main');
    }
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
          <div className="project-details-container">
            {showContent && proyecto ? (
              <>
                <h2 className="title">{proyecto.nombre}</h2>
                <div className="info-section">
                  <strong>Descripción:</strong>
                  <p>{proyecto.descripcion}</p>
                </div>
                <div className="info-section">
                  <strong>Recursos Necesarios:</strong>
                  <p>{proyecto.recursos}</p>
                </div>
                
                <div className="info-section">
                  <strong>Responsable:</strong>
                  <p>{proyecto.responsable.nombreCompleto}</p>
                </div>
                <div className="info-section">
                  <strong>Presupuesto:</strong>
                  <p>${proyecto.presupuesto}</p>
                </div>
                <div className="info-section">
                  <strong>Estado del Proyecto:</strong>
                  <p>{proyecto.estadoString}</p>
                </div>
                <div className="info-section">
                  <strong>Fecha de Inicio:</strong>
                  <p>{proyecto.fechaInicio}</p>
                </div>
                <h3 className="section-title">Tareas del proyecto</h3>
                {tareasProject.map((tarea, index) => (
                  <p key={index} className="tarea-info">
                    Estado : {tarea.estado} - Titulo: {tarea.nombreTarea} - {tarea.storyPoints} Points - {tarea.responsable}
                  </p>
                ))}
                <p> {'\n'}----------------------------------------------------------------------------------------</p>
                <p className="nota">Nota: Al entrar en la opción Gestionar Colaboradores se van a resetear todos los colaboradores actuales y deberás reasignarlos todos a como lo prefieras</p>
              </>
            ) : (
              <p className="info">Proyecto no encontrado.</p>
            )}
            <button onClick={handleEditTasks} className="button">Modificar Tareas</button>
            <button onClick={handleManageCollaborators} className="button">Gestionar Colaboradores</button>
            <button onClick={handleDeleteProject} className="button delete-button">Eliminar Proyecto</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProjectDetailsScreen;
