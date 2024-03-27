import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Importa tus pantallas aquí
import LoginScreen from './Login';
import RegisterScreen from './Register';
import HomeScreen from './Home';
// Importa aquí el resto de tus pantallas para el menú de navegación inferior

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Podrías crear una función para tu BottomTabNavigator para mantener tu código organizado
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          }
          // Agrega aquí otros casos para diferentes pantallas si tienes más tabs
          // ...
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: [{ display: 'flex' }, null],
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      {/* ... otras tabs para las pantallas principales */}
    </Tab.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        {/* Una vez que el usuario inicia sesión, se navegará a esta pantalla, 
            que es el BottomTabNavigator */}
        <Stack.Screen
          name="Main"
          component={MainTabNavigator}
          options={{ headerShown: false }} // Puedes decidir mostrar el header o no
        />
        {/* Aquí puedes agregar más pantallas si es necesario */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
