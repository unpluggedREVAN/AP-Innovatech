import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput } from 'react-native';
import {getTareasProjectRequest, patchTareaRequest, colabIdRequest, postTareaRequest, patchTaskProjectRequest, deleteTareaRequest, patchProjectRequest} from './api/auth.js'


// Componente para el formulario de modificación de una tarea específica
const ModificarTareaForm = ({ tarea, onGuardar, onCancelar }) => {
  const [nombreTarea, setNombreTarea] = useState(tarea.nombreTarea);
  const [storyPoints, setStoryPoints] = useState(tarea.points.toString());
  const [estado, setEstado] = useState(tarea.estado);
  const [responsable, setResponsable] = useState(tarea.idColaborador.toString()); //Hay un error aqui

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
        editable={false}
      />
      <TouchableOpacity
        style={[styles.boton, styles.botonGuardar]}
        onPress={() => onGuardar({ nombreTarea, storyPoints, estado, responsable,tarea })}
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
const CrearTareaForm = ({ onGuardar, onCancelar,colaboradores }) => {
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
        
        <Text style={styles.label}>Responsable:</Text>
        <View style={styles.colaboradoresContainer}>
          {colaboradores.map((colaborador) => (
            <TouchableOpacity
              key={colaborador.idColab}
              style={[
                styles.colaboradorButton,
                { backgroundColor: responsable === colaborador.idColab ? '#4e9ec5' : '#f0f0f0' },
              ]}
              onPress={() => setResponsable(colaborador.idColab)}
            >
              <Text style={styles.colaboradorButtonText}>{colaborador.nameColab}</Text>
            </TouchableOpacity>
          ))}
        </View>

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
  const { proyectoId, proyectoColabs } = route.params;
  const [tareas, setTareas] = useState([]);
  const [tareaAEditar, setTareaAEditar] = useState(null);
  const [mostrarFormCrear, setMostrarFormCrear] = useState(false);
  const [infoColabs, setInfoColabs] = useState([]);

  useEffect(() => {
    fetchDataTasks();
  }, []);

  const fetchDataTasks = async () => {
    const responseTasks = await getTareasProjectRequest(proyectoId);
    setTareas(responseTasks);
    proyectoColabs.forEach( async function(colab, index) {
      const infoColab = await colabIdRequest(colab); 
      infoColabs.push(infoColab);
    })
  }

  const handleEliminarTarea = async (idTask,index) => {
    const response = await deleteTareaRequest(idTask);
    const nuevasTareas = [...tareas];
    nuevasTareas.splice(index, 1);
    setTareas(nuevasTareas);
    await patchProjectRequest(proyectoId, {tareas : nuevasTareas});
  };

  //Guardar las modificaciones de una tarea
  const handleGuardarModificacion = async (modificaciones) => {
    const nuevasTareas = tareas.map((t) =>
      t.nombreTarea === tareaAEditar.nombreTarea ? { ...t, ...modificaciones } : t
    );
    setTareas(nuevasTareas);
    //Hacer el request y guardar en la base de datos
    const dataTask = {
      nombreTarea : modificaciones.nombreTarea,
      points : modificaciones.storyPoints,
      estado : modificaciones.estado,
      idColaborador : modificaciones.responsable
    }
    await patchTareaRequest(modificaciones.tarea._id, dataTask);

    setTareaAEditar(null); // Cerrar el formulario de edición
  };

  const handleAgregarTarea = async (nuevaTarea) => {
    //Esto tengo que quitarlo
    setTareas([...tareas, nuevaTarea]);
    setMostrarFormCrear(false); // Cerrar el formulario de creación

    //Hacer el request para agregar una tarea
    const nuevaTask = {
      nombreTarea : nuevaTarea.nombreTarea,
      points : nuevaTarea.storyPoints,
      estado : nuevaTarea.estado,
      idColaborador : nuevaTarea.responsable
    }
    const idTask = await postTareaRequest(nuevaTask);
    
    //Agregar la tarea al proyecto
    await patchTaskProjectRequest(proyectoId, idTask);
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
            <TouchableOpacity style={[styles.boton, styles.botonEliminar]} onPress={() => handleEliminarTarea(tarea._id,index)}>
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
          colaboradores={infoColabs}
        />
      )}
    </ScrollView>
  );
};

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
    backgroundColor: '#4e9ec5', 
  },
  botonEliminar: {
    backgroundColor: '#ff6347', 
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
  colaboradoresContainer: {
    marginBottom: 15,
  },
  colaboradorButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
  colaboradorButtonText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
});

export default ModificarTareasScreen;