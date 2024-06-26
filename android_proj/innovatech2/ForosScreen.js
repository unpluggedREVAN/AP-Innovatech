import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import {getForoRequest} from './api/auth'
import forosData from './data_foros.json'; 

const ForosScreen = ({ navigation }) => {
  const [publicaciones, setPublicaciones] = useState([]);

  // Simula la carga de publicaciones, este useEffect es importante para el backend
  useEffect(() => {
    fecthForoData()
  }, []);

  const fecthForoData = async () => {
    const response = await getForoRequest();
    setPublicaciones(response)
  }

  const handleAbrirPublicacion = (publicacion) => {
    navigation.navigate('PublicacionDetailsScreen', { publicacion });
  };

  const handleCrearPublicacion = () => {
    navigation.navigate('CrearPublicacion');
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
              onPress={() => handleAbrirPublicacion(publicacion)}
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