import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faBriefcase, faChartBar, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import styles from './Reportes.module.css';
import projectData from './data.json';
import colabData from './colab_data.json';

const ReportesScreen = () => {
  const location = useLocation();
  const [selectedProject, setSelectedProject] = useState(projectData[0]._id);

  const handleProjectChange = (event) => {
    setSelectedProject(event.target.value);
  };

  const generateProjectReport = () => {
    const project = projectData.find((proj) => proj._id === selectedProject);
    const doc = new jsPDF();

    doc.text(`Reporte del Proyecto: ${project.nombreProyecto}`, 10, 10);
    doc.text(`Descripción: ${project.descripcion}`, 10, 20);
    doc.text(`Presupuesto: ${project.presupuesto}`, 10, 30);
    doc.text(`Estado: ${project.estadoProyecto}`, 10, 40);
    doc.text(`Fecha de Inicio: ${project.fechaInicio}`, 10, 50);
    doc.text('Recursos Necesarios:', 10, 60);
    project.recursosNecesarios.forEach((recurso, index) => {
      doc.text(`${index + 1}. ${recurso}`, 10, 70 + index * 10);
    });

    doc.text('Colaboradores:', 10, 80 + project.recursosNecesarios.length * 10);
    project.colaboradores.forEach((colabId, index) => {
      const colaborador = colabData.find((colab) => colab._id === colabId);
      if (colaborador) {
        doc.text(`${index + 1}. ${colaborador.nombreCompleto}`, 10, 90 + project.recursosNecesarios.length * 10 + index * 10);
      } else {
        doc.text(`${index + 1}. Colaborador no encontrado`, 10, 90 + project.recursosNecesarios.length * 10 + index * 10);
      }
    });

    doc.autoTable({
      startY: 100 + project.recursosNecesarios.length * 10 + project.colaboradores.length * 10,
      head: [['Nombre de la Tarea', 'Story Points', 'Estado', 'Responsable']],
      body: project.tareas.map((tarea) => {
        const responsable = colabData.find((colab) => colab._id === tarea.responsable);
        return [
          tarea.nombreTarea,
          tarea.storyPoints,
          tarea.estado,
          responsable ? responsable.nombreCompleto : 'Responsable no encontrado',
        ];
      }),
    });

    doc.save(`Reporte_Proyecto_${project.nombreProyecto}.pdf`);
  };

  const generateColabReport = () => {
    const doc = new jsPDF();

    doc.text('Reporte de Colaboradores', 10, 10);

    doc.autoTable({
      startY: 20,
      head: [['Nombre Completo', 'Cédula', 'Correo Electrónico', 'Departamento', 'Teléfono', 'Estado', 'Proyecto Actual']],
      body: colabData.map((colab) => [
        colab.nombreCompleto,
        colab.cedula,
        colab.correoElectronico,
        colab.departamentoTrabajo,
        colab.telefono,
        colab.estado,
        colab.proyectoActual || 'N/A',
      ]),
    });

    doc.save('Reporte_Colaboradores.pdf');
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
        {menuItems.map((item) => (
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
          <div className={styles.reportesContainer}>
            <div className={styles.reporteSection}>
              <h2 className={styles.header}>Reportes de Proyecto</h2>
              <select className={styles.picker} value={selectedProject} onChange={handleProjectChange}>
                {projectData.map((proyecto) => (
                  <option key={proyecto._id} value={proyecto._id}>
                    {proyecto.nombreProyecto}
                  </option>
                ))}
              </select>
              <button className={styles.button} onClick={generateProjectReport}>Generar Reporte PDF</button>
            </div>
            <div className={styles.reporteSection}>
              <h2 className={styles.header}>Reportes de Colaboradores</h2>
              <button className={styles.button} onClick={generateColabReport}>Generar Reporte PDF</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ReportesScreen;
