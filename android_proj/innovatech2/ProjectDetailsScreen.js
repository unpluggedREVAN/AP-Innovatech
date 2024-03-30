import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Alert } from 'react-native';
import projectData from './data.json';

const ProjectDetailsScreen = ({ route }) => {
  const { proyectoId } = route.params;

  // Nota para Darío: Mae vea aquí está usando el id del proyecto para encontrar toda la info en el json local, use la misma técnica cuando ya lo pegue con Mongo
  // Buscar el proyecto específico usando el ID
  const proyecto = projectData.find(p => p._id === proyectoId);

  // Organizar las tareas por estado
  const tareasPorHacer = proyecto?.tareas.filter(t => t.estado === 'por hacer') || [];
  const tareasEnCurso = proyecto?.tareas.filter(t => t.estado === 'en curso') || [];
  const tareasFinalizadas = proyecto?.tareas.filter(t => t.estado === 'finalizada') || [];
  
  const handleEditTasks = () => {
    // Navega a la pantalla de edición de tareas
  };

  const handleDeleteProject = () => {
    Alert.alert(
      "Eliminar Proyecto",
      "¿Estás seguro de que deseas eliminar este proyecto?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", onPress: () => console.log('Eliminar proyecto') }, // Aquí la lógica de eliminación, agregarla cuando ya esté el API
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
    {/* Se verifica que el proyecto no sea undefined */}
    {proyecto ? (
        <>
        <Text style={styles.title}>{proyecto.nombreProyecto}</Text>
        <Text style={styles.infoLabel}>Descripción:</Text>
        <Text style={styles.info}>{proyecto.descripcion}</Text>

        <Text style={styles.infoLabel}>Recursos Necesarios:</Text>
        {/* Se convierte la lista de recursos en una cadena de texto, así es como se guarda en la creación de proyectos */}
        <Text style={styles.info}>{proyecto.recursosNecesarios.join(', ')}</Text>

        <Text style={styles.infoLabel}>Colaboradores:</Text>
        {/* Aquí uso el id del colaborador porque lo estoy haciendo con el json, pero debe ser con el nombre */}
        <Text style={styles.info}>{proyecto.colaboradores.join(', ')}</Text>

        <Text style={styles.infoLabel}>Responsable:</Text>
        {/* Igual aquí, muestro el id pero debe ser el nombre */}
        <Text style={styles.info}>{proyecto.responsable}</Text>
        
        {/* Repite la estructura para los demás campos */}
        <Text style={styles.infoLabel}>Presupuesto:</Text>
        <Text style={styles.info}>${proyecto.presupuesto}</Text>

        <Text style={styles.infoLabel}>Estado del Proyecto:</Text>
        <Text style={styles.info}>{proyecto.estadoProyecto}</Text>

        <Text style={styles.infoLabel}>Fecha de Inicio:</Text>
        <Text style={styles.info}>{proyecto.fechaInicio}</Text>

        {/* Tareas por estado */}
        <Text style={styles.sectionTitle}>Tareas por hacer</Text>
        {tareasPorHacer.map((tarea, index) => (
            <Text key={index} style={styles.tareaInfo}>
            {tarea.nombreTarea} - {tarea.storyPoints} SP - {tarea.responsable}
            </Text>
        ))}

        <Text style={styles.sectionTitle}>Tareas en curso</Text>
        {tareasEnCurso.map((tarea, index) => (
            <Text key={index} style={styles.tareaInfo}>
            {tarea.nombreTarea} - {tarea.storyPoints} SP - {tarea.responsable}
            </Text>
        ))}

        <Text style={styles.sectionTitle}>Tareas finalizadas</Text>
        {tareasFinalizadas.map((tarea, index) => (
            <Text key={index} style={styles.tareaInfo}>
            {tarea.nombreTarea} - {tarea.storyPoints} SP - {tarea.responsable}
            </Text>
        ))}
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
  },
  tareaInfo: {
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 5,
  },
  // poner más estilos aquí
});

export default ProjectDetailsScreen;
