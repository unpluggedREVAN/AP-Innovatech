import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, StatusBar } from 'react-native';

const RegisterScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState(''); // Almacena el nombre completo del usuario
  const [password, setPassword] = useState(''); // Almacena la contraseña
  const [confirmPassword, setConfirmPassword] = useState(''); // Almacena la confirmación de la contraseña

  const handleRegister = () => {
    // Verifica si las contraseñas coinciden
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }
    console.log('Registro con:', fullName, password); // datos de registro para depuración
    // Navegar a otra pantalla tras el registro exitoso
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/logo_letra_nofondo.png')} 
        style={styles.logo}
      />
      <Text style={styles.header}>Registrarse</Text>

      <TextInput
        style={styles.input}
        onChangeText={setFullName}
        value={fullName}
        placeholder="Nombre Completo:" 
        autoCapitalize="words"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Contraseña:" 
        secureTextEntry // Oculta la contraseña
      />
      <TextInput
        style={styles.input}
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        placeholder="Reescribir Contraseña:" // Input para confirmar la contraseña
        secureTextEntry // Oculta la confirmación de la contraseña
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text> // Botón para enviar el formulario de registro
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
    width: 200,
    height: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 30, // Estilo del logo
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    alignSelf: 'center',
    marginBottom: 30, // Estilo del encabezado de registro
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: '#ccc', // Estilo de los campos de texto
  },
  button: {
    backgroundColor: '#4e9ec5',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    margin: 12, // Estilo del botón de registro
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold', // Estilo del texto en el botón de registro
  },
});

export default RegisterScreen;
