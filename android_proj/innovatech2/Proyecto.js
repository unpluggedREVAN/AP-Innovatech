import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import dataReuniones from './data_reuniones.json';

const ProyectoScreen = () => {
  const navigation = useNavigation();
  const [reuniones, setReuniones] = useState([]);

  useEffect(() => {
    setReuniones(dataReuniones);
  }, []);

  const handleDetallesReunion = (reunionId) => {
    console.log('Ir a los detalles de la reunión:', reunionId);
    // Aquí puedes agregar la lógica para navegar a los detalles de la reunión
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Reuniones disponibles</Text>
      <ScrollView style={styles.reunionesContainer}>
        {reuniones.map((reunion) => (
          <View key={reunion._id} style={styles.reunionCard}>
            <Text style={styles.reunionTitle}>Tema: {reunion.tema}</Text>
            <Text style={styles.reunionContent}>Fecha: {reunion.fecha}</Text>
            <Text style={styles.reunionContent}>Medio: {reunion.medio}</Text>
            <TouchableOpacity
              style={styles.optionsButton}
              onPress={() => handleDetallesReunion(reunion._id)}
            >
              <Text style={styles.optionsButtonText}>Detalles de la reunión</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.button} onPress={() => console.log('Crear nueva reunión')}>
        <Text style={styles.buttonText}>Crear nueva reunión</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => console.log('Ir al foro')}>
        <Text style={styles.buttonText}>Ir al foro</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    alignSelf: 'center',
    marginBottom: 20,
  },
  reunionesContainer: {
    flex: 1,
  },
  reunionCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    padding: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  reunionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  reunionContent: {
    fontSize: 16,
    marginTop: 5,
  },
  optionsButton: {
    marginTop: 10,
    backgroundColor: '#4e9ec5',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  optionsButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#4e9ec5',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProyectoScreen;