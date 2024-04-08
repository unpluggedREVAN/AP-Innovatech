import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text, StyleSheet } from 'react-native';

// cargar las pantallas principales
import LoginScreen from './Login';
import RegisterScreen from './Register';
import HomeScreen from './Home';
import ColaboradoresScreen from './Colaboradores';
import ProyectoScreen from './Proyecto';
import EvaluacionScreen from './Evaluacion';
import CuentaScreen from './Cuenta';

// Carga de pantallas secundarias
import ProjectDetailsScreen from './ProjectDetailsScreen';
import ColaboradoresDetailsScreen from './ColaboradoresDetailsScreen';
import CrearProyectoScreen from './CrearProyectoScreen';
import GestionarColaboradoresScreen from './GestionarColaboradoresScreen';
import ModificarTareasScreen from './ModificarTareasScreen';
import ReunionDetailsScreen from './ReunionDetailsScreen';
import CrearReunionScreen from './CrearReunionScreen';
import ForosScreen from './ForosScreen';
import PublicacionDetailsScreen from './PublicacionDetailsScreen';
import CrearPublicacionScreen from './CrearPublicacionScreen';
import CrearMensajePublicacionScreen from './CrearMensajePublicacionScreen';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// el corazón del bottom tab navigator
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          // ícono basado en la pantalla activa
          switch (route.name) {
            case 'Colab':
              iconName = focused ? 'people' : 'people-outline';
              break;
            case 'Reuniones':
              iconName = focused ? 'briefcase' : 'briefcase-outline';
              break;
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Evaluación':
              iconName = focused ? 'stats-chart' : 'stats-chart-outline';
              break;
            case 'Cuenta':
              iconName = focused ? 'person-circle' : 'person-circle-outline';
              break;
          }

          // Para darle más vida a los íconos
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: [{ display: 'flex' }, null],
      })}
    >
      {/* aquí van pantallas como tabs */}
      <Tab.Screen name="Colab" component={ColaboradoresScreen} />
      <Tab.Screen name="Reuniones" component={ProyectoScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Evaluación" component={EvaluacionScreen} />
      <Tab.Screen name="Cuenta" component={CuentaScreen} />
    </Tab.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer initialRouteName="Main">
      <Stack.Navigator>
        {/* pantalla de login, sin header */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        {/* lo mismo para registro */}
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        {/* la entrada al mundo de tabs después del login */}
        <Stack.Screen
          name="Main"
          component={MainTabNavigator}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="ProjectDetails"
          component={ProjectDetailsScreen}
          options={{ headerTitle: 'Detalles del Proyecto' }}
        />
        <Stack.Screen name="Colaboradores" component={ColaboradoresScreen} />
        <Stack.Screen name="ColaboradorDetails" component={ColaboradoresDetailsScreen} />

        <Stack.Screen
          name="GestionarColaboradores"
          component={GestionarColaboradoresScreen}
          options={{ title: 'Gestionar Colaboradores' }}
        />

        <Stack.Screen
          name="ModificarTareas"
          component={ModificarTareasScreen}
          options={{ title: 'Modificar Tareas' }}
        />

        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CrearProyecto" component={CrearProyectoScreen} options={{ headerTitle: 'Crear Proyecto' }} />
        <Stack.Screen name="ReunionDetails" component={ReunionDetailsScreen} />
        <Stack.Screen name="CrearReunionScreen" component={CrearReunionScreen} />
        <Stack.Screen name="PublicacionDetailsScreen" component={PublicacionDetailsScreen} options={{ title: 'Detalle de la Publicación' }} />
        <Stack.Screen
          name="ForosScreen"
          component={ForosScreen}
          options={{ title: 'Foro' }} 
        />
        <Stack.Screen name="CrearPublicacion" component={CrearPublicacionScreen} />
        <Stack.Screen
          name="CrearMensajePublicacion"
          component={CrearMensajePublicacionScreen}
          options={{ title: 'Crear Mensaje' }} 
        />
        {/* aquí vamos agregando pantallas */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}