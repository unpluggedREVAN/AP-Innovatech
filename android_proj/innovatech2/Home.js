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
import { getProyectosRequest } from './api/auth.js'
//import { View, Button } from 'react-native';

// Importa los datos de los proyectos desde el archivo JSON
import projectData from './data.json';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [proyectos, setProyectos] = useState([]); // Estado para manejar los proyectos

  // Efecto para cargar los proyectos de la base de datos simulada (archivo JSON)
  useEffect(() => {
    useFetchData();
  }, []);

  const useFetchData = async () => {
    const response = await getProyectosRequest(); 
    setProyectos(response);
  }

  const handleCreateProject = () => {
    navigation.navigate('CrearProyecto'); // Utiliza el nombre de la ruta asignado a CrearProyectoScreen
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
            {/* Aquí puedes agregar más detalles del proyecto */}
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
  // Estilos para las tarjetas de proyecto
proyectoCard: {
  backgroundColor: '#ffffff', // Fondo blanco para las tarjetas
  borderRadius: 10, // Bordes redondeados
  padding: 20, // Padding para el contenido interno de la tarjeta
  marginVertical: 8, // Margen vertical para separar las tarjetas
  marginHorizontal: 16, // Margen horizontal para dar espacio a los lados
  shadowColor: '#000', // Color de la sombra
  shadowOffset: {
    width: 0,
    height: 2, // Posición vertical de la sombra
  },
  shadowOpacity: 0.23, // Opacidad de la sombra
  shadowRadius: 2.62, // Radio de la sombra
  elevation: 4, // Elevación en Android para la sombra
},

// Estilos para el texto de los títulos de los proyectos dentro de la tarjeta
proyectoTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 5, // Margen inferior para separar del resto del contenido
},

// Estilos para el contenido de la tarjeta (descripción, estado, etc.)
proyectoContent: {
  fontSize: 14,
  color: '#666', // Color gris para el texto que no es el título
  marginBottom: 5, // Margen inferior para separar los elementos del contenido
},

// Estilos para el botón de opciones
optionsButton: {
  backgroundColor: '#4e9ec5', // Color que coincida con tu esquema de diseño
  padding: 10,
  borderRadius: 5, // Bordes redondeados
  marginTop: 10, // Margen superior para separar del contenido de la tarjeta
  alignItems: 'center', // Alinear el texto del botón al centro
},

// Estilos para el texto del botón de opciones
optionsButtonText: {
  color: '#fff', // Texto blanco para contraste con el botón
  fontWeight: 'bold',
},

});

export default HomeScreen;
