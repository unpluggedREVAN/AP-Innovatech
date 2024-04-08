import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';

const CrearMensajePublicacionScreen = ({ navigation }) => {
  const [mensaje, setMensaje] = useState('');

  const handleEnviarMensaje = () => {
    console.log('Mensaje enviado:', mensaje);
    // Aquí se pone el backend
    // Después devuelve a la pantalla anterior
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        multiline
        numberOfLines={10}
        placeholder="Escribe tu mensaje aquí..."
        value={mensaje}
        onChangeText={setMensaje}
      />
      <TouchableOpacity style={styles.botonEnviar} onPress={handleEnviarMensaje}>
        <Text style={styles.botonEnviarTexto}>Enviar Mensaje</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  botonEnviar: {
    backgroundColor: '#4e9ec5',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  botonEnviarTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CrearMensajePublicacionScreen;