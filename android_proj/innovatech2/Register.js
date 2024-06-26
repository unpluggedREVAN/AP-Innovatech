import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, StatusBar, ToastAndroid } from 'react-native';
import axios from 'axios';
import {registerRequest} from './api/auth.js'

const RegisterScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [cedula, setCedula] = useState(''); 
  const [departamentoTrabajo, setDepartamentoTrabajo] = useState(''); 
  const [telefono, setTelefono] = useState(''); 

  const data = {
    nombreCompleto : fullName,
    cedula : cedula,
    correoElectronico : email,
    departamentoTrabajo : departamentoTrabajo,
    telefono : telefono,
    contrasena : password
  }

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }
    // Lógica del registro aquí
    console.log("Iniciar request")
    const res = await registerRequest(data)
    //Respuesta del request 
    console.log("Respuesta de la peticion: ", res.data);
  };
  
  return (
    <View style={styles.container}>
      <Image source={require('./assets/logo_letra_nofondo.png')} style={styles.logo} />
      <Text style={styles.header}>Registrarse</Text>

      <TextInput style={styles.input} onChangeText={setFullName} value={fullName} placeholder="Nombre Completo:" autoCapitalize="words" />
      <TextInput style={styles.input} onChangeText={setEmail} value={email} placeholder="Correo Electrónico:" keyboardType="email-address" />
      <TextInput style={styles.input} onChangeText={setCedula} value={cedula} placeholder="Cédula:" />
      <TextInput style={styles.input} onChangeText={setDepartamentoTrabajo} value={departamentoTrabajo} placeholder="Departamento de Trabajo:" />
      <TextInput style={styles.input} onChangeText={setTelefono} value={telefono} placeholder="Teléfono:" keyboardType="phone-pad" />
      <TextInput style={styles.input} onChangeText={setPassword} value={password} placeholder="Contraseña:" secureTextEntry />
      <TextInput style={styles.input} onChangeText={setConfirmPassword} value={confirmPassword} placeholder="Reescribir Contraseña:" secureTextEntry />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20, // Estilo del contenedor principal
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 0, // Estilo del logo
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    alignSelf: 'center',
    marginBottom: 10, 
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: '#ccc', 
  },
  button: {
    backgroundColor: '#4e9ec5',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    margin: 12, 
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold', 
  },
});

export default RegisterScreen;
