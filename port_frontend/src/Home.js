import React, { useState, useEffect } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

// Importa el archivo JSON simulado
import data from './data.json';

const HomeScreen = () => {
  const navigate = useNavigate();
  const [proyectos, setProyectos] = useState([]); // Estado para manejar los proyectos

  // cargar los proyectos de la base de datos simulada (archivo JSON)
  useEffect(() => {
    // Aquí se haría una llamada a la API
    // const response = await getProyectosRequest();
    // setProyectos(response);

    // Simulamos la carga de datos con el JSON
    setProyectos(data);
  }, []);

  const handleCreateProject = () => {
    navigate('/crear-proyecto');
  };

  const handleOptionsPress = (proyectoId, proyectoColabs) => {
    navigate(`/project-details/${proyectoId}`, { state: { proyectoColabs } });
  };

  return (
    <div className="home-container">
      <img src="/logo_letra_nofondo.png" className="home-logo" alt="InnovaTech Logo" />
      <h2 className="home-header">Proyectos disponibles</h2>
      <div className="home-proyectos-container">
        {proyectos.map((proyecto) => (
          <div key={proyecto._id} className="home-proyecto-card">
            <h3 className="home-proyecto-title">Proyecto {proyecto._id}: {proyecto.nombreProyecto}</h3>
            <p className="home-proyecto-content">{proyecto.descripcion}</p>
            {/* Más detalles del proyecto */}
            <button
              className="home-options-button"
              onClick={() => handleOptionsPress(proyecto._id, proyecto.colaboradores)}
            >
              Gestionar proyecto
            </button>
          </div>
        ))}
      </div>
      
      <button className="home-button" onClick={handleCreateProject}>
        Crear Nuevo Proyecto
      </button>
    </div>
  );
};

export default HomeScreen;
