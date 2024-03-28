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
import Ionicons from 'react-native-vector-icons/Ionicons'; // Actualmente no se está usando este componente

const HomeScreen = () => {
  const navigation = useNavigation();
  const [proyectos, setProyectos] = useState([]); // Aquí se supone que el manejo de proyectos es un array de objetos

  useEffect(() => {
    // cargar los proyectos de la base de datos y establecerlos en el estado
    // fetchProjectsFromDatabase().then(setProyectos);
  }, []);

  // Función dummy para simular la navegación al crear un nuevo proyecto
  const handleCreateProject = () => {
    // Navegar a la pantalla de creación de nuevo proyecto, aquí se incluye la lógica pero por ahora solo está el log para depuración
    // navigation.navigate('CreateProject');
    console.log('Navegar a la pantalla de nuevo proyecto');
  };

  // Función dummy para simular la navegación al presionar opciones
  const handleOptionsPress = () => {
    // Navegar a las opciones del proyecto
    // navigation.navigate('ProjectOptions');
    console.log('Navegar a las opciones del proyecto');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/logo_letra_nofondo.png')}
        style={styles.logo}
      />
      <Text style={styles.header}>Proyectos disponibles</Text>
      <ScrollView style={styles.proyectosContainer}>
        {proyectos.map((proyecto, index) => (
          <View key={index} style={styles.proyectoCard}>
            {/* aquí se representa la información del proyecto */}
            <Text>Proyecto {index + 1}: {proyecto.nombre}</Text>
            {/* más detalles del proyecto */}
            <TouchableOpacity style={styles.optionsButton}>
              <Text>Opciones</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      
      <TouchableOpacity style={styles.button} onPress={handleCreateProject}>
        <Text style={styles.buttonText}>Crear Nuevo Proyecto</Text>
      </TouchableOpacity>

      {/* Añadir el componente de navegación inferior */}
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
