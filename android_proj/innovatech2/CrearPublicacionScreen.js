import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Alert } from 'react-native';

const CrearPublicacionScreen = ({ navigation }) => {
  const [tema, setTema] = useState('');
  const [tipo, setTipo] = useState('');

  const handleCrearPublicacion = () => {
    console.log('Crear Publicación:', tema, tipo); // Log de control
    // Nota para Darío: Aquí va la lógica de guardar publicación

    Alert.alert(
        "Publicación Creada",
        "La publicación fue creada correctamente.",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(), // Navega de vuelta solo después de que el usuario toque "OK"
          }
        ]
      );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Crear Nueva Publicación</Text>
      <TextInput
        style={styles.input}
        value={tema}
        onChangeText={setTema}
        placeholder="Tema de la publicación"
      />
      <TextInput
        style={styles.input}
        value={tipo}
        onChangeText={setTipo}
        placeholder="Tipo de publicación (técnico, diseño, general...)"
      />
      <TouchableOpacity style={styles.boton} onPress={handleCrearPublicacion}>
        <Text style={styles.botonTexto}>Crear Publicación</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  boton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  botonTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CrearPublicacionScreen;