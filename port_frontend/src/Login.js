import React, { useEffect, useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/authContext';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const {login, isAuthenticated} = useAuth();
  // autenticación simple para pruebas
  useEffect(() => {
    if(isAuthenticated){
      navigate('/main')
      
    }
  }, [isAuthenticated])

  const handleLogin = () => {
    console.log('Login con:', email, password);
    
    const data = {
      email : email,
      contrasena : password
    }
    login(data)
  };

  return (
    <div className="container">
      <h1 className="title">InnovaTech</h1>
      <h2 className="header">Plataforma de Gestión de Proyectos</h2>
      
      <img src="/logo_nofondo.png" className="logo-login" alt="InnovaTech Logo" />

      <input
        type="email"
        className="input"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder="Correo:"
      />
      <input
        type="password"
        className="input"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="Contraseña:"
      />

      <button className="button" onClick={handleLogin}>
        Iniciar Sesión
      </button>

      <button className="link-button" onClick={() => {/* Manejar olvido de contraseña */}}>
        ¿Olvidé mi contraseña?
      </button>

      <button className="link-button" onClick={() => navigate('/register')}>
        ¿No tenés cuenta? Regístrate aquí
      </button>
    </div>
  );
};

export default LoginScreen;
