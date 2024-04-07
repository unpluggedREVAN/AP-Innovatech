import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const PublicacionDetailsScreen = ({ route }) => {
  const { publicacion } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tema: {publicacion.titulo}</Text>
      <Text style={styles.detail}>Tipo: {publicacion.tipo}</Text>
      <Text style={styles.detail}>Mensajes:</Text>
      {/* Comprobamos que publicacion.mensajes es un array antes de mapearlo */}
      {Array.isArray(publicacion.mensajes) && publicacion.mensajes.map((mensaje, index) => (
        <Text key={index} style={styles.mensaje}>
          {mensaje.contenido} - {mensaje.autor}
        </Text>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detail: {
    fontSize: 18,
    marginBottom: 5,
  },
  mensaje: {
    fontSize: 16,
    marginBottom: 5,
    paddingLeft: 10,
  },
});

export default PublicacionDetailsScreen;
