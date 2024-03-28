import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Importa los datos de los proyectos desde el archivo JSON
import projectData from './data.json'; // Asegúrate de que la ruta sea correcta

const HomeScreen = () => {
  const navigation = useNavigation();
  const [proyectos, setProyectos] = useState([]); // Estado para manejar los proyectos

  // Efecto para cargar los proyectos de la base de datos simulada (archivo JSON)
  useEffect(() => {
    // Simula la carga de proyectos desde una base de datos estableciendo el estado
    // En un escenario real, aquí se haría una llamada a la API
    setProyectos(projectData);
  }, []);

  // Funciones de ejemplo para navegación y manejo de opciones
  const handleCreateProject = () => {
    console.log('Navegar a la pantalla de nuevo proyecto');
  };

  const handleOptionsPress = (id) => {
    console.log('Navegar a las opciones del proyecto con ID:', id);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/logo_letra_nofondo.png')}
        style={styles.logo}
      />
      <Text style={styles.header}>Proyectos disponibles</Text>
      <ScrollView style={styles.proyectosContainer}>
        {proyectos.map((proyecto) => (
          <View key={proyecto._id} style={styles.proyectoCard}>
            <Text>Proyecto {proyecto._id}: {proyecto.nombreProyecto}</Text>
            {/* Aquí puedes agregar más detalles del proyecto */}
            <TouchableOpacity
              style={styles.optionsButton}
              onPress={() => handleOptionsPress(proyecto._id)}
            >
              <Text>Opciones</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      
      <TouchableOpacity style={styles.button} onPress={handleCreateProject}>
        <Text style={styles.buttonText}>Crear Nuevo Proyecto</Text>
      </TouchableOpacity>

      {/* Aquí iría el componente de navegación inferior si es necesario */}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    paddingVertical: 20, 
    borderTopWidth: 1, 
    borderColor: '#ccc', 
    backgroundColor: '#fff', 
  },
  nuevoProyectoButton: {
    backgroundColor: '#4e9ec5', 
    paddingVertical: 10,       
    paddingHorizontal: 20,     
    borderRadius: 20,          // Bordes redondeados
    justifyContent: 'center',  
    alignItems: 'center',      
    alignSelf: 'center',       
    elevation: 2,              
    shadowColor: '#000',       // Sombra color negro
    shadowOffset: { width: 0, height: 2 }, // Posición de la sombra
    shadowOpacity: 0.25,       
    shadowRadius: 3.84,        
    marginTop: 20,             
  },
  nuevoProyectoText: {
    color: '#fff', 
    fontWeight: 'bold', 
    textAlign: 'center',
    fontsize: 16,
  },
  container: {
    flex: 1,
    paddingTop: 20, // Ajustar
  },
  logo: {
    width: 100, 
    height: 50, // Ajustar el tamaño 
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 20,
    alignSelf: 'center',
  },
  proyectosContainer: {
    flex: 1,
  },
  button: {
    backgroundColor: '#4e9ec5',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    margin: 12,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  proyectoCard: {
    // para las tarjetas de cada proyecto
  },
  optionsButton: {
    // para el botón de opciones
  },
  nuevoProyectoButton: {
    // para el botón de crear nuevo proyecto
  },
  nuevoProyectoText: {
    // para el texto del botón de nuevo proyecto
  },
  // Añadir los estilos para el tab navigator
});

export default HomeScreen;
