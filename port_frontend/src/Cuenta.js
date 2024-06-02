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
import './Menu.css'; // Importar los estilos del menú y barra superior
import { useAuth } from './contexts/authContext';
import { useUser } from './contexts/userContext';

const CuentaScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [colaborador, setColaborador] = useState({});

  const {id} = useAuth();
  const {getInfoUser, infoUser, editUser} = useUser();  

  useEffect(() => {
    if(infoUser != null){
      if(infoUser.estado == 0){
        infoUser.estadoString = "Libre";
      }
      else{
        infoUser.estadoString = "Ocupado";
      }
      setColaborador(infoUser);
    }
  }, [infoUser])

  useEffect(() => {
    // Simulamos la carga de datos con JSON o una llamada a la API
    getInfoUser(id);
  }, []);

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
    // Simulamos la llamada a la API para guardar cambios
    var estadoVar = 1;
    if(colaborador.estadoString == "Libre"){
      estadoVar = 0;
    }
    const data = {
      nombreCompleto : colaborador.nombreCompleto,
      cedula : colaborador.cedula,
      email : colaborador.email,
      departamentoTrabajo : colaborador.departamentoTrabajo,
      telefono : colaborador.telefono,
      estado : estadoVar
    }
    editUser(data, id)
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
                value={colaborador.email || ''}
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
                value={colaborador.estadoString || ''}
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
