import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faBriefcase, faChartBar, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Importar para registrar los controladores de gráficos
import styles from './BurndownChart.module.css';
import projectData from './data.json';

const BurndownChartScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState(projectData[0]);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const generateBurndownData = (project) => {
      const totalTasks = project.tareas.length;
      const days = Array.from({ length: 14 }, (_, i) => i + 1);
      const idealLine = days.map(day => totalTasks - (day * totalTasks / 14));
      const actualLine = days.map(day => Math.max(totalTasks - day * Math.floor(totalTasks / 14) - Math.floor(Math.random() * 3), 0));

      return {
        labels: days,
        datasets: [
          {
            label: 'Ideal',
            data: idealLine,
            borderColor: '#36A2EB',
            fill: false,
          },
          {
            label: 'Actual',
            data: actualLine,
            borderColor: '#FF6384',
            fill: false,
          },
        ],
      };
    };

    setChartData(generateBurndownData(selectedProject));
  }, [selectedProject]);

  const handleProjectChange = (event) => {
    const selectedProjectId = event.target.value;
    const project = projectData.find((p) => p._id === selectedProjectId);
    setSelectedProject(project);
  };

  const handleBackToEvaluation = () => {
    navigate('/evaluacion');
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
          <div className={styles.burndownContainer}>
            <h2 className={styles.header}>Burndown Chart</h2>
            <select className={styles.picker} value={selectedProject._id} onChange={handleProjectChange}>
              {projectData.map((proyecto) => (
                <option key={proyecto._id} value={proyecto._id}>
                  {proyecto.nombreProyecto}
                </option>
              ))}
            </select>
            {chartData && (
              <div className={styles.chartContainer}>
                <Line
                  data={chartData}
                  options={{
                    maintainAspectRatio: true,
                    responsive: true,
                    scales: {
                      x: {
                        title: {
                          display: true,
                          text: 'Days',
                        },
                      },
                      y: {
                        title: {
                          display: true,
                          text: 'Tasks Remaining',
                        },
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </div>
            )}
            <button className={styles.button} onClick={handleBackToEvaluation}>
              Volver a Evaluación
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BurndownChartScreen;
