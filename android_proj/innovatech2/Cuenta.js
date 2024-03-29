// Cuenta.js

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import colabData from './colab_data.json'; // Asegúrate de que la ruta sea correcta

const CuentaScreen = () => {
  // Encuentra a Ana Martínez en los datos importados
  const anaMartinez = colabData.find(colab => colab.nombreCompleto === "Ana Martínez");

  // Estado para el formulario de edición
  const [colaborador, setColaborador] = useState(anaMartinez);

  // Actualiza el estado con los cambios en los campos del formulario
  const handleInputChange = (name, value) => {
    setColaborador(prevState => ({ ...prevState, [name]: value }));
  };

  // Función para manejar la "edición" del colaborador
  const handleSaveChanges = () => {
    console.log('Guardar cambios', colaborador);
    // Aquí se enviarían los cambios a la base de datos o backend
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Perfil del Colaborador</Text>
      
      <TextInput
        style={styles.input}
        value={colaborador.nombreCompleto}
        onChangeText={(text) => handleInputChange('nombreCompleto', text)}
        placeholder="Nombre Completo"
      />
      {/* Repite el TextInput para cada campo que deseas poder editar */}
      <TextInput
        style={styles.input}
        value={colaborador.cedula}
        onChangeText={(text) => handleInputChange('cedula', text)}
        placeholder="Cédula"
        keyboardType="numeric"
      />
      {/* Agrega más campos de edición según sea necesario */}
      {/* ... */}

      <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
        <Text style={styles.buttonText}>Guardar Cambios</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#4e9ec5',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  // Puedes agregar más estilos para otros elementos si es necesario
});

export default CuentaScreen;