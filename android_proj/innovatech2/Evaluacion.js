import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Elemento para la lista dsplegable
import { BarChart } from 'react-native-chart-kit'; // Para la gráfica de barras
import projectData from './data.json'; 

const screenWidth = Dimensions.get('window').width;

const EvaluacionScreen = () => {
  const [selectedProject, setSelectedProject] = useState(projectData[0]);
  const [proyectos, setProyectos] = useState(projectData);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const tareasPorEstado = selectedProject.tareas.reduce((acc, tarea) => {
      acc[tarea.estado] = (acc[tarea.estado] || 0) + 1;
      return acc;
    }, {});

    setChartData({
      labels: ['Por hacer', 'En curso', 'Finalizadas'],
      datasets: [
        {
          data: [
            tareasPorEstado['por hacer'] || 0,
            tareasPorEstado['en curso'] || 0,
            tareasPorEstado['finalizada'] || 0,
          ]
        }
      ]
    });
  }, [selectedProject]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Evaluación de Proyectos</Text>
      <Picker
        selectedValue={selectedProject._id}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setSelectedProject(proyectos[itemIndex])}
      >
        {proyectos.map((proyecto) => (
          <Picker.Item key={proyecto._id} label={proyecto.nombreProyecto} value={proyecto._id} />
        ))}
      </Picker>
      {chartData && (
        <BarChart
          data={chartData}
          width={screenWidth}
          height={220}
          chartConfig={{
            backgroundColor: '#1cc910',
            backgroundGradientFrom: '#eff3ff',
            backgroundGradientTo: '#efefef',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      )}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Burndown Chart</Text>
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
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4e9ec5',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default EvaluacionScreen;