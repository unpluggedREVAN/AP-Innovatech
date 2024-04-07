import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import colaboradoresData from './colab_data.json'; 
import { useNavigation } from '@react-navigation/native';


const ColaboradoresScreen = () => {

  const navigation = useNavigation(); 

  const handleMoreInfoPress = (colaborador) => {
    navigation.navigate('ColaboradorDetails', { colaborador });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Colaboradores</Text>
      <ScrollView style={styles.scrollView}>
        {colaboradoresData.map((colaborador, index) => (
          <View key={colaborador._id} style={styles.colaboradorCard}>
            <Text style={styles.colaboradorInfo}>Nombre: {colaborador.nombreCompleto}</Text>
            <Text style={styles.colaboradorInfo}>Cédula: {colaborador.cedula}</Text>
            <Text style={styles.colaboradorInfo}>Estado: {colaborador.estado}</Text>
            <TouchableOpacity style={styles.button} onPress={() => handleMoreInfoPress(colaborador)}>
              <Text style={styles.buttonText}>Más información</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    margin: 20,
    alignSelf: 'center',
  },
  scrollView: {
    marginHorizontal: 20,
  },
  colaboradorCard: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  colaboradorInfo: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#4e9ec5',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ColaboradoresScreen;
