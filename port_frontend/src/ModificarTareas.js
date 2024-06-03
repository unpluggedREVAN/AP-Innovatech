import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import projectData from './data.json'; // Datos de prueba del proyecto
import colabData from './colab_data.json'; // Datos de prueba de colaboradores
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faBriefcase, faChartBar, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './ModificarTareas.css';
import './Menu.css'; 
import {useProject} from './contexts/proyectoContext'
import { useTask } from './contexts/tareaContext'; 

// Componente para el formulario de modificación de una tarea específica
const ModificarTareaForm = ({ tarea, onGuardar, onCancelar }) => {
  const [nombreTarea, setNombreTarea] = useState(tarea.nombre);
  const [storyPoints, setStoryPoints] = useState(tarea.storyPoints.toString());
  const [estado, setEstado] = useState(tarea.estado);
  const [responsable, setResponsable] = useState(tarea.responsable); 

  return (
    <div className="modificar-tarea-form-container">
      <h3 className="modificar-tarea-form-titulo">Modificar Tarea</h3>
      <input
        className="modificar-tarea-input"
        value={nombreTarea}
        onChange={(e) => setNombreTarea(e.target.value)}
        placeholder="Nombre de la tarea"
      />
      <input
        className="modificar-tarea-input"
        value={storyPoints}
        onChange={(e) => setStoryPoints(e.target.value)}
        placeholder="Story Points"
        type="number"
      />
      <input
        className="modificar-tarea-input"
        value={estado}
        onChange={(e) => setEstado(e.target.value)}
        placeholder="Estado"
      />
      <input
        className="modificar-tarea-input"
        value={responsable}
        onChange={(e) => setResponsable(e.target.value)}
        placeholder="Responsable"
        readOnly
      />
      <button
        className="modificar-tarea-button modificar-tarea-guardar"
        onClick={() => onGuardar({ nombreTarea, storyPoints, estado, responsable, tarea })}
      >
        Guardar
      </button>
      <button className="modificar-tarea-button modificar-tarea-cancelar" onClick={onCancelar}>
        Cancelar
      </button>
    </div>
  );
};

// Componente para el formulario de creación de una nueva tarea
const CrearTareaForm = ({ onGuardar, onCancelar, colaboradores }) => {
  const [nombreTarea, setNombreTarea] = useState('');
  const [storyPoints, setStoryPoints] = useState('');
  const [estado, setEstado] = useState('');
  const [responsable, setResponsable] = useState('');

  return (
    <div className="crear-tarea-form-container">
      <h3 className="crear-tarea-form-titulo">Agregar Nueva Tarea</h3>
      <input
        className="crear-tarea-input"
        value={nombreTarea}
        onChange={(e) => setNombreTarea(e.target.value)}
        placeholder="Nombre de la tarea"
      />
      <input
        className="crear-tarea-input"
        value={storyPoints}
        onChange={(e) => setStoryPoints(e.target.value)}
        placeholder="Story Points"
        type="number"
      />
      <input
        className="crear-tarea-input"
        value={estado}
        onChange={(e) => setEstado(e.target.value)}
        placeholder="Estado"
      />
      <label className="crear-tarea-label">Responsable:</label>
      <div className="crear-tarea-colaboradores-container">
        {colaboradores.map((colaborador) => (
          <button
            key={colaborador._id}
            className={`crear-tarea-colaborador-button ${responsable === colaborador._id ? 'selected' : ''}`}
            onClick={() => setResponsable(colaborador._id)}
          >
            {colaborador.nombreCompleto}
          </button>
        ))}
      </div>
      <button
        className="crear-tarea-button crear-tarea-guardar"
        onClick={() => onGuardar({ nombre : nombreTarea, storyPoints : storyPoints, estado : 0, responsable : responsable, descripcion : estado })}
      >
        Guardar
      </button>
      <button className="crear-tarea-button crear-tarea-cancelar" onClick={onCancelar}>
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
          <div className="modificar-tareas-container">
            <h2 className="modificar-tareas-titulo">Modificar Tareas del Proyecto</h2>
            {tareas.map((tarea, index) => (
              <div key={index} className="modificar-tareas-tarea-container">
                <p>{tarea.nombre} - SP: {tarea.storyPoints} - Estado: {tarea.estado} - Responsable: {tarea.responsable}</p>
                <div className="modificar-tareas-botones-container">
                  <button className="modificar-tareas-button modificar-tareas-modificar" onClick={() => setTareaAEditar(tarea)}>
                    Modificar
                  </button>
                  <button className="modificar-tareas-button modificar-tareas-eliminar" onClick={() => setTareas(tareas.filter((t) => t !== tarea))}>
                    Eliminar
                  </button>
                </div>
              </div>
            ))}

            <button className="modificar-tareas-button modificar-tareas-agregar" onClick={() => setMostrarFormCrear(true)}>
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
