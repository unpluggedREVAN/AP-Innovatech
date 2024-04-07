import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation(); // Se usa el hook aquí, para no recibirlo como prop

  const handleLogin = () => {
    // Aquì se incluye la lógica de conexión con la base de datos
    console.log('Login con:', email, password); // Esto es solo para depuración en consola

    // Validación de prueba para entrar rápido
    if (email === 'admin' && password === 'admin') {
        // Si las credenciales son correctas, navegar a la pantalla Home
        navigation.navigate('Main');
      } else {
        alert('Usuario o contraseña incorrectos');
    } // Este caso es solo de prueba pero aquí se debe incluir el manejo de logiin con la base de datos
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>InnovaTech</Text>
      <Text style={styles.header}>Plataforma de Gestión de Proyectos</Text>

      <Image
        source={require('./assets/logo_nofondo.png')}
        style={styles.logo}
      />

      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Correo:"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Contraseña:"
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {/* Manejar olvido de contraseña */}}>
        <Text style={styles.linkText}>¿Olvidé mi contraseña?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>¿No tenés cuenta? Regístrate aquí</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4e9ec5',
    alignSelf: 'center',
    margin: 10,
  },
  header: {
    fontSize: 18,
    color: '#333',
    alignSelf: 'center',
    marginBottom: 20,
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
  logo: {
    width: 200, 
    height: 200, 
    resizeMode: 'contain', 
    alignSelf: 'center', 
    marginTop: 30, 
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  linkText: {
    color: '#4e9ec5',
    alignSelf: 'center',
    marginTop: 15,
  },
});

export default LoginScreen;