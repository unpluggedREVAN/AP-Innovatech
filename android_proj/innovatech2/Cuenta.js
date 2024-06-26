import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Alert } from 'react-native';
import { colabRequest,logoutResquest,patchColabRequest } from './api/auth.js'

const CuentaScreen = () => {

  // Este usuario está anidado para fines de prueba
  //const anaMartinez = colabData.find(colab => colab.nombreCompleto === "Ana Martínez");

  // Hay que cambiarlo por los datos de la bd mongo
  const [colaborador, setColaborador] = useState({});

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const response = await colabRequest();
    setColaborador(response);
  }

  // Actualizar con cambios del formulario
  const handleInputChange = (name, value) => {
    setColaborador(prevState => ({ ...prevState, [name]: value }));
  };

  const handleLogOut = async () => {
    try {
      await logoutResquest();

      //navigation.navigate('Login');

      Alert.alert('Sesión cerrada', 'Has cerrado sesión correctamente.');
    } catch (error) {
      // Aquí para manejo de errores
      Alert.alert('Error', 'Ocurrió un error al cerrar sesión. Por favor, intenta nuevamente.');
    }
  };

  // edición del colaborador
  const handleSaveChanges = async () => {
    console.log('Guardar cambios', colaborador);
    // Aquí se envían los cambios hechos a la base de datos
    await patchColabRequest(colaborador.idUser, colaborador);
    // Mostrar una alerta al usuario
    Alert.alert(
      "Cambio realizado", // Título de la alerta
      "Cambio realizado correctamente", // Mensaje de la alerta
      [
        { text: "OK" } // Botón para cerrar la alerta
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Información de la cuenta</Text>
      
      {/* Campos editables */}
      <Text style={styles.label}>Nombre:</Text>
      <TextInput
        style={styles.input}
        value={colaborador.nombreCompleto}
        onChangeText={(text) => handleInputChange('nombreCompleto', text)}
        placeholder="Nombre Completo"
      />
      <Text style={styles.label}>Cédula:</Text>
      <TextInput
        style={styles.input}
        value={colaborador.cedula}
        onChangeText={(text) => handleInputChange('cedula', text)}
        placeholder="Cédula"
        keyboardType="numeric"
      />
      <Text style={styles.label}>Correo electrónico:</Text>
      <TextInput
        style={styles.input}
        value={colaborador.correoElectronico}
        onChangeText={(text) => handleInputChange('correoElectronico', text)}
        placeholder="Correo Electrónico"
        keyboardType="email-address"
      />
      <Text style={styles.label}>Departamento:</Text>
      <TextInput
        style={styles.input}
        value={colaborador.departamentoTrabajo}
        onChangeText={(text) => handleInputChange('departamentoTrabajo', text)}
        placeholder="Departamento de Trabajo"
      />
      <Text style={styles.label}>Teléfono:</Text>
      <TextInput
        style={styles.input}
        value={colaborador.telefono}
        onChangeText={(text) => handleInputChange('telefono', text)}
        placeholder="Teléfono"
        keyboardType="phone-pad"
      />
      
      {/* Campos no editables */}
      <Text style={styles.label}>Estado:</Text>
      <TextInput
        style={styles.input}
        value={colaborador.estado}
        onChangeText={(text) => handleInputChange('estado', text)}
        placeholder="Estado"
      />

      <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
        <Text style={styles.buttonText}>Guardar Cambios</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogOut}>
        <Text style={styles.buttonText}>Cerrar sesión</Text>
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
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  nonEditableInput: {
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 5,
    backgroundColor: '#e7e7e7', // Un fondo gris para indicar que no se puede editar
    color: '#333', // Color de texto oscuro
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#4e9ec5',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CuentaScreen;