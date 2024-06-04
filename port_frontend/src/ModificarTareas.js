import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import projectData from './data.json'; // Datos de prueba del proyecto
import colabData from './colab_data.json'; // Datos de prueba de colaboradores
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faBriefcase, faChartBar, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './Menu.css'; 
import {useProject} from './contexts/proyectoContext'
import { useTask } from './contexts/tareaContext'; 
import styles from './ModificarTareas.module.css';

// Componente para el formulario de modificación de una tarea específica
const ModificarTareaForm = ({ tarea, onGuardar, onCancelar }) => {
  const [nombreTarea, setNombreTarea] = useState(tarea.nombre);
  const [storyPoints, setStoryPoints] = useState(tarea.storyPoints.toString());
  const [descripcion, setDescripcion] = useState(tarea.descripcion || '');
  const [responsable, setResponsable] = useState(tarea.responsable);
  const [estado, setEstado] = useState(tarea.estado);

  const handleEstadoChange = (e) => {
    setEstado(e.target.value);
  };

  return (
    <div className={styles.modificarTareaFormContainer}>
      <h3 className={styles.modificarTareaFormTitulo}>Modificar Tarea</h3>
      <input
        className={styles.modificarTareaInput}
        value={nombreTarea}
        onChange={(e) => setNombreTarea(e.target.value)}
        placeholder="Nombre de la tarea"
      />
      <input
        className={styles.modificarTareaInput}
        value={storyPoints}
        onChange={(e) => setStoryPoints(e.target.value)}
        placeholder="Story Points"
        type="number"
      />
      <textarea
        className={styles.modificarTareaTextarea}
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        placeholder="Descripción"
      />
      <input
        className={styles.modificarTareaInput}
        value={responsable}
        onChange={(e) => setResponsable(e.target.value)}
        placeholder="Responsable"
        readOnly
      />
      <select className={styles.modificarTareaSelect} value={estado} onChange={handleEstadoChange}>
        <option value="por hacer">Por hacer</option>
        <option value="en curso">En curso</option>
        <option value="finalizada">Finalizado</option>
      </select>
      <button
        className={`${styles.modificarTareaButton} ${styles.modificarTareaGuardar}`}
        onClick={() => onGuardar({ nombreTarea, storyPoints, descripcion, responsable, estado, tarea })}
      >
        Guardar
      </button>
      <button className={`${styles.modificarTareaButton} ${styles.modificarTareaCancelar}`} onClick={onCancelar}>
        Cancelar
      </button>
    </div>
  );
};

// Componente para el formulario de creación de una nueva tarea
const CrearTareaForm = ({ onGuardar, onCancelar, colaboradores }) => {
  const [nombreTarea, setNombreTarea] = useState('');
  const [storyPoints, setStoryPoints] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [responsable, setResponsable] = useState('');
  const [estado, setEstado] = useState('por hacer');

  const handleEstadoChange = (e) => {
    setEstado(e.target.value);
  };

  return (
    <div className={styles.crearTareaFormContainer}>
      <h3 className={styles.crearTareaFormTitulo}>Agregar Nueva Tarea</h3>
      <input
        className={styles.crearTareaInput}
        value={nombreTarea}
        onChange={(e) => setNombreTarea(e.target.value)}
        placeholder="Nombre de la tarea"
      />
      <input
        className={styles.crearTareaInput}
        value={storyPoints}
        onChange={(e) => setStoryPoints(e.target.value)}
        placeholder="Story Points"
        type="number"
      />
      <textarea
        className={styles.crearTareaTextarea}
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        placeholder="Descripción"
      />
      <label className={styles.crearTareaLabel}>Responsable:</label>
      <div className={styles.crearTareaColaboradoresContainer}>
        {colaboradores.map((colaborador) => (
          <button
            key={colaborador._id}
            className={`${styles.crearTareaColaboradorButton} ${responsable === colaborador._id ? styles.selected : ''}`}
            onClick={() => setResponsable(colaborador._id)}
          >
            {colaborador.nombreCompleto}
          </button>
        ))}
      </div>
      <select className={styles.crearTareaSelect} value={estado} onChange={handleEstadoChange}>
        <option value="por hacer">Por hacer</option>
        <option value="en curso">En curso</option>
        <option value="finalizada">Finalizado</option>
      </select>
      <button
        className={`${styles.crearTareaButton} ${styles.crearTareaGuardar}`}
        onClick={() => onGuardar({ nombre : nombreTarea, storyPoints : storyPoints, descripcion : descripcion, responsable : responsable, estado : 0 })}
      >
        Guardar
      </button>
      <button className={`${styles.crearTareaButton} ${styles.crearTareaCancelar}`} onClick={onCancelar}>
        Cancelar
      </button>
    </div>
  );
};

