import React, { useState, useEffect } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import {useAuth} from './contexts/authContext.js'

const RegisterScreen = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [cedula, setCedula] = useState(''); 
  const [departamentoTrabajo, setDepartamentoTrabajo] = useState(''); 
  const [telefono, setTelefono] = useState(''); 
  const navigate = useNavigate();

  const {register, user} = useAuth();

  useEffect(() => {
    if(!user){
      navigate('/main')
    }
  }, [user])

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }
    // Nota para Darío: Mae igual que siempre esto es para pruebas
    const data = {
      nombreCompleto : fullName,
      cedula : cedula,
      email : email,
      departamentoTrabajo : departamentoTrabajo,
      telefono : telefono,
      estado : 0,
      contrasena : password
    } 

    register(data);
  };
  
  return (
    <div className="container">
      <img src="/logo_letra_nofondo.png" className="logo" alt="InnovaTech Logo" />
      <h2 className="header">Registrarse</h2>

      <input 
        type="text" 
        className="input" 
        onChange={(e) => setFullName(e.target.value)} 
        value={fullName} 
        placeholder="Nombre Completo:" 
        autoCapitalize="words" 
      />
      <input 
        type="email" 
        className="input" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
        placeholder="Correo Electrónico:" 
        keyboardType="email-address" 
      />
      <input 
        type="text" 
        className="input" 
        onChange={(e) => setCedula(e.target.value)} 
        value={cedula} 
        placeholder="Cédula:" 
      />
      <input 
        type="text" 
        className="input" 
        onChange={(e) => setDepartamentoTrabajo(e.target.value)} 
        value={departamentoTrabajo} 
        placeholder="Departamento de Trabajo:" 
      />
      <input 
        type="text" 
        className="input" 
        onChange={(e) => setTelefono(e.target.value)} 
        value={telefono} 
        placeholder="Teléfono:" 
        keyboardType="phone-pad" 
      />
      <input 
        type="password" 
        className="input" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
        placeholder="Contraseña:" 
        secureTextEntry 
      />
      <input 
        type="password" 
        className="input" 
        onChange={(e) => setConfirmPassword(e.target.value)} 
        value={confirmPassword} 
        placeholder="Reescribir Contraseña:" 
        secureTextEntry 
      />

      <button className="button" onClick={handleRegister}>
        Registrarse
      </button>
    </div>
  );
};

export default RegisterScreen;
