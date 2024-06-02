import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faBriefcase, faChartBar, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Importar para registrar los controladores de gráficos
import './Evaluacion.css';
import './Menu.css'; // Importar los estilos del menú y barra superior
import projectData from './data.json';

const EvaluacionScreen = () => {
  const location = useLocation();
  const [selectedProject, setSelectedProject] = useState(projectData[0]);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const tareasPorEstado = selectedProject.tareas.reduce((acc, tarea) => {
      acc[tarea.estado] = (acc[tarea.estado] || 0) + 1;
      return acc;
    }, {});

    setChartData({
      labels: ['Por hacer', 'En curso', 'Finalizadas'],
      datasets: [
        {
          label: 'Tareas',
          data: [
            tareasPorEstado['por hacer'] || 0,
            tareasPorEstado['en curso'] || 0,
            tareasPorEstado['finalizada'] || 0,
          ],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
      ],
    });
  }, [selectedProject]);

  const handleProjectChange = (event) => {
    const selectedProjectId = event.target.value;
    const project = projectData.find((p) => p._id === selectedProjectId);
    setSelectedProject(project);
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
          <div className="evaluacion-container">
            <h2 className="header">Evaluación de Proyectos</h2>
            <select className="picker" value={selectedProject._id} onChange={handleProjectChange}>
              {projectData.map((proyecto) => (
                <option key={proyecto._id} value={proyecto._id}>
                  {proyecto.nombreProyecto}
                </option>
              ))}
            </select>
            {chartData && (
              <div className="chart-container">
                <Bar
                  data={chartData}
                  options={{
                    maintainAspectRatio: true,
                    responsive: true,
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </div>
            )}
            <button className="button">
              Burndown Chart
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EvaluacionScreen;
