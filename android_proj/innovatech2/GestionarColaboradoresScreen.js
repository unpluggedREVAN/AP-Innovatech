import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import colaboradoresData from './colab_data.json'; // Datos de colaboradores
import projectData from './data.json'; // Datos de proyectos
import {colaboradoresFreeRequest,getProyectRequest,patchProjectRequest,patchColabRequest} from './api/auth.js'


const GestionarColaboradoresScreen = ({ route }) => {
  const { proyectoId } = route.params;

  //Lista de los colaboradores disponibles
  const [colaboradoresLibres, setColaboradores] = useState([]);
  const [colaboradoresActuales, setColabActuales] = useState([])
  const [proyecto, setProyecto] = useState({});


  useEffect(() =>{
    colabFecthData();
  }, []);

  const colabFecthData = async () => {
    const responseColab = await colaboradoresFreeRequest();
    const responseProject = await getProyectRequest(proyectoId)
    setColaboradores(responseColab);
    setColabActuales(responseProject.colaboradores);
    setProyecto(responseProject);
    console.log("ColabActuales:", responseProject.colaboradores);
  }

  // Estado para manejar los colaboradores seleccionados
  // Inicialmente se marcan los colaboradores que ya están asignados al proyecto
 

  // Función para manejar la selección/deselección de colaboradores
  const toggleColaborador = (id) => {
    const esSeleccionado = colaboradoresActuales.includes(id);
    setColabActuales(prev => 
      esSeleccionado ? prev.filter(colabId => colabId !== id) : [...prev, id]
    );
  };

  // Función para manejar el guardado de cambios
  const handleGuardarCambios = async () => {
    await patchProjectRequest(proyectoId, {colaboradores : colaboradoresActuales});
    console.log('Colaboradores seleccionados para el proyecto:', colaboradoresActuales);
    // Aquí se implementaría la lógica para actualizar la asignación de colaboradores en el backend
    colaboradoresActuales.forEach(async function(id) {
      await patchColabRequest(id, {estado : "Ocupado"})
      console.log("Cambio el estado de:", id);
    })
  };

  if (!proyecto) {
    return <Text>Proyecto no encontrado.</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Editar Colaboradores:</Text>
      <Text style={styles.nota}>Nota: Debes seleccionar de nuevo los colaboradores que quieres asignar al proyecto.</Text>

      {colaboradoresLibres.map((colaborador) => (
        <TouchableOpacity
          key={colaborador._id}
          style={[
            styles.colaboradorContainer,
            colaboradoresActuales.includes(colaborador._id) && styles.colaboradorSeleccionado,
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
