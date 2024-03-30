import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import colaboradoresData from './colab_data.json'; // Asegúrate de que la ruta sea correcta

const GestionarColaboradoresScreen = ({ route }) => {
  const { proyectoId } = route.params;
  const proyecto = colaboradoresData.find((p) => p._id === proyectoId); // Encuentra el proyecto por ID
  const [colaboradoresSeleccionados, setColaboradoresSeleccionados] = useState(proyecto.colaboradores);

  if (!proyecto) {
    // Manejo del caso en que el proyecto no se encuentre
    return <Text>Proyecto no encontrado.</Text>;
  }

  const toggleColaborador = (id) => {
    setColaboradoresSeleccionados((prevSeleccionados) =>
      prevSeleccionados.includes(id) ? prevSeleccionados.filter((colaboradorId) => colaboradorId !== id) : [...prevSeleccionados, id]
    );
  }; 

  const handleGuardarCambios = () => {
    // Aquí iría la lógica para guardar los cambios en el backend
    console.log('Guardar cambios de colaboradores:', colaboradoresSeleccionados);
    // Por ahora, solo mostramos un log
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Editar Colaboradores:</Text>

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

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
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
  // Agrega más estilos según sea necesario
});

export default GestionarColaboradoresScreen;
