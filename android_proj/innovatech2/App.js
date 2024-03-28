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

// para más pantallas

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
            case 'Proyecto':
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
      <Tab.Screen name="Proyecto" component={ProyectoScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Evaluación" component={EvaluacionScreen} />
      <Tab.Screen name="Cuenta" component={CuentaScreen} />
    </Tab.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer>
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
          options={{ headerShown: false }} // mostrar el header es opcional
        />
        {/* aquí se ponen más pantallas */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
