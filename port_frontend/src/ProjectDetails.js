import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faBriefcase, faChartBar, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import styles from './ProjectDetails.module.css';
import projectData from './data.json'; // Datos de prueba del proyecto

const ProjectDetailsScreen = () => {
  const { proyectoId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [proyecto, setProyecto] = useState({ recursosNecesarios: [], colaboradores: [] });
  const [tareasPorHacer, setTareasPorHacer] = useState([]);
  const [tareasEnCurso, setTareasEnCurso] = useState([]);
  const [tareasFinalizadas, setTareasFinalizadas] = useState([]);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const fetchProyectData = async () => {
      const response = projectData.find(proj => proj._id === proyectoId);
      if (response) {
        setProyecto(response);
        const tareas = response.tareas || [];
        setTareasPorHacer(tareas.filter(tarea => tarea.estado === 'por hacer'));
        setTareasEnCurso(tareas.filter(tarea => tarea.estado === 'en curso'));
        setTareasFinalizadas(tareas.filter(tarea => tarea.estado === 'finalizada'));
      }
    };
    fetchProyectData();
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
      // Simulación de la solicitud de eliminación
      alert('Proyecto eliminado');
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
    <div className={styles.dashboard}>
      <aside className={styles.sidebar}>
        {menuItems.map(item => (
          <Link key={item.name} to={item.path} className={`${styles.menuItem} ${location.pathname === item.path ? styles.active : ''}`}>
            <FontAwesomeIcon icon={item.icon} className={styles.menuIcon} />
            {item.name}
          </Link>
        ))}
      </aside>
      
      <div className={styles.mainContent}>
        <nav className={styles.navbar}>
          <div className={styles.logoContainer}>
            <Link to="/main">
              <img 
                src={`${process.env.PUBLIC_URL}/logo_letra_nofondo.png`} 
                alt="InnovaTech Logo" 
                className={styles.logo}
              />
            </Link>
          </div>
          <div className={styles.userContainer}>
            <Link to="/cuenta" className={styles.accountInfoBtn}>
              <FontAwesomeIcon icon={faUserCircle} className={styles.menuIcon} />
            </Link>
          </div>
        </nav>
        <section className={styles.content}>
          <div className={styles.projectDetailsContainer}>
            {showContent && proyecto ? (
              <>
                <h2 className={styles.title}>{proyecto.nombreProyecto}</h2>
                <div className={styles.infoSection}>
                  <strong>Descripción:</strong>
                  <p>{proyecto.descripcion}</p>
                </div>
                <div className={styles.infoSection}>
                  <strong>Recursos Necesarios:</strong>
                  <p>{proyecto.recursosNecesarios.join(', ')}</p>
                </div>
                <div className={styles.infoSection}>
                  <strong>Colaboradores:</strong>
                  <p>{proyecto.colaboradores.join(', ')}</p>
                </div>
                <div className={styles.infoSection}>
                  <strong>Responsable:</strong>
                  <p>{proyecto.responsable}</p>
                </div>
                <div className={styles.infoSection}>
                  <strong>Presupuesto:</strong>
                  <p>${proyecto.presupuesto}</p>
                </div>
                <div className={styles.infoSection}>
                  <strong>Estado del Proyecto:</strong>
                  <p>{proyecto.estadoProyecto}</p>
                </div>
                <div className={styles.infoSection}>
                  <strong>Fecha de Inicio:</strong>
                  <p>{proyecto.fechaInicio}</p>
                </div>
                <h3 className={styles.sectionTitle}>Tareas del proyecto</h3>
                <div className={styles.taskCategory}>
                  <h4>Por Hacer</h4>
                  {tareasPorHacer.map((tarea, index) => (
                    <p key={index} className={styles.tareaInfo}>
                      Estado : {tarea.estado} - Titulo: {tarea.nombreTarea} - {tarea.storyPoints} Points - {tarea.responsable}
                    </p>
                  ))}
                </div>
                <div className={styles.taskCategory}>
                  <h4>En Curso</h4>
                  {tareasEnCurso.map((tarea, index) => (
                    <p key={index} className={styles.tareaInfo}>
                      Estado : {tarea.estado} - Titulo: {tarea.nombreTarea} - {tarea.storyPoints} Points - {tarea.responsable}
                    </p>
                  ))}
                </div>
                <div className={styles.taskCategory}>
                  <h4>Finalizadas</h4>
                  {tareasFinalizadas.map((tarea, index) => (
                    <p key={index} className={styles.tareaInfo}>
                      Estado : {tarea.estado} - Titulo: {tarea.nombreTarea} - {tarea.storyPoints} Points - {tarea.responsable}
                    </p>
                  ))}
                </div>
                <p> {'\n'}----------------------------------------------------------------------------------------</p>
                <p className={styles.nota}>Nota: Al entrar en la opción Gestionar Colaboradores se van a resetear todos los colaboradores actuales y deberás reasignarlos todos a como lo prefieras</p>
              </>
            ) : (
              <p className={styles.info}>Proyecto no encontrado.</p>
            )}
            <button onClick={handleEditTasks} className={styles.button}>Modificar Tareas</button>
            <button onClick={handleManageCollaborators} className={styles.button}>Gestionar Colaboradores</button>
            <button onClick={handleDeleteProject} className={`${styles.button} ${styles.deleteButton}`}>Eliminar Proyecto</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProjectDetailsScreen;
