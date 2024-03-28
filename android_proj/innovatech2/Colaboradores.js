// ColaboradoresScreen.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ColaboradoresScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Colaboradores</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Assuming a white background
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default ColaboradoresScreen;