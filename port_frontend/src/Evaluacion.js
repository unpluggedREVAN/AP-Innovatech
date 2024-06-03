import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faBriefcase, faChartBar, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Importar para registrar los controladores de gráficos
import styles from './Evaluacion.module.css';
import projectData from './data.json';

const EvaluacionScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
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

  const handleBurndownChart = () => {
    navigate('/burndown-chart');
  };

  const handleReportes = () => {
    navigate('/reportes');
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
          <div className={styles.evaluacionContainer}>
            <h2 className={styles.header}>Evaluación de Proyectos</h2>
            <select className={styles.picker} value={selectedProject._id} onChange={handleProjectChange}>
              {projectData.map((proyecto) => (
                <option key={proyecto._id} value={proyecto._id}>
                  {proyecto.nombreProyecto}
                </option>
              ))}
            </select>
            {chartData && (
              <div className={styles.chartContainer}>
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
            <button className={styles.button} onClick={handleBurndownChart}>
              Burndown Chart
            </button>
            <button className={styles.button} onClick={handleReportes}>
              Reportes
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EvaluacionScreen;
