import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import colaboradoresData from './colab_data.json'; // Datos de colaboradores
import projectData from './data.json'; // Datos de proyectos

const GestionarColaboradoresScreen = ({ route }) => {
  const { proyectoId } = route.params;
  const proyecto = projectData.find((p) => p._id === proyectoId); // Encuentra el proyecto por ID

  // Estado para manejar los colaboradores seleccionados
  // Inicialmente se marcan los colaboradores que ya están asignados al proyecto
  const [colaboradoresSeleccionados, setColaboradoresSeleccionados] = useState(proyecto ? proyecto.colaboradores : []);

  // Función para manejar la selección/deselección de colaboradores
  const toggleColaborador = (id) => {
    const esSeleccionado = colaboradoresSeleccionados.includes(id);
    setColaboradoresSeleccionados(prev => 
      esSeleccionado ? prev.filter(colabId => colabId !== id) : [...prev, id]
    );
  };

  // Función para manejar el guardado de cambios
  const handleGuardarCambios = () => {
    console.log('Colaboradores seleccionados para el proyecto:', colaboradoresSeleccionados);
    // Aquí se implementaría la lógica para actualizar la asignación de colaboradores en el backend
  };

  if (!proyecto) {
    return <Text>Proyecto no encontrado.</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Editar Colaboradores:</Text>
      <Text style={styles.nota}>Nota: Debes seleccionar de nuevo los colaboradores que quieres asignar al proyecto.</Text>

      {colaboradoresData.map((colaborador) => (
        <TouchableOpacity
          key={colaborador._id}
          style={[
            styles.colaboradorContainer,
            colaboradoresSeleccionados.includes(colaborador._id) && styles.colaboradorSeleccionado,
          ]}
          onPress={() => toggleColaborador(colaborador._id)}
        >
          <Text style={styles.colaboradorTexto}>{colaborador.nombreCompleto} - {colaborador.departamentoTrabajo}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.botonGuardar} onPress={handleGuardarCambios}>
        <Text style={styles.botonGuardarTexto}>Guardar Cambios</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Aquí puedes definir o ajustar tus estilos según sea necesario
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  nota: {
    fontSize: 16,
    marginBottom: 20,
    fontStyle: 'italic',
  },
  colaboradorContainer: {
    padding: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  colaboradorSeleccionado: {
    backgroundColor: '#e0f7ff',
  },
  colaboradorTexto: {
    fontSize: 16,
  },
  botonGuardar: {
    backgroundColor: '#4e9ec5',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  botonGuardarTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default GestionarColaboradoresScreen;
