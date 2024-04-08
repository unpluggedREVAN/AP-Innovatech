import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Alert } from 'react-native';
import {getProyectosRequest, postForoRequest} from './api/auth'

const CrearPublicacionScreen = ({ navigation }) => {
  const [tema, setTema] = useState('');
  const [tipo, setTipo] = useState('');
  const [proyectos, setProyectos] = useState([]);
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);
 
  useEffect(() => {
    fecthForoData();
  }, [])

  const fecthForoData = async () => {
    const responseProyectos = await getProyectosRequest();
    setProyectos(responseProyectos)
  }

  const handleCrearPublicacion = async () => {
    console.log('Crear Publicación:', tema, tipo); // Log de control
    // Nota para Darío: Aquí va la lógica de guardar publicación
    const response = await postForoRequest({tipo : tipo, titulo : tema, proyecto : proyectoSeleccionado});
    console.log(response.data.message)
    Alert.alert(
        "Publicación Creada",
        response.data.message,
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(), // Vuelve atrás después de que el usuario toque "OK"
          }
        ]
      );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Crear Nueva Publicación</Text>
      <TextInput
        style={styles.input}
        value={tema}
        onChangeText={setTema}
        placeholder="Tema de la publicación"
      />
      <TextInput
        style={styles.input}
        value={tipo}
        onChangeText={setTipo}
        placeholder="Tipo de publicación (técnico, diseño, general...)"
      />
      <Text style={styles.label}>Proyecto Asociado:</Text>
      {proyectos.map((proyecto) => (
        <TouchableOpacity
        key={proyecto._id}
        style={[
          styles.proyectoContainer,
          proyectoSeleccionado === proyecto._id && styles.proyectoSeleccionado,
        ]}
        onPress={() => setProyectoSeleccionado(proyecto._id)}
        >
          <Text style={styles.proyectoTexto}>{proyecto.nombreProyecto}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.boton} onPress={handleCrearPublicacion}>
        <Text style={styles.botonTexto}>Crear Publicación</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  boton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop : 10,
  },
  proyectoContainer: {
    padding: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  proyectoSeleccionado: {
    backgroundColor: '#e0f7ff',
  },
  proyectoTexto: {
    fontSize: 16,
  },
  botonTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  
});

export default CrearPublicacionScreen;