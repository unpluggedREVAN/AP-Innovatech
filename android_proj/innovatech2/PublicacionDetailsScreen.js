import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const PublicacionDetailsScreen = ({ route, navigation }) => {
  const { publicacion } = route.params;

  const handleCrearMensaje = () => {
    console.log('Botón Crear Mensaje presionado');
    // Aquí puedes agregar la lógica para navegar a la pantalla de creación de mensaje o cualquier otra funcionalidad deseada.
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tema: {publicacion.titulo}</Text>
      <Text style={styles.detail}>Tipo: {publicacion.tipo}</Text>
      <Text style={styles.detail}>Mensajes:</Text>
      {Array.isArray(publicacion.mensajes) && publicacion.mensajes.map((mensaje, index) => (
        <Text key={index} style={styles.mensaje}>
          {mensaje.contenido} - {mensaje.autor}
        </Text>
      ))}
      <TouchableOpacity
        style={styles.crearMensajeButton}
        onPress={() => navigation.navigate('CrearMensajePublicacion')}
      >
        <Text style={styles.crearMensajeButtonText}>Crear Mensaje</Text>
      </TouchableOpacity>

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
  botonCrearMensaje: {
    backgroundColor: '#4e9ec5',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  botonCrearMensajeTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  crearMensajeButton: {
    backgroundColor: '#4CAF50', // O cualquier otro color que prefieras
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  crearMensajeButtonText: {
    color: '#FFFFFF', // Color del texto
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PublicacionDetailsScreen;