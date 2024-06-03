import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUsers,
  faBriefcase,
  faChartBar,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import styles from './Cuenta.module.css'; 

const CuentaScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [colaborador, setColaborador] = useState({});

  useEffect(() => {
    // Simula la carga de datos con JSON o una llamada a la API
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    // Reemplazar esto con una llamada a la API real
    const response = await fetch('/path/to/colab_data.json');
    const data = await response.json();
    setColaborador(data[0]); // Simula obtener el primer colaborador
  };

  const handleInputChange = (name, value) => {
    setColaborador(prevState => ({ ...prevState, [name]: value }));
  };

  const handleLogOut = async () => {
    try {
      // Simula la llamada a la API para cerrar sesión
      await fetch('/path/to/logout', { method: 'POST' });
      alert('Sesión cerrada correctamente.');
      navigate('/login');
    } catch (error) {
      alert('Ocurrió un error al cerrar sesión. Por favor, intenta nuevamente.');
    }
  };

  const handleSaveChanges = async () => {
    console.log('Guardar cambios', colaborador);
    // Simula la llamada a la API para guardar cambios
    await fetch(`/path/to/colab/${colaborador.idUser}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(colaborador),
    });
    alert('Cambio realizado correctamente.');
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
          <div className={styles.cuentaContainer}>
            <h2 className={styles.header}>Información de la cuenta</h2>
            <div className={styles.cuentaForm}>
              <label className={styles.label}>Nombre:</label>
              <input
                className={styles.input}
                type="text"
                value={colaborador.nombreCompleto || ''}
                onChange={(e) => handleInputChange('nombreCompleto', e.target.value)}
                placeholder="Nombre Completo"
              />
              <label className={styles.label}>Cédula:</label>
              <input
                className={styles.input}
                type="text"
                value={colaborador.cedula || ''}
                onChange={(e) => handleInputChange('cedula', e.target.value)}
                placeholder="Cédula"
                keyboardType="numeric"
              />
              <label className={styles.label}>Correo electrónico:</label>
              <input
                className={styles.input}
                type="email"
                value={colaborador.correoElectronico || ''}
                onChange={(e) => handleInputChange('correoElectronico', e.target.value)}
                placeholder="Correo Electrónico"
              />
              <label className={styles.label}>Departamento:</label>
              <input
                className={styles.input}
                type="text"
                value={colaborador.departamentoTrabajo || ''}
                onChange={(e) => handleInputChange('departamentoTrabajo', e.target.value)}
                placeholder="Departamento de Trabajo"
              />
              <label className={styles.label}>Teléfono:</label>
              <input
                className={styles.input}
                type="text"
                value={colaborador.telefono || ''}
                onChange={(e) => handleInputChange('telefono', e.target.value)}
                placeholder="Teléfono"
                keyboardType="phone-pad"
              />
              <label className={styles.label}>Estado:</label>
              <input
                className={styles.input}
                type="text"
                value={colaborador.estado || ''}
                onChange={(e) => handleInputChange('estado', e.target.value)}
                placeholder="Estado"
              />
              <button className={styles.button} onClick={handleSaveChanges}>
                Guardar Cambios
              </button>
              <button className={styles.button} onClick={handleLogOut}>
                Cerrar sesión
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CuentaScreen;
