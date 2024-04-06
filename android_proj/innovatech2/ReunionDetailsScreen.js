import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const ReunionDetailsScreen = ({ route }) => {
  const { reunion } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tema: {reunion.tema}</Text>
      <Text style={styles.detail}>Fecha: {reunion.fecha}</Text>
      <Text style={styles.detail}>Medio: {reunion.medio}</Text>
      <Text style={styles.detail}>Colaboradores: {reunion.colaboradores.join(', ')}</Text>
      <Text style={styles.detail}>Proyecto: {reunion.proyecto}</Text>
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
});

export default ReunionDetailsScreen;