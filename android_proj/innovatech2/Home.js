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
import Ionicons from 'react-native-vector-icons/Ionicons';
// Importar otros componentes necesarios

const HomeScreen = () => {
  const navigation = useNavigation();
  const [proyectos, setProyectos] = useState([]); // Suponiendo que tus proyectos son un array de objetos

  useEffect(() => {
    // Aquí debes cargar los proyectos de la base de datos y establecerlos en el estado
    // fetchProjectsFromDatabase().then(setProyectos);
  }, []);

  // Función dummy para simular la navegación al crear un nuevo proyecto
  const handleCreateProject = () => {
    // Navegar a la pantalla de creación de nuevo proyecto
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
            {/* Aquí representarás la información del proyecto como prefieras */}
            <Text>Proyecto {index + 1}: {proyecto.nombre}</Text>
            {/* ... más detalles del proyecto */}
            <TouchableOpacity style={styles.optionsButton}>
              <Text>Opciones</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.nuevoProyectoButton}
        onPress={(handleCreateProject) => {/* Navegar a la pantalla de creación de nuevo proyecto */}}
      >
        <Text style={styles.nuevoProyectoText}>Crear Nuevo Proyecto</Text>
      </TouchableOpacity>
      {/* Añade aquí el componente de navegación inferior */}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    paddingVertical: 20, // Agrega padding vertical para separar del último elemento
    borderTopWidth: 1, // Agrega un borde superior para simular un separador
    borderColor: '#ccc', // El color del borde
    backgroundColor: '#fff', // Fondo blanco para la barra inferior
  },
  nuevoProyectoButton: {
    backgroundColor: '#4e9ec5', // Tu color de fondo para el botón
    borderRadius: 20, // Bordes redondeados
    paddingVertical: 10, // Padding vertical
    paddingHorizontal: 20, // Padding horizontal
    alignSelf: 'center', // Centrar el botón
    marginBottom: 10, // Margen inferior
  },
  nuevoProyectoText: {
    color: '#fff', // Texto blanco
    fontWeight: 'bold', // Texto en negrita
    textAlign: 'center', // Texto centrado
  },
  container: {
    flex: 1,
    paddingTop: 20, // Ajusta según sea necesario para el logo
  },
  logo: {
    width: 100, // Ajusta el tamaño según tus necesidades
    height: 50, // Ajusta el tamaño según tus necesidades
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
  proyectoCard: {
    // Estilos para las tarjetas de cada proyecto
  },
  optionsButton: {
    // Estilos para el botón de opciones
  },
  nuevoProyectoButton: {
    // Estilos para el botón de crear nuevo proyecto
  },
  nuevoProyectoText: {
    // Estilos para el texto del botón de nuevo proyecto
  },
  // Añade aquí los estilos para el tab navigator
});

export default HomeScreen;
