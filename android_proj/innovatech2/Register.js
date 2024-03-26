import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, StatusBar } from 'react-native';

const RegisterScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    // Aquí puedes añadir la lógica para manejar el registro
    // Debes validar que las contraseñas coincidan, etc.
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }
    console.log('Registro con:', fullName, password);
    // Aquí podrías navegar a la pantalla de inicio o donde sea necesario después del registro
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/logo_nofondo.png')} // Asegúrate de que este es el camino correcto para tu imagen
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
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        placeholder="Reescribir Contraseña:"
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  // Reutiliza los estilos que definiste para LoginScreen y ajusta lo que sea necesario
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    alignSelf: 'center',
    marginBottom: 30,
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
