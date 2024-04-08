import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const ColaboradorDetailsScreen = ({ route }) => { // Los datos vienen como parámetros
  const { colaborador } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{colaborador.nombreCompleto}</Text>
      <Text style={styles.detail}>Cédula: {colaborador.cedula}</Text>
      <Text style={styles.detail}>Correo: {colaborador.correoElectronico}</Text>
      <Text style={styles.detail}>Departamento: {colaborador.departamentoTrabajo}</Text>
      <Text style={styles.detail}>Teléfono: {colaborador.telefono}</Text>
      <Text style={styles.detail}>Estado: {colaborador.estado}</Text>
      <Text style={styles.detail}>Proyecto Actual: {colaborador.proyectoActual || 'Ninguno'}</Text>
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
  // Agrega más estilos según sea necesario
});

export default ColaboradorDetailsScreen;
