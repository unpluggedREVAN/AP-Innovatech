import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import forosData from './data_foros.json'; // Asegúrate de que la ruta al archivo JSON sea correcta

const ForosScreen = ({ navigation }) => {
  const [publicaciones, setPublicaciones] = useState([]);

  // Simula la carga de publicaciones desde una base de datos o API al montar el componente
  useEffect(() => {
    setPublicaciones(forosData);
  }, []);

  const handleAbrirPublicacion = (publicacionId) => {
    console.log('Abrir publicación:', publicacionId);
    // Aquí puedes agregar la lógica para navegar a los detalles de la publicación
  };

  const handleCrearPublicacion = () => {
    console.log('Navegar a la pantalla de crear nueva publicación');
    // Aquí puedes agregar la lógica para navegar a la pantalla de creación de publicación
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Publicaciones</Text>
      <ScrollView style={styles.publicacionesContainer}>
        {publicaciones.map((publicacion) => (
          <View key={publicacion._id} style={styles.publicacionCard}>
            <Text style={styles.publicacionTitle}>{publicacion.titulo}</Text>
            <Text style={styles.publicacionTipo}>Tipo: {publicacion.tipo}</Text>
            <TouchableOpacity
              style={styles.abrirButton}
              onPress={() => handleAbrirPublicacion(publicacion._id)}
            >
              <Text style={styles.buttonText}>Abrir publicación</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.crearButton} onPress={handleCrearPublicacion}>
        <Text style={styles.buttonText}>Crear Publicación</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  publicacionesContainer: {
    marginBottom: 20,
  },
  publicacionCard: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  publicacionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  publicacionTipo: {
    fontSize: 16,
    marginBottom: 10,
  },
  abrirButton: {
    backgroundColor: '#4e9ec5',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  crearButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ForosScreen;