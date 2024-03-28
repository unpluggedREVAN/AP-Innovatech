import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text, StyleSheet } from 'react-native';

// Importa tus pantallas aquí
import LoginScreen from './Login';
import RegisterScreen from './Register';
import HomeScreen from './Home';
import ColaboradoresScreen from './Colaboradores';

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

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: [{ display: 'flex' }, null],
      })}
    >
      {/* Define los componentes para tus pantallas y los nombres de las rutas */}
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

// Todos los componentes y estilos de los componentes

// ProyectoScreen Component
export const ProyectoScreen = () => (
  <View style={styles.screenContainer}>
    <Text style={styles.screenText}>Proyecto</Text>
  </View>
);

// EvaluacionScreen Component
export const EvaluacionScreen = () => (
  <View style={styles.screenContainer}>
    <Text style={styles.screenText}>Evaluación</Text>
  </View>
);

// CuentaScreen Component
export const CuentaScreen = () => (
  <View style={styles.screenContainer}>
    <Text style={styles.screenText}>Cuenta</Text>
  </View>
);

// Styles shared by all screen components
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  screenText: {
    fontSize: 24,
    fontWeight: 'bold'
  }
});