const ModificarTareasScreen = () => {
  const { proyectoId } = useParams(); // Se obtiene el id del proyecto de los parámetros
  const location = useLocation();
  const [tareas, setTareas] = useState([]);
  const [tareaAEditar, setTareaAEditar] = useState(null);
  const [mostrarFormCrear, setMostrarFormCrear] = useState(false);
  const [colaboradores, setColaboradores] = useState([]);

  const {getProject, project, editProject} = useProject();
  const {createTask, idTask, setIdTask} = useTask();

  useEffect(() => {
    if(project != []) {
      setColaboradores(project.colaboradores)
      setTareas(project.tareas);
    }
  }, [project])

  useEffect(() => {
    getProject(proyectoId);
  }, [proyectoId]);

  const handleGuardarModificacion = async (modificaciones) => {
    const nuevasTareas = tareas.map((t) =>
      t.nombreTarea === tareaAEditar.nombreTarea ? { ...t, ...modificaciones } : t
    );
    setTareas(nuevasTareas);
    setTareaAEditar(null); // Cerrar el formulario de edición
  };

  const handleAgregarTarea = (nuevaTarea) => {
    nuevaTarea.proyecto = proyectoId;
    createTask(nuevaTarea)
    //setTareas([...tareas, nuevaTarea]);
    setMostrarFormCrear(false); // Cerrar el formulario de creación
  };

  useEffect(() => {
    if(idTask != null) {
      project.tareas.push(idTask)
      editProject(proyectoId, project)
      getProject(proyectoId)
      setIdTask(null);
    }
  }, [idTask])
  const handleEliminarTarea = (tareaId) => {
    // setTareas(tareas.filter((tarea) => tarea._id !== tareaId));
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
          <div className={styles.modificarTareasContainer}>
            <h2 className={styles.modificarTareasTitulo}>Modificar Tareas del Proyecto</h2>
            {tareas.map((tarea, index) => (
              <div key={index} className={styles.modificarTareasTareaContainer}>
                <p>{tarea.nombre} - SP: {tarea.storyPoints} - Descripción: {tarea.descripcion} - Responsable: {tarea.responsable}</p>
                <div className={styles.modificarTareasBotonesContainer}>
                  <button className={`${styles.modificarTareasButton} ${styles.modificarTareasModificar}`} onClick={() => setTareaAEditar(tarea)}>
                    Modificar
                  </button>
                  <button className={`${styles.modificarTareasButton} ${styles.modificarTareasEliminar}`} onClick={() => handleEliminarTarea(tarea._id)}>
                    Eliminar
                  </button>
                </div>
              </div>
            ))}

            <button className={`${styles.modificarTareasButton} ${styles.modificarTareasAgregar}`} onClick={() => setMostrarFormCrear(true)}>
              Agregar Nueva Tarea
            </button>

            {tareaAEditar && (
              <ModificarTareaForm
                tarea={tareaAEditar}
                onGuardar={handleGuardarModificacion}
                onCancelar={() => setTareaAEditar(null)}
              />
            )}
            {mostrarFormCrear && (
              <CrearTareaForm
                onGuardar={handleAgregarTarea}
                onCancelar={() => setMostrarFormCrear(false)}
                colaboradores={colaboradores}
              />
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ModificarTareasScreen;
