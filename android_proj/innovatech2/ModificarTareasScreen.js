import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import projectData from './data.json'; // Importa los datos del proyecto

const ModificarTareasScreen = ({ route }) => {
  const { proyectoId } = route.params;
  const proyecto = projectData.find(p => p._id === proyectoId);
  const [tareas, setTareas] = useState(proyecto ? proyecto.tareas : []);

  const handleEliminarTarea = (index) => {
    // Eliminar tarea de la lista basado en el índice
    const nuevasTareas = [...tareas];
    nuevasTareas.splice(index, 1);
    setTareas(nuevasTareas);
  };

  const handleModificarTarea = (index) => {
    // Aquí podrías abrir un modal o navegar a otra pantalla con el formulario de edición de la tarea
    console.log('Modificar tarea', index);
  };

  const handleAgregarTarea = (index) => {
    // Aquí podrías abrir un modal o navegar a otra pantalla con el formulario de edición de la tarea
    console.log('Agregar tarea', index);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Modificar Tareas del Proyecto</Text>
      
      {tareas.map((tarea, index) => (
        <View key={index} style={styles.tareaContainer}>
          <Text>{tarea.nombreTarea} - SP: {tarea.storyPoints} - Estado: {tarea.estado} - Responsable: {tarea.responsable}</Text>
          <View style={styles.botonesContainer}>
            <TouchableOpacity style={[styles.boton, styles.botonModificar]} onPress={() => handleModificarTarea(index)}>
              <Text style={styles.botonTexto}>Modificar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.boton, styles.botonEliminar]} onPress={() => handleEliminarTarea(index)}>
              <Text style={styles.botonTexto}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.botonAgregar} onPress={handleAgregarTarea}>
        <Text style={styles.botonTexto}>Agregar Nueva Tarea</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tareaContainer: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  botonesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  boton: {
    padding: 10,
    borderRadius: 5,
  },
  botonModificar: {
    backgroundColor: '#4e9ec5', // Un color azul para el botón de modificar
  },
  botonEliminar: {
    backgroundColor: '#ff6347', // Un color rojo para el botón de eliminar
  },
  botonAgregar: {
    backgroundColor: '#4e9ec5',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  botonTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  // Agrega más estilos según sea necesario
});

export default ModificarTareasScreen;
