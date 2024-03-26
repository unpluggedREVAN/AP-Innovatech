import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation(); // Usa el hook aquí, así que no lo recibas como prop

  const handleLogin = () => {
    // Aquí puedes añadir la lógica para manejar el inicio de sesión
    console.log('Login con:', email, password);
    // Navegación después del inicio de sesión exitoso puede ir aquí
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

      <TouchableOpacity onPress={() => {/* Aquí manejas el olvido de contraseña */}}>
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