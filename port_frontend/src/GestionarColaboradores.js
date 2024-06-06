import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import colaboradoresData from './colab_data.json'; // Datos de colaboradores
import projectData from './data.json'; // Datos de proyectos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faBriefcase, faChartBar, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './Menu.css'; 
import { useUser } from './contexts/userContext';
import { useProject } from './contexts/proyectoContext';
import {useAuth} from './contexts/authContext';
import styles from './GestionarColaboradores.module.css';

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
      console.log(proyecto)
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

    //Hacer que se borren las tareas de los colaboradores que quedaron libres
    //colaboradoresLibres.forEach

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
          <div className={styles.gestionarColaboradoresContainer}>
            <h2 className={styles.title}>Editar Colaboradores:</h2>
            <p className={styles.nota}>Nota: Debes seleccionar de nuevo los colaboradores que quieres asignar al proyecto.</p>

            <div className={styles.colaboradoresList}>
              {colaboradoresLibres.map((colaborador) => (
                <button
                  key={colaborador._id}
                  className={`${styles.colaboradorContainer} ${colaboradoresActuales.includes(colaborador._id) ? styles.selected : ''}`}
                  onClick={() => toggleColaborador(colaborador._id)}
                >
                  {colaborador.nombreCompleto} - {colaborador.departamentoTrabajo}
                </button>
              ))}
            </div>

            <button className={styles.botonGuardar} onClick={handleGuardarCambios}>
              Guardar Cambios
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default GestionarColaboradoresScreen;
