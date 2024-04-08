import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import projectData from './data.json'; // Importa los datos del proyecto

const CrearReunionScreen = () => {
  const [tema, setTema] = useState('');
  const [medio, setMedio] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleGuardarReunion = () => {
    // Aquí implementarías la lógica para guardar la reunión, probablemente enviando los datos a un backend o almacenándolos localmente
    Alert.alert('Reunión Guardada', `Tema: ${tema}, Medio: ${medio}, Fecha: ${fecha}, Proyecto: ${proyectoSeleccionado}`);
  };

  const onChangeFecha = (event, selectedDate) => {
    const currentDate = selectedDate || fecha;
    setShowDatePicker(false);
    setFecha(currentDate);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Tema de la Reunión:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTema}
        value={tema}
        placeholder="Ingresa el tema de la reunión"
      />

      <Text style={styles.label}>Medio de Comunicación:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setMedio}
        value={medio}
        placeholder="Ejemplo: Zoom, Google Meet, etc."
      />

      <Text style={styles.label}>Fecha de la Reunión:</Text>
      <TouchableOpacity style={styles.datePickerButton} onPress={() => setShowDatePicker(true)}>
        <Text>{fecha.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={fecha}
          mode="date"
          display="default"
          onChange={onChangeFecha}
        />
      )}

      <Text style={styles.label}>Proyecto Asociado:</Text>
      {projectData.map((proyecto) => (
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

      <TouchableOpacity style={styles.botonGuardar} onPress={handleGuardarReunion}>
        <Text style={styles.botonTexto}>Guardar Reunión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  datePickerButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    alignItems: 'center',
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
  botonGuardar: {
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
  // Más estilos según sea necesario...
});

export default CrearReunionScreen;