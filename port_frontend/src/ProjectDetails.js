import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faBriefcase, faChartBar, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import styles from './ProjectDetails.module.css';
import projectData from './data.json'; // Datos de prueba del proyecto
import {useProject} from './contexts/proyectoContext'
import { useTask } from './contexts/tareaContext';

const ProjectDetailsScreen = () => {
  const { proyectoId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [proyecto, setProyecto] = useState({ recursosNecesarios: [], colaboradores: [] });
  const [tareasPorHacer, setTareasPorHacer] = useState([]);
  const [tareasEnCurso, setTareasEnCurso] = useState([]);
  const [tareasFinalizadas, setTareasFinalizadas] = useState([]);
  const [showContent, setShowContent] = useState(false);

  const {getProject, project, deleteProject } = useProject();
  const {infoTaskToDo, infoTaskPogress, infoTaskDone, taskToDo, taskProgress, taskDone} = useTask();

  useEffect(() => {
    if(project != null) {
      if(project.estadoProyecto == 0){
        project.estadoString = "En progreso"
      }
      else{
        project.estadoString = "Finalizado"
      }
      project.infoColabs = ''
      project.colaboradores.forEach((colab) => {
        project.infoColabs += colab.nombreCompleto + " - " + colab.departamentoTrabajo;
      })
      setProyecto(project);
    }
  }, [project])

  useEffect(() => {
    getProject(proyectoId);
    infoTaskToDo(proyectoId);
    infoTaskPogress(proyectoId);
    infoTaskDone(proyectoId);
    setTimeout(() => setShowContent(true), 1000);
  }, [proyectoId]);

  useEffect(() => {
    if(taskToDo != []) {
      setTareasPorHacer(taskToDo)
    }
  }, [taskToDo])

  useEffect(() => {
    if(taskProgress != []) {
      setTareasEnCurso(taskProgress)
    }
  }, [taskProgress])

  useEffect(() => {
    if(taskDone != []) {
      setTareasFinalizadas(taskDone)
    }
  }, [taskDone])


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
                  <p>{proyecto.recursosNecesarios}</p>
                </div>
                <div className={styles.infoSection}>
                  <strong>Colaboradores:</strong>
                  <p>{project.infoColabs}</p>
                </div>
                <div className={styles.infoSection}>
                  <strong>Responsable:</strong>
                  <p>{proyecto.responsable.nombreCompleto}</p>
                </div>
                <div className={styles.infoSection}>
                  <strong>Presupuesto:</strong>
                  <p>${proyecto.presupuesto}</p>
                </div>
                <div className={styles.infoSection}>
                  <strong>Estado del Proyecto:</strong>
                  <p>{proyecto.estadoString}</p>
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
                      Titulo: {tarea.nombre} - {tarea.storyPoints} Points - {tarea.responsable.nombreCompleto}
                    </p>
                  ))}
                </div>
                <div className={styles.taskCategory}>
                  <h4>En Curso</h4>
                  {tareasEnCurso.map((tarea, index) => (
                    <p key={index} className={styles.tareaInfo}>
                      Titulo: {tarea.nombreTarea} - {tarea.storyPoints} Points - {tarea.responsable.nombreCompleto}
                    </p>
                  ))}
                </div>
                <div className={styles.taskCategory}>
                  <h4>Finalizadas</h4>
                  {tareasFinalizadas.map((tarea, index) => (
                    <p key={index} className={styles.tareaInfo}>
                      Titulo: {tarea.nombreTarea} - {tarea.storyPoints} Points - {tarea.responsable.nombreCompleto}
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
