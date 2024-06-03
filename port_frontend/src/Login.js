import React, { useState } from 'react';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // autenticación simple para pruebas
  const handleLogin = () => {
    console.log('Login con:', email, password);
    
    if (email === 'admin' && password === 'admin') {
      alert('Login exitoso');
      navigate('/main');
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>InnovaTech</h1>
      <h2 className={styles.header}>Plataforma de Gestión de Proyectos</h2>
      
      <img src="/logo_nofondo.png" className={styles.logoLogin} alt="InnovaTech Logo" />

      <input
        type="email"
        className={styles.input}
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder="Correo:"
      />
      <input
        type="password"
        className={styles.input}
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="Contraseña:"
      />

      <button className={styles.button} onClick={handleLogin}>
        Iniciar Sesión
      </button>

      <button className={styles.linkButton} onClick={() => {/* Manejar olvido de contraseña */}}>
        ¿Olvidé mi contraseña?
      </button>

      <button className={styles.linkButton} onClick={() => navigate('/register')}>
        ¿No tenés cuenta? Regístrate aquí
      </button>
    </div>
  );
};

export default LoginScreen;
