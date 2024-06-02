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
import './Cuenta.css';
import './Menu.css'; 

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
          <div className="cuenta-container">
            <h2 className="header">Información de la cuenta</h2>
            <div className="cuenta-form">
              <label className="label">Nombre:</label>
              <input
                className="input"
                type="text"
                value={colaborador.nombreCompleto || ''}
                onChange={(e) => handleInputChange('nombreCompleto', e.target.value)}
                placeholder="Nombre Completo"
              />
              <label className="label">Cédula:</label>
              <input
                className="input"
                type="text"
                value={colaborador.cedula || ''}
                onChange={(e) => handleInputChange('cedula', e.target.value)}
                placeholder="Cédula"
                keyboardType="numeric"
              />
              <label className="label">Correo electrónico:</label>
              <input
                className="input"
                type="email"
                value={colaborador.correoElectronico || ''}
                onChange={(e) => handleInputChange('correoElectronico', e.target.value)}
                placeholder="Correo Electrónico"
              />
              <label className="label">Departamento:</label>
              <input
                className="input"
                type="text"
                value={colaborador.departamentoTrabajo || ''}
                onChange={(e) => handleInputChange('departamentoTrabajo', e.target.value)}
                placeholder="Departamento de Trabajo"
              />
              <label className="label">Teléfono:</label>
              <input
                className="input"
                type="text"
                value={colaborador.telefono || ''}
                onChange={(e) => handleInputChange('telefono', e.target.value)}
                placeholder="Teléfono"
                keyboardType="phone-pad"
              />
              <label className="label">Estado:</label>
              <input
                className="input"
                type="text"
                value={colaborador.estado || ''}
                onChange={(e) => handleInputChange('estado', e.target.value)}
                placeholder="Estado"
              />
              <button className="button" onClick={handleSaveChanges}>
                Guardar Cambios
              </button>
              <button className="button" onClick={handleLogOut}>
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
