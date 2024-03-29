// ProjectDetailsScreen.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Alert } from 'react-native';
import projectData from './data.json';

const ProjectDetailsScreen = ({ route }) => {
  const { proyectoId } = route.params;

  // Buscar el proyecto específico usando el ID
  const proyecto = projectData.find(p => p._id === proyectoId);

  const handleEditTasks = () => {
    // Navega a la pantalla de edición de tareas
  };

  const handleDeleteProject = () => {
    Alert.alert(
      "Eliminar Proyecto",
      "¿Estás seguro de que deseas eliminar este proyecto?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", onPress: () => console.log('Eliminar proyecto') }, // Aquí la lógica de eliminación
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Asegúrate de que 'proyecto' no sea undefined antes de intentar acceder a sus propiedades */}
      {proyecto ? (
        <>
          <Text style={styles.title}>{proyecto.nombreProyecto}</Text>
          <Text style={styles.infoLabel}>Descripción:</Text>
          <Text style={styles.info}>{proyecto.descripcion}</Text>
          
          {/* Repite la estructura para los demás campos */}
          <Text style={styles.infoLabel}>Presupuesto:</Text>
          <Text style={styles.info}>${proyecto.presupuesto}</Text>

          <Text style={styles.infoLabel}>Estado del Proyecto:</Text>
          <Text style={styles.info}>{proyecto.estadoProyecto}</Text>

          <Text style={styles.infoLabel}>Fecha de Inicio:</Text>
          <Text style={styles.info}>{proyecto.fechaInicio}</Text>
        </>
      ) : (
        <Text style={styles.info}>Proyecto no encontrado.</Text>
      )}

      <TouchableOpacity onPress={handleEditTasks} style={styles.button}>
        <Text style={styles.buttonText}>Modificar Tareas</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDeleteProject} style={[styles.button, styles.deleteButton]}>
        <Text style={styles.buttonText}>Eliminar Proyecto</Text>
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
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#4e9ec5',
    alignItems: 'center',
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#ff6347', // Color rojo para el botón de eliminar
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  // ...otros estilos que necesites
});

export default ProjectDetailsScreen;
