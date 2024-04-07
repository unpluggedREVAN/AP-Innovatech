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
//import { View, Button } from 'react-native';
import projectData from './data.json';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [proyectos, setProyectos] = useState([]); // Estado para manejar los proyectos

  // cargar los proyectos de la base de datos simulada (archivo JSON)
  useEffect(() => {
    // Simula la carga de proyectos desde una base de datos estableciendo el estado
    // aquí se haría una llamada a la API
    setProyectos(projectData);
  }, []);

  const handleCreateProject = () => {
    navigation.navigate('CrearProyecto');
  };

  const handleOptionsPress = (proyectoId) => {
    navigation.navigate('ProjectDetails', { proyectoId });
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
            <Text style={styles.proyectoTitle}>Proyecto {proyecto._id}: {proyecto.nombreProyecto}</Text>
            <Text style={styles.proyectoContent}>{proyecto.descripcion}</Text>
            {/* Más detalles del proyecto */}
            <TouchableOpacity
              style={styles.optionsButton}
              onPress={() => handleOptionsPress(proyecto._id)}
            >
              <Text style={styles.optionsButtonText}>Gestionar proyecto</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      
      <TouchableOpacity style={styles.button} onPress={handleCreateProject}>
        <Text style={styles.buttonText}>Crear Nuevo Proyecto</Text>
      </TouchableOpacity>

      {/* Aquí iría el componente de navegación inferior, pero solo si se ocupa */}
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
    shadowOffset: { width: 0, height: 2 }, // Posición sombra
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
  backgroundColor: '#ffffff', 
  borderRadius: 10,
  padding: 20, 
  marginVertical: 8, 
  marginHorizontal: 16, 
  shadowColor: '#000', 
  shadowOffset: {
    width: 0,
    height: 2, 
  },
  shadowOpacity: 0.23, 
  shadowRadius: 2.62, 
  elevation: 4, 
},

proyectoTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 5, 
},

// Estilos para el contenido de la tarjeta (descripción, estado, etc.)
proyectoContent: {
  fontSize: 14,
  color: '#666', // Color gris para el texto que no es el título
  marginBottom: 5, 
},

optionsButton: {
  backgroundColor: '#4e9ec5', 
  padding: 10,
  borderRadius: 5, 
  marginTop: 10, 
  alignItems: 'center', 
},

optionsButtonText: {
  color: '#fff', 
  fontWeight: 'bold',
},

});

export default HomeScreen;
