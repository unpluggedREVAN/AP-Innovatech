import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput } from 'react-native';
import projectData from './data.json';

// Componente para el formulario de modificación de una tarea específica
const ModificarTareaForm = ({ tarea, onGuardar, onCancelar }) => {
  const [nombreTarea, setNombreTarea] = useState(tarea.nombreTarea);
  const [storyPoints, setStoryPoints] = useState(tarea.storyPoints.toString());
  const [estado, setEstado] = useState(tarea.estado);
  const [responsable, setResponsable] = useState(tarea.responsable);

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitulo}>Modificar Tarea</Text>
      <TextInput
        style={styles.input}
        value={nombreTarea}
        onChangeText={setNombreTarea}
        placeholder="Nombre de la tarea"
      />
      <TextInput
        style={styles.input}
        value={storyPoints}
        onChangeText={setStoryPoints}
        placeholder="Story Points"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={estado}
        onChangeText={setEstado}
        placeholder="Estado"
      />
      <TextInput
        style={styles.input}
        value={responsable}
        onChangeText={setResponsable}
        placeholder="Responsable"
      />
      <TouchableOpacity
        style={[styles.boton, styles.botonGuardar]}
        onPress={() => onGuardar({ nombreTarea, storyPoints, estado, responsable })}
      >
        <Text style={styles.botonTexto}>Guardar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.boton, styles.botonCancelar]} onPress={onCancelar}>
        <Text style={styles.botonTexto}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
};

// Componente para el formulario de creación de una nueva tarea
const CrearTareaForm = ({ onGuardar, onCancelar }) => {
    const [nombreTarea, setNombreTarea] = useState('');
    const [storyPoints, setStoryPoints] = useState('');
    const [estado, setEstado] = useState('');
    const [responsable, setResponsable] = useState('');
  
    return (
      <View style={styles.formContainer}>
        <Text style={styles.formTitulo}>Agregar Nueva Tarea</Text>
        <TextInput
          style={styles.input}
          value={nombreTarea}
          onChangeText={setNombreTarea}
          placeholder="Nombre de la tarea"
        />
        <TextInput
          style={styles.input}
          value={storyPoints}
          onChangeText={setStoryPoints}
          placeholder="Story Points"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          value={estado}
          onChangeText={setEstado}
          placeholder="Estado"
        />
        <TextInput
          style={styles.input}
          value={responsable}
          onChangeText={setResponsable}
          placeholder="Responsable"
        />
        <TouchableOpacity
          style={[styles.boton, styles.botonGuardar]}
          onPress={() => onGuardar({ nombreTarea, storyPoints, estado, responsable })}
        >
          <Text style={styles.botonTexto}>Guardar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.boton, styles.botonCancelar]} onPress={onCancelar}>
          <Text style={styles.botonTexto}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    );
};

const ModificarTareasScreen = ({ route }) => {
  const { proyectoId } = route.params;
  const proyecto = projectData.find(p => p._id === proyectoId);
  const [tareas, setTareas] = useState(proyecto ? proyecto.tareas : []);
  const [tareaAEditar, setTareaAEditar] = useState(null);
  const [mostrarFormCrear, setMostrarFormCrear] = useState(false);

  const handleEliminarTarea = (index) => {
    const nuevasTareas = [...tareas];
    nuevasTareas.splice(index, 1);
    setTareas(nuevasTareas);
  };

  const handleGuardarModificacion = (modificaciones) => {
    const nuevasTareas = tareas.map((t) =>
      t.nombreTarea === tareaAEditar.nombreTarea ? { ...t, ...modificaciones } : t
    );
    setTareas(nuevasTareas);
    setTareaAEditar(null); // Cerrar el formulario de edición
  };

  const handleAgregarTarea = (nuevaTarea) => {
    setTareas([...tareas, nuevaTarea]);
    setMostrarFormCrear(false); // Cerrar el formulario de creación
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Modificar Tareas del Proyecto</Text>
      {tareas.map((tarea, index) => (
        <View key={index} style={styles.tareaContainer}>
          <Text>{tarea.nombreTarea} - SP: {tarea.storyPoints} - Estado: {tarea.estado} - Responsable: {tarea.responsable}</Text>
          <View style={styles.botonesContainer}>
            <TouchableOpacity style={[styles.boton, styles.botonModificar]} onPress={() => setTareaAEditar(tarea)}>
              <Text style={styles.botonTexto}>Modificar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.boton, styles.botonEliminar]} onPress={() => handleEliminarTarea(index)}>
              <Text style={styles.botonTexto}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.botonAgregar} onPress={() => setMostrarFormCrear(true)}>
        <Text style={styles.botonTexto}>Agregar Nueva Tarea</Text>
      </TouchableOpacity>

      {/* Renderiza el formulario de modificación si una tarea está seleccionada para editar */}
      {tareaAEditar && (
        <ModificarTareaForm
          tarea={tareaAEditar}
          onGuardar={handleGuardarModificacion}
          onCancelar={() => setTareaAEditar(null)}
        />
      )}
      {/* Renderiza el formulario de creación si se debe mostrar */}
      {mostrarFormCrear && (
        <CrearTareaForm
          onGuardar={handleAgregarTarea}
          onCancelar={() => setMostrarFormCrear(false)}
        />
      )}
    </ScrollView>
  );
};

// Agrega estilos para el formulario y los botones
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tareaContainer: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  botonesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  boton: {
    padding: 10,
    borderRadius: 5,
  },
  botonModificar: {
    backgroundColor: '#4e9ec5', // Un color azul para el botón de modificar
  },
  botonEliminar: {
    backgroundColor: '#ff6347', // Un color rojo para el botón de eliminar
  },
  botonAgregar: {
    backgroundColor: '#4e9ec5',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  botonTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  formContainer: {
    backgroundColor: '#f2f2f2',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  formTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  botonGuardar: {
    backgroundColor: '#4CAF50', // Verde para guardar
  },
  botonCancelar: {
    backgroundColor: '#f44336', // Rojo para cancelar
  },
  // Más estilos para botones...
});

export default ModificarTareasScreen;
