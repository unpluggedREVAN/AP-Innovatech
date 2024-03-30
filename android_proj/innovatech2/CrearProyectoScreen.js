import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import colaboradoresData from './colab_data.json'; // Asegúrate de que la ruta al archivo JSON sea correcta
import {postProyectoRequest, colaboradoresFreeRequest, patchColabRequest} from './api/auth.js'

const CrearProyectoScreen = () => {
  //Colaboradores disponibles
  const [colaboradoreDisponibles, setColaboradores] = useState([]);

  useEffect(() => {
    colabFetchData();
  }, []);

  const colabFetchData = async () => {
    const response = await colaboradoresFreeRequest();
    setColaboradores(response);
  }

  const [nombreProyecto, setNombreProyecto] = useState('');
  const [recursosNecesarios, setRecursosNecesarios] = useState('');
  const [presupuesto, setPresupuesto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [colaboradoresSeleccionados, setColaboradoresSeleccionados] = useState([]);

  const handleCrearProyecto = async () => {
    const presupuestoParse = parseInt(presupuesto);
    const data = {
        nombreProyecto : nombreProyecto,
        recursosNecesarios : recursosNecesarios,
        presupuesto : presupuestoParse,
        descripcion : descripcion,
        fechaInicio : fechaInicio,
        colaboradores : colaboradoresSeleccionados
    }
    console.log('Crear proyecto con los siguientes datos:', { nombreProyecto, recursosNecesarios,presupuestoParse, descripcion, fechaInicio, colaboradoresSeleccionados });
    const response = await postProyectoRequest(data);
    colaboradoresSeleccionados.forEach(async function(id) {
      await patchColabRequest(id, {estado : "Ocupado"})
      console.log("Cambio el estado de:", id);
    })
    console.log("Respuesta a peticion:", response.data.message)
  };

  const toggleColaborador = (id) => { // Nota para Darío: Aquí es donde se hace lo del listado de colaboradores para seleccionar
    setColaboradoresSeleccionados((prevSeleccionados) =>
      prevSeleccionados.includes(id)
        ? prevSeleccionados.filter((colaboradorId) => colaboradorId !== id) // Ve aquí lo que paso es el id de los colaboradores seleccionados
        : [...prevSeleccionados, id]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Nombre del Proyecto:</Text>
      <TextInput style={styles.input} value={nombreProyecto} onChangeText={setNombreProyecto} placeholder="Ingresa el nombre del proyecto" />

      <Text style={styles.label}>Recursos Necesarios:</Text>
      <TextInput style={styles.input} value={recursosNecesarios} onChangeText={setRecursosNecesarios} placeholder="Ej: Servidores, licencias" />

      <Text style={styles.label}>Presupuesto:</Text>
      <TextInput style={styles.input} value={presupuesto} onChangeText={setPresupuesto} placeholder="Ej: 15000" keyboardType="numeric" />

      <Text style={styles.label}>Descripción:</Text>
      <TextInput style={styles.input} value={descripcion} onChangeText={setDescripcion} placeholder="Descripción del proyecto" multiline />

      <Text style={styles.label}>Fecha de Inicio:</Text>
      <TextInput style={styles.input} value={fechaInicio} onChangeText={setFechaInicio} placeholder="YYYY-MM-DD" />

      <Text style={styles.labelTareas}>Tareas: Las tareas se asignan desde las opciones de gestión de proyecto</Text>

      <Text style={styles.label}>Colaboradores:</Text>
      {colaboradoreDisponibles.map((colaborador) => (
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

      <TouchableOpacity style={styles.botonCrear} onPress={handleCrearProyecto}>
        <Text style={styles.botonCrearTexto}>Crear Proyecto</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
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
  botonCrear: {
    backgroundColor: '#4e9ec5',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  botonCrearTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  labelTareas: {
    fontSize: 16,
    fontWeight: 'bold', // Negrita
    marginBottom: 15, 
    marginTop: 5, 
  },
  // Agrega más estilos según sea necesario
});

export default CrearProyectoScreen;
