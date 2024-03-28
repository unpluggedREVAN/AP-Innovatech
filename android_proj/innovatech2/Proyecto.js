// Proyecto.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProyectoScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Proyecto</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', 
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default ProyectoScreen;